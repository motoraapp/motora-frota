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
const AJUSTES = { elvis: {}, belinha: {}, maya: {} };
// valores FIXOS (ignoram o cálculo): poses em que a régua da cor-marca engana (cabeça de costas ou muito virada)
const FIXOS = {
  elvis: {
    lingua: 0.94, andando_1: 1.00, andando_2: 0.95, andando_passo_1: 0.99, andando_passo_2: 0.99, andando_passo_4: 0.97,
    bebendo: 0.97, comendo: 0.98, correndo_1: 1.22, correndo_2: 1.18, correndo_entre_1: 0.97, correndo_entre_2: 1.10, correndo_inicio: 1.06,
    deitando_transicao: 1.00, dormindo_deitado: 1.00, encostando_giro_frente: 0.96, fazendo_xixi: 1.00,
    latindo: 0.96, mexendo_cabeca: 1.00, rosnando: 0.92, sentado: 1.00, sentando_meio: 0.99, sentindo_calor: 1.00, tremendo_frio: 1.00, virando_costas: 0.96,
    // desenhos novos de 16/11/2026: já vêm no MESMO enquadramento do em pé (topo y100, pés y949) = escala 1,00
    acordando: 1, andando_passo_3: 1, correndo_2_pouso: 1, costas_total: 1, curioso: 1, frente_total: 1, meio_comer: 1, pulo_pouso: 1, pulo_prep: 1,
  },
  belinha: {
    andando_1: 0.96, andando_2: 0.94, andando_frente: 0.99, bebendo: 1.01, comendo: 1.02,
    correndo_1: 1.15, correndo_2: 1.26, dormindo_deitado: 0.97, encostando_giro_frente: 1.00, fazendo_xixi: 1.00,
    latindo: 0.95, mexendo_cabeca: 0.98, rosnando: 0.89, sentado: 0.99, sentindo_calor: 1.00, tremendo_frio: 0.98, virando_costas: 0.98,
    // desenhos novos de 16/11/2026: já vêm no MESMO enquadramento do em pé (topo y100, pés y949) = escala 1,00
    acordando: 1, andando_passo_1: 1, andando_passo_2: 1, andando_passo_3: 1, correndo_entre_1: 1, costas_total: 1, deitando_transicao: 1, frente_total: 1, meio_comer: 1, pulo_pouso: 1, pulo_prep: 1, sentando_meio: 1,
  },
  maya: {
    sentado: 0.94, sentado_olhos_fechados: 0.94,
    andando_1: 0.96, andando_2: 0.94, andando_frente: 0.93, bebendo: 1.00, comendo: 0.96,
    correndo_1: 1.04, correndo_2: 1.12, deitando_transicao: 0.97, dormindo_deitado: 1.05, encostando_giro_frente: 0.96, fazendo_xixi: 1.03,
    latindo: 0.95, mexendo_cabeca: 1.00, pedindo_patas_no_ar: 1.00, pedindo_patas_no_ar_2: 1.00,
    rosnando: 1.02, sentindo_calor: 0.95, tremendo_frio: 1.05, virando_costas: 1.02,
  },
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
