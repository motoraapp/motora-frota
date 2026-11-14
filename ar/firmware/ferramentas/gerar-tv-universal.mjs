// Gera ar/firmware/gree-esp32/tv_universal.h a partir do controle universal de TV do Flipper Zero
// (flipperdevices/flipperzero-firmware, applications/main/infrared/resources/infrared/assets/tv.ir, licença GPL-3.0).
// Uso: node ar/firmware/ferramentas/gerar-tv-universal.mjs caminho/para/tv.ir
// Agrupa os códigos por "família" (protocolo + endereço) e guarda Ligar, Volume ±, Mudo e Canal ± de cada uma.
import { readFileSync, writeFileSync } from 'node:fs';

const PROTO = { NEC: 1, NECext: 2, Samsung32: 3, RC5: 4, RC5X: 5, RC6: 6, SIRC: 7, SIRC15: 8, SIRC20: 9 };
const TECLAS = { Power: 0, Vol_up: 1, Vol_dn: 2, Mute: 3, Ch_next: 4, Ch_prev: 5 };
const AOC = '2:48384';  // NECext 00 BD (já testado na TV do dono, não funcionou): vai para o fim

export function familias(texto) {
  const fams = new Map();
  let modelo = '';
  for (const bloco of texto.split(/\n#/)) {
    const m = bloco.match(/# Model: (.+)/) || bloco.match(/^ Model: (.+)/m);
    if (m) modelo = m[1].trim();
    const campo = k => (bloco.match(new RegExp('^' + k + ': (.+)$', 'm')) || [])[1];
    if (campo('type') !== 'parsed') continue;
    const p = PROTO[campo('protocol')], t = TECLAS[campo('name')];
    if (!p || t === undefined) continue;
    const bytes = s => s.trim().split(/\s+/).map(h => parseInt(h, 16));
    const [a0, a1] = bytes(campo('address')), [c0, c1] = bytes(campo('command'));
    const a = a0 | (a1 << 8), c = c0 | (c1 << 8);
    const chave = p + ':' + a;
    if (!fams.has(chave)) fams.set(chave, { p, a, c: [-1, -1, -1, -1, -1, -1], modelo });
    const f = fams.get(chave);
    if (f.c[t] < 0) f.c[t] = c;
  }
  const lista = [...fams.entries()].filter(([, f]) => f.c[0] >= 0);
  lista.sort((x, y) => (x[0] === AOC) - (y[0] === AOC));
  return lista.map(([, f]) => f);
}

if (process.argv[2]) {
  const l = familias(readFileSync(process.argv[2], 'utf8').replace(/\r\n/g, '\n'));
  const linhas = l.map(f => `  {${f.p}, 0x${f.a.toString(16).padStart(4, '0')}, {${f.c.join(', ')}}},${f.modelo ? '  // ' + f.modelo.replace(/[^\x20-\x7e]/g, '') : ''}`);
  writeFileSync(new URL('../gree-esp32/tv_universal.h', import.meta.url),
`// Controle universal de TV: códigos de Ligar, Volume +/-, Mudo e Canal +/- por família (protocolo + endereço).
// Gerado por ar/firmware/ferramentas/gerar-tv-universal.mjs a partir do tv.ir do Flipper Zero (GPL-3.0). Não editar à mão.
// p: 1 NEC, 2 NECext, 3 Samsung32, 4 RC5, 5 RC5X, 6 RC6, 7 SIRC, 8 SIRC15, 9 SIRC20. c: ligar, vol+, vol-, mudo, canal+, canal- (-1 = não tem).
#pragma once
#include <stdint.h>
struct FamiliaTv { uint8_t p; uint16_t a; int32_t c[6]; };
const FamiliaTv FAMILIAS_TV[] = {
${linhas.join('\n')}
};
const int N_FAMILIAS_TV = sizeof(FAMILIAS_TV) / sizeof(FAMILIAS_TV[0]);
`);
  console.log(`${l.length} famílias com código de ligar (${l.filter(f => f.c.slice(1).some(c => c >= 0)).length} com volume/canal/mudo)`);
}
