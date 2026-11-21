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
  return new Function(`const strcmp = (a, b) => (a === b ? 0 : 1); ${js}; return { adbSoma, adbCabecalho, adbLe32, adbTecla, adbEvento, adbCharPermitido, ADB_CNXN, ADB_OPEN, ADB_OKAY, ADB_WRTE, ADB_CLSE, ADB_AUTH };`)();
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

  // Códigos do Linux do controle da box (/dev/input/event0, "110b0030.pwm", mapa 110b0030_pwm.kl). Versão 25: a placa
  // escreve a tecla direto no controle (0,1 s) em vez de "input keyevent" (2,1 s na box de 1 GB).
  const teclas = { up: 103, down: 108, left: 105, right: 106, ok: 232, back: 158, home: 102, menu: 139, volup: 115, voldown: 114, mute: 113, play: 164 };
  for (const [k, v] of Object.entries(teclas)) caso(`tecla ${k} = ${v}`, A.adbTecla(k), v);
  caso('tecla desconhecida = -1', A.adbTecla('xyz'), -1);
  caso('tecla vazia = -1', A.adbTecla(''), -1);

  // Evento do Linux (struct input_event de 32 bits): 8 bytes de hora (zero), tipo, código e valor em little-endian.
  const ev = new Array(16).fill(9);
  A.adbEvento(ev, 1, 232, 1);
  caso('evento: hora zerada', hex(ev.slice(0, 8)), '00 00 00 00 00 00 00 00');
  caso('evento: tipo EV_KEY = 1', hex(ev.slice(8, 10)), '01 00');
  caso('evento: código 232 (OK)', hex(ev.slice(10, 12)), 'e8 00');
  caso('evento: valor 1 (apertou)', hex(ev.slice(12, 16)), '01 00 00 00');
  A.adbEvento(ev, 1, 388, 0);
  caso('evento: código acima de 255 e valor 0 (soltou)', hex(ev.slice(10, 16)), '84 01 00 00 00 00');

  for (const c of 'aZ5.@,-_:!') caso(`caractere permitido "${c}"`, A.adbCharPermitido(c.charCodeAt(0)), true);
  for (const c of `'";&|$\`\\()<> \n*#%~/{}[]=+^`) caso(`caractere bloqueado ${JSON.stringify(c)}`, A.adbCharPermitido(c.charCodeAt(0)), false);
  caso('acento bloqueado (ç)', A.adbCharPermitido('ç'.charCodeAt(0)), false);
  caso('? bloqueado (curinga do shell, achado da revisão)', A.adbCharPermitido('?'.charCodeAt(0)), false);

  if (erros) { console.log(`\n${erros} erro(s)`); process.exit(1); }
  console.log('\nok   protocolo ADB da TV Box');
}
