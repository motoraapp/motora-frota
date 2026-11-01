// ROBÔ DO WHATSAPP DO MOTORA — roda no computador do dono (que fica ligado 24 horas), sem janela (headless).
// Só DISPARA mensagens: não lê, não responde e não conversa com ninguém.
// A cada 30 segundos pergunta ao MOTORA se há mensagens novas (Pix, recibo, avisos) e envia no WhatsApp do motorista.
// O texto já vem escrito pela IA (Gemini) do MOTORA. Liga e desliga pelo botão "Envio automático" na Área IA do app.
const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const CONFIG = path.join(__dirname, 'config.json');
if (!fs.existsSync(CONFIG)) {
  console.log('Falta o arquivo config.json. Copie config.exemplo.json para config.json e coloque a chave do robô.');
  process.exit(1);
}
const cfg = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));
const URL_ROBO = 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-robo';
const ESPERA_ENTRE_MENSAGENS = [8000, 20000]; // pausa aleatória entre uma mensagem e outra (evita bloqueio)
const LIMITE_POR_HORA = 30;

const hora = () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
const log = (...a) => console.log(`[${hora()}]`, ...a);
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const aleatorio = ([a, b]) => a + Math.floor(Math.random() * (b - a));

async function motora(acao, extra = {}) {
  const r = await fetch(URL_ROBO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-robo-token': cfg.chave_robo },
    body: JSON.stringify({ acao, ...extra }),
  });
  if (r.status === 403) throw new Error('Chave do robô errada (config.json).');
  return r.json();
}

// (62) 99999-9999 -> 5562999999999
function numeroBR(tel) {
  let n = String(tel || '').replace(/\D/g, '');
  if (n.startsWith('0')) n = n.replace(/^0+/, '');
  if (n.length === 10 || n.length === 11) n = '55' + n;
  return n.length >= 12 ? n : null;
}

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, 'sessao') }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] },
});

client.on('qr', (qr) => {
  log('Abra o WhatsApp no celular > Aparelhos conectados > Conectar aparelho e leia este código:');
  qrcode.generate(qr, { small: true });
});
client.on('authenticated', () => log('WhatsApp conectado. A sessão fica salva; não precisa ler o código de novo.'));
client.on('auth_failure', (m) => log('Falha ao conectar o WhatsApp:', m));
client.on('disconnected', (m) => { log('WhatsApp desconectou:', m, '— reiniciando em 1 minuto.'); setTimeout(() => process.exit(1), 60000); });

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
    if ((falhas[m.id] || 0) >= 3) continue; // já avisei o dono sobre esta
    while (enviadasNaHora.length && Date.now() - enviadasNaHora[0] > 3600000) enviadasNaHora.shift();
    if (enviadasNaHora.length >= LIMITE_POR_HORA) { log('Limite de mensagens por hora atingido; continuo depois.'); return; }
    try {
      const ok = await enviar(m);
      if (ok) {
        await motora('enviada', { id: m.id });
        enviadasNaHora.push(Date.now());
        log(`Enviada para ${m.nome}.`);
      } else {
        falhas[m.id] = 99; // não tenta de novo; o dono recebe o aviso e envia pela Área IA
        await motora('falhou', { id: m.id, erro: 'Número sem WhatsApp ou não cadastrado.' });
        log(`Sem WhatsApp válido para ${m.nome}.`);
      }
    } catch (e) {
      falhas[m.id] = (falhas[m.id] || 0) + 1;
      log(`Erro ao enviar para ${m.nome} (tentativa ${falhas[m.id]}):`, e.message);
      if (falhas[m.id] >= 3) { await motora('falhou', { id: m.id, erro: e.message }).catch(() => {}); }
    }
    await dormir(aleatorio(ESPERA_ENTRE_MENSAGENS));
  }
}

client.on('ready', async () => {
  log('Robô do MOTORA pronto. Verificando mensagens a cada 30 segundos.');
  for (;;) { await ciclo(); await dormir(30000); }
});

client.initialize();
