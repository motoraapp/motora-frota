// Núcleo do robô: conexão com o WhatsApp, fila de envio, guarda da conexão no Supabase e página do QR.
// As dependências entram por parâmetro para poder testar sem internet.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const URL_ROBO = 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-robo';
// proteção contra bloqueio (04/11/2026, depois da restrição da Meta): de 1 a 3 min, tempo variado, entre um envio e o próximo
const ESPERA_ENTRE_MENSAGENS = [60000, 180000];
const LIMITE_POR_HORA = 20; // o servidor ainda limita mais nos 2 primeiros dias depois de religar (aquecimento)
const DIGITANDO = [3000, 7000]; // "digitando..." antes de cada mensagem, como uma pessoa
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

// a cópia só vale se creds.json estiver inteiro e já pareado
export function credsValido(texto) {
  try { const c = JSON.parse(texto); return !!(c && c.account && c.me && c.me.id); } catch { return false; }
}

// devolve os arquivos, ou null se o pacote não for uma conexão válida (ex.: zip antigo do robô com navegador)
export function abrirPacote(buf) {
  try {
    const o = JSON.parse(zlib.gunzipSync(buf).toString('utf8'));
    if (o.formato !== FORMATO || !o.arquivos || !o.arquivos['creds.json']) return null;
    if (Object.keys(o.arquivos).some((n) => n.includes('/') || n.includes('\\') || n.includes('..'))) return null;
    if (!credsValido(Buffer.from(o.arquivos['creds.json'], 'base64').toString('utf8'))) return null;
    return o.arquivos;
  } catch { return null; }
}

const MAX_ARQUIVO = 10 * 1024 * 1024;
const JANELA_RECEBER = 3 * 24 * 60 * MIN; // mensagem mais velha que isso é histórico, não comprovante novo

// tira os envelopes do WhatsApp (mensagem temporária, ver uma vez, documento com legenda)
export function abrirConteudo(c) {
  let m = c;
  for (let i = 0; m && i < 5; i++) {
    const dentro = m.ephemeralMessage || m.viewOnceMessage || m.viewOnceMessageV2 || m.viewOnceMessageV2Extension || m.documentWithCaptionMessage || m.editedMessage || m.deviceSentMessage || m.botInvokeMessage;
    if (!dentro) break;
    m = dentro.message;
  }
  return m || {};
}
// conta empresarial manda texto em formatos próprios (modelo, botões, lista)
export function textoDe(c) {
  const t = c.templateMessage, modelo = t && (t.hydratedTemplate || t.hydratedFourRowTemplate || t.fourRowTemplate);
  return c.conversation || c.extendedTextMessage?.text || modelo?.hydratedContentText || c.interactiveMessage?.body?.text
    || c.buttonsMessage?.contentText || c.buttonsMessage?.text || c.listMessage?.description || c.listMessage?.title
    || c.buttonsResponseMessage?.selectedDisplayText || c.listResponseMessage?.title || c.templateButtonReplyMessage?.selectedDisplayText
    || c.interactiveResponseMessage?.body?.text || '';
}
const TECNICOS = new Set(['messageContextInfo', 'senderKeyDistributionMessage', 'protocolMessage', 'reactionMessage', 'pollUpdateMessage', 'keepInChatMessage', 'pinInChatMessage', 'encReactionMessage', 'call']);
// número escondido pelo WhatsApp: identifica a conversa sem número, para ainda poder atender
export const contatoOculto = (jid) => `oculto ${String(jid).split('@')[0].replace(/\D/g, '').slice(-6)}`;
// mensagens do robô têm este começo no código: assim dá para saber quando foi uma pessoa que respondeu pelo número da locadora
const PREFIXO_ROBO = '3EB04D4F5241';
const novoIdRobo = () => PREFIXO_ROBO + crypto.randomBytes(10).toString('hex').toUpperCase();
export const ehDoRobo = (id) => String(id || '').startsWith(PREFIXO_ROBO);
const JANELA_ATENDIMENTO = 6 * 60 * MIN; // mensagem mais velha que isso não dispara saudação nem repasse
const HIST_SOB_PEDIDO = 6; // proto.HistorySync.HistorySyncType.ON_DEMAND: histórico pedido pelo robô (fetchMessageHistory)
const numeroDoJid = (jid) => String(jid).split('@')[0].split(':')[0];
// número de fora do Brasil vira contato sem número: +62 (Indonésia) não pode ser confundido com o DDD 62 do dono
export const soBrasil = (n) => (/^55\d{10,11}$/.test(String(n)) ? String(n) : null);
// copia e cola vai numa mensagem só dele, para o motorista copiar com um toque
const BR_CODE = /000201.+6304[0-9A-Fa-f]{4}/;
export function separarPix(texto) {
  const t = String(texto ?? ''), m = t.match(BR_CODE);
  if (!m) return { texto: t, codigo: null };
  const resto = t.split('\n').filter((l) => !l.includes(m[0])).join('\n').replace(/\n{3,}/g, '\n\n').trim();
  return { texto: resto, codigo: m[0] };
}

export function criarRobo({ baileys, logger, qrcode, chave, porta = 0, fetchFn = (...a) => fetch(...a), pastaBase, relogio = relogioReal, aleatorio = Math.random, log: logExterno, aoReiniciar = null }) {
  const BASE = pastaBase || path.join(os.tmpdir(), 'motora-robo'); // no Hostless só a pasta temporária aceita gravar
  const PASTA = path.join(BASE, 'sessao');
  const hora = () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const log = (...a) => { const t = mascarar(a.join(' ')); if (logExterno) logExterno(t); else console.log(`[${hora()}]`, t); };
  const SENHA_PAGINA = crypto.randomBytes(12).toString('hex'); // página do QR ao vivo: muda a cada vez que o robô liga

  let situacao = 'iniciando', qrAtual = null, sock = null, creds = null, conectado = false, encerrado = false;
  let pareando = false, pedidoAtendido = null, verificando = false, viuQr = false;
  let tentativas = 0, timerAbrir = null, timerBackup = null, timerEstavel = null, ultimoBackup = 0, servidor = null;
  let usou515 = false, primeiroQrEm = 0, reabertoPara = null, erroPareamento = null, versao = null;
  let desconectadoDesde = relogio.agora();
  const enviadasNaHora = [], falhas = {}, jaEnviadas = new Set(), avisadas = new Set();

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
  const motora = async (acao, extra) => {
    const { status, corpo } = await motoraBruto(acao, extra);
    if (status >= 400) throw new Error('MOTORA respondeu ' + status);
    return corpo;
  };
  // erro do "conectar pelo número": a ação "qr" apaga o erro da tela, então ele é reenviado depois de cada QR
  function avisarErroPareamento(erro) { erroPareamento = erro; return motora('parear_codigo', { erro }); }

  // ---------- conexão guardada no Supabase ----------
  const existeGuardada = async () => !!(await motora('sessao_existe')).existe;
  async function restaurar() {
    limparLocal();
    for (let i = 0; !encerrado; i++) {
      try {
        const { status, corpo } = await motoraBruto('sessao_baixar');
        if (status >= 500) throw new Error('MOTORA respondeu ' + status);
        if (!corpo.url) {
          if (await existeGuardada()) throw new Error('conexão guardada existe, mas não veio o endereço');
          return false;
        }
        const r = await fetchFn(corpo.url);
        if (r.status === 404 || r.status === 400) {
          if (await existeGuardada()) throw new Error('conexão guardada existe, mas o download falhou');
          return false;
        }
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
    let lido = null;
    try { lido = fs.readFileSync(path.join(PASTA, 'creds.json'), 'utf8'); } catch { /* validado abaixo */ }
    if (!credsValido(lido)) { // nunca trocar a cópia boa por um arquivo pela metade
      log('Conexão local incompleta agora; a cópia guardada foi mantida.');
      agendarBackup();
      return false;
    }
    for (let i = 0; i < 3; i++) {
      try {
        const { corpo } = await motoraBruto('sessao_enviar');
        if (!corpo.url) throw new Error('sem endereço para guardar');
        const pacote = empacotar(PASTA);
        if (!abrirPacote(pacote)) throw new Error('pacote incompleto');
        const r = await fetchFn(corpo.url, { method: 'PUT', headers: { 'Content-Type': 'application/zip' }, body: pacote });
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
    for (const nome of ['connection.update', 'creds.update', 'messages.upsert', 'messaging-history.set']) { try { antigo.ev.removeAllListeners(nome); } catch { /* já fechado */ } }
    try { antigo.end && antigo.end(undefined); } catch { /* já fechado */ }
  }

  async function abrir() {
    if (encerrado) return;
    soltarSocket();
    viuQr = false;
    const { state, saveCreds } = await baileys.useMultiFileAuthState(PASTA);
    creds = state.creds;
    const v = versao || await Promise.race([
      Promise.resolve(baileys.fetchLatestBaileysVersion()).catch(() => null),
      relogio.dormir(10000).then(() => null),
    ]);
    if (v && !versao) { versao = v; log('Versão do WhatsApp:', (v.version || []).join('.'), v.isLatest ? '(última)' : '(embutida)'); }
    if (encerrado) return;
    const s = baileys.makeWASocket({
      ...(v && v.version ? { version: v.version } : {}),
      auth: { creds: state.creds, keys: baileys.makeCacheableSignalKeyStore(state.keys, logger) },
      logger,
      markOnlineOnConnect: false,
      syncFullHistory: false,
      // só o histórico que o próprio robô pede (para saber se a conversa já existia); nada é baixado ao conectar
      shouldSyncHistoryMessage: (h) => !!h && h.syncType === HIST_SOB_PEDIDO,
    });
    sock = s;
    s.ev.on('creds.update', async () => {
      try { await saveCreds(); } catch (e) { log('Erro ao salvar a conexão:', e.message); }
      agendarBackup();
    });
    s.ev.on('connection.update', (u) => { if (s === sock) aoMudar(u); });
    s.ev.on('messages.upsert', (u) => { if (s === sock) aoReceber(u); });
    s.ev.on('messaging-history.set', (d) => { if (s === sock) aoHistorico(d); });
  }

  // ---------- conversa que já existia (pedido do dono, 04/11/2026) ----------
  // Número que não é motorista, mas já conversava com a locadora antes, não recebe saudação nem chama Dara/IA.
  // O robô pede ao WhatsApp as mensagens anteriores daquela conversa; se houver alguma, a conversa é antiga.
  const pedidosHist = new Map(), histChegou = new Map();
  function aoHistorico(d) {
    const id = d && d.peerDataRequestSessionId;
    if (!id) return;
    const msgs = (d && d.messages) || [];
    if (pedidosHist.has(id)) { const f = pedidosHist.get(id); pedidosHist.delete(id); f(msgs); return; }
    histChegou.set(id, msgs); // chegou antes de o robô começar a esperar
    if (histChegou.size > 50) histChegou.delete(histChegou.keys().next().value);
  }
  async function conversaAntiga(msg, seg) {
    if (!sock || typeof sock.fetchMessageHistory !== 'function' || !seg) return false;
    try {
      const id = await sock.fetchMessageHistory(5, msg.key, seg);
      if (!id) return false;
      const msgs = histChegou.has(id) ? histChegou.get(id) : await Promise.race([new Promise((r) => pedidosHist.set(id, r)), relogio.dormir(15000).then(() => null)]);
      pedidosHist.delete(id); histChegou.delete(id);
      if (!msgs) { log('Não consegui ver as mensagens antigas da conversa: segue o atendimento normal.'); return false; }
      return msgs.some((m) => m && m.key && m.key.id && m.key.id !== msg.key.id);
    } catch (e) { log('Mensagens antigas indisponíveis:', e.message); return false; }
  }

  function aoMudar(u) {
    if (u.qr) {
      if (!viuQr) primeiroQrEm = relogio.agora();
      viuQr = true;
      // durante o pareamento o QR fica calado: a ação "qr" apagaria o código da tela do dono
      if (pareando) return;
      qrAtual = u.qr; situacao = 'esperando ler o QR code';
      log('QR code novo: abra a Área IA do MOTORA e leia com o WhatsApp.');
      motora('qr', { qr: u.qr, pagina: SENHA_PAGINA })
        .then(() => (erroPareamento ? motora('parear_codigo', { erro: erroPareamento }) : null))
        .catch(() => {});
    }
    if (u.connection === 'open') {
      conectado = true; pareando = false; qrAtual = null; erroPareamento = null; desconectadoDesde = null; avisadas.clear();
      // só zera as tentativas depois de 5 min estável: conexão que abre e cai logo não pode virar laço rápido
      if (timerEstavel !== null) relogio.clearTimeout(timerEstavel);
      timerEstavel = relogio.setTimeout(() => { timerEstavel = null; tentativas = 0; usou515 = false; }, 5 * MIN);
      situacao = 'funcionando';
      log('WhatsApp conectado. Verificando mensagens a cada 30 segundos.');
      motora('qr', { qr: null }).catch(() => {});
      agendarBackup(); // espera 1 min: logo ao conectar o WhatsApp ainda está gravando muita coisa
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
    const qrAcabou = codigo === 408 && viuQr && !estavaPareado; // ninguém leu a tempo: é normal, não é falha
    if (timerEstavel !== null) { relogio.clearTimeout(timerEstavel); timerEstavel = null; }
    if (desconectadoDesde === null) desconectadoDesde = relogio.agora();
    if (codigo === 515) { // normal logo depois de parear: reabre rápido só uma vez, para não virar laço
      pareando = false; soltarSocket();
      agendarAbrir(usou515 ? backoff() : 1000);
      usou515 = true;
      return;
    }
    if (codigo === 405) versao = null; // versão recusada: buscar de novo
    soltarSocket();
    const reabrirQr = () => 5000 + Math.floor(aleatorio() * 5000);
    if (pareando && !estavaPareado) { // o pedido de código deixa dados incompletos: recomeça limpo
      pareando = false;
      esquecerConexao(false);
      avisarErroPareamento('Código expirou, peça de novo.').catch(() => {});
      agendarAbrir(qrAcabou ? reabrirQr() : backoff());
      return;
    }
    if (qrAcabou) { agendarAbrir(reabrirQr()); return; }
    // freio automático: conexão encerrada ou conta recusada pelo WhatsApp (ex.: restrição por spam) desliga o envio automático
    if ((codigo === 401 || codigo === 403) && estavaPareado) motora('freio', { codigo, motivo: String(motivo || '').slice(0, 200) }).catch(() => {});
    if (codigo === 401) { // só o 401 significa conexão encerrada: 500 e 411 também aparecem em instabilidade passageira
      esquecerConexao(estavaPareado).finally(() => agendarAbrir(30000));
      return;
    }
    if (codigo === 440) { agendarAbrir(5 * MIN); return; } // outra cópia do robô ligada (ex.: durante uma publicação)
    if (codigo === 403) {
      log('ATENÇÃO: o WhatsApp recusou esta conta (código 403). Nova tentativa em 1 hora.');
      avisarErroPareamento('O WhatsApp recusou esta conta. Nova tentativa em 1 hora.').catch(() => {});
      agendarAbrir(60 * MIN);
      return;
    }
    agendarAbrir(backoff());
  }

  // ---------- conectar pelo número ----------
  async function verificarPareamento() {
    if (encerrado || conectado || verificando) return;
    verificando = true;
    try {
      let pedir;
      try { pedir = await motora('parear_ver'); } catch (e) { log('Não consegui ver o pedido de código:', e.message); return; }
      const { numero, pedido_em: pedido } = pedir;
      const recente = pedido && relogio.agora() - new Date(pedido).getTime() < 10 * MIN;
      if (!numero || !recente || pedido === pedidoAtendido) return;
      if (pareando) { // pediu de novo com outro número: recomeça limpo e atende no próximo QR
        pareando = false;
        await esquecerConexao(false);
        agendarAbrir(1000);
        viuQr = false;
        return;
      }
      if (!sock || !viuQr) { // esperando para reconectar: o dono não pode ficar minutos em "Gerando..."
        if (!sock && timerAbrir !== null && reabertoPara !== pedido) { reabertoPara = pedido; erroPareamento = null; agendarAbrir(1000); }
        return; // só depois do 1º QR o canal está pronto
      }
      const num = numeroBR(numero);
      if (!num) { pedidoAtendido = pedido; await avisarErroPareamento('Número inválido. Confira o DDD.'); return; }
      // o código vale só até o fim desta conexão: se ela já está no meio, abre outra para ele durar o tempo todo
      if (relogio.agora() - primeiroQrEm > 20000 && reabertoPara !== pedido) {
        reabertoPara = pedido; erroPareamento = null; viuQr = false;
        agendarAbrir(0);
        return;
      }
      pedidoAtendido = pedido;
      erroPareamento = null;
      pareando = true;
      const codigo = await sock.requestPairingCode(num);
      await motora('parear_codigo', { codigo });
      log('Código para conectar pelo número gerado.');
    } catch (e) {
      pareando = false;
      log('Não consegui gerar o código:', e.message);
      await avisarErroPareamento('Não consegui gerar o código. Tente de novo ou use o QR.').catch(() => {});
    } finally { verificando = false; }
  }

  // ---------- fila de envio ----------
  // mostra "digitando..." por alguns segundos antes de enviar, como uma pessoa (proteção contra bloqueio)
  async function mandar(jid, conteudo) {
    const s = sock;
    try { if (s.presenceSubscribe) await s.presenceSubscribe(jid); if (s.sendPresenceUpdate) await s.sendPresenceUpdate('composing', jid); } catch { /* sem "digitando", envia assim mesmo */ }
    const [a, b] = DIGITANDO;
    await relogio.dormir(a + Math.floor(aleatorio() * (b - a)));
    if (!sock) throw new Error('caiu a conexão antes de enviar');
    const r = await sock.sendMessage(jid, conteudo, { messageId: novoIdRobo() });
    try { if (sock.sendPresenceUpdate) await sock.sendPresenceUpdate('paused', jid); } catch { /* ok */ }
    return r;
  }
  // o arquivo da mensagem pode ser o recibo em PDF ou a imagem do QR code criada pelo Asaas
  function conteudoDe(m) {
    const texto = separarPix(m.texto).texto;
    if (m.imagem_url) return { image: { url: m.imagem_url }, caption: texto };
    if (m.pdf_url && /\.(png|jpe?g)(\?|$)/i.test(m.pdf_url)) return { image: { url: m.pdf_url }, caption: texto };
    if (m.pdf_url) return { document: { url: m.pdf_url }, mimetype: 'application/pdf', fileName: 'Recibo MOTORA.pdf', caption: texto };
    return { text: texto };
  }
  async function mandarTudo(jid, m) {
    await mandar(jid, conteudoDe(m));
    const { codigo } = separarPix(m.texto);
    if (codigo) await mandar(jid, { text: codigo });
  }
  async function enviar(m) {
    for (const tel of m.telefones) {
      const num = numeroBR(tel);
      if (!num) continue;
      const r = await sock.onWhatsApp(num); // resolve o 9º dígito e confere se o número tem WhatsApp
      if (r === undefined) throw new Error('não consegui consultar o número agora');
      const achado = r.find((x) => x.exists);
      if (!achado) continue;
      // recibo: o PDF vai com o texto na mesma mensagem, para nunca sair duplicado
      await mandarTudo(achado.jid, m);
      m.jidsEnviados = [achado.jid];
      return true;
    }
    return false;
  }

  // os outros números da ficha (telefone 2 e 2º motorista) recebem o mesmo texto; falha neles não repete a principal
  async function enviarCopias(m) {
    const feitos = new Set(m.jidsEnviados || []);
    for (const tel of [...(m.telefones || []), ...(m.copias || [])]) {
      if (!conectado || !sock) return;
      try {
        const num = numeroBR(tel);
        const r = num ? await sock.onWhatsApp(num) : null;
        const achado = r && r.find((x) => x.exists);
        if (!achado) { log(`Outro número da ficha de ${m.nome} sem WhatsApp.`); continue; }
        if (feitos.has(achado.jid)) continue;
        feitos.add(achado.jid);
        const [a, b] = ESPERA_ENTRE_MENSAGENS;
        await relogio.dormir(a + Math.floor(aleatorio() * (b - a)));
        if (!conectado || !sock) return;
        await mandarTudo(achado.jid, m);
        enviadasNaHora.push(relogio.agora());
        log(`Cópia enviada a outro número da ficha de ${m.nome}.`);
      } catch (e) { log(`Não consegui enviar a outro número da ficha de ${m.nome}:`, e.message); }
    }
  }

  // a mensagem já saiu: uma falha ao marcar nunca pode virar reenvio
  async function marcarEnviada(id) {
    try { await motora('enviada', { id }); jaEnviadas.delete(id); return true; }
    catch (e) { log('Mensagem enviada, mas ainda não consegui marcar:', e.message); return false; }
  }

  // reinício remoto: guarda o 1º valor visto; se mudar depois, o dono pediu para reiniciar (assim não repete a cada ligada)
  let reinicioVisto, reiniciando = false;
  function verReinicio(resp) {
    if (!resp || !('reiniciar_em' in resp) || reiniciando) return false;
    if (reinicioVisto === undefined) { reinicioVisto = resp.reiniciar_em; return false; }
    if (resp.reiniciar_em === reinicioVisto) return false;
    reiniciando = true;
    log('Reinício pedido pelo MOTORA: religando o robô.');
    if (aoReiniciar) aoReiniciar();
    return true;
  }

  // sem WhatsApp há mais de 10 min: avisa o dono uma vez por mensagem (ela segue no botão Enviar da Área IA)
  async function sinalDeVida() {
    if (conectado) return;
    const resp = await motora('pendentes');
    if (verReinicio(resp)) return;
    if (desconectadoDesde === null || relogio.agora() - desconectadoDesde < 10 * MIN) return;
    if (!resp.ativo || !resp.mensagens) return;
    for (const m of resp.mensagens) {
      if (avisadas.has(m.id) || jaEnviadas.has(m.id)) continue;
      avisadas.add(m.id);
      await motora('falhou', { id: m.id, erro: 'O robô está sem conexão com o WhatsApp.' }).catch(() => avisadas.delete(m.id));
    }
  }

  async function ciclo() {
    if (!conectado || !sock) return;
    let resp;
    try { resp = await motora('pendentes'); } catch (e) { log('Sem conexão com o MOTORA:', e.message); return; }
    if (verReinicio(resp)) return;
    if (!resp.ativo || !resp.mensagens || !resp.mensagens.length) return;
    for (const m of resp.mensagens) {
      if (!conectado || !sock) return; // caiu no meio: a mensagem fica para a próxima rodada, sem contar falha
      if (jaEnviadas.has(m.id)) { await marcarEnviada(m.id); continue; }
      if ((falhas[m.id] || 0) >= 3) continue;
      while (enviadasNaHora.length && relogio.agora() - enviadasNaHora[0] > 60 * MIN) enviadasNaHora.shift();
      if (enviadasNaHora.length >= LIMITE_POR_HORA) { log('Limite por hora atingido; continuo depois.'); return; }
      try {
        if (await enviar(m)) {
          jaEnviadas.add(m.id);
          enviadasNaHora.push(relogio.agora());
          log(`Enviada para ${m.nome}.`);
          agendarBackup(); // enviar altera as chaves da conversa
          await marcarEnviada(m.id);
          await enviarCopias(m);
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

  // ---------- mensagens recebidas (comprovante de motorista e resposta do dono) ----------
  const vistas = new Set(), semNumeroAvisado = new Map();
  let filaRecebidas = Promise.resolve();
  function aoReceber({ messages } = {}) {
    for (const msg of messages || []) {
      filaRecebidas = filaRecebidas.then(() => tratarRecebida(msg)).catch((e) => log('Erro ao tratar mensagem recebida:', e.message));
    }
    return filaRecebidas;
  }
  // o WhatsApp às vezes esconde o número (endereço @lid): tenta os caminhos que a biblioteca oferece
  async function telefoneDe(key) {
    if (String(key.remoteJid).endsWith('@s.whatsapp.net')) return soBrasil(numeroDoJid(key.remoteJid));
    if (String(key.remoteJidAlt || '').endsWith('@s.whatsapp.net')) return soBrasil(numeroDoJid(key.remoteJidAlt));
    try {
      const pn = await sock.signalRepository.lidMapping.getPNForLID(key.remoteJid);
      if (pn) return soBrasil(numeroDoJid(pn));
    } catch { /* segue sem número */ }
    return null;
  }
  async function avisarArquivoSemNumero(jid, msg) {
    const ult = semNumeroAvisado.get(jid) || 0; // avisa o dono no máximo 1 vez por hora por conversa
    if (relogio.agora() - ult < 60 * MIN) return;
    semNumeroAvisado.set(jid, relogio.agora());
    await comRepeticao('comprovante_sem_numero', { nome: msg.pushName || '' });
    log('Arquivo recebido sem número visível: dono avisado.');
  }
  async function comRepeticao(acao, extra) {
    for (let i = 0; ; i++) {
      try { return await motora(acao, extra); } catch (e) {
        if (i >= 2) throw e;
        await relogio.dormir(3000 * (i + 1));
      }
    }
  }
  async function responder(jid, texto) {
    if (!texto || !sock) return;
    await relogio.dormir(2000 + Math.floor(aleatorio() * 3000));
    if (sock) { await mandar(jid, { text: texto }); agendarBackup(); }
  }
  async function tratarRecebida(msg) {
    const key = msg && msg.key;
    if (!key || !key.id || vistas.has(key.id)) return;
    const jid = String(key.remoteJid || '');
    if (!jid.endsWith('@s.whatsapp.net') && !jid.endsWith('@lid')) return; // grupos, status e canais ficam de fora
    if (key.fromMe) { await pessoaRespondeu(msg, jid); return; }
    const ts = msg.messageTimestamp, seg = ts && ts.toNumber ? ts.toNumber() : Number(ts);
    if (seg && relogio.agora() - seg * 1000 > JANELA_RECEBER) return;
    vistas.add(key.id);
    if (vistas.size > 5000) vistas.clear();

    const c = abrirConteudo(msg.message);
    const texto = textoDe(c);
    const arq = c.imageMessage || c.documentMessage || null;
    const tipos = Object.keys(c).filter((k) => c[k] && !TECNICOS.has(k));
    const midia = !texto && tipos.length > 0; // qualquer outro tipo (áudio, vídeo, localização...) vai encaminhado
    if (!texto && !midia) return;
    if (midia && !arq) log('Mensagem recebida sem texto, tipos:', tipos.join(', '));
    const telefone = await telefoneDe(key);
    const contato = telefone || contatoOculto(jid); // sem número não dá para saber se é motorista: segue o atendimento
    if (!telefone && contato) log('Mensagem de número escondido pelo WhatsApp: atendendo sem o número.');
    if (contato && !(seg && relogio.agora() - seg * 1000 > JANELA_ATENDIMENTO)) {
      try {
        const ctx = Object.values(c).find((v) => v && v.contextInfo)?.contextInfo;
        const q = ctx && ctx.quotedMessage ? abrirConteudo(ctx.quotedMessage) : null;
        const citado = q ? q.conversation || q.extendedTextMessage?.text || '' : '';
        const legenda = texto || arq?.caption || c.videoMessage?.caption || '';
        const dados = { telefone: contato, jid, nome: msg.pushName || '', texto: String(legenda).slice(0, 3000), midia, arquivo: !!arq, figurinha: !!c.stickerMessage, audio: !!c.audioMessage, citado: String(citado).slice(0, 500), pode_checar: true };
        let a = await comRepeticao('atendimento', dados);
        // número novo que não é motorista: antes de saudar, vê se a conversa já existia no WhatsApp da locadora
        if (a.checar_historico) {
          const antiga = await conversaAntiga(msg, seg);
          if (antiga) log('Conversa que já existia antes: o robô não responde.');
          a = await comRepeticao('atendimento', { ...dados, conversa_antiga: antiga });
        }
        if (a.pedir_audio) { await ouvirDono(msg, jid, contato); return; }
        if (a.tratado) {
          await entregarAtendimento(a, msg, jid);
          if (!telefone && arq) await avisarArquivoSemNumero(jid, msg); // pode ser comprovante: o dono confere
          return;
        }
      } catch (e) { vistas.delete(key.id); throw e; }
    }
    if (!texto && !arq) return;
    if (!telefone) {
      if (!arq) return;
      await avisarArquivoSemNumero(jid, msg);
      return;
    }
    try {
      if (arq) await receberArquivo(msg, arq, telefone, jid);
      else {
        const { resposta } = await comRepeticao('mensagem', { telefone, texto: String(texto).slice(0, 500) });
        await responder(jid, resposta);
      }
    } catch (e) { vistas.delete(key.id); throw e; }
  }
  // ---------- atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada) ----------
  const guardadas = new Map(), filaEnvios = {}, falhasLead = {}; // arquivos recebidos antes de chamar a Dara
  async function destino({ jid, telefone }) {
    if (jid) return jid;
    const num = numeroBR(telefone);
    const r = num ? await sock.onWhatsApp(num) : null;
    if (r === undefined) throw new Error('não consegui consultar o número agora');
    const achado = r && r.find((x) => x.exists);
    return achado ? achado.jid : null;
  }
  async function encaminhar(para, msg) {
    await relogio.dormir(1000);
    if (sock) await mandar(para, { forward: msg });
  }
  // áudio do dono: baixa, a IA ouve, e a resposta volta em áudio (e por escrito quando precisa de conferência)
  async function ouvirDono(msg, jid, telefone) {
    const c = abrirConteudo(msg.message);
    const buf = await baileys.downloadMediaMessage(msg, 'buffer', {}, { logger, reuploadRequest: sock.updateMediaMessage });
    if (buf.length > MAX_ARQUIVO) { await responder(jid, 'Áudio muito grande. Mande um mais curto.'); return; }
    const r = await comRepeticao('audio_dono', { telefone, mime: c.audioMessage.mimetype || 'audio/ogg', b64: Buffer.from(buf).toString('base64') });
    if (r.resposta) await responder(jid, r.resposta);
    if (r.audio_b64 && sock) await mandar(jid, { audio: Buffer.from(r.audio_b64, 'base64'), mimetype: 'audio/mpeg' });
    for (const e of r.envios || []) {
      const para = await destino(e);
      if (para) await responder(para, e.texto);
    }
  }
  async function entregarAtendimento(a, msg, jid) {
    if (a.guardar && a.lead_id && msg && msg.message) {
      const c = abrirConteudo(msg.message);
      if (!textoDe(c)) guardadas.set(a.lead_id, [...(guardadas.get(a.lead_id) || []), msg]);
    }
    if (a.resposta) await responder(jid, a.resposta);
    for (const e of a.envios || []) {
      const para = await destino(e);
      if (para) await responder(para, e.texto);
    }
    if (a.liberar) {
      const para = await destino(a.liberar);
      for (const m of (para && guardadas.get(a.liberar.lead_id)) || []) await encaminhar(para, m).catch((e) => log('Não consegui encaminhar o arquivo:', e.message));
      guardadas.delete(a.liberar.lead_id);
    }
    if (a.encaminhar && msg) {
      try {
        const para = await destino(a.encaminhar);
        if (para) await encaminhar(para, msg);
      } catch (e) {
        log('Não consegui encaminhar o arquivo:', e.message);
        await responder(jid, 'Não consegui encaminhar este arquivo. Pode escrever em texto, por favor?');
      }
    }
  }
  async function pessoaRespondeu(msg, jid) {
    if (ehDoRobo(msg.key.id)) return; // foi o próprio robô
    const c = abrirConteudo(msg.message);
    if (!Object.keys(c).some((k) => /^(conversation|extendedText|image|video|audio|document|sticker|ptv|location|contact)/.test(k))) return; // visto, reação etc.
    const ts = msg.messageTimestamp, seg = ts && ts.toNumber ? ts.toNumber() : Number(ts);
    if (!seg || relogio.agora() - seg * 1000 > JANELA_ATENDIMENTO) return;
    vistas.add(msg.key.id);
    const telefone = (await telefoneDe(msg.key)) || contatoOculto(jid);
    const a = await comRepeticao('locadora_respondeu', { telefone, em: new Date(seg * 1000).toISOString() });
    if (a.lead_id) guardadas.delete(a.lead_id);
    await entregarAtendimento(a, null, jid);
  }
  // passados 3 min sem resposta da locadora, chama a Dara. Roda na mesma fila das recebidas, para nada se cruzar
  async function chamarDara() {
    if (!conectado || !sock) return;
    const { chamadas } = await motora('atendimento_fila');
    for (const l of chamadas || []) {
      try {
        const para = await destino(l);
        if (!para) throw new Error('número sem WhatsApp');
        filaEnvios[l.id] = filaEnvios[l.id] || 0; // não repete o que já saiu, se a marcação falhar
        for (; filaEnvios[l.id] < l.textos.length; filaEnvios[l.id]++) await responder(para, l.textos[filaEnvios[l.id]]);
        if (!l.segurar) { // desconhecido: os arquivos só vão depois de a Dara dizer SIM
          for (const m of guardadas.get(l.id) || []) await encaminhar(para, m).catch((e) => log('Não consegui encaminhar o arquivo:', e.message));
          guardadas.delete(l.id);
        }
        await comRepeticao('atendimento_ok', { id: l.id });
        delete filaEnvios[l.id];
        log('Atendimento repassado à Dara.');
      } catch (e) {
        log('Não consegui chamar a Dara:', e.message);
        falhasLead[l.id] = (falhasLead[l.id] || 0) + 1;
        if (falhasLead[l.id] >= 3) await motora('atendimento_falhou', { id: l.id }).catch(() => {});
      }
    }
  }
  function cicloAtendimento() {
    filaRecebidas = filaRecebidas.then(chamarDara).catch((e) => log('Erro no atendimento:', e.message));
    return filaRecebidas;
  }

  async function receberArquivo(msg, arq, telefone, jid) {
    const pedido = await comRepeticao('comprovante_url', { telefone, msg_id: msg.key.id, mimetype: arq.mimetype || '' });
    if (!pedido.url) { await responder(jid, pedido.resposta); return; } // não é motorista cadastrado: nem baixa o arquivo
    try {
      const tam = arq.fileLength && arq.fileLength.toNumber ? arq.fileLength.toNumber() : Number(arq.fileLength || 0);
      if (tam > MAX_ARQUIVO) { await responder(jid, 'Arquivo muito grande (máximo 10 MB). Envie uma foto do comprovante.'); return; }
      const buf = await baileys.downloadMediaMessage(msg, 'buffer', {}, { logger, reuploadRequest: sock.updateMediaMessage });
      if (buf.length > MAX_ARQUIVO) { await responder(jid, 'Arquivo muito grande (máximo 10 MB). Envie uma foto do comprovante.'); return; }
      const r = await fetchFn(pedido.url, { method: 'PUT', headers: { 'Content-Type': arq.mimetype || 'application/octet-stream' }, body: buf });
      if (!r.ok) throw new Error('guardar arquivo respondeu ' + r.status);
      const { resposta } = await comRepeticao('comprovante_salvar', { telefone, path: pedido.path, file_name: arq.fileName || 'Comprovante pelo WhatsApp' });
      log('Comprovante recebido pelo WhatsApp.');
      await responder(jid, resposta);
    } catch (e) {
      log('Não consegui receber o comprovante:', e.message);
      await responder(jid, 'Não consegui receber seu comprovante. Envie de novo em alguns minutos ou pelo app.');
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
    servidor = http.createServer((q, r) => { pagina(q, r).catch(() => { r.writeHead(500); r.end(); }); }).listen(porta, process.env.HOST || '127.0.0.1'); // só o próprio computador acessa; o QR chega ao dono pelo app
    repetir(5000, verificarPareamento);
    // sinal de vida mesmo antes de conectar (o app mostra se o robô está ligado)
    repetir(MIN, sinalDeVida);
    await restaurar();
    await abrir().catch(falhaAoAbrir);
    repetir(30000, ciclo);
    repetir(20000, cicloAtendimento);
  }

  async function encerrar() {
    if (pareado()) await guardar();
    encerrado = true;
    if (timerAbrir !== null) relogio.clearTimeout(timerAbrir);
    if (timerBackup !== null) relogio.clearTimeout(timerBackup);
    if (timerEstavel !== null) relogio.clearTimeout(timerEstavel);
    soltarSocket();
    if (servidor) servidor.close();
  }

  return {
    iniciar, encerrar, ciclo, conteudoDe, aoReceber, cicloAtendimento, verificarPareamento, sinalDeVida, guardar, restaurar, abrir,
    get situacao() { return situacao; }, get conectado() { return conectado; }, get pareando() { return pareando; },
    get socket() { return sock; }, get senhaPagina() { return SENHA_PAGINA; }, get servidor() { return servidor; }, PASTA,
  };
}
