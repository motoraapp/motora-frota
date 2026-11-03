// ROBÔ DO WHATSAPP DO MOTORA — roda no HOSTLESS (hostless.cloud), sem tela e sem navegador (biblioteca Baileys).
// Envia as mensagens do MOTORA e só lê duas coisas: comprovante de motorista cadastrado e resposta do dono com código. A lógica fica em nucleo.js.
// Configuração (variáveis do Hostless): CHAVE_ROBO = chave do robô. Opcional: PORT (o Hostless define).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import makeWASocket, { useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, downloadMediaMessage } from 'baileys';
import pino from 'pino';
import QRCode from 'qrcode';
import { criarRobo } from './nucleo.js';

let chave = process.env.CHAVE_ROBO;
const CONFIG = path.join(path.dirname(fileURLToPath(import.meta.url)), 'config.json');
if (!chave && fs.existsSync(CONFIG)) chave = JSON.parse(fs.readFileSync(CONFIG, 'utf8')).chave_robo;
if (!chave) { console.log('Falta a chave do robô (variável CHAVE_ROBO).'); process.exit(1); }

const robo = criarRobo({
  baileys: { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, downloadMediaMessage },
  logger: pino({ level: 'silent' }), // o registro da biblioteca traz o número da conta; fica desligado
  qrcode: QRCode,
  chave,
  porta: process.env.PORT || 8080,
});
process.on('SIGTERM', () => { robo.encerrar().finally(() => process.exit(0)); });
robo.iniciar();
