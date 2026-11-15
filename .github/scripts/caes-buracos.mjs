// Procura buracos nos cachorros em movimento: monta as peças (corpo, patas, rabo, cabeça, orelhas, boca) em cada ação e
// quadro, como o desenho.js faz no canvas, e acha "furos" = fundo fechado por dentro do cachorro que não existe no desenho
// do dono (ex.: o vão entre o rabo e as costas, um furinho na barriga quando a pata gira). Usado por teste-ar-caes-pecas.mjs.
import { angulosDe, poseSentada } from '../../ar/caes/movimento.js';

export const ACOES = [['idle', 2.4], ['walk', 0.8], ['run', 0.45], ['sit', 2.4], ['lie', 2.4], ['sleep', 4.8], ['eat', 0.698], ['drink', 0.483],
  ['bark', 0.45], ['pant', 0.4], ['jump', 0.8], ['playbow', 1.2], ['shiver', 0.2], ['pee', 1.2], ['fight', 0.785], ['curl', 2.4]];

const mul = (A, B) => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3],
  A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];
const rot = (p, a) => { const c = Math.cos(a), s = Math.sin(a); return [c, s, -s, c, p[0] - c * p[0] + s * p[1], p[1] - s * p[0] - c * p[1]]; };
const inv = (M) => { const det = M[0] * M[3] - M[1] * M[2], a = M[3] / det, b = -M[1] / det, c = -M[2] / det, d = M[0] / det; return [a, b, c, d, -(a * M[4] + c * M[5]), -(b * M[4] + d * M[5])]; };
const I = [1, 0, 0, 1, 0, 0];

// lista [peça, matriz] na ordem em que o desenho.js desenha
export function pecasNaPose(B, A) {
  const out = [], pata = (L) => { const m1 = mul(I, rot(L.hip, A['p' + L.k])), m2 = mul(m1, rot(L.j, A['j' + L.k])), m3 = mul(m2, rot(L.w, A['w' + L.k])); out.push([L.coxa, m1], [L.canela, m2], [L.pe, m3]); };
  for (const L of B.legs) if (L.longe) pata(L);
  if (B.rabo) { const m = rot(B.rabo.p, A.rabo); if (B.rabo.ponta) out.push([B.rabo.ponta, mul(m, rot(B.rabo.p2, A.rabo2))]); out.push([B.rabo.base, m]); }
  out.push([B.corpo, I]);
  for (const L of B.legs) if (!L.longe) pata(L);
  const mc = rot(B.cab.p, A.cab + A.pesc); out.push([B.cabeca, mc]);
  if (B.mandibula) out.push([B.mandibula.c, mul(mc, rot(B.mandibula.p, A.boca * 0.8))]);
  for (const o of B.orelhas) out.push([o.c, mul(mc, rot(o.p, o.i === 0 ? A.orA : A.orB))]);
  return out.filter(([pc]) => pc);
}

const M = 40; // margem em volta do desenho
// máscara (opacidade > 20) da pose, no tamanho do desenho + margem; corta abaixo do chão (base do desenho + 2), como o app
export function mascaraPose(B, lista) {
  const W = B.nw + 2 * M, H = B.nh + 2 * M, m = new Uint8Array(W * H), chao = B.nh + 2 + M;
  for (const [pc, T] of lista) {
    const d = pc.c._d, R = inv(T); let x1 = 1e9, y1 = 1e9, x2 = -1e9, y2 = -1e9;
    for (const [u, v] of [[pc.x, pc.y], [pc.x + d.width, pc.y], [pc.x, pc.y + d.height], [pc.x + d.width, pc.y + d.height]]) {
      const X = T[0] * u + T[2] * v + T[4], Y = T[1] * u + T[3] * v + T[5]; x1 = Math.min(x1, X); x2 = Math.max(x2, X); y1 = Math.min(y1, Y); y2 = Math.max(y2, Y);
    }
    for (let Y = Math.max(0, Math.floor(y1 + M)); Y < Math.min(chao, Math.ceil(y2 + M)); Y++) for (let X = Math.max(0, Math.floor(x1 + M)); X < Math.min(W, Math.ceil(x2 + M)); X++) {
      const x = X - M + 0.5, y = Y - M + 0.5, u = Math.floor(R[0] * x + R[2] * y + R[4]) - pc.x, v = Math.floor(R[1] * x + R[3] * y + R[5]) - pc.y;
      if (u >= 0 && v >= 0 && u < d.width && v < d.height && d.data[(v * d.width + u) * 4 + 3] > 20) m[Y * W + X] = 1;
    }
  }
  return { m, W, H };
}
// fundo fechado por dentro (não alcança a borda): os pixels de cada furo
export function furos({ m, W, H }) {
  const vis = new Uint8Array(W * H), f = [];
  for (let i = 0; i < W * H; i++) { const x = i % W, y = (i / W) | 0; if ((x === 0 || y === 0 || x === W - 1 || y === H - 1) && !m[i]) { vis[i] = 1; f.push(i); } }
  while (f.length) { const i = f.pop(), x = i % W, y = (i / W) | 0; for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && !vis[j] && !m[j]) { vis[j] = 1; f.push(j); } }
  const grupos = [], vis2 = new Uint8Array(W * H);
  for (let i0 = 0; i0 < W * H; i0++) {
    if (m[i0] || vis[i0] || vis2[i0]) continue; const px = [i0]; vis2[i0] = 1;
    for (let q = 0; q < px.length; q++) { const i = px[q], x = i % W, y = (i / W) | 0; for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && !m[j] && !vis[j] && !vis2[j]) { vis2[j] = 1; px.push(j); } }
    grupos.push(px);
  }
  return grupos;
}

// a "pele" da axila (polígono da cor do pelo) também cobre
let pelePontos = null, peleRabo = null;
try { ({ pelePontos, peleRabo } = await import('../../ar/caes/desenho.js')); } catch { /* sem canvas de mentira: sem pele */ }
function pintarPoli({ m, W, H }, P) {
  const ys = P.map((p) => p[1]), y1 = Math.max(0, Math.floor(Math.min(...ys) + M)), y2 = Math.min(H - 1, Math.ceil(Math.max(...ys) + M));
  for (let Y = y1; Y <= y2; Y++) {
    const y = Y - M + 0.5, xs = [];
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y)) xs.push(xi + ((y - yi) * (xj - xi)) / (yj - yi)); }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) for (let X = Math.max(0, Math.ceil(xs[k] + M - 0.5)); X <= Math.min(W - 1, Math.floor(xs[k + 1] + M - 0.5)); X++) m[Y * W + X] = 1;
  }
}

// furos novos (que o desenho do dono não tem) em todas as ações e quadros. bonecoDe(cfg, sentada) devolve as peças.
// minimo 6 px: abaixo disso é arredondamento da conferência (peça inteira girada amostrada pixel a pixel), não buraco
export function buracosNovos(cfg, bonecoDe, { quadros = 12, minimo = 6 } = {}) {
  const achados = [];
  for (const sent of [false, true]) {
    if (sent && !cfg.poseSentada) continue;
    const B = bonecoDe(cfg, sent); if (!B) continue;
    const repouso = mascaraPose(B, pecasNaPose(B, new Proxy({}, { get: () => 0 })));
    const furoRep = new Uint8Array(repouso.W * repouso.H); for (const g of furos(repouso)) for (const i of g) furoRep[i] = 1;
    for (const [a0, ciclo] of ACOES) {
      const acao = a0 === 'pee' ? (cfg.sexo === 'M' ? 'peeM' : 'peeF') : a0;
      if (!!cfg.poseSentada && poseSentada(cfg, acao) !== sent) continue;
      for (let i = 0; i < quadros; i++) {
        const dt = (ciclo * i) / quadros;
        const d = { cfg, tam: 60, p: new Float32Array(30), t: 10 + dt, tA: dt, tAnt: 0, fase: (Math.PI * 2 * i) / quadros, acao, acaoAnt: acao, mist: 1, energia: cfg.energia, alegria: 0.8, sem: 1.3 };
        const A = angulosDe(d), lista = pecasNaPose(B, A), mp = mascaraPose(B, lista);
        if (pelePontos) for (const L of B.legs) if (L.pele) pintarPoli(mp, pelePontos(L, A['p' + L.k]));
        if (peleRabo && B.rabo && B.rabo.pele) pintarPoli(mp, peleRabo(B.rabo, A.rabo));
        for (const g of furos(mp)) {
          // furo que já existe no desenho (ex.: o miolo da volta do rabo), levado junto por alguma peça: não conta
          const legit = g.filter((idx) => {
            const x = (idx % mp.W) - M + 0.5, y = ((idx / mp.W) | 0) - M + 0.5;
            return lista.some(([, T]) => { const R = inv(T), u = Math.floor(R[0] * x + R[2] * y + R[4]) + M, v = Math.floor(R[1] * x + R[3] * y + R[5]) + M; return u >= 0 && v >= 0 && u < repouso.W && v < repouso.H && furoRep[v * repouso.W + u]; });
          }).length;
          // só conta fundo onde o desenho do dono tinha corpo (não o espaço entre patas que se cruzam nem onde a pata saiu)
          const dentroCorpo = g.filter((idx) => {
            const x = (idx % mp.W) - M, y = ((idx / mp.W) | 0) - M;
            if (!repouso.m[(y + M) * repouso.W + x + M]) return false;
            // o espaço entre as partes de uma pata dobrada (sentar, espreguiçar) é normal: só vigia corpo, cabeça, rabo e emendas
            return !B.legs.some((L) => y >= L.ini - 4 && (L.naPata(x, y) || L.extra.has(y * B.nw + x)));
          }).length;
          const novo = Math.min(g.length - legit, dentroCorpo);
          if (novo >= minimo) { const i0 = g[0]; achados.push({ acao, quadro: i, px: novo, x: (i0 % mp.W) - M, y: ((i0 / mp.W) | 0) - M, sentada: sent }); }
        }
      }
    }
  }
  return achados;
}
