// Teste das peças dos cachorros (ar/caes/desenho.js, 15/11/2026): o desenho do dono é cortado em peças que giram.
// Defeitos que já aconteceram e não podem voltar:
//  - pontinhos parados no chão: pedaço do pé de uma pata ficava no corpo (ou com outra pata) e não andava junto;
//  - fiapos entre as patas da frente da Belinha: a beira da pata ficava no corpo;
//  - palitinho / degrau na nuca (Elvis e Maya): as costas giravam junto com a cabeça.
// Regra conferida: o corpo e cada pata (coxa + canela + pé) são UM pedaço só, e a cabeça não leva a nuca.
// Roda sem navegador: lê os PNG com zlib (Node puro) e simula o canvas. Uso: node .github/scripts/teste-ar-caes-pecas.mjs
import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '../..');

// canvas de mentira: só guarda o que a peça escreve
globalThis.document = {
  createElement: () => ({
    width: 0, height: 0,
    getContext() { const cv = this; return { createImageData: (w, h) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }), putImageData(d) { cv._d = d; } }; },
  }),
};
const { montarDe } = await import('../../ar/caes/desenho.js');
const { CACHORROS } = await import('../../ar/caes/config.js');

// PNG RGBA 8 bits sem entrelaçamento (como os de ar/caes/img)
function lerPng(arq) {
  const b = readFileSync(arq); let p = 8, w = 0, h = 0, tipo = 0, prof = 0; const idat = [];
  while (p < b.length) {
    const n = b.readUInt32BE(p), t = b.toString('latin1', p + 4, p + 8), d = b.subarray(p + 8, p + 8 + n);
    if (t === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); prof = d[8]; tipo = d[9]; if (d[12]) throw new Error(arq + ': PNG entrelaçado'); }
    if (t === 'IDAT') idat.push(d); if (t === 'IEND') break; p += 12 + n;
  }
  const bpp = { 6: 4, 2: 3 }[tipo]; if (!bpp || prof !== 8) throw new Error(arq + ': formato de PNG não suportado (tipo ' + tipo + ')');
  const z = inflateSync(Buffer.concat(idat)), lin = w * bpp, out = new Uint8ClampedArray(w * h * 4), cru = new Uint8Array(w * h * bpp);
  for (let y = 0; y < h; y++) {
    const f = z[y * (lin + 1)], o = y * lin, s = y * (lin + 1) + 1;
    for (let i = 0; i < lin; i++) {
      const a = i >= bpp ? cru[o + i - bpp] : 0, c = y ? cru[o - lin + i] : 0, d = i >= bpp && y ? cru[o - lin + i - bpp] : 0, x = z[s + i];
      let v; if (f === 0) v = x; else if (f === 1) v = x + a; else if (f === 2) v = x + c; else if (f === 3) v = x + ((a + c) >> 1);
      else { const pp = a + c - d, pa = Math.abs(pp - a), pb = Math.abs(pp - c), pc = Math.abs(pp - d); v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? c : d); }
      cru[o + i] = v & 255;
    }
  }
  for (let i = 0; i < w * h; i++) { out[i * 4] = cru[i * bpp]; out[i * 4 + 1] = cru[i * bpp + 1]; out[i * 4 + 2] = cru[i * bpp + 2]; out[i * 4 + 3] = bpp === 4 ? cru[i * bpp + 3] : 255; }
  return { width: w, height: h, data: out };
}

// pedaços (4 vizinhos, opacidade > 20) de uma máscara do tamanho do desenho; ignora os < 6 px (invisíveis)
function pedacos(m, w, h) {
  const vis = new Uint8Array(w * h), out = [];
  for (let i0 = 0; i0 < w * h; i0++) {
    if (vis[i0] || !m[i0]) continue; const f = [i0]; vis[i0] = 1; let n = 0, x1 = w, y1 = h;
    while (f.length) { const i = f.pop(); n++; const x = i % w, y = (i / w) | 0; if (x < x1) x1 = x; if (y < y1) y1 = y;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && !vis[j] && m[j]) { vis[j] = 1; f.push(j); } }
    if (n >= 6) out.push(`${n}px em x${x1} y${y1}`);
  }
  return out;
}
function mascara(pecas, w, h) {
  const m = new Uint8Array(w * h);
  for (const pc of pecas) { if (!pc) continue; const d = pc.c._d; for (let y = 0; y < d.height; y++) for (let x = 0; x < d.width; x++) if (d.data[(y * d.width + x) * 4 + 3] > 20) m[(y + pc.y) * w + x + pc.x] = 1; }
  return m;
}

let erros = 0;
const falha = (t) => { erros++; console.log('  ✗ ' + t); };
for (const cfg of CACHORROS) {
  const D = lerPng(join(raiz, 'ar/caes/img', cfg.imagem)), B = montarDe(cfg, { ossos: cfg.ossos }, D), w = B.nw, h = B.nh;
  console.log(`${cfg.nome}: ${B.legs.length} patas`);
  if (B.legs.length !== 4) falha(`${cfg.nome}: achou ${B.legs.length} patas em vez de 4`);
  const corpo = pedacos(mascara([B.corpo], w, h), w, h);
  if (corpo.length !== 1) falha(`${cfg.nome}: o corpo tem ${corpo.length} pedaços (${corpo.join(', ')}); pedaço solto fica parado enquanto a pata anda`);
  for (const L of B.legs) {
    const p = pedacos(mascara([L.coxa, L.canela, L.pe], w, h), w, h);
    if (p.length !== 1) falha(`${cfg.nome}: a pata ${L.k} tem ${p.length} pedaços (${p.join(', ')}); pedaço de outra pata ou do chão`);
  }
  // 2º rabo ao sentar (15/11/2026): a coxa não pode levar nada acima do quadril (o contorno do bumbum girava junto e saía para trás)
  for (const L of B.legs) {
    const m = mascara([L.coxa], w, h); let n = 0;
    for (let y = 0; y < Math.max(0, Math.min(L.hip[1], L.corte) - 3); y++) for (let x = 0; x < w; x++) n += m[y * w + x]; // acima do começo da pata
    if (n) falha(`${cfg.nome}: a coxa da pata ${L.k} leva ${n} px acima do quadril (vira um 2º rabo ao sentar)`);
  }
  const nuca = cfg.ossos.cabeca.nuca;
  if (nuca) {
    const m = mascara([B.cabeca], w, h); let n = 0;
    for (let y = nuca[1] + 1; y < h; y++) for (let x = 0; x < nuca[0]; x++) n += m[y * w + x];
    if (n) falha(`${cfg.nome}: a cabeça leva ${n} px da nuca (as costas giram junto e viram um palitinho)`);
  }
}
// buracos com o cachorro em movimento: monta cada ação em 12 quadros e procura fundo aparecendo por dentro do desenho
// (vão entre o rabo e as costas, furinho na barriga ao girar a pata, buraco nas costas quando o cabelo mexe)
const { buracosNovos, ACOES } = await import('./caes-buracos.mjs');
const cache = {};
const boneco = (cfg, sent) => {
  const k = cfg.id + sent; if (k in cache) return cache[k];
  const pose = sent ? cfg.poseSentada : { ossos: cfg.ossos, imagem: cfg.imagem };
  return (cache[k] = montarDe(cfg, pose, lerPng(join(raiz, 'ar/caes/img', pose.imagem))));
};
for (const cfg of CACHORROS) {
  const b = buracosNovos(cfg, boneco);
  const porAcao = {}; for (const x of b) (porAcao[x.acao] ||= []).push(`q${x.quadro}:${x.px}px@${x.x},${x.y}`);
  for (const [a, l] of Object.entries(porAcao)) falha(`${cfg.nome} ${a}: buraco aparecendo em ${l.length} quadro(s): ${l.slice(0, 4).join(' ')}`);
  if (!b.length) console.log(`${cfg.nome}: nenhum buraco nas ${ACOES.length} ações (12 quadros cada)`);
}
// o pé de uma pata entrando na região da outra não pode virar o começo dela (pontinhos do Elvis)
const elvis = CACHORROS.find((c) => c.id === 'elvis');
if (!elvis.ossos.cabeca.nuca) falha('Elvis sem nuca em config.js (o palitinho na nuca volta ao comer e dormir)');
const maya = CACHORROS.find((c) => c.id === 'maya');
if (!maya.ossos.cabeca.nuca) falha('Maya sem nuca em config.js (degrau nas costas ao correr e pular)');

if (erros) { console.log(`\n${erros} problema(s) nas peças dos cachorros`); process.exit(1); }
console.log('\nPeças dos cachorros OK: corpo e patas inteiros, sem pedaço solto, nuca no corpo');
