// Desenho dos cachorros (canvas 2D, sem WebGL). Nada é esticado nem borrado: tudo é o desenho do dono, recortado em PEÇAS
// INTEIRAS que só giram — corpo, cabeça, orelhas, rabo, boca e, em cada pata, coxa, canela e pé. Cada junta tem uma "tampinha"
// redonda (a peça de baixo cobre um círculo em volta do ponto onde gira), assim a emenda não aparece.
// As patas são achadas no desenho seguindo cada uma de baixo para cima, a partir do pé (sem pegar barriga nem a pata vizinha).
// Olhos fechados (piscar, dormir) e boca aberta/fechada (comer, latir, ofegar) vêm dos desenhos do dono, por cima da cabeça.
// O movimento (ângulos de cada parte) vem de movimento.js. As imagens olham para a direita; o app espelha ao andar para a esquerda.
import { transformar, piscar, poseSentada, angulosDe } from './movimento.js';

const ALT = 1.3; // altura do desenho = tamanho × 1,3
export const alturaCabeca = () => ALT;

const IMG = {}, BONECO = {};
function img(arq) {
  if (!IMG[arq]) { const i = new Image(); i.decoding = 'async'; i.src = new URL('./img/' + arq, import.meta.url).href; IMG[arq] = i; }
  return IMG[arq];
}
const pronta = (i) => i && i.complete && i.naturalWidth > 0;
export function precarregar(cfgs) { for (const c of cfgs) { img(c.imagem); if (c.olhos) img(c.olhos); if (c.boca2) img(c.boca2.imagem); if (c.poseSentada) img(c.poseSentada.imagem); } }

// ---------- montar as peças (uma vez, quando a imagem carrega) ----------
const valida = (r) => r && r[2] > 0 && r[3] > 0;
const dentro = (x, y, r) => x >= r[0] && x < r[2] && y >= r[1] && y < r[3];
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
function trecho(dados, r, y, xc) {
  const w = dados.width, s = dados.data, yy = Math.max(0, Math.min(dados.height - 1, Math.round(y)));
  const runs = []; let a = -1;
  for (let x = Math.max(0, Math.round(r[0])); x <= Math.min(w - 1, Math.round(r[2])); x++) {
    const op = s[(yy * w + x) * 4 + 3] > 110;
    if (op && a < 0) a = x; if ((!op || x === Math.min(w - 1, Math.round(r[2]))) && a >= 0) { runs.push([a, op ? x : x - 1]); a = -1; }
  }
  if (!runs.length) return null;
  let m = runs[0], md = 1e9; for (const ru of runs) { const c = (ru[0] + ru[1]) / 2, dd = Math.abs(c - xc); if (dd < md) { md = dd; m = ru; } }
  return [(m[0] + m[1]) / 2, m[1] - m[0] + 1, m[0], m[1]];
}
// segue a pata de baixo (pé) para cima até o quadril: em cada linha, o trecho opaco que continua o de baixo
function seguirPata(D, pe, nh) {
  const r = pe.r; let y = nh - 1, t = null;
  for (; y > pe.p[1]; y--) { t = trecho(D, r, y, pe.p[0]); if (t) break; }
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

function montar(cfg, pose, im, extra) {
  const os = pose.ossos, D = dadosDe(im), nw = D.width, nh = D.height;
  const legs = [], ePata = new Uint8Array(nw * nh);
  for (let k = 0; k < 4; k++) {
    const pe = os.pernas[k]; if (!valida(pe.r)) continue;
    const seg = seguirPata(D, pe, nh); if (!seg) continue;
    const hip = pe.p, corte = hip[1] + (pe.corte || 2), jy = Math.round(hip[1] + (seg.fundo - hip[1]) * 0.5), wy = Math.round(seg.fundo - Math.max(10, (seg.fundo - hip[1]) * 0.16));
    const meio = (y) => { const l = seg.linhas.get(y); return l ? (l[0] + l[1]) / 2 : hip[0]; }, larg = (y) => { const l = seg.linhas.get(y); return l ? l[1] - l[0] + 1 : 8; };
    const j = [meio(jy), jy], w = [meio(wy), wy];
    const folga = (y) => (y >= wy - 2 ? 5 : 2); // no pé pega os dedinhos inteiros
    const naPata = (x, y) => { if (y < corte) return false; const l = seg.linhas.get(y); return !!l && x >= l[0] - folga(y) && x <= l[1] + folga(y) && x >= pe.r[0] && x <= pe.r[2]; };
    const banda = pe.corte ? 10 : 7; // o corpo guarda o alto da pata: ao girar, a emenda não abre
    for (const [y, l] of seg.linhas) if (y >= corte + banda) for (let x = Math.max(0, l[0] - folga(y), Math.floor(pe.r[0])); x <= Math.min(nw - 1, l[1] + folga(y), Math.ceil(pe.r[2])); x++) ePata[y * nw + x] = 1;
    for (let y = seg.fundo + 1; y < Math.min(nh, seg.fundo + 4); y++) { const l = seg.linhas.get(seg.fundo); if (l) for (let x = Math.max(0, l[0] - 5); x <= Math.min(nw - 1, l[1] + 5); x++) ePata[y * nw + x] = 1; } // sombrinha/linha embaixo do pé
    const rq = larg(corte + 3) * 0.75 + 2, rj = larg(jy) * 0.62 + 1, rw = larg(wy) * 0.62 + 1;
    const perto = (x, y, p, r) => (x - p[0]) ** 2 + (y - p[1]) ** 2 < r * r;
    legs.push({ k, hip, j, w, longe: k === 1 || k === 3,
      coxa: peca(D, (x, y) => (naPata(x, y) && y < jy) || perto(x, y, hip, rq)),         // tampinha do quadril pega um pouco do corpo
      canela: peca(D, (x, y) => naPata(x, y) && ((y >= jy && y < wy) || perto(x, y, j, rj))),
      pe: peca(D, (x, y) => naPata(x, y) && (y >= wy || perto(x, y, w, rw))) });
  }
  const cab = os.cabeca, orelhas = os.orelhas.filter((o) => valida(o.r)), ra = valida(os.rabo && os.rabo.r) ? os.rabo : null;
  const usaMandibula = !cfg.boca2 && os.boca && valida(os.boca.r);
  const capCab = 11, perto = (x, y, p, r) => (x - p[0]) ** 2 + (y - p[1]) ** 2 < r * r;
  const encolhe = (r, m) => [r[0] + m, r[1] + m, r[2] - m, r[3] - m]; // a peça de baixo guarda uma faixinha da de cima: a emenda não abre
  const naCabeca = (x, y) => (dentro(x, y, cab.r) || perto(x, y, cab.p, capCab)) && !orelhas.some((o) => dentro(x, y, encolhe(o.r, 4)));
  const B = {
    nw, nh, legs, cab, orelhas: [], rabo: null, mandibula: null, olhos: null, boca: null, bocaAberta: cfg.boca2 ? !!cfg.boca2.aberta : true,
    corpo: peca(D, (x, y) => !ePata[y * nw + x] && !(dentro(x, y, cab.r) && y < cab.r[3] - (cfg.bandaCabeca || 10)) && !orelhas.some((o) => dentro(x, y, o.r)) && !(ra && dentro(x, y, encolhe(ra.r, 3)))),
    cabeca: peca(D, naCabeca, usaMandibula ? (x, y) => dentro(x, y, os.boca.r) : null),
  };
  os.orelhas.forEach((o, i) => { if (valida(o.r)) B.orelhas.push({ i, p: o.p, c: peca(D, (x, y) => dentro(x, y, o.r) || (perto(x, y, o.p, 5) && dentro(x, y, cab.r))) }); });
  if (ra) {
    const p2 = ra.p2 || ra.p, d2 = Math.hypot(p2[0] - ra.p[0], p2[1] - ra.p[1]), dist = (x, y) => Math.hypot(x - ra.p[0], y - ra.p[1]);
    B.rabo = { p: ra.p, p2, base: peca(D, (x, y) => (dentro(x, y, ra.r) && (d2 <= 0 || dist(x, y) < d2)) || perto(x, y, ra.p, 5)),
      ponta: d2 > 0 ? peca(D, (x, y) => (dentro(x, y, ra.r) && dist(x, y) >= d2) || perto(x, y, p2, 4)) : null };
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

export function desenharSombra(c, d, aspecto) {
  const H = d.tam * ALT, W = H * aspecto, sub = transformar(d, H, tmpS)[3];
  c.fillStyle = 'rgba(0,0,0,0.25)'; c.beginPath(); c.ellipse(d.x, d.y, W * 0.36 * (1 - Math.min(0.3, Math.max(0, sub) / H)), d.tam * 0.07, 0, 0, 7); c.fill();
}
export function larguraDe(cfg) { const i = img(cfg.imagem); return pronta(i) ? i.naturalWidth / i.naturalHeight : 0.75; }

export function desenharCao(c, d, lado, comSombra = true) {
  const cfg = d.cfg, sent = !!cfg.poseSentada && poseSentada(cfg, d.acao);
  const B = bonecoDe(cfg, sent) || (sent ? bonecoDe(cfg, false) : null);
  if (!B) return;
  const H = d.tam * ALT, k = H / B.nh, x = transformar(d, H, tmp, sent && B === BONECO[cfg.id + ':s']), A = angulosDe(d);
  if (comSombra) desenharSombra(c, d, B.nw / B.nh);
  c.save();
  c.beginPath(); c.rect(d.x - H * 3, d.y - H * 4, H * 6, H * 4 + 2); c.clip(); // abaixo do chão não aparece
  c.translate(d.x + x[4] * lado, d.y - x[3]); c.scale(lado, 1); c.rotate(x[2]); c.scale(k, k); c.translate(-B.nw / 2, -B.nh);
  c.imageSmoothingQuality = 'high';
  for (const L of B.legs) if (L.longe) pata(c, L, A);        // patas de longe, atrás
  if (B.rabo) { c.save(); emVolta(c, B.rabo.p, A.rabo); if (B.rabo.ponta) { c.save(); emVolta(c, B.rabo.p2, A.rabo2); por(c, B.rabo.ponta); c.restore(); } por(c, B.rabo.base); c.restore(); }
  por(c, B.corpo);
  for (const L of B.legs) if (!L.longe) pata(c, L, A);       // patas de perto, na frente
  c.save(); emVolta(c, B.cab.p, A.cab + A.pesc);                   // cabeça
  por(c, B.cabeca);
  const aberta = Math.max(0, Math.min(1, (A.boca - 0.08) / 0.14)); // 0 boca fechada … 1 aberta
  if (B.boca) { const al = B.bocaAberta ? aberta : 1 - aberta; if (al > 0.02) { c.globalAlpha = al; por(c, B.boca); c.globalAlpha = 1; } }
  if (B.mandibula) { c.save(); emVolta(c, B.mandibula.p, A.boca * 0.8); por(c, B.mandibula.c); c.restore(); }
  const p = B.olhos ? piscar(d) : 0;
  if (p > 0.02) { c.globalAlpha = p; por(c, B.olhos); c.globalAlpha = 1; }
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
