// Desenho dos cachorros (canvas 2D, sem WebGL). Nada é esticado nem borrado: tudo é o desenho do dono, recortado em PEÇAS
// INTEIRAS que só giram — corpo, cabeça, orelhas, rabo, boca e, em cada pata, coxa, canela e pé. Cada junta tem uma "tampinha"
// redonda (a peça de baixo cobre um círculo em volta do ponto onde gira), assim a emenda não aparece.
// As patas são achadas no desenho seguindo cada uma de baixo para cima, a partir do pé (sem pegar barriga nem a pata vizinha).
// Olhos fechados (piscar, dormir) e boca aberta/fechada (comer, latir, ofegar) vêm dos desenhos do dono, por cima da cabeça.
// O movimento (ângulos de cada parte) vem de movimento.js. As imagens olham para a direita; o app espelha ao andar para a esquerda.
import { transformar, piscar, poseSentada, angulosDe } from './movimento.js';
import { POSES_DESENHADAS } from './poses-desenhadas.js';

const ALT = 1.3; // altura do desenho = tamanho × 1,3
export const alturaCabeca = () => ALT;

const IMG = {}, BONECO = {};
function img(arq) {
  if (!IMG[arq]) { const i = new Image(); i.decoding = 'async'; i.src = new URL('./img/' + arq, import.meta.url).href; IMG[arq] = i; }
  return IMG[arq];
}
const pronta = (i) => i && i.complete && i.naturalWidth > 0;
export function precarregar(cfgs) {
  for (const c of cfgs) {
    img(c.imagem); if (c.olhos) img(c.olhos); if (c.boca2) img(c.boca2.imagem); if (c.poseSentada) img(c.poseSentada.imagem);
    for (const p of Object.values(POSES_DESENHADAS[c.id] || {})) img(p.imagem);
  }
}

// ---------- montar as peças (uma vez, quando a imagem carrega) ----------
const valida = (r) => r && r[2] > 0 && r[3] > 0;
const dentro = (x, y, r) => x >= r[0] && x < r[2] && y >= r[1] && y < r[3];
const encolhe0 = (r, m) => [r[0] + m, r[1] + m, r[2] - m, r[3] - m];
// ponto dentro do polígono [[x, y], ...]
function noPoli(x, y, pts) {
  let d = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d;
  }
  return d;
}
// pixel de traço (contorno escuro do desenho)
const escuro = (D, x, y) => { const i = (y * D.width + x) * 4, s = D.data; return s[i] + s[i + 1] + s[i + 2] < 330; };
// perto do polígono (até m px): a peça do rabo leva uma beirada por baixo do corpo, assim ao girar não abre vão
const pertoPoli = (x, y, pts, m) => noPoli(x, y, pts) || [[m, 0], [-m, 0], [0, m], [0, -m], [m * 0.7, m * 0.7], [-m * 0.7, m * 0.7], [m * 0.7, -m * 0.7], [-m * 0.7, -m * 0.7]].some(([a, b]) => noPoli(x + a, y + b, pts));
function tela(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function dadosDe(im) { const c = tela(im.naturalWidth, im.naturalHeight), g = c.getContext('2d'); g.drawImage(im, 0, 0); return g.getImageData(0, 0, c.width, c.height); }
// peça = só os pixels onde fica(x, y) é verdadeiro, recortada no tamanho dela: { c: tela, x, y }
function peca(dados, fica, pintar) {
  const w = dados.width, h = dados.height, s = dados.data; let x1 = w, y1 = h, x2 = -1, y2 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (s[(y * w + x) * 4 + 3] && fica(x, y)) { if (x < x1) x1 = x; if (x > x2) x2 = x; if (y < y1) y1 = y; if (y > y2) y2 = y; }
  if (x2 < 0) return null;
  const cw = x2 - x1 + 1, ch = y2 - y1 + 1, c = tela(cw, ch), g = c.getContext('2d'), out = g.createImageData(cw, ch), o = out.data;
  for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) {
    if (!fica(x, y)) continue;
    const i = (y * w + x) * 4, k = ((y - y1) * cw + (x - x1)) * 4;
    if (pintar && pintar(x, y)) { o[k] = 82; o[k + 1] = 26; o[k + 2] = 31; o[k + 3] = s[i + 3]; } // fundo da boca
    else { o[k] = s[i]; o[k + 1] = s[i + 1]; o[k + 2] = s[i + 2]; o[k + 3] = s[i + 3]; }
  }
  g.putImageData(out, 0, 0); return { c, x: x1, y: y1 };
}
const por = (c, pc) => { if (pc) c.drawImage(pc.c, pc.x, pc.y); };
// trecho opaco da pata numa altura y, perto de xc: [meio, largura]
// semBorda: ignora trecho que está mais fora que dentro da região (é o pé de outra pata entrando nela)
function trecho(dados, r, y, xc, semBorda) {
  const w = dados.width, s = dados.data, yy = Math.max(0, Math.min(dados.height - 1, Math.round(y)));
  const x0 = Math.max(0, Math.round(r[0])), x1 = Math.min(w - 1, Math.round(r[2]));
  let runs = []; let a = -1;
  for (let x = x0; x <= x1; x++) {
    const op = s[(yy * w + x) * 4 + 3] > 110;
    if (op && a < 0) a = x; if ((!op || x === x1) && a >= 0) { runs.push([a, op ? x : x - 1]); a = -1; }
  }
  if (semBorda) runs = runs.filter((ru) => {
    let a2 = ru[0], b2 = ru[1]; const op = (x) => s[(yy * w + x) * 4 + 3] > 110;
    while (a2 > 0 && op(a2 - 1)) a2--; while (b2 < w - 1 && op(b2 + 1)) b2++;
    return (ru[1] - ru[0] + 1) / (b2 - a2 + 1) >= 0.5;
  });
  if (!runs.length) return null;
  let m = runs[0], md = 1e9; for (const ru of runs) { const c = (ru[0] + ru[1]) / 2, dd = Math.abs(c - xc); if (dd < md) { md = dd; m = ru; } }
  return [(m[0] + m[1]) / 2, m[1] - m[0] + 1, m[0], m[1]];
}
// segue a pata de baixo (pé) para cima até o quadril: em cada linha, o trecho opaco que continua o de baixo
function seguirPata(D, pe, nh) {
  const r = pe.r; let y = nh - 1, t = null;
  for (; y > pe.p[1]; y--) { t = trecho(D, r, y, pe.p[0], true); if (t && t[1] >= 3) break; t = null; }
  if (!t) return null;
  const linhas = new Map(); let c = t[0], w = t[1];
  for (let yy = y; yy >= pe.p[1]; yy--) {
    const u = trecho(D, r, yy, c); if (!u) break;
    let a = u[2], b = u[3]; const lim = Math.max(w * 1.3 + 2, 6);
    if (b - a + 1 > lim) { a = Math.max(a, Math.round(c - lim / 2)); b = Math.min(b, Math.round(c + lim / 2)); } // juntou com barriga ou outra pata
    linhas.set(yy, [a, b]); c = (a + b) / 2; w = w * 0.85 + (b - a + 1) * 0.15;
  }
  return { fundo: y, linhas };
}

// pedacinhos soltos (ilhas pequenas de pixels) abaixo de yMin: marca para tirar
function soltos(D, fica, yMin, maxArea) {
  const w = D.width, h = D.height, s = D.data, vis = new Uint8Array(w * h), tirar = new Uint8Array(w * h), fila = new Int32Array(w * h);
  const ok = (i) => s[i * 4 + 3] > 20 && fica(i % w, (i / w) | 0);
  for (let i0 = Math.floor(yMin) * w; i0 < w * h; i0++) {
    if (vis[i0] || !ok(i0)) continue;
    let n = 0, ini = 0, fim = 0, topo = h; fila[fim++] = i0; vis[i0] = 1;
    while (ini < fim) { const i = fila[ini++]; n++; const y = (i / w) | 0, x = i % w; if (y < topo) topo = y;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && !vis[j] && ok(j)) { vis[j] = 1; fila[fim++] = j; } }
    if (n < maxArea && topo >= yMin) for (let k = 0; k < fim; k++) tirar[fila[k]] = 1;
  }
  return tirar;
}

// separa as ilhas (pedaços que não encostam no maior) cujo alto fica abaixo de yMin: { ilhas: [{px, cx, cy}], fora: marca de cada pixel delas }
function separarIlhas(D, fica, yMin) {
  const w = D.width, h = D.height, s = D.data, vis = new Uint8Array(w * h), fora = new Uint8Array(w * h), grupos = [];
  const ok = (i) => s[i * 4 + 3] > 20 && fica(i % w, (i / w) | 0);
  for (let i0 = 0; i0 < w * h; i0++) {
    if (vis[i0] || !ok(i0)) continue;
    const px = [i0]; vis[i0] = 1; let topo = h, sx = 0, sy = 0;
    for (let q = 0; q < px.length; q++) { const i = px[q], y = (i / w) | 0, x = i % w; if (y < topo) topo = y; sx += x; sy += y;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && !vis[j] && ok(j)) { vis[j] = 1; px.push(j); } }
    grupos.push({ px, topo, cx: sx / px.length, cy: sy / px.length });
  }
  grupos.sort((a, b) => b.px.length - a.px.length);
  const ilhas = grupos.slice(1).filter((g) => g.topo >= yMin);
  for (const g of ilhas) for (const i of g.px) fora[i] = 1;
  return { ilhas, fora };
}

// peça sem as ilhas pequenas (pedacinhos soltos)
function limpa(D, fica, maxArea = 45) { const sol = soltos(D, fica, 0, maxArea), w = D.width; return peca(D, (x, y) => fica(x, y) && !sol[y * w + x]); }

function montar(cfg, pose, im, extra) { return montarDe(cfg, pose, dadosDe(im), extra); }
// D = pixels do desenho ({ width, height, data RGBA }); exportada para o teste (.github/scripts/teste-ar-caes-pecas.mjs)
export function montarDe(cfg, pose, D, extra = {}) {
  const os = pose.ossos, nw = D.width, nh = D.height;
  const legs = [], ePata = new Uint8Array(nw * nh);
  for (let k = 0; k < 4; k++) {
    const pe = os.pernas[k]; if (!valida(pe.r)) continue;
    const seg = seguirPata(D, pe, nh); if (!seg) continue;
    const corte = pe.p[1] + (pe.corte || 2);
    // pata que começa abaixo do quadril (pelo comprido): gira logo abaixo do corte, senão o corte reto do corpo aparece ao girar
    const hip = pe.corte ? [pe.p[0], corte + 5] : pe.p, jy = Math.round(hip[1] + (seg.fundo - hip[1]) * 0.5), wy = Math.round(seg.fundo - Math.max(10, (seg.fundo - hip[1]) * 0.16));
    const meio = (y) => { const l = seg.linhas.get(y); return l ? (l[0] + l[1]) / 2 : hip[0]; }, larg = (y) => { const l = seg.linhas.get(y); return l ? l[1] - l[0] + 1 : 8; };
    const j = [meio(jy), jy], w = [meio(wy), wy];
    const folga = (y) => (y >= wy - 2 ? 5 : 2); // no pé pega os dedinhos inteiros
    const naPata = (x, y) => { if (y < corte) return false; const l = seg.linhas.get(y); return !!l && x >= l[0] - folga(y) && x <= l[1] + folga(y) && x >= pe.r[0] && x <= pe.r[2]; };
    const banda = cfg.beiraPata && (k === 1 || k === 3) ? 4 : pe.corte ? 16 : 14; // pata de longe (atrás do corpo): faixa curta, senão sobra pendurada ao correr // o corpo guarda o alto da pata (por baixo): ao girar, a "axila" não abre fresta
    for (const [y, l] of seg.linhas) if (y >= corte + banda) for (let x = Math.max(0, l[0] - folga(y), Math.floor(pe.r[0])); x <= Math.min(nw - 1, l[1] + folga(y), Math.ceil(pe.r[2])); x++) ePata[y * nw + x] = 1;
    for (let y = seg.fundo + 1; y < Math.min(nh, seg.fundo + 4); y++) { const l = seg.linhas.get(seg.fundo); if (l) for (let x = Math.max(0, l[0] - 5); x <= Math.min(nw - 1, l[1] + 5); x++) ePata[y * nw + x] = 1; } // sombrinha/linha embaixo do pé
    const rq = larg(corte + 3) * 0.75 + 2, rj = larg(jy) * 0.62 + 1, rw = larg(wy) * 0.62 + 1;
    legs.push({ k, hip, j, w, longe: k === 1 || k === 3, naPata, meio, corte, jy, wy, rq, rj, rw, extra: new Set(), seg, ini: corte + banda });
  }
  const cab = os.cabeca, orelhas = os.orelhas.filter((o) => valida(o.r)), ra = valida(os.rabo && os.rabo.r) ? os.rabo : null;
  const nuca = (x, y) => !!cab.nuca && x < cab.nuca[0] && y > cab.nuca[1]; // costas dentro da região da cabeça: não giram com ela (viravam um palitinho)
  // na faixa do alto da pata que o corpo guarda, o contorno escuro da pata fica só com a pata (no corpo ele ficava parado e,
  // com a pata balançando, aparecia como risquinhos pendurados embaixo da barriga)
  const contornoBanda = (x, y) => !!cfg.beiraPata && legs.some((L) => { if (y < L.corte || y >= L.ini) return false; const l = L.seg.linhas.get(y); return !!l && ((x >= l[0] - 2 && x <= l[0] + 2) || (x >= l[1] - 2 && x <= l[1] + 2)) && escuro(D, x, y); }); // só a beira (as manchas do Elvis ficam)
  const fica00 = (x, y) => !ePata[y * nw + x] && !contornoBanda(x, y) && !(dentro(x, y, cab.r) && y < cab.r[3] - (cfg.bandaCabeca || 5) && !nuca(x, y)) && !orelhas.some((o) => dentro(x, y, o.r)) && !(ra && (ra.poli ? noPoli(x, y, ra.poli) : dentro(x, y, y < ra.p[1] ? ra.r : encolhe0(ra.r, 3)) && Math.hypot(x - ra.p[0], y - ra.p[1]) > 12)); // acima da base do rabo o corpo não guarda faixa (o contorno do rabo ficava como um tracinho nas costas)
  // beira da pata: onde duas patas se encostam no desenho o rastreio corta a pata mais fina, e a beira ficava no corpo, parada,
  // como um fiapo entre as patas quando elas andam. Tudo que fica até 6 px de uma pata (abaixo da faixa do corpo) vai com a mais perto.
  const beira = new Uint8Array(nw * nh), M = 6;
  for (const L of legs) for (const [y, l] of L.seg.linhas) {
    if (y < L.ini) continue;
    for (let x = Math.max(0, l[0] - M); x <= Math.min(nw - 1, l[1] + M); x++) {
      const i = y * nw + x; if (beira[i] || !D.data[i * 4 + 3] || !fica00(x, y)) continue;
      let melhor = null, md = 1e9;
      for (const L2 of legs) { if (y < L2.ini) continue; const l2 = L2.seg.linhas.get(y); if (!l2) continue; const dd = x < l2[0] ? l2[0] - x : x > l2[1] ? x - l2[1] : 0; if (dd < md) { md = dd; melhor = L2; } }
      // perto da barriga (até 16 px abaixo do começo da pata) a beira fica também no corpo, por baixo: senão abre furinho ao girar
      if (melhor && md <= M) { melhor.extra.add(i); if (y >= melhor.ini + 12) beira[i] = 1; else beira[i] = 2; }
    }
  }
  const fica0 = (x, y) => fica00(x, y) && beira[y * nw + x] !== 1;
  // pedaços do corpo que não encostam no corpo (dedinhos e contorno da pata que o rastreio não pegou): vão com a pata mais perto,
  // senão ficariam parados no chão enquanto a pata anda (pontinhos soltos). Os minúsculos (< 6 px) somem.
  // Pedaço solto que está todo dentro da região da cabeça (pontas do cabelo abaixo da faixa) também sai: a cabeça já tem ele.
  const ilhaCorpo = separarIlhas(D, fica0, 0);
  ilhaCorpo.ilhas = ilhaCorpo.ilhas.filter((il) => {
    const naCab = il.px.every((i) => dentro(i % nw, (i / nw) | 0, cab.r));
    if (il.topo >= nh * 0.45 || naCab) return true;
    for (const i of il.px) ilhaCorpo.fora[i] = 0; // pedaço grande lá em cima (ex.: tufo das costas): fica no corpo
    return false;
  });
  for (const il of ilhaCorpo.ilhas) {
    if (il.px.length < 6) continue;
    let melhor = null, md = 1e9;
    for (const L of legs) { if (il.cy < L.corte) continue; const dd = Math.abs(L.meio(Math.round(il.cy)) - il.cx); if (dd < md) { md = dd; melhor = L; } }
    if (melhor && md < 40) for (const i of il.px) melhor.extra.add(i);
  }
  const perto0 = (x, y, p, r) => (x - p[0]) ** 2 + (y - p[1]) ** 2 < r * r;
  // "pele": faixa da cor do pelo, por baixo de tudo, ligando a barriga (parada) ao alto da pata (que gira). Estica quando a
  // pata gira, então a "axila" nunca mostra o fundo. a, b = na barriga; c, d = na pata (giram com a coxa).
  for (const L of legs) {
    const y0 = L.ini - 3, y1 = Math.min(L.jy - 2, L.ini + 12), l0 = L.seg.linhas.get(y0), l1 = L.seg.linhas.get(y1);
    if (!l0 || !l1) continue;
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = y1 - 3; y <= y1 + 3; y++) { const l = L.seg.linhas.get(y); if (l) for (let x = l[0]; x <= l[1]; x++) { const i = (y * nw + x) * 4; if (D.data[i + 3] > 200 && !escuro(D, x, y)) { r += D.data[i]; g += D.data[i + 1]; b += D.data[i + 2]; n++; } } }
    if (!n) continue;
    const m = 2; // um pouco para dentro da borda: a pele não passa do contorno
    // na barriga, abre até 8 px para cada lado enquanto houver desenho (cobre a dobra da axila)
    const op = (x) => x >= 0 && x < nw && D.data[(y0 * nw + x) * 4 + 3] > 200;
    let xa = l0[0], xb = l0[1]; while (xa > l0[0] - 8 && op(xa - 1)) xa--; while (xb < l0[1] + 8 && op(xb + 1)) xb++;
    L.pele = { a: [xa + m, y0], b: [xb - m, y0], c: [l1[1] - m, y1], d: [l1[0] + m, y1], cor: `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})` };
  }
  for (const L of legs) {
    const ex = (x, y) => L.extra.has(y * nw + x);
    // tampinha do quadril: só a metade de baixo do círculo (a de cima pegava o contorno do bumbum, que ao sentar saía para trás como um 2º rabo)
    L.coxa = limpa(D, (x, y) => (L.naPata(x, y) && y < L.jy) || (perto0(x, y, L.hip, L.rq) && y >= L.hip[1] - 2) || (ex(x, y) && y < L.jy));
    L.canela = limpa(D, (x, y) => (L.naPata(x, y) || ex(x, y)) && ((y >= L.jy && y < L.wy) || perto0(x, y, L.j, L.rj)));
    L.pe = limpa(D, (x, y) => ((L.naPata(x, y) || ex(x, y)) && (y >= L.wy || perto0(x, y, L.w, L.rw))), 25);
  }
  const usaMandibula = !cfg.boca2 && os.boca && valida(os.boca.r);
  const capCab = 16, perto = (x, y, p, r) => (x - p[0]) ** 2 + (y - p[1]) ** 2 < r * r;
  const encolhe = (r, m) => [r[0] + m, r[1] + m, r[2] - m, r[3] - m]; // a peça de baixo guarda uma faixinha da de cima: a emenda não abre
  const naCabeca = (x, y) => (dentro(x, y, cab.r) || perto(x, y, cab.p, capCab)) && !nuca(x, y) && !(ra && ra.poli && noPoli(x, y, ra.poli)) && !orelhas.some((o) => dentro(x, y, encolhe(o.r, 4)));
  const B = {
    nw, nh, legs, cab, orelhas: [], rabo: null, mandibula: null, olhos: null, boca: null, bocaAberta: cfg.boca2 ? !!cfg.boca2.aberta : true,
    corpo: peca(D, (x, y) => fica0(x, y) && !ilhaCorpo.fora[y * nw + x] && !(y > nh * 0.6 && D.data[(y * nw + x) * 4 + 3] <= 20)), // sem a sombrinha quase transparente perto do chão
    cabeca: peca(D, naCabeca, usaMandibula ? (x, y) => dentro(x, y, os.boca.r) : null),
  };
  os.orelhas.forEach((o, i) => { if (valida(o.r)) B.orelhas.push({ i, p: o.p, c: peca(D, (x, y) => dentro(x, y, o.r) || (perto(x, y, o.p, 5) && dentro(x, y, cab.r))) }); });
  // a beirada por baixo do corpo só pega pelo de dentro (longe da borda): se pegasse o contorno, ele aparecia solto ao girar
  const opaco = (x, y) => x >= 0 && y >= 0 && x < nw && y < nh && D.data[(y * nw + x) * 4 + 3] > 200;
  const miolo = (x, y) => [[4, 0], [-4, 0], [0, 4], [0, -4], [3, 3], [-3, 3], [3, -3], [-3, -3]].every(([a, b]) => opaco(x + a, y + b)) && !escuro(D, x, y);
  if (ra && ra.poli) {
    B.rabo = { p: ra.p, p2: ra.p, base: peca(D, (x, y) => noPoli(x, y, ra.poli) || (pertoPoli(x, y, ra.poli, 6) && miolo(x, y))), ponta: null };
    if (ra.pele) { // cor média do pelo perto dos pontos do rabo
      let r = 0, g = 0, b = 0, n = 0;
      for (const [px, py] of ra.pele.rabo) for (let y = py - 2; y <= py + 2; y++) for (let x = px - 2; x <= px + 2; x++) { const i = (y * nw + x) * 4; if (D.data[i + 3] > 200 && !escuro(D, x, y)) { r += D.data[i]; g += D.data[i + 1]; b += D.data[i + 2]; n++; } }
      if (n) B.rabo.pele = { corpo: ra.pele.corpo, rabo: ra.pele.rabo, cor: `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})` };
    }
  }
  else if (ra) {
    const p2 = ra.p2 || ra.p, d2 = Math.hypot(p2[0] - ra.p[0], p2[1] - ra.p[1]), dist = (x, y) => Math.hypot(x - ra.p[0], y - ra.p[1]);
    // base: a região do rabo + beirada de 3 px por baixo do corpo (só pelo de dentro); ponta: começa 3 px antes da dobra,
    // por baixo da base (é desenhada antes): ao girar, nenhuma das duas emendas abre fresta
    const dentroR = (x, y) => dentro(x, y, ra.r) || (dentro(x, y, [ra.r[0] - 3, ra.r[1] - 3, ra.r[2] + 3, ra.r[3] + 3]) && miolo(x, y));
    B.rabo = { p: ra.p, p2, base: peca(D, (x, y) => (dentroR(x, y) && (d2 <= 0 || dist(x, y) < d2)) || perto(x, y, ra.p, 5)),
      ponta: d2 > 0 ? peca(D, (x, y) => (dentro(x, y, ra.r) && dist(x, y) >= d2 - 3) || perto(x, y, p2, 4)) : null };
  }
  if (usaMandibula) B.mandibula = { p: os.boca.p, c: peca(D, (x, y) => dentro(x, y, os.boca.r)) };
  // olhos fechados e boca: o desenho do dono por cima da cabeça, recortado do mesmo jeito
  const sobre = (im2) => (pronta(im2) ? peca(dadosDe(im2), naCabeca) : null);
  if (extra.olhos) B.olhos = sobre(extra.olhos);
  if (extra.boca) B.boca = sobre(extra.boca);
  return B;
}

function bonecoDe(cfg, sentada) {
  const chave = cfg.id + (sentada ? ':s' : '');
  if (BONECO[chave]) return BONECO[chave];
  const pose = sentada ? cfg.poseSentada : { ossos: cfg.ossos, imagem: cfg.imagem };
  const im = img(pose.imagem); if (!pronta(im)) return null;
  const ol = !sentada && cfg.olhos ? img(cfg.olhos) : null, bo = !sentada && cfg.boca2 ? img(cfg.boca2.imagem) : null;
  if ((ol && !pronta(ol)) || (bo && !pronta(bo))) return null;
  return (BONECO[chave] = montar(cfg, pose, im, { olhos: ol, boca: bo }));
}

// ---------- desenhar ----------
const tmp = [1, 1, 0, 0, 0], tmpS = [1, 1, 0, 0, 0];
function emVolta(c, p, a) { c.translate(p[0], p[1]); c.rotate(a); c.translate(-p[0], -p[1]); }

// pata: coxa gira no quadril, canela no joelho, pé no pulso (cada peça inteira, do desenho)
function pata(c, L, A) {
  const i = L.k;
  c.save();
  emVolta(c, L.hip, A['p' + i]); por(c, L.coxa);
  emVolta(c, L.j, A['j' + i]); por(c, L.canela);
  emVolta(c, L.w, A['w' + i]); por(c, L.pe);
  c.restore();
}

// pele: a e b ficam na barriga; c e d giram com a coxa (em volta do quadril)
export function pelePontos(L, ang) {
  const s = Math.sin(ang), co = Math.cos(ang), h = L.hip, g = (p) => [h[0] + (p[0] - h[0]) * co - (p[1] - h[1]) * s, h[1] + (p[0] - h[0]) * s + (p[1] - h[1]) * co];
  return [L.pele.a, L.pele.b, g(L.pele.c), g(L.pele.d)];
}
// pele do rabo: pontos do traseiro parados, pontos do rabo giram em volta da base
export function peleRabo(R, ang) {
  const s = Math.sin(ang), co = Math.cos(ang), h = R.p, g = (p) => [h[0] + (p[0] - h[0]) * co - (p[1] - h[1]) * s, h[1] + (p[0] - h[0]) * s + (p[1] - h[1]) * co];
  return [...R.pele.corpo, ...R.pele.rabo.map(g).reverse()];
}
function poligono(c, P, cor) { c.fillStyle = cor; c.beginPath(); c.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) c.lineTo(P[i][0], P[i][1]); c.closePath(); c.fill(); }
function pele(c, L, ang) {
  const P = pelePontos(L, ang);
  c.fillStyle = L.pele.cor; c.beginPath(); c.moveTo(P[0][0], P[0][1]); for (let i = 1; i < 4; i++) c.lineTo(P[i][0], P[i][1]); c.closePath(); c.fill();
}

export function desenharSombra(c, d, aspecto) {
  const H = d.tam * ALT, W = H * aspecto, sub = transformar(d, H, tmpS)[3];
  c.fillStyle = 'rgba(0,0,0,0.25)'; c.beginPath(); c.ellipse(d.x, d.y, W * 0.36 * (1 - Math.min(0.3, Math.max(0, sub) / H)), d.tam * 0.07, 0, 0, 7); c.fill();
}
export function larguraDe(cfg) { const i = img(cfg.imagem); return pronta(i) ? i.naturalWidth / i.naturalHeight : 0.75; }

// ---------- poses desenhadas (desenhos inteiros do dono para comer, beber, dormir, xixi, latir, calor, frio, sentar) ----------
// poses-desenhadas.js (gerado no PC do dono) diz qual imagem cada ação usa; ela já vem na escala do desenho em pé.
// O cachorro vira o desenho inteiro da ação, com uma mexidinha (respira, ofega, treme...) e troca suave (mesma mistura das ações).
export const poseDesenhada = (cfg, a) => { const p = POSES_DESENHADAS[cfg.id] && POSES_DESENHADAS[cfg.id][a]; return p && pronta(img(p.imagem)) ? p : null; };
const suaveP = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
function mexidinha(a, t, H) { // [deslocar x, subir, esticar em pé] em px da tela
  switch (a) {
    case 'pant': return [0, 0, 0.012 * Math.sin(t * 15)];                       // ofegando
    case 'shiver': return [0.006 * H * Math.sin(t * 110), 0, 0];                // tremendo
    case 'sleep': case 'curl': return [0, 0, 0.02 * Math.sin(t * 1.8)];       // respira devagar
    case 'bark': return [0, 0.02 * H * Math.max(0, Math.sin(t * 9)), 0];      // pulinho do latido
    case 'eat': case 'drink': return [0, 0.004 * H * Math.sin(t * 7), 0];     // cabeça mexendo
    default: return [0, 0, 0.008 * Math.sin(t * 2.4)];                          // respira
  }
}
function desenharPose(c, d, lado, P, alfa, nh) {
  const im = img(P.imagem), H = d.tam * ALT, k = H / nh, m = mexidinha(P.acao, d.t || 0, H);
  const w = P.w * k, h = P.h * k * (1 + m[2]);
  c.save(); c.globalAlpha = alfa;
  c.beginPath(); c.rect(d.x - H * 3, d.y - H * 4, H * 6, H * 4 + 2); c.clip(); // abaixo do chão não aparece
  c.translate(d.x + m[0], d.y - 2 * k - m[1]); c.scale(lado, 1);
  c.imageSmoothingQuality = 'high';
  c.drawImage(im, -w / 2, -h, w, h);
  c.restore();
}

export function desenharCao(c, d, lado, comSombra = true) {
  const cfg = d.cfg;
  // troca curta no meio da mistura (40% a 60%): desenhos diferentes meio transparentes um sobre o outro parecem fantasma
  const pA = poseDesenhada(cfg, d.acao), pB = d.mist < 1 ? poseDesenhada(cfg, d.acaoAnt) : null, k = d.mist < 1 ? suaveP((d.mist - 0.4) / 0.2) : 1;
  if (pA || pB) {
    const base = img(cfg.imagem), nh = pronta(base) ? base.naturalHeight : 300;
    if (comSombra) desenharSombra(c, d, ((pA || pB).w / (pA || pB).h));
    // o que vai sumindo fica embaixo; o que está chegando aparece por cima
    if (!pA || !pB) { // troca entre pose desenhada e as peças: as peças aparecem/somem com transparência
      const pecas = pA ? 1 - k : k;
      if (pecas > 0.01) { c.save(); c.globalAlpha = pecas; desenharPecas(c, d, lado, false); c.restore(); }
    }
    if (pB) desenharPose(c, d, lado, { ...pB, acao: d.acaoAnt }, 1 - k, nh);
    if (pA) desenharPose(c, d, lado, { ...pA, acao: d.acao }, k, nh);
    return;
  }
  desenharPecas(c, d, lado, comSombra);
}

function desenharPecas(c, d, lado, comSombra) {
  const alfa0 = c.globalAlpha; // na troca com uma pose desenhada as peças vêm com transparência
  const cfg = d.cfg, sent = !!cfg.poseSentada && poseSentada(cfg, d.acao);
  const B = bonecoDe(cfg, sent) || (sent ? bonecoDe(cfg, false) : null);
  if (!B) return;
  const H = d.tam * ALT, k = H / B.nh, x = transformar(d, H, tmp, sent && B === BONECO[cfg.id + ':s']), A = angulosDe(d);
  if (comSombra) desenharSombra(c, d, B.nw / B.nh);
  c.save();
  c.beginPath(); c.rect(d.x - H * 3, d.y - H * 4, H * 6, H * 4 + 2); c.clip(); // abaixo do chão não aparece
  c.translate(d.x + x[4] * lado, d.y - x[3]); c.scale(lado, 1); c.rotate(x[2]); c.scale(k, k); c.translate(-B.nw / 2, -B.nh);
  c.imageSmoothingQuality = 'high';
  for (const L of B.legs) if (L.pele) pele(c, L, A['p' + L.k]); // pele da axila, por baixo de tudo
  if (B.rabo && B.rabo.pele) poligono(c, peleRabo(B.rabo, A.rabo), B.rabo.pele.cor);
  for (const L of B.legs) if (L.longe) pata(c, L, A);        // patas de longe, atrás
  if (B.rabo) { c.save(); emVolta(c, B.rabo.p, A.rabo); if (B.rabo.ponta) { c.save(); emVolta(c, B.rabo.p2, A.rabo2); por(c, B.rabo.ponta); c.restore(); } por(c, B.rabo.base); c.restore(); }
  por(c, B.corpo);
  for (const L of B.legs) if (!L.longe) pata(c, L, A);       // patas de perto, na frente
  c.save(); emVolta(c, B.cab.p, A.cab + A.pesc);                   // cabeça
  por(c, B.cabeca);
  const aberta = Math.max(0, Math.min(1, (A.boca - 0.08) / 0.14)); // 0 boca fechada … 1 aberta
  if (B.boca) { const al = B.bocaAberta ? aberta : 1 - aberta; if (al > 0.02) { c.globalAlpha = alfa0 * al; por(c, B.boca); c.globalAlpha = alfa0; } }
  if (B.mandibula) { c.save(); emVolta(c, B.mandibula.p, A.boca * 0.8); por(c, B.mandibula.c); c.restore(); }
  const p = B.olhos ? piscar(d) : 0;
  if (p > 0.02) { c.globalAlpha = alfa0 * p; por(c, B.olhos); c.globalAlpha = alfa0; }
  for (const o of B.orelhas) { c.save(); emVolta(c, o.p, o.i === 0 ? A.orA : A.orB); por(c, o.c); c.restore(); }
  c.restore();
  c.restore();
}

export function desenharTigela(c, t) {
  const r = 17, ol = '#3a2418';
  c.save(); c.translate(t.x, t.y);
  c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 2, r * 1.1, r * 0.35, 0, 0, 7); c.fill();
  c.fillStyle = ol; c.beginPath(); c.ellipse(0, -5, r + 2, r * 0.45 + 2, 0, 0, 7); c.fill();
  c.fillStyle = '#d94f45'; c.beginPath(); c.moveTo(-r, -6); c.lineTo(-r * 0.75, 0); c.lineTo(r * 0.75, 0); c.lineTo(r, -6); c.closePath(); c.fill();
  c.fillStyle = '#b8392f'; c.beginPath(); c.ellipse(0, -6, r, r * 0.38, 0, 0, 7); c.fill();
  if (t.cheio > 0.05) { const kk = Math.sqrt(t.cheio); c.fillStyle = t.tipo === 'comida' ? '#8a5a2e' : '#6fc3ff'; c.beginPath(); c.ellipse(0, -6, r * 0.82 * kk, r * 0.28 * kk, 0, 0, 7); c.fill(); }
  c.restore();
}
