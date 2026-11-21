// Prova do protocolo da placa contra a TV Box de verdade (não entra no workflow: precisa da box na rede).
// Usa as MESMAS funções do ar/firmware/gree-esp32/adb.h (via teste-ar-adb.mjs) e faz a mesma sequência da placa:
// CNXN -> CNXN (ou AUTH) -> OPEN shell:<cmd> -> OKAY/WRTE/CLSE.
// Uso: node ferramentas/adb-teste.mjs 192.168.1.87 "echo ola"
import net from 'node:net';
import { carregarAdb } from '../.github/scripts/teste-ar-adb.mjs';

const A = carregarAdb();
const [ip = '192.168.1.87', cmd = 'echo ola'] = process.argv.slice(2);

function pacote(c, a0, a1, texto) {
  const dados = texto == null ? [] : Array.from(Buffer.from(texto + '\0', 'latin1'));
  const h = new Array(24).fill(0);
  A.adbCabecalho(h, c, a0, a1, dados.length, A.adbSoma(dados, dados.length));
  return Buffer.from([...h, ...dados]);
}
const nome = (c) => ({ [A.ADB_CNXN >>> 0]: 'CNXN', [A.ADB_OKAY >>> 0]: 'OKAY', [A.ADB_WRTE >>> 0]: 'WRTE', [A.ADB_CLSE >>> 0]: 'CLSE', [A.ADB_AUTH >>> 0]: 'AUTH' }[c >>> 0] || c.toString(16));

const s = net.connect(5555, ip);
s.setTimeout(3000, () => { console.log('ERRO sem resposta'); s.destroy(); process.exitCode = 1; });
let buf = Buffer.alloc(0), saida = '', abriu = false;
s.on('connect', () => s.write(pacote(A.ADB_CNXN, 0x01000000, 4096, 'host::')));
s.on('data', (d) => {
  buf = Buffer.concat([buf, d]);
  while (buf.length >= 24) {
    const c = A.adbLe32(buf), a0 = A.adbLe32(buf.subarray(4)), len = A.adbLe32(buf.subarray(12));
    if (buf.length < 24 + len) break;
    const dados = buf.subarray(24, 24 + len); buf = buf.subarray(24 + len);
    console.log(`recebido ${nome(c)}${len ? ` (${len} bytes)` : ''}`);
    if ((c >>> 0) === (A.ADB_AUTH >>> 0)) { console.log('ERRO a box pediu autorização'); s.destroy(); process.exitCode = 1; return; }
    if ((c >>> 0) === (A.ADB_CNXN >>> 0) && !abriu) { abriu = true; s.write(pacote(A.ADB_OPEN, 1, 0, 'shell:' + cmd)); }
    if ((c >>> 0) === (A.ADB_WRTE >>> 0)) { saida += dados.toString(); s.write(pacote(A.ADB_OKAY, 1, a0, null)); }
    if ((c >>> 0) === (A.ADB_CLSE >>> 0)) { console.log(`saída do comando: ${JSON.stringify(saida)}`); s.end(); return; }
  }
});
s.on('error', (e) => { console.log(`ERRO ${e.message}`); process.exitCode = 1; });
