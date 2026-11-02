// Núcleo do robô: conexão com o WhatsApp, fila de envio, guarda da conexão no Supabase e página do QR.
// As dependências entram por parâmetro para poder testar sem internet.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const URL_ROBO = 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-robo';
const ESPERA_ENTRE_MENSAGENS = [8000, 20000]; // pausa aleatória entre mensagens (evita bloqueio)
const LIMITE_POR_HORA = 30;
const FORMATO = 'motora-baileys-1';
const MIN = 60000;

export const relogioReal = {
  agora: () => Date.now(),
  setTimeout: (f, ms) => setTimeout(f, ms),
  clearTimeout: (t) => clearTimeout(t),
  dormir: (ms) => new Promise((r) => setTimeout(r, ms)),
};

// nunca registrar telefone, código ou endereço assinado
export const mascarar = (t) => String(t).replace(/https?:\/\/\S+/g, '[endereço]').replace(/\d{8,}/g, '***');

// (62) 99999-9999 -> 5562999999999
export function numeroBR(tel) {
  let n = String(tel || '').replace(/\D/g, '').replace(/^0+/, '');
  if (n.length === 10 || n.length === 11) n = '55' + n;
  return n.length >= 12 ? n : null;
}

export function empacotar(pasta) {
  const arquivos = {};
  for (const nome of fs.readdirSync(pasta)) {
    const p = path.join(pasta, nome);
    if (fs.statSync(p).isFile()) arquivos[nome] = fs.readFileSync(p).toString('base64');
  }
  return zlib.gzipSync(JSON.stringify({ formato: FORMATO, arquivos }));
}

// devolve os arquivos, ou null se o pacote não for uma conexão válida (ex.: zip antigo do robô com navegador)
export function abrirPacote(buf) {
  try {
    const o = JSON.parse(zlib.gunzipSync(buf).toString('utf8'));
    if (o.formato !== FORMATO || !o.arquivos || !o.arquivos['creds.json']) return null;
    if (Object.keys(o.arquivos).some((n) => n.includes('/') || n.includes('\\') || n.includes('..'))) return null;
    return o.arquivos;
  } catch { return null; }
}

export function criarRobo({ baileys, logger, qrcode, chave, porta = 0, fetchFn = (...a) => fetch(...a), pastaBase, relogio = relogioReal, aleatorio = Math.random, log: logExterno }) {
  const BASE = pastaBase || path.join(os.tmpdir(), 'motora-robo'); // no Hostless só a pasta temporária aceita gravar
  const PASTA = path.join(BASE, 'sessao');
  const hora = () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const log = (...a) => { const t = mascarar(a.join(' ')); if (logExterno) logExterno(t); else console.log(`[${hora()}]`, t); };
  const SENHA_PAGINA = crypto.randomBytes(12).toString('hex'); // página do QR ao vivo: muda a cada vez que o robô liga

  let situacao = 'iniciando', qrAtual = null, sock = null, creds = null, conectado = false, encerrado = false;
  let pareando = false, pedidoAtendido = null, verificando = false, viuQr = false;
  let tentativas = 0, sessaoRuim = 0, timerAbrir = null, timerBackup = null, ultimoBackup = 0, servidor = null;
  const enviadasNaHora = [], falhas = {};

  const pareado = () => !!(creds && creds.account && creds.me && creds.me.id);
  const limparLocal = () => { fs.rmSync(PASTA, { recursive: true, force: true }); fs.mkdirSync(PASTA, { recursive: true }); };

  async function motoraBruto(acao, extra = {}) {
    const r = await fetchFn(URL_ROBO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-robo-token': chave },
      body: JSON.stringify({ acao, ...extra }),
    });
    if (r.status === 403) throw new Error('Chave do robô errada.');
    let corpo = {};
    try { corpo = await r.json(); } catch { /* resposta sem conteúdo */ }
    return { status: r.status, corpo };
  }
  const motora = async (acao, extra) => (await motoraBruto(acao, extra)).corpo;

  // ---------- conexão guardada no Supabase ----------
  async function restaurar() {
    limparLocal();
    for (let i = 0; !encerrado; i++) {
      try {
        const { status, corpo } = await motoraBruto('sessao_baixar');
        if (status >= 500) throw new Error('MOTORA respondeu ' + status);
        if (!corpo.url) return false;
        const r = await fetchFn(corpo.url);
        if (r.status === 404 || r.status === 400) return false;
        if (!r.ok) throw new Error('download respondeu ' + r.status);
        const arquivos = abrirPacote(Buffer.from(await r.arrayBuffer()));
        if (!arquivos) {
          log('Sessão antiga inválida: será preciso conectar de novo.');
          await motora('sessao_apagar').catch(() => {});
          return false;
        }
        for (const [nome, b64] of Object.entries(arquivos)) fs.writeFileSync(path.join(PASTA, nome), Buffer.from(b64, 'base64'));
        log('Conexão do WhatsApp recuperada.');
        return true;
      } catch (e) {
        // falha de rede NÃO apaga: um tropeço não pode derrubar uma conexão boa
        log('Não consegui buscar a conexão guardada:', e.message);
        await relogio.dormir(Math.min(5000 * 2 ** i, 5 * MIN));
      }
    }
    return false;
  }

  async function guardar() {
    if (!pareado()) return false;
    for (let i = 0; i < 3; i++) {
      try {
        const { corpo } = await motoraBruto('sessao_enviar');
        if (!corpo.url) throw new Error('sem endereço para guardar');
        const r = await fetchFn(corpo.url, { method: 'PUT', headers: { 'Content-Type': 'application/zip' }, body: empacotar(PASTA) });
        if (!r.ok) throw new Error('respondeu ' + r.status);
        ultimoBackup = relogio.agora();
        log('Conexão do WhatsApp guardada.');
        return true;
      } catch (e) {
        log('Não consegui guardar a conexão:', e.message);
        if (i < 2) await relogio.dormir(5000 * (i + 1));
      }
    }
    return false;
  }

  function agendarBackup() {
    if (timerBackup !== null || !pareado() || encerrado) return;
    const falta = Math.max(MIN, ultimoBackup + 5 * MIN - relogio.agora());
    timerBackup = relogio.setTimeout(() => { timerBackup = null; guardar(); }, falta);
  }

  // ---------- conexão com o WhatsApp ----------
  function agendarAbrir(ms) {
    if (encerrado) return;
    if (timerAbrir !== null) relogio.clearTimeout(timerAbrir);
    timerAbrir = relogio.setTimeout(() => { timerAbrir = null; abrir().catch(falhaAoAbrir); }, ms);
  }
  function backoff() {
    const base = Math.min(5000 * 2 ** tentativas, 5 * MIN);
    tentativas++;
    return Math.min(base + Math.floor(aleatorio() * 1000), 5 * MIN);
  }
  function falhaAoAbrir(e) { log('Erro ao abrir a conexão:', e.message); agendarAbrir(backoff()); }

  function soltarSocket() {
    if (!sock) return;
    const antigo = sock; sock = null;
    for (const nome of ['connection.update', 'creds.update']) { try { antigo.ev.removeAllListeners(nome); } catch { /* já fechado */ } }
    try { antigo.end && antigo.end(undefined); } catch { /* já fechado */ }
  }

  async function abrir() {
    if (encerrado) return;
    soltarSocket();
    viuQr = false;
    const { state, saveCreds } = await baileys.useMultiFileAuthState(PASTA);
    creds = state.creds;
    const v = await Promise.race([
      Promise.resolve(baileys.fetchLatestBaileysVersion()).catch(() => null),
      relogio.dormir(10000).then(() => null),
    ]);
    if (v) log('Versão do WhatsApp:', (v.version || []).join('.'), v.isLatest ? '(última)' : '(embutida)');
    if (encerrado) return;
    const s = baileys.makeWASocket({
      ...(v && v.version ? { version: v.version } : {}),
      auth: { creds: state.creds, keys: baileys.makeCacheableSignalKeyStore(state.keys, logger) },
      logger,
      markOnlineOnConnect: false,
      syncFullHistory: false,
      shouldSyncHistoryMessage: () => false,
    });
    sock = s;
    s.ev.on('creds.update', async () => {
      try { await saveCreds(); } catch (e) { log('Erro ao salvar a conexão:', e.message); }
      agendarBackup();
    });
    s.ev.on('connection.update', (u) => { if (s === sock) aoMudar(u); });
  }

  function aoMudar(u) {
    if (u.qr) {
      viuQr = true;
      // durante o pareamento o QR fica calado: a ação "qr" apagaria o código da tela do dono
      if (pareando) return;
      qrAtual = u.qr; situacao = 'esperando ler o QR code';
      log('QR code novo: abra a Área IA do MOTORA e leia com o WhatsApp.');
      motora('qr', { qr: u.qr, pagina: SENHA_PAGINA }).catch(() => {});
    }
    if (u.connection === 'open') {
      conectado = true; pareando = false; qrAtual = null; tentativas = 0; sessaoRuim = 0;
      situacao = 'funcionando';
      log('WhatsApp conectado. Verificando mensagens a cada 30 segundos.');
      motora('qr', { qr: null }).catch(() => {});
      if (relogio.agora() - ultimoBackup >= 5 * MIN) guardar(); else agendarBackup();
    }
    if (u.connection === 'close') {
      const erro = u.lastDisconnect && u.lastDisconnect.error;
      const codigo = erro && erro.output && erro.output.statusCode;
      aoCair(codigo, erro && erro.message);
    }
  }

  async function esquecerConexao(apagarGuardada) {
    creds = null;
    limparLocal();
    if (apagarGuardada) await motora('sessao_apagar').catch(() => {});
  }

  function aoCair(codigo, motivo) {
    conectado = false;
    if (situacao === 'funcionando') situacao = 'reconectando';
    log(`WhatsApp desconectou: código ${codigo === undefined ? 'nenhum' : codigo} (${motivo || 'sem motivo'}), tentativa ${tentativas + 1}.`);
    const estavaPareado = pareado();
    if (codigo === 515) { pareando = false; soltarSocket(); agendarAbrir(1000); return; } // normal logo depois de parear
    if (codigo !== 500 && codigo !== 411) sessaoRuim = 0;
    soltarSocket();
    if (pareando && !estavaPareado) { // o pedido de código deixa dados incompletos: recomeça limpo
      pareando = false;
      esquecerConexao(false);
      motora('parear_codigo', { erro: 'Código expirou, peça de novo.' }).catch(() => {});
      agendarAbrir(backoff());
      return;
    }
    if (codigo === 401 || ((codigo === 500 || codigo === 411) && ++sessaoRuim >= 3)) {
      sessaoRuim = 0;
      esquecerConexao(estavaPareado).finally(() => agendarAbrir(30000));
      return;
    }
    if (codigo === 440) { agendarAbrir(5 * MIN); return; } // outra cópia do robô ligada (ex.: durante uma publicação)
    if (codigo === 403) {
      log('ATENÇÃO: o WhatsApp recusou esta conta (código 403). Nova tentativa em 1 hora.');
      motora('parear_codigo', { erro: 'O WhatsApp recusou esta conta. Nova tentativa em 1 hora.' }).catch(() => {});
      agendarAbrir(60 * MIN);
      return;
    }
    agendarAbrir(backoff());
  }

  // ---------- conectar pelo número ----------
  async function verificarPareamento() {
    if (encerrado || conectado || verificando || !viuQr || !sock) return; // só depois do 1º QR o canal está pronto
    verificando = true;
    try {
      const { numero, pedido_em: pedido } = await motora('parear_ver');
      const recente = pedido && relogio.agora() - new Date(pedido).getTime() < 10 * MIN;
      if (!numero || !recente || pedido === pedidoAtendido) return;
      if (pareando) { // pediu de novo com outro número: recomeça limpo e atende no próximo QR
        pareando = false;
        await esquecerConexao(false);
        agendarAbrir(1000);
        viuQr = false;
        return;
      }
      pedidoAtendido = pedido;
      const num = numeroBR(numero);
      if (!num) { await motora('parear_codigo', { erro: 'Número inválido. Confira o DDD.' }); return; }
      pareando = true;
      const codigo = await sock.requestPairingCode(num);
      await motora('parear_codigo', { codigo });
      log('Código para conectar pelo número gerado.');
    } catch (e) {
      pareando = false;
      log('Não consegui gerar o código:', e.message);
      await motora('parear_codigo', { erro: 'Não consegui gerar o código. Tente de novo ou use o QR.' }).catch(() => {});
    } finally { verificando = false; }
  }

  // ---------- fila de envio ----------
  async function enviar(m) {
    for (const tel of m.telefones) {
      const num = numeroBR(tel);
      if (!num) continue;
      const r = await sock.onWhatsApp(num); // resolve o 9º dígito e confere se o número tem WhatsApp
      if (r === undefined) throw new Error('não consegui consultar o número agora');
      const achado = r.find((x) => x.exists);
      if (!achado) continue;
      await sock.sendMessage(achado.jid, { text: m.texto });
      return true;
    }
    return false;
  }

  async function ciclo() {
    if (!conectado || !sock) return;
    let resp;
    try { resp = await motora('pendentes'); } catch (e) { log('Sem conexão com o MOTORA:', e.message); return; }
    if (!resp.ativo || !resp.mensagens || !resp.mensagens.length) return;
    for (const m of resp.mensagens) {
      if (!conectado || !sock) return; // caiu no meio: a mensagem fica para a próxima rodada, sem contar falha
      if ((falhas[m.id] || 0) >= 3) continue;
      while (enviadasNaHora.length && relogio.agora() - enviadasNaHora[0] > 60 * MIN) enviadasNaHora.shift();
      if (enviadasNaHora.length >= LIMITE_POR_HORA) { log('Limite por hora atingido; continuo depois.'); return; }
      try {
        if (await enviar(m)) {
          await motora('enviada', { id: m.id });
          enviadasNaHora.push(relogio.agora());
          log(`Enviada para ${m.nome}.`);
        } else {
          falhas[m.id] = 99;
          await motora('falhou', { id: m.id, erro: 'Número sem WhatsApp ou não cadastrado.' });
          log(`Sem WhatsApp válido para ${m.nome}.`);
        }
      } catch (e) {
        falhas[m.id] = (falhas[m.id] || 0) + 1;
        log(`Erro ao enviar para ${m.nome} (tentativa ${falhas[m.id]}):`, e.message);
        if (falhas[m.id] >= 3) await motora('falhou', { id: m.id, erro: mascarar(e.message) }).catch(() => {});
      }
      const [a, b] = ESPERA_ENTRE_MENSAGENS;
      await relogio.dormir(a + Math.floor(aleatorio() * (b - a)));
    }
  }

  // ---------- página do QR ----------
  async function pagina(req, res) {
    const u = new URL(req.url, 'http://x');
    if (u.pathname === '/qr' && u.searchParams.get('k') === SENHA_PAGINA) {
      let corpo;
      if (conectado) corpo = '<h2 style="color:#15803d">✅ WhatsApp conectado!</h2><p>Pode fechar esta página.</p>';
      else if (qrAtual) corpo = `<p>No celular: WhatsApp → <b>Aparelhos conectados</b> → <b>Conectar aparelho</b> e aponte para o código.</p><img src="${await qrcode.toDataURL(qrAtual, { width: 320, margin: 2 })}" style="width:320px;max-width:90vw">`;
      else corpo = '<p>Preparando o código... aguarde.</p>';
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="4"><title>Conectar robô MOTORA</title><body style="font-family:sans-serif;text-align:center;padding:20px">${corpo}<p style="color:#888;font-size:12px">A página atualiza sozinha.</p></body>`);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Robô do MOTORA: ' + situacao);
  }

  // ---------- laços ----------
  async function repetir(ms, f) {
    while (!encerrado) {
      try { await f(); } catch (e) { log('Erro:', e.message); }
      await relogio.dormir(ms);
    }
  }

  async function iniciar() {
    servidor = http.createServer((q, r) => { pagina(q, r).catch(() => { r.writeHead(500); r.end(); }); }).listen(porta);
    repetir(5000, verificarPareamento);
    // sinal de vida mesmo antes de conectar (o app mostra se o robô está ligado)
    repetir(MIN, async () => { if (!conectado) await motora('pendentes'); });
    await restaurar();
    await abrir().catch(falhaAoAbrir);
    repetir(30000, ciclo);
  }

  async function encerrar() {
    if (pareado()) await guardar();
    encerrado = true;
    if (timerAbrir !== null) relogio.clearTimeout(timerAbrir);
    if (timerBackup !== null) relogio.clearTimeout(timerBackup);
    soltarSocket();
    if (servidor) servidor.close();
  }

  return {
    iniciar, encerrar, ciclo, verificarPareamento, guardar, restaurar, abrir,
    get situacao() { return situacao; }, get conectado() { return conectado; }, get pareando() { return pareando; },
    get socket() { return sock; }, get senhaPagina() { return SENHA_PAGINA; }, get servidor() { return servidor; }, PASTA,
  };
}
