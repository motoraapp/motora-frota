// Calcula a escala de cada pose dos cachorros (ferramentas/caes-escalas.json) para o cachorro ter o mesmo tamanho em todas as poses.
// Régua: a área da cor-marca da cabeça (laranja do Elvis, rosa da orelha da Belinha, laços rosa da Maya) comparada com a do
// desenho em pé: escala = 0,92 / sqrt(área / área do em pé) (o 0,92 vem da calibração feita à mão em 16/11/2026, com a cabeça
// virada aparecendo menor). Ajustes à mão ficam em AJUSTES e valem sobre o cálculo.
// Uso: node ferramentas/caes-escalas.mjs   (lê Desktop/Thiago/animacao; depois rode caes-sprites.ps1)
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const origem = 'C:/Users/User/Desktop/Thiago/animacao';
const saida = join(dirname(fileURLToPath(import.meta.url)), 'caes-escalas.json');
function lerPng(arq) {
  const b = readFileSync(arq); let p = 8, w = 0, h = 0; const idat = [];
  while (p < b.length) { const n = b.readUInt32BE(p), t = b.toString('latin1', p + 4, p + 8), d = b.subarray(p + 8, p + 8 + n); if (t === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); } if (t === 'IDAT') idat.push(d); if (t === 'IEND') break; p += 12 + n; }
  const z = inflateSync(Buffer.concat(idat)), lin = w * 4, px = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) { const f = z[y * (lin + 1)], o = y * lin, s = y * (lin + 1) + 1; for (let i = 0; i < lin; i++) { const a = i >= 4 ? px[o + i - 4] : 0, c = y ? px[o - lin + i] : 0, d = i >= 4 && y ? px[o - lin + i - 4] : 0, x = z[s + i]; let v; if (f === 0) v = x; else if (f === 1) v = x + a; else if (f === 2) v = x + c; else if (f === 3) v = x + ((a + c) >> 1); else { const pp = a + c - d, pa = Math.abs(pp - a), pb = Math.abs(pp - c), pc = Math.abs(pp - d); v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? c : d); } px[o + i] = v & 255; } }
  return { w, h, px };
}
function hsv(r, g, b) { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; } return [h, mx ? d / mx : 0, mx / 255]; }
const CAES = {
  elvis: { pasta: 'pincher_malhado', prefixo: 'malhado_', ref: '1_pincher_malhado_transparente.png', ok: (h, s, v) => h >= 25 && h <= 45 && s > 0.55 && v > 0.7,
    nomes: { '1_pincher_malhado_transparente.png': 'base', '1_pincher_malhado_boca_aberta_transparente.png': 'boca_aberta', '1_pincher_malhado_olhos_fechados_transparente.png': 'olhos_fechados', '1_pincher_malhado_lingua_transparente.png': 'lingua' } },
  belinha: { pasta: 'pincher_caramelo', prefixo: 'caramelo_', ref: '2_pincher_caramelo_transparente.png', ok: (h, s, v) => (h <= 18 || h >= 345) && s > 0.3 && s < 0.65 && v > 0.8,
    nomes: { '2_pincher_caramelo_transparente.png': 'base', '2_pincher_caramelo_boca_aberta_transparente.png': 'boca_aberta', '2_pincher_caramelo_olhos_fechados_transparente.png': 'olhos_fechados' } },
  maya: { pasta: 'maya', prefixo: 'maya_', ref: '4_shih_tzu_de_pe_transparente.png', ok: (h, s, v) => h >= 320 && h <= 350 && s > 0.45 && v > 0.6,
    nomes: { '4_shih_tzu_de_pe_transparente.png': 'base', '4_shih_tzu_de_pe_boca_fechada_transparente.png': 'boca_fechada', '4_shih_tzu_de_pe_olhos_fechados_transparente.png': 'olhos_fechados', '3_shih_tzu_transparente.png': 'sentado', '3_shih_tzu_olhos_fechados_transparente.png': 'sentado_olhos_fechados' } },
};
// ajustes à mão (multiplicam o cálculo): poses em que a cor-marca não aparece bem ou o desenho é de outro enquadramento
const AJUSTES = { elvis: {}, belinha: { virando_costas: 1.05, tremendo_frio: 0.95 }, maya: { sentado: 0.85, sentado_olhos_fechados: 0.85 } };
// valores FIXOS (ignoram o cálculo): poses em que a régua da cor-marca engana (cabeça de costas ou muito virada)
const FIXOS = {
  elvis: { virando_costas: 1.05, latindo: 0.96 },
  belinha: { mexendo_cabeca: 0.98, latindo: 0.95, rosnando: 1.05, virando_costas: 1.05, andando_1: 1.05, andando_2: 1.0, andando_frente: 1.05, sentado: 1.0, sentindo_calor: 1.0, correndo_1: 1.25, correndo_2: 1.2 },
  maya: { latindo: 0.94, andando_1: 1.0, andando_2: 1.0, andando_frente: 1.0, bebendo: 1.0, comendo: 1.0, deitando_transicao: 0.95, correndo_1: 1.25, correndo_2: 1.25, encostando_giro_frente: 0.9, sentindo_calor: 0.82 },
};
const res = {};
for (const [id, c] of Object.entries(CAES)) {
  const area = {};
  for (const f of readdirSync(join(origem, c.pasta)).filter((x) => x.endsWith('_transparente.png'))) {
    const { w, h, px } = lerPng(join(origem, c.pasta, f)); let n = 0;
    for (let i = 0; i < w * h; i++) { if (px[i * 4 + 3] < 200) continue; const [a, b, v] = hsv(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]); if (c.ok(a, b, v)) n++; }
    area[f] = n;
  }
  res[id] = {};
  for (const [f, n] of Object.entries(area)) {
    const nome = c.nomes[f] || f.replace(c.prefixo, '').replace('_transparente.png', '');
    const rel = Math.sqrt(n / area[c.ref]);
    let k = n < 3000 ? 1.0 : Math.min(1.6, Math.max(0.85, 0.92 / rel)); // pouca cor visível: não confia na régua
    if (nome === 'base' || nome === 'boca_fechada' || nome === 'olhos_fechados' || nome === 'boca_aberta') k = 1;
    k *= (AJUSTES[id] || {})[nome] || 1;
    if (FIXOS[id] && FIXOS[id][nome]) k = FIXOS[id][nome];
    res[id][nome] = Math.round(k * 100) / 100;
  }
}
writeFileSync(saida, JSON.stringify(res, null, 1));
for (const [id, m] of Object.entries(res)) console.log(id + ': ' + Object.entries(m).map(([n, k]) => `${n}=${k}`).join(' '));
