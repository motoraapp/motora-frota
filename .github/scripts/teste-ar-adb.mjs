// Teste do protocolo ADB da TV Box (placa gree-esp32, versão 24).
// Lê as funções de ar/firmware/gree-esp32/adb.h (C simples), transforma em JavaScript e roda os casos.
// Rodar: node .github/scripts/teste-ar-adb.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function carregarAdb(raiz = process.cwd()) {
  const cpp = readFileSync(join(raiz, 'ar/firmware/gree-esp32/adb.h'), 'utf8');
  const js = cpp
    .replace(/^#(pragma|include).*$/gm, '')
    .replace(/^#define\s+(\w+)\s+(.+)$/gm, 'const $1 = $2;')
    .replace(/^(?:static\s+)?(?:inline\s+)?(?:const\s+)?(?:unsigned\s+)?(?:uint8_t|uint32_t|int|bool|void|char)\s*\*?\s*(\w+)\(([^)]*)\)\s*\{/gm, (_, nome, ps) =>
      `function ${nome}(${ps.split(',').map(p => p.trim().split(/[\s*&]+/).pop()).filter(Boolean).join(', ')}) {`)
    .replace(/\b(?:uint8_t|uint32_t|int)\s+(\w+)\[\d+\]\s*=\s*\{([^}]*)\};/g, 'let $1 = [$2];')
    .replace(/'(\\.|[^'\\])'/g, (_, c) => String((c.length > 1 ? JSON.parse(`"${c}"`) : c).charCodeAt(0)))
    .replace(/\((?:uint8_t|uint32_t|int|char)\)/g, '')
    .replace(/\b(?:const\s+)?(?:unsigned\s+)?(?:uint8_t|uint32_t|int|bool|char)\s+(\w+)\s*=/g, 'let $1 =');
  return new Function(`const strcmp = (a, b) => (a === b ? 0 : 1); ${js}; return { adbSoma, adbCabecalho, adbLe32, adbTecla, adbCharPermitido, ADB_CNXN, ADB_OPEN, ADB_OKAY, ADB_WRTE, ADB_CLSE, ADB_AUTH };`)();
}

const ehPrincipal = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop());
if (ehPrincipal) {
  let A;
  try { A = carregarAdb(); } catch (e) { console.log(`ERRO adb.h não carregou: ${e.message}`); process.exit(1); }
  let erros = 0;
  const caso = (titulo, obtido, esperado) => {
    if (JSON.stringify(obtido) === JSON.stringify(esperado)) console.log(`ok   ${titulo}`);
    else { erros++; console.log(`ERRO ${titulo}: deu ${JSON.stringify(obtido)}, esperado ${JSON.stringify(esperado)}`); }
  };
  const hex = (b) => Array.from(b, x => (x & 255).toString(16).padStart(2, '0')).join(' ');

  caso('soma dos bytes', A.adbSoma([1, 2, 250], 3), 253);
  caso('soma de "host::\\0"', A.adbSoma(Array.from('host::\0', c => c.charCodeAt(0)), 7), 562);

  const h = new Array(24).fill(0);
  A.adbCabecalho(h, A.ADB_CNXN, 0x01000000, 4096, 7, 562);
  caso('cabeçalho CNXN: comando em little-endian', hex(h.slice(0, 4)), '43 4e 58 4e');
  caso('cabeçalho CNXN: versão', hex(h.slice(4, 8)), '00 00 00 01');
  caso('cabeçalho CNXN: tamanho máximo 4096', hex(h.slice(8, 12)), '00 10 00 00');
  caso('cabeçalho CNXN: tamanho do payload', hex(h.slice(12, 16)), '07 00 00 00');
  caso('cabeçalho CNXN: soma', hex(h.slice(16, 20)), '32 02 00 00');
  caso('cabeçalho CNXN: mágica = comando XOR 0xFFFFFFFF', hex(h.slice(20, 24)), 'bc b1 a7 b1');

  caso('lê 32 bits little-endian (CNXN)', A.adbLe32([0x43, 0x4e, 0x58, 0x4e]) >>> 0, A.ADB_CNXN >>> 0);
  caso('lê 32 bits little-endian (byte alto ligado)', A.adbLe32([0xbc, 0xb1, 0xa7, 0xb1]) >>> 0, 0xb1a7b1bc);
  caso('constantes: OPEN, OKAY, WRTE, CLSE, AUTH', [A.ADB_OPEN, A.ADB_OKAY, A.ADB_WRTE, A.ADB_CLSE, A.ADB_AUTH].map(v => (v >>> 0).toString(16)),
    ['4e45504f', '59414b4f', '45545257', '45534c43', '48545541']);

  const teclas = { up: 19, down: 20, left: 21, right: 22, ok: 23, back: 4, home: 3, menu: 82, volup: 24, voldown: 25, mute: 164, play: 85 };
  for (const [k, v] of Object.entries(teclas)) caso(`tecla ${k} = ${v}`, A.adbTecla(k), v);
  caso('tecla desconhecida = -1', A.adbTecla('xyz'), -1);
  caso('tecla vazia = -1', A.adbTecla(''), -1);

  for (const c of 'aZ5.@,-_:!?') caso(`caractere permitido "${c}"`, A.adbCharPermitido(c.charCodeAt(0)), true);
  for (const c of `'";&|$\`\\()<> \n*#%~/{}[]=+^`) caso(`caractere bloqueado ${JSON.stringify(c)}`, A.adbCharPermitido(c.charCodeAt(0)), false);
  caso('acento bloqueado (ç)', A.adbCharPermitido('ç'.charCodeAt(0)), false);

  if (erros) { console.log(`\n${erros} erro(s)`); process.exit(1); }
  console.log('\nok   protocolo ADB da TV Box');
}
