import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { chaveFone, lerComando, escolher, extensao, saudacao, foneBonito, escolherConversa, chaveContato, textoDara, textoDaraMotorista, nivelPorPalavras, lerNivel } from '../../supabase/functions/motora-robo/comandos.ts';
import { tentarGemini } from '../../supabase/functions/motora-push/gemini.ts';
import { textoDe, contatoOculto, ehDoRobo, criarRobo, empacotar, abrirPacote, numeroBR, mascarar } from '../nucleo.js';

const CREDS = '{"account":{},"me":{"id":"x"}}';

const flush = async () => { for (let i = 0; i < 8; i++) await new Promise((r) => setImmediate(r)); };

function montar({ sessao = null, rotas = {} } = {}) {
  let agora = 1_800_000_000_000, seq = 0;
  const timers = new Map(), esperas = [];
  const relogio = {
    agora: () => agora,
    setTimeout: (f, ms) => { const id = ++seq; timers.set(id, { f, em: agora + ms }); esperas.push(ms); return id; },
    clearTimeout: (id) => timers.delete(id),
    dormir: (ms) => new Promise((r) => relogio.setTimeout(r, ms)),
  };
  const avancar = async (ms) => {
    const fim = agora + ms;
    await flush();
    for (;;) {
      const prox = [...timers].filter(([, t]) => t.em <= fim).sort((a, b) => a[1].em - b[1].em)[0];
      if (!prox) break;
      timers.delete(prox[0]); agora = Math.max(agora, prox[1].em); prox[1].f(); await flush();
    }
    agora = fim; await flush();
  };
  const chamadas = [], puts = [], logs = [], sockets = [];
  const resp = (status, corpo) => ({ status, ok: status < 400, json: async () => corpo, arrayBuffer: async () => corpo });
  const st = { pendentes: { ativo: false, mensagens: [] }, parear: {}, sessao };
  const fetchFn = async (url, o = {}) => {
    if (url.startsWith('https://guardar')) { puts.push(o.body); return resp(rotas.put || 200, {}); }
    if (url.startsWith('https://baixar')) {
      if (rotas.baixarErro) throw new Error('sem rede');
      return resp(st.sessao ? 200 : 404, st.sessao);
    }
    const b = JSON.parse(o.body); chamadas.push(b);
    if (rotas[b.acao]) return rotas[b.acao](resp, b);
    if (b.acao === 'pendentes') return resp(200, st.pendentes);
    if (b.acao === 'parear_ver') return resp(200, st.parear);
    if (b.acao === 'sessao_enviar') return resp(200, { url: 'https://guardar/123456789012?token=x' });
    if (b.acao === 'sessao_baixar') return st.sessao ? resp(200, { url: 'https://baixar/1' }) : resp(404, { error: 'não' });
    return resp(200, { ok: true });
  };
  const estado = { creds: {} };
  const baileys = {
    useMultiFileAuthState: async () => ({ state: { creds: estado.creds, keys: {} }, saveCreds: async () => { estado.salvou = (estado.salvou || 0) + 1; } }),
    makeCacheableSignalKeyStore: (k) => k,
    fetchLatestBaileysVersion: async () => ({ version: [2, 3000, 1], isLatest: true }),
    downloadMediaMessage: async () => { estado.baixou = (estado.baixou || 0) + 1; return estado.arquivo || Buffer.from('arquivo'); },
    makeWASocket: (op) => {
      const s = { ev: new EventEmitter(), op, enviadas: [], pedidos: [], numeros: {}, ended: false,
        end() { this.ended = true; },
        requestPairingCode: async (n) => { s.pedidos.push(n); estado.creds.me = { id: n + '@s.whatsapp.net' }; return 'ABCD1234'; },
        onWhatsApp: async (n) => (n in s.numeros ? s.numeros[n] : [{ exists: true, jid: n + '@s.whatsapp.net' }]),
        sendMessage: async (j, c) => { if (s.falharEnvio) throw new Error('falha 5562999999999'); s.enviadas.push([j, c.text]); } };
      sockets.push(s); return s;
    },
  };
  const pastaBase = fs.mkdtempSync(path.join(os.tmpdir(), 'robo-t-'));
  const robo = criarRobo({ baileys, logger: {}, qrcode: { toDataURL: async (q) => 'data:' + q }, chave: 'k', fetchFn, pastaBase, relogio, aleatorio: () => 0.5, log: (t) => logs.push(t) });
  const qr = (s = sockets.at(-1)) => s.ev.emit('connection.update', { qr: 'QR' });
  const abre = (s = sockets.at(-1)) => s.ev.emit('connection.update', { connection: 'open' });
  const cai = (c, s = sockets.at(-1)) => s.ev.emit('connection.update', { connection: 'close', lastDisconnect: { error: c === undefined ? new Error('x') : Object.assign(new Error('x'), { output: { statusCode: c } }) } });
  fs.mkdirSync(robo.PASTA, { recursive: true });
  return { robo, relogio, avancar, chamadas, puts, logs, sockets, st, estado, qr, abre, cai, flush, esperas };
}
const acoes = (t, a) => t.chamadas.filter((c) => c.acao === a);

test('opções do socket: sem histórico e sem aparecer online', async () => {
  const t = montar(); await t.robo.abrir();
  const o = t.sockets[0].op;
  assert.equal(o.markOnlineOnConnect, false); assert.equal(o.syncFullHistory, false);
  assert.equal(o.shouldSyncHistoryMessage(), false); assert.deepEqual(o.version, [2, 3000, 1]);
  assert.equal(o.printQRInTerminal, undefined);
});

test('conectou: limpa QR e fica funcionando', async () => {
  const t = montar(); await t.robo.abrir(); t.abre(); await t.flush();
  assert.equal(t.robo.situacao, 'funcionando');
  assert.ok(acoes(t, 'qr').some((c) => c.qr === null));
});

for (const [codigo, espera, nome] of [[515, 1000, 'reinício normal'], [440, 300000, 'outra cópia'], [403, 3600000, 'conta recusada']]) {
  test(`queda ${codigo} (${nome}) não apaga nada e reabre em ${espera} ms`, async () => {
    const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
    await t.robo.abrir(); t.abre(); await t.flush();
    fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), '{}');
    t.cai(codigo); await t.flush();
    assert.ok(fs.existsSync(path.join(t.robo.PASTA, 'creds.json')));
    assert.equal(acoes(t, 'sessao_apagar').length, 0);
    await t.avancar(espera - 1); assert.equal(t.sockets.length, 1);
    await t.avancar(1); assert.equal(t.sockets.length, 2);
    assert.ok(t.sockets[0].ended);
    if (codigo === 403) assert.ok(acoes(t, 'parear_codigo').some((c) => /recusou/.test(c.erro)));
  });
}

test('queda 401 pareado: apaga tudo e reabre em 30 s, sem logout', async () => {
  const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
  await t.robo.abrir(); t.abre(); await t.flush();
  fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), '{}');
  t.cai(401); await t.flush();
  assert.ok(!fs.existsSync(path.join(t.robo.PASTA, 'creds.json')));
  assert.equal(acoes(t, 'sessao_apagar').length, 1);
  await t.avancar(30000); assert.equal(t.sockets.length, 2);
});

for (const c of [500, 411]) {
  test(`queda ${c} repetida nunca apaga a conexão`, async () => {
    const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
    await t.robo.abrir();
    fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), CREDS);
    for (let i = 0; i < 5; i++) { t.cai(c); await t.avancar(310000); }
    assert.equal(acoes(t, 'sessao_apagar').length, 0);
    assert.ok(fs.existsSync(path.join(t.robo.PASTA, 'creds.json')));
  });
}

for (const c of [408, 405, 428, 503, undefined]) {
  test(`queda ${c}: tenta de novo com espera crescente até 5 min`, async () => {
    const t = montar(); await t.robo.abrir();
    const antes = t.esperas.length; t.cai(c); await t.flush();
    const e1 = t.esperas.slice(antes).at(-1); assert.ok(e1 >= 5000 && e1 < 6001, String(e1));
    let ult = 0;
    for (let i = 0; i < 9; i++) { await t.avancar(300000); const a = t.esperas.length; t.cai(c); await t.flush(); ult = t.esperas.slice(a).at(-1); }
    assert.ok(ult <= 300000 && ult >= 240000, String(ult));
  });
}

test('código só é pedido depois do QR; QR fica calado no pareamento', async () => {
  const t = montar(); await t.robo.abrir();
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  assert.equal(t.sockets[0].pedidos.length, 0);
  t.qr(); await t.flush(); const qrs = acoes(t, 'qr').length;
  await t.robo.verificarPareamento();
  assert.deepEqual(t.sockets[0].pedidos, ['5562999999999']);
  assert.ok(acoes(t, 'parear_codigo').some((c) => c.codigo === 'ABCD1234'));
  t.qr(); await t.flush(); assert.equal(acoes(t, 'qr').length, qrs);
  await t.robo.verificarPareamento(); assert.equal(t.sockets[0].pedidos.length, 1, 'mesmo pedido não repete');
});

test('pedido antigo (mais de 10 min) ou número ruim', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora() - 11 * 60000).toISOString() };
  await t.robo.verificarPareamento(); assert.equal(t.sockets[0].pedidos.length, 0);
  t.st.parear = { numero: '123', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  assert.ok(acoes(t, 'parear_codigo').some((c) => /inválido/.test(c.erro)));
});

test('queda durante o pareamento limpa e avisa que expirou', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), '{"me":1}');
  t.cai(408); await t.flush();
  assert.equal(t.robo.pareando, false);
  assert.ok(!fs.existsSync(path.join(t.robo.PASTA, 'creds.json')));
  assert.ok(acoes(t, 'parear_codigo').some((c) => /expirou/.test(c.erro)));
});

test('515 depois de parear não limpa', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  t.estado.creds.account = {};
  fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), '{}');
  t.cai(515); await t.flush();
  assert.ok(fs.existsSync(path.join(t.robo.PASTA, 'creds.json')));
  assert.ok(!acoes(t, 'parear_codigo').some((c) => /expirou/.test(c.erro || '')));
});

test('falha ao pedir código avisa o dono e o QR volta', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  t.sockets[0].requestPairingCode = async () => { throw new Error('recusado'); };
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  assert.equal(t.robo.pareando, false);
  assert.ok(acoes(t, 'parear_codigo').some((c) => /Não consegui/.test(c.erro)));
});

test('novo pedido durante pareamento recomeça limpo', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  t.st.parear = { numero: '62988888888', pedido_em: new Date(t.relogio.agora() + 1).toISOString() };
  await t.robo.verificarPareamento();
  await t.avancar(1000); assert.equal(t.sockets.length, 2);
  t.qr(); await t.flush(); await t.robo.verificarPareamento();
  assert.deepEqual(t.sockets[1].pedidos, ['5562988888888']);
});

const pacote = (dir, arqs) => { fs.mkdirSync(dir, { recursive: true }); for (const [n, c] of Object.entries(arqs)) fs.writeFileSync(path.join(dir, n), c); return empacotar(dir); };

test('pacote: ida e volta, e recusa de lixo e nomes perigosos', async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'p-'));
  const buf = pacote(d, { 'creds.json': CREDS, 'k-1.json': 'x' });
  const a = abrirPacote(buf);
  assert.equal(Buffer.from(a['creds.json'], 'base64').toString(), CREDS);
  assert.equal(abrirPacote(pacote(fs.mkdtempSync(path.join(os.tmpdir(), 'p-')), { 'creds.json': '{"account":' })), null, 'creds cortado');
  assert.equal(abrirPacote(pacote(fs.mkdtempSync(path.join(os.tmpdir(), 'p-')), { 'creds.json': '{"me":{"id":"x"}}' })), null, 'sem account');
  assert.equal(abrirPacote(Buffer.from('PK\x03\x04 zip antigo')), null);
  const zlib = await import('node:zlib');
  const mau = (o) => zlib.gzipSync(JSON.stringify(o));
  const bom = Buffer.from(CREDS).toString('base64');
  assert.equal(abrirPacote(mau({ formato: 'x', arquivos: { 'creds.json': bom } })), null);
  assert.equal(abrirPacote(mau({ formato: 'motora-baileys-1', arquivos: { 'k.json': 'e30=' } })), null);
  assert.equal(abrirPacote(mau({ formato: 'motora-baileys-1', arquivos: { 'creds.json': bom, '../x': 'e30=' } })), null);
});

test('restaurar: conexão boa grava arquivos', async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'p-'));
  const t = montar({ sessao: pacote(d, { 'creds.json': CREDS }) });
  assert.equal(await t.robo.restaurar(), true);
  assert.equal(fs.readFileSync(path.join(t.robo.PASTA, 'creds.json'), 'utf8'), CREDS);
});

test('restaurar: zip antigo apaga e segue; sem sessão segue', async () => {
  const t = montar({ sessao: Buffer.from('PK antigo') });
  assert.equal(await t.robo.restaurar(), false);
  assert.equal(acoes(t, 'sessao_apagar').length, 1);
  const t2 = montar();
  assert.equal(await t2.robo.restaurar(), false);
  assert.equal(acoes(t2, 'sessao_apagar').length, 0);
});

test('restaurar: erro de rede NÃO apaga e tenta de novo', async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'p-'));
  let n = 0;
  const t = montar({ sessao: pacote(d, { 'creds.json': CREDS }), rotas: { sessao_baixar: (resp) => (++n === 1 ? resp(503, {}) : resp(200, { url: 'https://baixar/1' })) } });
  const p = t.robo.restaurar();
  await t.avancar(5000);
  assert.equal(await p, true); assert.equal(acoes(t, 'sessao_apagar').length, 0);
});

test('guardar: só pareado; envio com erro tenta 3 vezes', async () => {
  const t = montar(); await t.robo.abrir();
  assert.equal(await t.robo.guardar(), false);
  t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
  fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), CREDS);
  assert.equal(await t.robo.guardar(), true); assert.equal(t.puts.length, 1);
  assert.ok(abrirPacote(t.puts[0]));
  const r = montar({ rotas: { put: 500 } }); r.estado.creds.me = { id: 'x' }; r.estado.creds.account = {};
  await r.robo.abrir();
  fs.writeFileSync(path.join(r.robo.PASTA, 'creds.json'), CREDS);
  const p = r.robo.guardar(); await r.avancar(20000);
  assert.equal(await p, false); assert.equal(r.puts.length, 3);
});

test('guardar: arquivo cortado não substitui a cópia boa', async () => {
  const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
  await t.robo.abrir();
  fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), '{"account":');
  assert.equal(await t.robo.guardar(), false); assert.equal(t.puts.length, 0);
});

test('creds.update salva e agenda cópia, no máximo uma', async () => {
  const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
  await t.robo.abrir();
  fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), CREDS);
  t.sockets[0].ev.emit('creds.update'); t.sockets[0].ev.emit('creds.update'); await t.flush();
  assert.equal(t.estado.salvou, 2);
  await t.avancar(60000); assert.equal(t.puts.length, 1);
});

test('restaurar: sem endereço mas com conexão guardada tenta de novo, sem pedir QR', async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'p-'));
  let n = 0;
  const t = montar({ sessao: pacote(d, { 'creds.json': CREDS }), rotas: {
    sessao_baixar: (resp) => (++n === 1 ? resp(404, { error: 'x' }) : resp(200, { url: 'https://baixar/1' })),
    sessao_existe: (resp) => resp(200, { existe: true }) } });
  const p = t.robo.restaurar(); await t.avancar(5000);
  assert.equal(await p, true); assert.equal(n, 2);
});

const msg = (id, tel = '62999999999') => ({ id, nome: 'Fulano', telefones: [tel], texto: 'oi ' + id });

test('envio: manda, marca enviada e espera pelo menos 1 min', async () => {
  const t = montar(); await t.robo.abrir(); t.abre(); await t.flush();
  t.st.pendentes = { ativo: true, mensagens: [msg(1)] };
  const a = t.esperas.length; const p = t.robo.ciclo(); await t.avancar(80000); await p;
  assert.deepEqual(t.sockets[0].enviadas, [['5562999999999@s.whatsapp.net', 'oi 1']]);
  assert.equal(acoes(t, 'enviada')[0].id, 1);
  const pausa = t.esperas.slice(a).at(-1); assert.ok(pausa >= 60000 && pausa < 75000);
});

test('envio: falha ao marcar (5xx ou rede) nunca reenvia', async () => {
  for (const falha of ['5xx', 'rede']) {
    let n = 0;
    const t = montar({ rotas: { enviada: (resp) => { if (++n < 3) { if (falha === 'rede') throw new Error('sem rede'); return resp(503, {}); } return resp(200, { ok: true }); } } });
    await t.robo.abrir(); t.abre(); await t.flush();
    t.st.pendentes = { ativo: true, mensagens: [msg(1)] };
    for (let i = 0; i < 3; i++) { const p = t.robo.ciclo(); await t.avancar(80000); await p; }
    assert.equal(t.sockets[0].enviadas.length, 1);
    assert.equal(n, 3); assert.equal(acoes(t, 'falhou').length, 0);
  }
});

test('envio: agenda cópia da conexão depois de enviar', async () => {
  const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
  await t.robo.abrir(); t.abre(); await t.flush();
  fs.writeFileSync(path.join(t.robo.PASTA, 'creds.json'), CREDS);
  await t.avancar(60000); const antes = t.puts.length;
  t.st.pendentes = { ativo: true, mensagens: [msg(1)] };
  const p = t.robo.ciclo(); await t.avancar(5 * 60000); await p;
  assert.equal(t.puts.length, antes + 1);
});

test('desconectado há mais de 10 min avisa uma vez por mensagem', async () => {
  const t = montar(); await t.robo.abrir(); t.abre(); await t.flush();
  t.st.pendentes = { ativo: true, mensagens: [msg(1), msg(2)] };
  t.cai(503); await t.flush();
  await t.robo.sinalDeVida(); assert.equal(acoes(t, 'falhou').length, 0);
  await t.avancar(10 * 60000 + 1);
  await t.robo.sinalDeVida(); assert.equal(acoes(t, 'falhou').length, 2);
  await t.robo.sinalDeVida(); assert.equal(acoes(t, 'falhou').length, 2);
});

test('envio: sem conexão pula a rodada sem contar falha', async () => {
  const t = montar(); await t.robo.abrir();
  t.st.pendentes = { ativo: true, mensagens: [msg(1)] };
  await t.robo.ciclo();
  assert.equal(acoes(t, 'pendentes').length, 0); assert.equal(acoes(t, 'falhou').length, 0);
});

test('envio: 9º dígito vem do onWhatsApp; sem WhatsApp falha definitiva; undefined é temporário', async () => {
  const t = montar(); await t.robo.abrir(); t.abre(); await t.flush(); const s = t.sockets[0];
  s.numeros['5562999999999'] = [{ exists: true, jid: '556299999999@s.whatsapp.net' }];
  t.st.pendentes = { ativo: true, mensagens: [msg(1)] };
  let p = t.robo.ciclo(); await t.avancar(80000); await p;
  assert.equal(s.enviadas[0][0], '556299999999@s.whatsapp.net');
  s.numeros['5562988888888'] = [];
  t.st.pendentes = { ativo: true, mensagens: [msg(2, '62988888888')] };
  p = t.robo.ciclo(); await t.avancar(80000); await p;
  assert.equal(acoes(t, 'falhou')[0].id, 2);
  s.numeros['5562977777777'] = undefined;
  t.st.pendentes = { ativo: true, mensagens: [msg(3, '62977777777')] };
  p = t.robo.ciclo(); await t.avancar(80000); await p;
  assert.equal(acoes(t, 'falhou').length, 1);
  for (let i = 0; i < 2; i++) { p = t.robo.ciclo(); await t.avancar(80000); await p; }
  assert.equal(acoes(t, 'falhou').length, 2);
});

test('envio: limite de 30 por hora', async () => {
  const t = montar(); await t.robo.abrir(); t.abre(); await t.flush();
  for (let i = 0; i < 31; i++) {
    t.st.pendentes = { ativo: true, mensagens: [msg(i)] };
    const p = t.robo.ciclo(); await t.avancar(80000); await p;
    if (i === 30) assert.equal(t.sockets[0].enviadas.length, 30);
  }
  await t.avancar(3600000);
  const p = t.robo.ciclo(); await t.avancar(80000); await p;
  assert.equal(t.sockets[0].enviadas.length, 31);
});

test('logs não mostram telefone, código, chave nem endereço assinado', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  t.estado.creds.account = {}; await t.robo.guardar();
  t.abre(); await t.flush();
  t.sockets[0].falharEnvio = true;
  t.st.pendentes = { ativo: true, mensagens: [msg(1)] };
  for (let i = 0; i < 3; i++) { const p = t.robo.ciclo(); await t.avancar(80000); await p; }
  const tudo = t.logs.join('\n');
  assert.doesNotMatch(tudo, /\d{8,}|ABCD1234|token=|https:/);
  assert.doesNotMatch(acoes(t, 'falhou')[0].erro, /\d{8,}/);
  assert.equal(mascarar('ligue 5562999999999 https://a/b?x=1'), 'ligue *** [endereço]');
});

test('numeroBR', () => {
  assert.equal(numeroBR('(62) 99999-9999'), '5562999999999');
  assert.equal(numeroBR('6233334444'), '556233334444');
  assert.equal(numeroBR('123'), null);
});

test('página /qr exige a chave certa', async () => {
  const t = montar(); const ini = t.robo.iniciar(); await t.flush(); await ini;
  t.qr(); await t.flush();
  const base = 'http://127.0.0.1:' + t.robo.servidor.address().port;
  const certo = await (await fetch(base + '/qr?k=' + t.robo.senhaPagina)).text();
  assert.match(certo, /data:QR/);
  const errado = await (await fetch(base + '/qr?k=errada')).text();
  assert.doesNotMatch(errado, /data:QR/);
  await t.robo.encerrar();
});

test('QR que acabou (408) reabre em 5–10 s sem aumentar a espera', async () => {
  const t = montar(); await t.robo.abrir();
  for (let i = 0; i < 8; i++) {
    t.qr(); await t.flush();
    const a = t.esperas.length; t.cai(408); await t.flush();
    const e = t.esperas.slice(a).at(-1); assert.ok(e >= 5000 && e <= 10000, String(e));
    await t.avancar(10000);
  }
});

test('pedido com conexão velha abre outra e pede o código no 1º QR', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  await t.avancar(30000);
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  assert.equal(t.sockets[0].pedidos.length, 0);
  await t.avancar(1); assert.equal(t.sockets.length, 2);
  t.qr(); await t.flush(); await t.robo.verificarPareamento();
  assert.deepEqual(t.sockets[1].pedidos, ['5562999999999']);
});

test('pedido durante a espera de reconexão antecipa a abertura, uma vez só', async () => {
  const t = montar(); await t.robo.abrir();
  t.cai(503); await t.flush();
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  await t.avancar(1000); assert.equal(t.sockets.length, 2);
  t.cai(503); await t.flush();
  await t.robo.verificarPareamento();
  await t.avancar(1000); assert.equal(t.sockets.length, 2, 'não vira laço');
});

test('515 reabre rápido só uma vez', async () => {
  const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
  await t.robo.abrir();
  t.cai(515); await t.avancar(1000); assert.equal(t.sockets.length, 2);
  const a = t.esperas.length; t.cai(515); await t.flush();
  assert.ok(t.esperas.slice(a).at(-1) >= 5000);
});

test('conexão que abre e cai logo aumenta a espera; estável por 5 min zera', async () => {
  const t = montar(); t.estado.creds.me = { id: 'x' }; t.estado.creds.account = {};
  await t.robo.abrir();
  let ult = 0;
  for (let i = 0; i < 4; i++) { t.abre(); await t.flush(); const a = t.esperas.length; t.cai(503); await t.flush(); ult = t.esperas.slice(a).at(-1); await t.avancar(310000); }
  assert.ok(ult >= 40000, String(ult));
  t.abre(); await t.avancar(5 * 60000);
  const a = t.esperas.length; t.cai(503); await t.flush();
  assert.ok(t.esperas.slice(a).at(-1) < 6001);
});

test('versão é consultada uma vez; 405 busca de novo', async () => {
  const t = montar(); let n = 0;
  const s0 = t; await s0.robo.abrir(); assert.ok(s0.logs.filter((l) => /Versão/.test(l)).length === 1);
  t.cai(503); await t.avancar(6001);
  assert.equal(t.logs.filter((l) => /Versão/.test(l)).length, 1);
  t.cai(405); await t.avancar(20000);
  assert.equal(t.logs.filter((l) => /Versão/.test(l)).length, 2); n++;
});

test('erro do código volta depois do próximo QR e some com pedido novo', async () => {
  const t = montar(); await t.robo.abrir(); t.qr(); await t.flush();
  t.st.parear = { numero: '123', pedido_em: new Date(t.relogio.agora()).toISOString() };
  await t.robo.verificarPareamento();
  const erros = () => acoes(t, 'parear_codigo').filter((c) => /inválido/.test(c.erro || '')).length;
  assert.equal(erros(), 1);
  t.qr(); await t.flush(); assert.equal(erros(), 2);
  t.st.parear = { numero: '62999999999', pedido_em: new Date(t.relogio.agora() + 1).toISOString() };
  await t.robo.verificarPareamento();
  assert.equal(t.sockets[0].pedidos.length, 1);
  assert.equal(erros(), 2);
});

// ---------- mensagens recebidas ----------
const FONE = '5562911112222@s.whatsapp.net';
const agoraSeg = () => 1_800_000_000;
const foto = (id = 'ABC1', jid = FONE, extra = {}) => ({ key: { id, remoteJid: jid, fromMe: false, ...extra.key }, messageTimestamp: extra.ts || agoraSeg(), pushName: 'Fulano', message: extra.message || { imageMessage: { mimetype: 'image/jpeg', fileLength: 100 } } });
const texto = (t, id = 'T1', jid = FONE) => ({ key: { id, remoteJid: jid, fromMe: false }, messageTimestamp: agoraSeg(), message: { conversation: t } });
const receber = async (t, ...ms) => { const p = t.robo.aoReceber({ type: 'notify', messages: ms }); await t.avancar(20000); await p; };
const rotasMotorista = {
  comprovante_url: (r) => r(200, { url: 'https://guardar/x', path: 'd/receipts/wa-ABC1.jpg' }),
  comprovante_salvar: (r) => r(200, { resposta: 'Recebemos' }),
};
async function ligado(rotas) { const t = montar({ rotas }); await t.robo.abrir(); t.abre(); await t.flush(); return t; }

test('foto de motorista: baixa, guarda, registra e confirma', async () => {
  const t = await ligado(rotasMotorista);
  await receber(t, foto());
  assert.equal(t.estado.baixou, 1); assert.equal(t.puts.length, 1);
  assert.deepEqual(acoes(t, 'comprovante_url')[0].telefone, '5562911112222');
  assert.equal(acoes(t, 'comprovante_salvar')[0].path, 'd/receipts/wa-ABC1.jpg');
  assert.deepEqual(t.sockets[0].enviadas, [[FONE, 'Recebemos']]);
});
test('quem não é motorista: nada é baixado e ninguém responde', async () => {
  const t = await ligado({ comprovante_url: (r) => r(200, { url: null, resposta: null }) });
  await receber(t, foto());
  assert.equal(t.estado.baixou, undefined); assert.equal(t.sockets[0].enviadas.length, 0);
  assert.equal(acoes(t, 'comprovante_salvar').length, 0);
});
test('mesma mensagem entregue duas vezes conta uma vez', async () => {
  const t = await ligado(rotasMotorista);
  await receber(t, foto(), foto());
  assert.equal(acoes(t, 'comprovante_url').length, 1);
});
test('ignora grupo, status, mensagem própria e mensagem antiga', async () => {
  const t = await ligado(rotasMotorista);
  await receber(t, foto('A', '123@g.us'), foto('B', 'status@broadcast'), foto('C', FONE, { key: { fromMe: true } }), foto('D', FONE, { ts: agoraSeg() - 4 * 86400 }));
  assert.equal(acoes(t, 'comprovante_url').length, 0);
});
test('PDF dentro de documento com legenda e mensagem temporária é aberto', async () => {
  const t = await ligado(rotasMotorista);
  await receber(t, foto('P', FONE, { message: { ephemeralMessage: { message: { documentWithCaptionMessage: { message: { documentMessage: { mimetype: 'application/pdf', fileName: 'c.pdf' } } } } } } }));
  assert.equal(acoes(t, 'comprovante_url')[0].mimetype, 'application/pdf');
  assert.equal(acoes(t, 'comprovante_salvar')[0].file_name, 'c.pdf');
});
test('arquivo grande é recusado sem baixar', async () => {
  const t = await ligado(rotasMotorista);
  await receber(t, foto('G', FONE, { message: { imageMessage: { mimetype: 'image/jpeg', fileLength: 11 * 1024 * 1024 } } }));
  assert.equal(t.estado.baixou, undefined); assert.match(t.sockets[0].enviadas[0][1], /muito grande/);
});
test('falha ao guardar: avisa o motorista e não registra', async () => {
  const t = await ligado({ ...rotasMotorista, put: 500 });
  await receber(t, foto());
  assert.equal(acoes(t, 'comprovante_salvar').length, 0);
  assert.match(t.sockets[0].enviadas[0][1], /Não consegui/);
  assert.ok(!t.logs.join(' ').includes('5562911112222'));
});
test('número escondido: usa o alternativo; sem nenhum, avisa o dono uma vez e nada entra', async () => {
  const t = await ligado(rotasMotorista);
  await receber(t, foto('L1', '999@lid', { key: { remoteJidAlt: FONE } }));
  assert.equal(acoes(t, 'comprovante_url')[0].telefone, '5562911112222');
  await receber(t, foto('L2', '888@lid'), foto('L3', '888@lid'));
  assert.equal(acoes(t, 'comprovante_sem_numero').length, 1);
  assert.equal(acoes(t, 'comprovante_url').length, 1);
});
test('texto vai para a função e a resposta volta na mesma conversa', async () => {
  const t = await ligado({ mensagem: (r) => r(200, { resposta: 'ok feito' }) });
  await receber(t, texto('CONFIRMAR 1234'));
  assert.equal(acoes(t, 'mensagem')[0].texto, 'CONFIRMAR 1234');
  assert.deepEqual(t.sockets[0].enviadas, [[FONE, 'ok feito']]);
});
test('aviso com imagem sai como imagem', async () => {
  const t = await ligado();
  let conteudo; t.sockets[0].sendMessage = async (j, c) => { conteudo = c; };
  t.st.pendentes = { ativo: true, mensagens: [{ id: 'm', nome: 'dono', telefones: ['62992661879'], texto: 'oi', imagem_url: 'https://x/a.jpg' }] };
  const p = t.robo.ciclo(); await t.avancar(80000); await p;
  assert.deepEqual(conteudo, { image: { url: 'https://x/a.jpg' }, caption: 'oi' });
});
test('telefone: 9º dígito e 55 não atrapalham', () => {
  const k = chaveFone('(62) 99266-1879');
  assert.equal(k, chaveFone('5562992661879')); assert.equal(k, chaveFone('556292661879'));
  assert.notEqual(k, chaveFone('63992661879')); assert.equal(chaveFone('123'), null); assert.equal(chaveFone(null), null);
});
test('comando do dono começa com a palavra', () => {
  assert.deepEqual(lerComando(' *confirmar* '), { confirmar: true, resto: '' });
  assert.deepEqual(lerComando('RECUSAR valor errado'), { confirmar: false, resto: 'valor errado' });
  assert.equal(lerComando('ok'), null); assert.equal(lerComando('vou confirmar depois'), null); assert.equal(lerComando('confirmarei'), null);
});
const A = { id: 'a', nome: 'Soyer Marshall Alves' }, B = { id: 'b', nome: 'Argélia Carla' }, C = { id: 'c', nome: 'Soyer Pereira' };
test('um comprovante aberto: CONFIRMAR sozinho decide', () => {
  assert.equal(escolher([A], { confirmar: true, resto: '' }).id, 'a');
  assert.equal(escolher([A], { confirmar: true, resto: 'soyer' }).id, 'a');
});
test('um aberto, mas outro nome: não confirma o motorista errado', () => {
  assert.match(escolher([A], { confirmar: true, resto: 'Argelia' }).resposta, /é de Soyer/);
});
test('recusar com motivo, com e sem nome', () => {
  assert.deepEqual(escolher([A], { confirmar: false, resto: 'valor errado' }), { id: 'a', nome: A.nome, motivo: 'valor errado' });
  assert.deepEqual(escolher([A, B], { confirmar: false, resto: 'Soyer valor errado' }), { id: 'a', nome: A.nome, motivo: 'valor errado' });
});
test('vários abertos: exige o nome e aceita sem acento', () => {
  assert.match(escolher([A, B], { confirmar: true, resto: '' }).resposta, /CONFIRMAR Soyer[\s\S]*CONFIRMAR Argélia/);
  assert.equal(escolher([A, B], { confirmar: true, resto: 'argelia' }).id, 'b');
});
test('nome repetido ou dois do mesmo motorista: não adivinha', () => {
  assert.match(escolher([A, C], { confirmar: true, resto: 'Soyer' }).resposta, /nome completo/);
  assert.equal(escolher([A, C], { confirmar: true, resto: 'Soyer Pereira' }).id, 'c');
  assert.match(escolher([A, { ...A, id: 'a2' }], { confirmar: true, resto: 'Soyer' }).resposta, /2 comprovantes/);
});
test('nenhum aberto: avisa', () => { assert.match(escolher([], { confirmar: true, resto: '' }).resposta, /Não há/); });
test('só foto e PDF viram comprovante', () => {
  assert.equal(extensao('image/jpeg'), 'jpg'); assert.equal(extensao('application/pdf'), 'pdf'); assert.equal(extensao('image/png; x'), 'png');
  assert.equal(extensao('video/mp4'), null); assert.equal(extensao('application/x-msdownload'), null);
});
test('reinício remoto: só quando o pedido muda depois de ligar', async () => {
  const t = montar(); let reinicios = 0;
  const r = criarRobo({ logger: {}, qrcode: {}, chave: 'k', fetchFn: async () => ({ status: 200, ok: true, json: async () => r.__resp }), pastaBase: t.robo.PASTA + '-r', relogio: t.relogio, aoReiniciar: () => { reinicios++; } });
  fs.mkdirSync(r.PASTA, { recursive: true });
  r.__resp = { ativo: false, mensagens: [], reiniciar_em: 'A' }; await r.sinalDeVida(); assert.equal(reinicios, 0);
  await r.sinalDeVida(); assert.equal(reinicios, 0);
  r.__resp = { ativo: false, mensagens: [], reiniciar_em: 'B' }; await r.sinalDeVida(); assert.equal(reinicios, 1);
  await r.sinalDeVida(); assert.equal(reinicios, 1);
});
test('reinício remoto: função antiga sem o campo não reinicia', async () => {
  const t = montar(); let reinicios = 0;
  const r = criarRobo({ logger: {}, qrcode: {}, chave: 'k', fetchFn: async () => ({ status: 200, ok: true, json: async () => ({ ativo: false, mensagens: [] }) }), pastaBase: t.robo.PASTA + '-s', relogio: t.relogio, aoReiniciar: () => { reinicios++; } });
  await r.sinalDeVida(); await r.sinalDeVida(); assert.equal(reinicios, 0);
});
test('2º motorista recebe o mesmo texto; falha nele não repete a principal', async () => {
  const t = await ligado();
  t.st.pendentes = { ativo: true, mensagens: [{ id: 'm', nome: 'Ygor', telefones: ['62911112222'], texto: 'oi', copias: ['62933334444'] }] };
  let p = t.robo.ciclo(); await t.avancar(200000); await p;
  assert.deepEqual(t.sockets[0].enviadas.map((e) => e[0]), ['5562911112222@s.whatsapp.net', '5562933334444@s.whatsapp.net']);
  assert.equal(acoes(t, 'enviada').length, 1);
  const s = t.sockets[0]; s.enviadas.length = 0; s.numeros['5562955556666'] = [];
  t.st.pendentes = { ativo: true, mensagens: [{ id: 'n', nome: 'Ygor', telefones: ['62911112222'], texto: 'oi', copias: ['62955556666'] }] };
  p = t.robo.ciclo(); await t.avancar(200000); await p;
  assert.equal(s.enviadas.length, 1); assert.equal(acoes(t, 'falhou').length, 0);
});
test('todos os números da ficha recebem, sem repetir, com 1 min de intervalo', async () => {
  const t = await ligado();
  t.st.pendentes = { ativo: true, mensagens: [{ id: 'a', nome: 'A', telefones: ['62911112222', '62922223333'], texto: 'oi', copias: ['62922223333', '62933334444'] }, { id: 'b', nome: 'B', telefones: ['62944445555'], texto: 'oi', copias: [] }] };
  const p = t.robo.ciclo(); await t.avancar(59000);
  assert.equal(t.sockets[0].enviadas.length, 1);
  await t.avancar(400000); await p;
  assert.deepEqual(t.sockets[0].enviadas.map((e) => e[0].slice(2, 13)), ['62911112222', '62922223333', '62933334444', '62944445555']);
});
test('IA: modelo ocupado passa para o próximo, e chave errada para', async () => {
  const antigo = globalThis.fetch; const pedidos = [];
  const ok = (st, b) => ({ status: st, ok: st < 400, json: async () => b });
  globalThis.fetch = async (u) => {
    if (u.includes('?pageSize')) return ok(200, { models: [{ name: 'models/gemini-nova-flash', supportedGenerationMethods: ['generateContent'] }, { name: 'models/gemini-x-image', supportedGenerationMethods: ['generateContent'] }] });
    const m = u.match(/models\/(.*):/)[1]; pedidos.push(m);
    if (m === 'gemini-nova-flash') return ok(200, { r: 'bom' });
    return ok(503, {});
  };
  try {
    const a = await tentarGemini('k', 'config', '{}', (j) => j.r || null);
    assert.equal(a.modelo, 'gemini-nova-flash'); assert.equal(pedidos[0], 'config'); assert.ok(!pedidos.includes('gemini-x-image'));
    pedidos.length = 0; globalThis.fetch = async (u) => { if (u.includes('?pageSize')) return ok(500, {}); pedidos.push(u); return ok(401, {}); };
    assert.equal(await tentarGemini('k', 'config', '{}', () => 1), null); assert.equal(pedidos.length, 1);
  } finally { globalThis.fetch = antigo; }
});

test('atendimento: saudação, número e para quem vai a resposta da Dara', () => {
  assert.match(saudacao('João Silva', new Date('2026-11-03T12:00:00Z')), /^Bom dia, João! .*Motora Locadora.*Thiago ou a Dara/);
  assert.match(saudacao('', new Date('2026-11-03T18:00:00Z')), /^Boa tarde! /);
  assert.match(saudacao('Ana', new Date('2026-11-03T23:00:00Z')), /^Boa noite, Ana!/);
  assert.equal(foneBonito('5562999998888'), '(62) 99999-8888');
  assert.match(textoDara('5562999998888'), /ocupado em corrida.*\(62\) 99999-8888/);
  const a = { id: '1', chave: chaveFone('5562999998888'), nome: 'A', telefone: '5562999998888' };
  const b = { id: '2', chave: chaveFone('5562911112222'), nome: 'B', telefone: '5562911112222' };
  assert.equal(escolherConversa([a], '').conversa.id, '1');
  assert.ok(escolherConversa([a, b], '').resposta);
  assert.equal(escolherConversa([a, b], '*B (62) 91111-2222:* oi').conversa.id, '2');
  assert.ok(escolherConversa([a], '*C (62) 93333-4444:* oi').resposta);
});

test('atendimento: reconhece as mensagens do próprio robô', () => {
  assert.equal(ehDoRobo('3EB04D4F5241AB'), true);
  assert.equal(ehDoRobo('3EB0FFFF'), false);
});

test('atendimento: saúda, chama a Dara e separa pessoa de robô', async () => {
  const t = await ligado({
    atendimento: (r, b) => r(200, { tratado: true, lead_id: 'L1', guardar: true, resposta: 'Bom dia, Fulano!' }),
    atendimento_fila: (r) => r(200, { chamadas: [{ id: 'L1', telefone: '5562900000000', textos: ['Dara, aqui', 'perguntou'] }] }),
    atendimento_ok: (r) => r(200, { ok: true }),
    locadora_respondeu: (r) => r(200, { tratado: true, envios: [] }),
  });
  await receber(t, texto('quero alugar'));
  assert.deepEqual(t.sockets[0].enviadas.at(-1), [FONE, 'Bom dia, Fulano!']);
  assert.equal(acoes(t, 'comprovante_url').length, 0);
  const p = t.robo.cicloAtendimento(); await t.avancar(30000); await p;
  assert.deepEqual(t.sockets[0].enviadas.slice(-2).map((e) => e[1]), ['Dara, aqui', 'perguntou']);
  assert.equal(acoes(t, 'atendimento_ok').length, 1);
  const eu = (id) => ({ key: { id, remoteJid: FONE, fromMe: true }, messageTimestamp: agoraSeg(), message: { conversation: 'oi' } });
  await receber(t, eu('3EB04D4F5241AA'));
  assert.equal(acoes(t, 'locadora_respondeu').length, 0);
  await receber(t, eu('HUMANO1'));
  assert.equal(acoes(t, 'locadora_respondeu').length, 1);
});

test('atendimento: aviso à Dara sobre motorista traz nome, mensagem e como encerrar', () => {
  const t = textoDaraMotorista('Soyer Marshall', '5562999998888', ['O carro quebrou'], 10);
  assert.match(t, /Soyer Marshall \(62\) 99999-8888/);
  assert.match(t, /O carro quebrou/);
  assert.match(t, /há 10 minutos/);
  assert.match(t, /ENCERRAR/);
});

test('atendimento: urgência da mensagem do motorista', () => {
  for (const t of ['ok', 'Obrigado!', 'valeu 👍', 'Muito obrigada', '👍', 'blz, bom dia']) assert.equal(nivelPorPalavras(t), 'agradecimento', t);
  for (const t of ['Bati o carro', 'sofri um acidente', 'me roubaram', 'o carro quebrou', 'não liga mais']) assert.equal(nivelPorPalavras(t), 'urgente', t);
  for (const t of ['ok, mas quando vence o aluguel?', 'posso trocar o dia?']) assert.equal(nivelPorPalavras(t), null, t);
  const resp = (x) => ({ candidates: [{ content: { parts: [{ text: x }] } }] });
  assert.equal(lerNivel(resp('{"nivel":"normal"}')), 'normal');
  assert.equal(lerNivel(resp('{"nivel":"qualquer"}')), null);
  assert.match(textoDaraMotorista('A', '5562999998888', ['x'], 1, 'urgente'), /^🚨 \*URGENTE\*[\s\S]*há 1 minuto\./);
});

test('atendimento: conta empresarial e número escondido', async () => {
  assert.equal(textoDe({ templateMessage: { hydratedTemplate: { hydratedContentText: 'Olá' } } }), 'Olá');
  assert.equal(textoDe({ interactiveMessage: { body: { text: 'Oi' } } }), 'Oi');
  assert.equal(contatoOculto('123456789012@lid'), 'oculto 789012');
  assert.equal(chaveContato('oculto 789012'), 'oculto789012');
  assert.equal(chaveContato('(62) 99999-8888'), chaveFone('5562999998888'));
  assert.equal(chaveContato('14155550123456'), '14155550123456');
  assert.equal(foneBonito('oculto 789012'), '(contato oculto 789012)');
  const a = { id: '1', chave: 'oculto789012', nome: 'A', telefone: 'oculto 789012' }, b = { id: '2', chave: 'x', nome: 'B', telefone: '5562911112222' };
  assert.equal(escolherConversa([a, b], '*A (contato oculto 789012):* oi').conversa.id, '1');
  const t = await ligado({ atendimento: (r, c) => r(200, { tratado: true, resposta: 'oi ' + c.telefone }) });
  const lid = '123456789012@lid';
  t.sockets[0].signalRepository = { lidMapping: { getPNForLID: async () => null } };
  await receber(t, { key: { id: 'E1', remoteJid: lid, fromMe: false }, messageTimestamp: agoraSeg(), pushName: 'Loja', message: { templateMessage: { hydratedTemplate: { hydratedContentText: 'Quero alugar' } } } });
  assert.deepEqual(t.sockets[0].enviadas.at(-1), [lid, 'oi oculto 789012']);
});
