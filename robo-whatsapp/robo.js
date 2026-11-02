// ROBÔ DO WHATSAPP DO MOTORA — roda no HOSTLESS (hostless.cloud), sem tela (headless).
// Só DISPARA mensagens: não lê, não responde e não conversa com ninguém.
// A cada 30 s pergunta ao MOTORA se há mensagens novas (Pix, recibo, avisos) e envia no WhatsApp do motorista.
// O texto já vem escrito pela IA (Gemini) do MOTORA. Liga e desliga pelo botão "Envio automático" na Área IA.
// - QR code para conectar: aparece dentro do app, na Área IA.
// - Conexão do WhatsApp fica guardada no Supabase: o Hostless pode reiniciar sem pedir o QR de novo.
// Configuração (variáveis do Hostless): CHAVE_ROBO = chave do robô. Opcional: PORT (o Hostless define).
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Client, RemoteAuth } = require('whatsapp-web.js');

let chave = process.env.CHAVE_ROBO;
const CONFIG = path.join(__dirname, 'config.json');
if (!chave && fs.existsSync(CONFIG)) chave = JSON.parse(fs.readFileSync(CONFIG, 'utf8')).chave_robo;
if (!chave) { console.log('Falta a chave do robô (variável CHAVE_ROBO).'); process.exit(1); }

const URL_ROBO = 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-robo';
const ESPERA_ENTRE_MENSAGENS = [8000, 20000]; // pausa aleatória entre mensagens (evita bloqueio)
const LIMITE_POR_HORA = 30;

const hora = () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
const log = (...a) => console.log(`[${hora()}]`, ...a);
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const aleatorio = ([a, b]) => a + Math.floor(Math.random() * (b - a));
let situacao = 'iniciando';

// o Hostless confere se o app está vivo por este endereço
http.createServer((_, res) => { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Robô do MOTORA: ' + situacao); })
  .listen(process.env.PORT || 8080);

async function motora(acao, extra = {}) {
  const r = await fetch(URL_ROBO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-robo-token': chave },
    body: JSON.stringify({ acao, ...extra }),
  });
  if (r.status === 403) throw new Error('Chave do robô errada.');
  return r.json();
}

// guarda a conexão do WhatsApp no Supabase (pasta privada "robo")
const loja = {
  async sessionExists() { try { return !!(await motora('sessao_existe')).existe; } catch { return false; } },
  async save({ session }) {
    const { url } = await motora('sessao_enviar');
    const r = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/zip' }, body: fs.readFileSync(`${session}.zip`) });
    log(r.ok ? 'Conexão do WhatsApp guardada.' : 'Não consegui guardar a conexão: ' + r.status);
  },
  async extract({ path: destino }) {
    const { url } = await motora('sessao_baixar');
    const r = await fetch(url);
    if (!r.ok) throw new Error('não achei a conexão guardada');
    fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
  },
  async delete() { await motora('sessao_apagar').catch(() => {}); },
};

// (62) 99999-9999 -> 5562999999999
function numeroBR(tel) {
  let n = String(tel || '').replace(/\D/g, '').replace(/^0+/, '');
  if (n.length === 10 || n.length === 11) n = '55' + n;
  return n.length >= 12 ? n : null;
}

const client = new Client({
  authStrategy: new RemoteAuth({ clientId: 'motora', store: loja, backupSyncIntervalMs: 5 * 60000, dataPath: path.join(__dirname, 'sessao') }),
  puppeteer: {
    headless: true,
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-zygote', '--single-process'],
  },
});

client.on('qr', (qr) => { situacao = 'esperando ler o QR code'; log('QR code novo: abra a Área IA do MOTORA e leia com o WhatsApp.'); motora('qr', { qr }).catch(() => {}); });
client.on('authenticated', () => { situacao = 'conectado'; log('WhatsApp conectado.'); motora('qr', { qr: null }).catch(() => {}); });
client.on('remote_session_saved', () => log('Conexão salva no Supabase.'));
client.on('auth_failure', (m) => { situacao = 'falha ao conectar'; log('Falha ao conectar o WhatsApp:', m); });
client.on('disconnected', (m) => { log('WhatsApp desconectou:', m, '— reiniciando.'); setTimeout(() => process.exit(1), 30000); });

const enviadasNaHora = [];
const falhas = {};

async function enviar(m) {
  for (const tel of m.telefones) {
    const num = numeroBR(tel);
    if (!num) continue;
    const id = await client.getNumberId(num); // resolve o 9º dígito e confere se o número tem WhatsApp
    if (!id) continue;
    await client.sendMessage(id._serialized, m.texto);
    return true;
  }
  return false;
}

async function ciclo() {
  let resp;
  try { resp = await motora('pendentes'); } catch (e) { log('Sem conexão com o MOTORA:', e.message); return; }
  if (!resp.ativo || !resp.mensagens || !resp.mensagens.length) return;
  for (const m of resp.mensagens) {
    if ((falhas[m.id] || 0) >= 3) continue;
    while (enviadasNaHora.length && Date.now() - enviadasNaHora[0] > 3600000) enviadasNaHora.shift();
    if (enviadasNaHora.length >= LIMITE_POR_HORA) { log('Limite por hora atingido; continuo depois.'); return; }
    try {
      if (await enviar(m)) {
        await motora('enviada', { id: m.id });
        enviadasNaHora.push(Date.now());
        log(`Enviada para ${m.nome}.`);
      } else {
        falhas[m.id] = 99;
        await motora('falhou', { id: m.id, erro: 'Número sem WhatsApp ou não cadastrado.' });
        log(`Sem WhatsApp válido para ${m.nome}.`);
      }
    } catch (e) {
      falhas[m.id] = (falhas[m.id] || 0) + 1;
      log(`Erro ao enviar para ${m.nome} (tentativa ${falhas[m.id]}):`, e.message);
      if (falhas[m.id] >= 3) await motora('falhou', { id: m.id, erro: e.message }).catch(() => {});
    }
    await dormir(aleatorio(ESPERA_ENTRE_MENSAGENS));
  }
}

client.on('ready', async () => {
  situacao = 'funcionando';
  log('Robô do MOTORA pronto. Verificando mensagens a cada 30 segundos.');
  for (;;) { await ciclo(); await dormir(30000); }
});

// sinal de vida mesmo antes de conectar (o app mostra se o robô está ligado)
setInterval(() => { if (situacao !== 'funcionando') motora('pendentes').catch(() => {}); }, 60000);
client.initialize();
