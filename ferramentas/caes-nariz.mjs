// Acha o NARIZ (mancha escura redonda mais à frente do focinho) dos desenhos de comer e beber, para o cachorro parar com o nariz
// DENTRO da tigela. Lê ar/caes/img/sprites (gerados) e grava ar/caes/narizes.js: distância do nariz até o meio do corpo (px do PNG,
// para a frente). Rode depois de caes-sprites.ps1:  node ferramentas/caes-nariz.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const { SPRITES } = await import(pathToFileURL(join(raiz, 'ar/caes/sprites-dados.js')).href);
function lerPng(arq) {
  const b = readFileSync(arq); let p = 8, w = 0, h = 0; const idat = [];
  while (p < b.length) { const n = b.readUInt32BE(p), t = b.toString('latin1', p + 4, p + 8), d = b.subarray(p + 8, p + 8 + n); if (t === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); } if (t === 'IDAT') idat.push(d); if (t === 'IEND') break; p += 12 + n; }
  const z = inflateSync(Buffer.concat(idat)), lin = w * 4, px = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) { const f = z[y * (lin + 1)], o = y * lin, s = y * (lin + 1) + 1; for (let i = 0; i < lin; i++) { const a = i >= 4 ? px[o + i - 4] : 0, c = y ? px[o - lin + i] : 0, d = i >= 4 && y ? px[o - lin + i - 4] : 0, x = z[s + i]; let v; if (f === 0) v = x; else if (f === 1) v = x + a; else if (f === 2) v = x + c; else if (f === 3) v = x + ((a + c) >> 1); else { const pp = a + c - d, pa = Math.abs(pp - a), pb = Math.abs(pp - c), pc = Math.abs(pp - d); v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? c : d); } px[o + i] = v & 255; } }
  return { w, h, px };
}
const res = {};
for (const id of Object.keys(SPRITES)) {
  res[id] = {};
  for (const pose of ['comendo', 'bebendo']) {
    const S = SPRITES[id][pose]; if (!S) continue;
    const { w, h, px } = lerPng(join(raiz, 'ar/caes/img/sprites', id, pose + '.png'));
    const ok = (i) => px[i * 4 + 3] > 200 && px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2] < 150;
    const vis = new Uint8Array(w * h); let melhor = null;
    for (let i0 = 0; i0 < w * h; i0++) {
      if (vis[i0] || !ok(i0)) continue; const st = [i0]; vis[i0] = 1; let n = 0, sx = 0, x1 = w, y1 = h, x2 = 0, y2 = 0;
      while (st.length) { const i = st.pop(); n++; const x = i % w, y = (i / w) | 0; sx += x; if (x < x1) x1 = x; if (x > x2) x2 = x; if (y < y1) y1 = y; if (y > y2) y2 = y;
        for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && !vis[j] && ok(j)) { vis[j] = 1; st.push(j); } }
      const bw = x2 - x1 + 1, bh = y2 - y1 + 1;
      if (n >= 35 && n / (bw * bh) > 0.5 && bw / bh > 0.5 && bw / bh < 2) { const cx = sx / n; if (!melhor || cx > melhor.cx) melhor = { cx, n }; } // o mais à frente (desenhos olham para a direita)
    }
    res[id][pose] = melhor ? Math.round((melhor.cx - S[2]) * 10) / 10 : null;
  }
}
writeFileSync(join(raiz, 'ar/caes/narizes.js'), '// GERADO por ferramentas/caes-nariz.mjs (não editar à mão): distância (px do PNG) do nariz até o meio do corpo, para a frente\nexport const NARIZ = ' + JSON.stringify(res) + ';\n');
console.log(JSON.stringify(res));
