// Cachorros em estilo desenho animado (2D, canvas): contorno escuro, cores chapadas, olhos grandes.
// Formas seguem o padrão das raças (pinscher: quadrado, peito fundo, barriga recolhida, pernas finas, pescoço arqueado;
// shih tzu: mais comprida que alta, cabeça redonda e larga, focinho curto, orelhas caídas no pelo, rabo de penacho nas costas)
// e as cores/marcas das fotos em refs/. Usa as mesmas poses de animacoes.js. Visto de lado; rosto de frente quando olha para a pessoa.
import { Y, PX, RZ, NX, HX, HY, HZ, JAW, TONG, EARX, EARZ, TAILX, TAILY, HIP, KNEE, LIFT, BLINK, SQ } from './animacoes.js';

const CONTORNO = '#2a211d';
const cache = new Map();
function tom(hex, k) { // k < 1 escurece, > 1 clareia
  const ch = hex + k; if (cache.has(ch)) return cache.get(ch);
  const n = parseInt(hex.slice(1), 16), f = (v) => Math.round(Math.max(0, Math.min(255, v * k)));
  const r = '#' + ((1 << 24) | (f(n >> 16) << 16) | (f((n >> 8) & 255) << 8) | f(n & 255)).toString(16).slice(1);
  cache.set(ch, r); return r;
}

export function medidas(cfg) { // unidades: 1 = tamanho em px
  const shih = cfg.raca === 'shihtzu', L = cfg.corpo.perna * (shih ? 0.7 : 0.74);
  return shih
    ? { shih, L, bl: 0.7, bh: 0.36, hr: 0.2 * cfg.corpo.cabeca / 1.35, lw: 0.1, ol: 0.024 }
    : { shih, L, bl: 0.5, bh: 0.275 * (0.8 + cfg.corpo.largura * 0.25), hr: 0.142 * cfg.corpo.cabeca, lw: 0.058, ol: 0.026 };
}
export const alturaCabeca = (cfg) => { const m = medidas(cfg); return m.L + m.bh + m.hr * (m.shih ? 1.5 : 2.4); };

function oval(c, x, y, rx, ry, rot = 0) { c.beginPath(); c.ellipse(x, y, Math.abs(rx), Math.abs(ry), rot, 0, 7); }
function seg(c, x1, y1, x2, y2, w, cor) { c.strokeStyle = cor; c.lineWidth = w; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
function contornar(c, ol) { c.strokeStyle = CONTORNO; c.lineWidth = ol * 2; c.stroke(); }

export function desenharCao(c, d, lado) {
  const cfg = d.cfg, p = d.p, C = cfg.cores, m = d.med || (d.med = medidas(cfg)), s = d.tam, ol = m.ol, shih = m.shih;
  c.save();
  c.translate(d.x, d.y);
  c.fillStyle = 'rgba(0,0,0,0.22)'; oval(c, 0, 0, s * (m.bl * 0.56 + Math.max(0, -p[Y]) * 0.2), s * 0.055); c.fill();
  c.scale(s * lado, s);
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.translate(0, -(m.L + m.bh * 0.3) - p[Y]);
  c.rotate(p[PX] + p[RZ] * 0.4 + (d.semRabo ? p[TAILY] * 0.035 : 0));
  const sq = 1 + p[SQ] * 1.5, pelo = C.pelo, longe = tom(pelo, 0.8);
  const fx = m.bl * 0.3, hx = -m.bl * 0.32, hy = m.bh * 0.1;

  // ---- patas ----
  // frente: 2 ossos; trás: coxa para a frente, canela para trás, pé reto (jarrete), como cachorro de verdade
  const pontos = (i) => {
    const frente = i < 2, a1 = p[HIP + i] + (i === 3 ? p[LIFT + i] * 0.9 : 0), a2 = p[KNEE + i], up = i === 3 ? -p[LIFT + i] * 0.05 : 0;
    const x0 = (frente ? fx : hx) + (i % 2 ? 0.03 : -0.01), y0 = hy + up, L = m.L + m.bh * 0.2;
    if (frente || shih) {
      const kx = x0 - Math.sin(a1) * L * 0.5, ky = y0 + Math.cos(a1) * L * 0.5;
      return [x0, y0, kx, ky, kx - Math.sin(a1 + a2) * L * 0.5, ky + Math.cos(a1 + a2) * L * 0.5];
    }
    const b1 = a1 - 0.38, b2 = a1 + 0.6 + a2 * 0.75, b3 = a1 - 0.05 + a2 * 0.35;
    const kx = x0 - Math.sin(b1) * L * 0.4, ky = y0 + Math.cos(b1) * L * 0.4;
    const jx = kx - Math.sin(b2) * L * 0.36, jy = ky + Math.cos(b2) * L * 0.36;
    return [x0, y0, kx, ky, jx, jy, jx - Math.sin(b3) * L * 0.31, jy + Math.cos(b3) * L * 0.31];
  };
  const pernas = (lista, cor) => {
    for (const pass of [0, 1]) for (const i of lista) {
      const q = pontos(i), e = pass ? 0 : ol * 2, k = pass ? cor : CONTORNO, n = q.length, w = m.lw;
      if (n === 8) { // trás
        seg(c, q[0], q[1], q[2], q[3], w * 1.9 + e, k); seg(c, q[2], q[3], q[4], q[5], w * 1.05 + e, k); seg(c, q[4], q[5], q[6], q[7], w * 0.8 + e, k);
      } else { seg(c, q[0], q[1], q[2], q[3], w * (shih ? 1.2 : 1.15) + e, k); seg(c, q[2], q[3], q[4], q[5], w * (shih ? 1.1 : 0.85) + e, k); }
      c.fillStyle = k; oval(c, q[n - 2] + w * 0.35, q[n - 1] - w * 0.05, w * (shih ? 0.85 : 0.8) + e / 2, w * (shih ? 0.55 : 0.42) + e / 2); c.fill();
    }
  };
  pernas([1, 3], longe);

  // ---- rabo: só a shih tzu (penacho enrolado sobre as costas) ----
  if (!d.semRabo) {
    const a = p[TAILX] + 0.15 + p[TAILY] * 0.5, bx = -m.bl * 0.44, by = -m.bh * 0.3, ca = Math.cos(a), sa = Math.sin(a);
    for (const pass of [0, 1]) {
      c.fillStyle = pass ? C.pelo2 || pelo : CONTORNO;
      for (const [k, r, curva] of RABO) { oval(c, bx + sa * k + curva * Math.max(0, ca), by - ca * k, r + (pass ? 0 : ol), r * 0.9 + (pass ? 0 : ol)); c.fill(); }
    }
  }

  // ---- corpo e pescoço ----
  const nbx = m.bl * (shih ? 0.34 : 0.3), nby = -m.bh * (shih ? 0.15 : 0.28);
  const angN = (shih ? -0.75 : -1.0) + p[NX] * 0.85, nl = shih ? 0.1 : 0.16;
  const hcx = nbx + Math.cos(angN) * nl, hcy = nby + Math.sin(angN) * nl;
  const corpo = () => {
    const w = m.bl / 2, h = m.bh / 2 * sq;
    c.beginPath();
    if (shih) { // manto comprido, barra de mechas embaixo
      c.moveTo(-w, -h * 0.3); c.bezierCurveTo(-w, -h * 1.15, w * 0.9, -h * 1.2, w * 1.02, -h * 0.2);
      c.bezierCurveTo(w * 1.1, h * 0.5, w * 0.95, h * 1.05, w * 0.8, h * 1.1);
      for (let i = 0; i < 6; i++) { const x1 = w * 0.8 - (i + 1) * w * 0.3; c.quadraticCurveTo(x1 + w * 0.15, h * (1.38 + (i % 2) * 0.1), x1, h * 1.1); }
      c.bezierCurveTo(-w * 1.12, h * 0.9, -w * 1.08, 0, -w, -h * 0.3);
    } else { // peito fundo na frente, barriga recolhida atrás, garupa redonda
      c.moveTo(-w * 0.95, -h * 0.55); c.bezierCurveTo(-w * 0.4, -h * 1.05, w * 0.4, -h * 1.1, w * 0.85, -h * 0.85);
      c.bezierCurveTo(w * 1.2, -h * 0.5, w * 1.2, h * 0.75, w * 0.62, h * 1.12);
      c.bezierCurveTo(w * 0.2, h * 1.2, -w * 0.15, h * 0.35, -w * 0.6, h * 0.45);
      c.bezierCurveTo(-w * 1.1, h * 0.6, -w * 1.25, -h * 0.25, -w * 0.95, -h * 0.55);
    }
    c.closePath();
  };
  const pescoco = (larg, cor) => { c.strokeStyle = cor; c.lineWidth = larg; c.beginPath(); c.moveTo(nbx - 0.02, nby + 0.03); c.quadraticCurveTo(nbx + 0.015, (nby + hcy) / 2 - 0.02, hcx, hcy); c.stroke(); };
  const lp = shih ? 0.2 : 0.125;
  corpo(); contornar(c, ol); pescoco(lp + ol * 2, CONTORNO);
  corpo(); c.fillStyle = pelo; c.fill(); pescoco(lp, pelo);
  c.save(); corpo(); c.clip(); // sombras e marcas recortadas no corpo
  if (shih) {
    c.strokeStyle = tom(pelo, 0.86); c.lineWidth = ol * 0.9;
    for (let i = 0; i < 7; i++) { const x = -m.bl * 0.4 + i * m.bl * 0.13; c.beginPath(); c.moveTo(x + 0.02, -m.bh * 0.25); c.quadraticCurveTo(x - 0.03, m.bh * 0.2, x + 0.01, m.bh * 0.62); c.stroke(); }
    c.fillStyle = C.pelo2; oval(c, m.bl * 0.05, -m.bh * 0.42, m.bl * 0.4, m.bh * 0.14); c.fill();
  } else {
    c.fillStyle = 'rgba(40,20,0,0.09)'; oval(c, 0.02, m.bh * 0.62, m.bl * 0.6, m.bh * 0.3); c.fill();
    if (cfg.marcas.manchaCostas) { c.fillStyle = C.mancha; oval(c, -m.bl * 0.2, -m.bh * 0.42, m.bl * 0.17, m.bh * 0.26, -0.15); c.fill(); oval(c, -m.bl * 0.47, -m.bh * 0.05, m.bl * 0.09, m.bh * 0.2); c.fill(); }
    if (cfg.marcas.mancaDorso) { c.globalAlpha = 0.4; c.fillStyle = C.mancha; oval(c, -m.bl * 0.05, -m.bh * 0.55, m.bl * 0.55, m.bh * 0.2); c.fill(); c.globalAlpha = 1; c.fillStyle = tom(pelo, 1.12); oval(c, m.bl * 0.34, m.bh * 0.25, m.bl * 0.13, m.bh * 0.3); c.fill(); }
    if (cfg.marcas.pintasPeito) { c.fillStyle = C.pintas; for (const [x, y, r] of PINTAS) { oval(c, m.bl * (0.33 + x), m.bh * y, r, r * 0.8); c.fill(); } }
  }
  c.restore();
  pernas([0, 2], pelo);
  if (shih) { c.fillStyle = pelo; for (const x of [fx, hx]) { oval(c, x, hy + 0.02, m.lw * 1.05, m.lw * 0.9); c.fill(); } } // saia de pelo cobre o alto das patas

  // ---- cabeça ----
  const deFrente = Math.cos(d.ang + p[HY]) > 0.55;
  c.save();
  c.translate(hcx, hcy);
  c.rotate(p[HX] * 0.8 + p[NX] * 0.2 + p[HZ] * 0.35);
  if (shih) (deFrente ? shihFrente : shihLado)(c, d, m, p, C, ol);
  else (deFrente ? pinFrente : pinLado)(c, d, m, p, C, ol);
  c.restore();
  c.restore();
}
const PINTAS = [[0.02, 0.0, 0.016], [0.07, 0.12, 0.013], [-0.02, 0.18, 0.017], [0.05, 0.28, 0.012], [0.1, -0.08, 0.012], [0.0, 0.36, 0.013], [-0.06, 0.05, 0.011], [0.09, 0.24, 0.014], [0.03, 0.1, 0.01]];
const RABO = [[0.06, 0.085, 0], [0.15, 0.1, 0.03], [0.23, 0.1, 0.1], [0.26, 0.08, 0.2]]; // distância, raio, quanto enrola para a frente

function olho(c, x, y, r, fechado, ol) {
  if (fechado > 0.6) { c.strokeStyle = CONTORNO; c.lineWidth = ol; c.beginPath(); c.arc(x, y - r * 0.3, r * 0.85, 0.35, Math.PI - 0.35); c.stroke(); return; }
  const ry = r * (1 - fechado * 0.9);
  c.fillStyle = '#17110f'; oval(c, x, y, r, ry); c.fill();
  if (ry > r * 0.4) { c.fillStyle = '#fff'; oval(c, x + r * 0.32, y - ry * 0.36, r * 0.34, r * 0.34); c.fill(); oval(c, x - r * 0.3, y + ry * 0.38, r * 0.14, r * 0.14); c.fill(); }
}
function nariz(c, x, y, r, C) {
  c.fillStyle = C.nariz; c.beginPath(); c.moveTo(x - r, y - r * 0.35); c.quadraticCurveTo(x, y - r * 0.9, x + r, y - r * 0.35);
  c.quadraticCurveTo(x + r * 0.7, y + r * 0.8, x, y + r * 0.75); c.quadraticCurveTo(x - r * 0.7, y + r * 0.8, x - r, y - r * 0.35); c.fill();
  c.fillStyle = 'rgba(255,255,255,.45)'; oval(c, x - r * 0.3, y - r * 0.25, r * 0.3, r * 0.16); c.fill();
}

// orelha em pé do pinscher (base larga, ponta arredondada, rosa por dentro)
function orelhaPin(c, r, cfg, C, ol, rot, dentro = true, cor) {
  const h = r * 1.75 * cfg.corpo.orelha / 1.3, w = r * 0.62;
  c.save(); c.rotate(rot);
  c.beginPath(); c.moveTo(-w, r * 0.1); c.bezierCurveTo(-w, -h * 0.55, -w * 0.3, -h, w * 0.05, -h); c.bezierCurveTo(w * 0.5, -h * 0.85, w * 0.95, -h * 0.35, w * 0.8, r * 0.1); c.closePath();
  contornar(c, ol); c.fillStyle = cor || C.orelha; c.fill();
  if (dentro) { c.beginPath(); c.moveTo(-w * 0.55, 0); c.bezierCurveTo(-w * 0.6, -h * 0.45, -w * 0.15, -h * 0.8, w * 0.05, -h * 0.84); c.bezierCurveTo(w * 0.35, -h * 0.7, w * 0.55, -h * 0.3, w * 0.42, 0); c.closePath(); c.fillStyle = C.orelhaDentro; c.fill(); }
  c.restore();
}

function pinLado(c, d, m, p, C, ol) {
  const r = m.hr, cfg = d.cfg, sl = r * 0.95 * cfg.corpo.focinho / 0.7, jaw = p[JAW];
  const rotO = -0.3 - p[EARX] * 0.9 - p[EARZ] * 0.3;
  c.save(); c.translate(r * 0.3, -r * 0.6); orelhaPin(c, r * 0.9, cfg, C, ol, rotO + 0.35, false, tom(C.orelha, 0.82)); c.restore(); // orelha de longe
  c.save(); c.translate(r * 0.5, r * 0.42); c.rotate(jaw * 0.9); // mandíbula
  c.beginPath(); c.moveTo(-r * 0.1, -r * 0.1); c.lineTo(sl * 0.82, -r * 0.02); c.quadraticCurveTo(sl * 0.9, r * 0.2, sl * 0.5, r * 0.22); c.quadraticCurveTo(r * 0.1, r * 0.25, -r * 0.1, r * 0.1); c.closePath();
  contornar(c, ol); c.fillStyle = cfg.marcas.focinhoEscuro ? C.focinhoEscuro : tom(C.pelo, 0.96); c.fill();
  if (p[TONG] > 0.05) { c.fillStyle = C.lingua; oval(c, sl * 0.62, r * 0.12 + p[TONG] * r * 0.28, r * 0.16, r * 0.1 + p[TONG] * r * 0.28); c.fill(); c.strokeStyle = CONTORNO; c.lineWidth = ol * 0.7; c.stroke(); }
  c.restore();
  if (jaw > 0.12) { c.fillStyle = '#5a2a2e'; c.beginPath(); c.moveTo(r * 0.5, r * 0.4); c.lineTo(r * 0.5 + sl * 0.8, r * 0.36); c.lineTo(r * 0.5 + sl * 0.75 * Math.cos(jaw), r * 0.42 + sl * 0.75 * Math.sin(jaw * 0.9)); c.closePath(); c.fill(); }
  const forma = () => { // crânio redondo (cabeça de maçã) + focinho em cunha, numa silhueta só
    c.beginPath(); c.moveTo(-r * 0.75, r * 0.55);
    c.bezierCurveTo(-r * 1.25, r * 0.1, -r * 1.05, -r * 1.05, 0, -r * 1.02);
    c.bezierCurveTo(r * 0.6, -r, r * 0.9, -r * 0.55, r * 0.95, -r * 0.2);
    c.quadraticCurveTo(r * 1.05 + sl * 0.5, -r * 0.12, r * 0.55 + sl, r * 0.02);
    c.quadraticCurveTo(r * 0.75 + sl, r * 0.38, r * 0.5 + sl * 0.8, r * 0.42);
    c.quadraticCurveTo(r * 0.3, r * 0.7, -r * 0.75, r * 0.55); c.closePath();
  };
  forma(); contornar(c, ol); c.fillStyle = C.pelo; c.fill();
  c.save(); forma(); c.clip();
  if (cfg.marcas.mascaraOlhos) { c.fillStyle = C.mancha; oval(c, r * 0.3, -r * 0.3, r * 0.5, r * 0.42, -0.35); c.fill(); oval(c, -r * 0.45, -r * 0.65, r * 0.6, r * 0.45); c.fill(); }
  if (cfg.marcas.focinhoEscuro) { c.fillStyle = C.focinhoEscuro; oval(c, r * 0.75 + sl * 0.75, r * 0.2, sl * 0.62, r * 0.42); c.fill(); c.fillStyle = tom(C.pelo, 1.12); oval(c, r * 0.1, r * 0.45, r * 0.5, r * 0.22); c.fill(); }
  else { c.fillStyle = 'rgba(40,20,0,0.07)'; oval(c, r * 0.1, r * 0.6, r * 0.7, r * 0.2); c.fill(); }
  c.restore();
  nariz(c, r * 0.58 + sl, r * 0.06, r * 0.15, C);
  olho(c, r * 0.4, -r * 0.2, r * 0.25, p[BLINK], ol);
  if (jaw < 0.12) { c.strokeStyle = CONTORNO; c.lineWidth = ol * 0.75; c.beginPath(); c.moveTo(r * 0.5 + sl * 0.82, r * 0.36); c.quadraticCurveTo(r * 0.75, r * 0.5, r * 0.45, r * 0.4); c.stroke(); }
  c.save(); c.translate(-r * 0.25, -r * 0.6); orelhaPin(c, r, cfg, C, ol, rotO); c.restore();
}

function pinFrente(c, d, m, p, C, ol) {
  const r = m.hr, cfg = d.cfg, jaw = p[JAW];
  c.rotate(-p[HX] * 0.3);
  for (const s of [-1, 1]) { c.save(); c.translate(s * r * 0.62, -r * 0.5); c.scale(s, 1); orelhaPin(c, r, cfg, C, ol, 0.5 + p[EARZ] + p[EARX] * 0.5); c.restore(); }
  const forma = () => { // maçã em cima, afinando para o focinho
    c.beginPath(); c.moveTo(0, -r);
    c.bezierCurveTo(r, -r * 1.05, r * 1.3, -r * 0.1, r * 0.75, r * 0.4);
    c.bezierCurveTo(r * 0.6, r * 0.9, r * 0.25, r * 0.98, 0, r * 0.98);
    c.bezierCurveTo(-r * 0.25, r * 0.98, -r * 0.6, r * 0.9, -r * 0.75, r * 0.4);
    c.bezierCurveTo(-r * 1.3, -r * 0.1, -r, -r * 1.05, 0, -r); c.closePath();
  };
  forma(); contornar(c, ol); c.fillStyle = C.pelo; c.fill();
  c.save(); forma(); c.clip();
  if (cfg.marcas.mascaraOlhos) {
    c.fillStyle = C.mancha; for (const s of [-1, 1]) { oval(c, s * r * 0.5, -r * 0.15, r * 0.42, r * 0.46); c.fill(); oval(c, s * r * 0.7, -r * 0.7, r * 0.5, r * 0.45); c.fill(); }
    if (cfg.marcas.faixaTesta) { c.fillStyle = C.pelo; c.beginPath(); c.moveTo(-r * 0.1, -r * 1.1); c.quadraticCurveTo(-r * 0.2, -r * 0.3, -r * 0.34, r * 0.3); c.lineTo(r * 0.34, r * 0.3); c.quadraticCurveTo(r * 0.2, -r * 0.3, r * 0.1, -r * 1.1); c.closePath(); c.fill(); }
  }
  if (cfg.marcas.focinhoEscuro) { c.fillStyle = C.focinhoEscuro; oval(c, 0, r * 0.62, r * 0.42, r * 0.4); c.fill(); c.fillStyle = tom(C.pelo, 1.12); for (const s of [-1, 1]) { oval(c, s * r * 0.3, -r * 0.5, r * 0.09, r * 0.06); c.fill(); } }
  c.restore();
  olho(c, -r * 0.45, -r * 0.08, r * 0.27, p[BLINK], ol); olho(c, r * 0.45, -r * 0.08, r * 0.27, p[BLINK], ol);
  boca(c, r, 0.66, jaw, p[TONG], C, ol, cfg.marcas.focinhoEscuro ? '#c9b9ac' : CONTORNO);
  nariz(c, 0, r * 0.45, r * 0.17, C);
}

function boca(c, r, y, jaw, tong, C, ol, corLinha) {
  if (jaw > 0.12) {
    c.fillStyle = '#5a2a2e'; oval(c, 0, r * (y + 0.06), r * 0.2, r * (0.08 + jaw * 0.38)); c.fill(); c.strokeStyle = CONTORNO; c.lineWidth = ol * 0.75; c.stroke();
    if (tong > 0.05) { c.fillStyle = C.lingua; oval(c, 0, r * (y + 0.16 + tong * 0.25), r * 0.14, r * (0.08 + tong * 0.22)); c.fill(); c.stroke(); }
  } else { c.strokeStyle = corLinha; c.lineWidth = ol * 0.75; c.beginPath(); c.moveTo(-r * 0.2, r * (y + 0.02)); c.quadraticCurveTo(-r * 0.09, r * (y + 0.14), 0, r * y); c.quadraticCurveTo(r * 0.09, r * (y + 0.14), r * 0.2, r * (y + 0.02)); c.stroke(); }
}

// ---- shih tzu ----
function bolas(c, lista, r, cor, ol) { // tufos: contorno de todos, depois o preenchimento (viram uma forma só)
  c.fillStyle = CONTORNO; for (const [x, y, rr, ry] of lista) { oval(c, r * x, r * y, r * rr + ol, r * (ry || rr) + ol); c.fill(); }
  c.fillStyle = cor; for (const [x, y, rr, ry] of lista) { oval(c, r * x, r * y, r * rr, r * (ry || rr)); c.fill(); }
}
function orelhaShih(c, r, C, ol, rot) { // comprida, caída, com pontas em mechas
  c.save(); c.rotate(rot);
  c.beginPath(); c.moveTo(-r * 0.3, 0); c.bezierCurveTo(-r * 0.6, r * 0.5, -r * 0.5, r * 1.2, -r * 0.3, r * 1.35);
  c.quadraticCurveTo(-r * 0.15, r * 1.2, -r * 0.05, r * 1.42); c.quadraticCurveTo(r * 0.1, r * 1.22, r * 0.2, r * 1.36);
  c.bezierCurveTo(r * 0.5, r * 1.1, r * 0.45, r * 0.4, r * 0.25, 0); c.closePath();
  contornar(c, ol); c.fillStyle = C.orelha; c.fill();
  c.strokeStyle = tom(C.orelha, 0.84); c.lineWidth = ol * 0.8; c.beginPath(); c.moveTo(-r * 0.05, r * 0.3); c.quadraticCurveTo(-r * 0.15, r * 0.8, -r * 0.08, r * 1.15); c.stroke();
  c.restore();
}
const TOPETE = [[-0.25, -0.95, 0.3], [0.2, -1.0, 0.3], [0.55, -0.8, 0.24], [-0.6, -0.75, 0.24]];
const BIGODE_L = [[0.72, 0.22, 0.3, 0.24], [1.0, 0.24, 0.24, 0.2]], BIGODE_F = [[-0.3, 0.42, 0.34, 0.26], [0.3, 0.42, 0.34, 0.26]];

function shihLado(c, d, m, p, C, ol) {
  const r = m.hr, jaw = p[JAW], bar = jaw > 0.12 ? jaw * 0.35 : 0;
  bolas(c, TOPETE, r, C.topo, ol);
  oval(c, 0, 0, r * 1.02, r * 0.98); contornar(c, ol); c.fillStyle = C.pelo; c.fill();
  c.save(); oval(c, 0, 0, r * 1.02, r * 0.98); c.clip(); c.fillStyle = C.topo; oval(c, -r * 0.1, -r * 0.85, r * 1.1, r * 0.5); c.fill(); c.fillStyle = C.mascara; c.globalAlpha = 0.55; oval(c, r * 0.5, -r * 0.1, r * 0.3, r * 0.27); c.fill(); c.restore();
  // focinho curto e quadrado: bigode e barba fofos
  c.save(); c.translate(0, r * bar); bolas(c, [[0.55, 0.62, 0.3], [0.95, 0.58, 0.26], [0.75, 0.82, 0.24]], r, C.barba, ol); c.restore();
  if (jaw > 0.12) { c.fillStyle = '#5a2a2e'; oval(c, r * 0.95, r * 0.42, r * 0.2, r * (0.06 + jaw * 0.3)); c.fill(); if (p[TONG] > 0.05) { c.fillStyle = C.lingua; oval(c, r, r * (0.5 + p[TONG] * 0.2), r * 0.13, r * (0.07 + p[TONG] * 0.2)); c.fill(); } }
  bolas(c, BIGODE_L, r, C.barba, ol);
  nariz(c, r * 1.12, r * 0.06, r * 0.15, C);
  olho(c, r * 0.52, -r * 0.12, r * 0.21, p[BLINK], ol);
  c.save(); c.translate(-r * 0.35, -r * 0.35); orelhaShih(c, r, C, ol, 0.2 - p[EARX] * 0.25 + Math.sin(d.t * 1.3) * 0.03); c.restore();
}

function shihFrente(c, d, m, p, C, ol) {
  const r = m.hr, jaw = p[JAW], bar = jaw > 0.12 ? jaw * 0.3 : 0;
  c.rotate(-p[HX] * 0.3);
  for (const s of [-1, 1]) { c.save(); c.translate(s * r * 0.92, -r * 0.3); c.scale(s, 1); orelhaShih(c, r, C, ol, -0.22 - p[EARZ] * 0.4); c.restore(); }
  bolas(c, TOPETE, r, C.topo, ol);
  oval(c, 0, 0, r * 1.12, r * 0.98); contornar(c, ol); c.fillStyle = C.pelo; c.fill(); // cabeça redonda e larga
  c.save(); oval(c, 0, 0, r * 1.12, r * 0.98); c.clip(); c.fillStyle = C.topo; oval(c, 0, -r * 0.95, r * 1.2, r * 0.55); c.fill();
  c.fillStyle = C.mascara; c.globalAlpha = 0.5; for (const s of [-1, 1]) { oval(c, s * r * 0.5, -r * 0.1, r * 0.3, r * 0.28); c.fill(); } c.restore();
  // rosto de crisântemo: bigode dos dois lados, barba embaixo, nariz no meio
  c.save(); c.translate(0, r * bar); bolas(c, [[0, 0.9, 0.3, 0.26], [-0.32, 0.8, 0.24], [0.32, 0.8, 0.24]], r, C.barba, ol); c.restore();
  if (jaw > 0.12) { c.fillStyle = '#5a2a2e'; oval(c, 0, r * 0.62, r * 0.2, r * (0.06 + jaw * 0.32)); c.fill(); if (p[TONG] > 0.05) { c.fillStyle = C.lingua; oval(c, 0, r * (0.7 + p[TONG] * 0.22), r * 0.13, r * (0.07 + p[TONG] * 0.2)); c.fill(); } }
  bolas(c, BIGODE_F, r, C.barba, ol);
  olho(c, -r * 0.52, -r * 0.1, r * 0.22, p[BLINK], ol); olho(c, r * 0.52, -r * 0.1, r * 0.22, p[BLINK], ol);
  nariz(c, 0, r * 0.2, r * 0.17, C);
  if (jaw < 0.12) { c.strokeStyle = CONTORNO; c.lineWidth = ol * 0.7; c.beginPath(); c.moveTo(0, r * 0.32); c.lineTo(0, r * 0.46); c.stroke(); }
}

export function desenharTigela(c, t) {
  const r = 17;
  c.save(); c.translate(t.x, t.y);
  c.fillStyle = 'rgba(0,0,0,.22)'; oval(c, 0, 2, r * 1.1, r * 0.35); c.fill();
  c.fillStyle = CONTORNO; oval(c, 0, -5, r + 2, r * 0.45 + 2); c.fill();
  c.fillStyle = '#d94f45'; c.beginPath(); c.moveTo(-r, -6); c.lineTo(-r * 0.75, 0); c.lineTo(r * 0.75, 0); c.lineTo(r, -6); c.closePath(); c.fill();
  c.fillStyle = '#b8392f'; oval(c, 0, -6, r, r * 0.38); c.fill();
  if (t.cheio > 0.05) { c.fillStyle = t.tipo === 'comida' ? '#8a5a2e' : '#6fc3ff'; oval(c, 0, -6, r * 0.82 * Math.sqrt(t.cheio), r * 0.28 * Math.sqrt(t.cheio)); c.fill(); }
  c.restore();
}
