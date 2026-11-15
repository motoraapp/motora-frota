// Sem WebGL: o desenho inteiro (ar/caes/img/*.png) com movimento do corpo todo (movimento.js): respirar, pulinhos, achatar para deitar,
// piscar e dormir de olhos fechados (camada `olhos`), Maya sentada ao sentar/deitar. Com WebGL, malha.js também articula cabeça,
// orelhas, rabo e patas. As imagens olham para a direita; o app espelha ao andar para a esquerda.
import { transformar, piscar, poseSentada } from './movimento.js';

const IMG = {};
function img(arq) {
  if (!IMG[arq]) { const i = new Image(); i.decoding = 'async'; i.src = new URL('./img/' + arq, import.meta.url).href; IMG[arq] = i; }
  return IMG[arq];
}
const pronta = (i) => i && i.complete && i.naturalWidth;
export function precarregar(cfgs) { for (const c of cfgs) { img(c.imagem); if (c.olhos) img(c.olhos); if (c.poseSentada) img(c.poseSentada.imagem); } }

const ALT = 1.3; // altura do desenho = tamanho × 1,3
export const alturaCabeca = () => ALT;
const tmp = [0, 0, 0, 0, 0];

export function desenharSombra(c, d, aspecto) {
  const H = d.tam * ALT, W = H * aspecto, sub = transformar(d, H, tmp)[3];
  c.fillStyle = 'rgba(0,0,0,0.25)'; c.beginPath(); c.ellipse(d.x, d.y, W * 0.36 * (1 - Math.min(0.3, sub / H)), d.tam * 0.07, 0, 0, 7); c.fill();
}

export function desenharCao(c, d, lado) {
  const cfg = d.cfg, pe = img(cfg.imagem);
  if (!pronta(pe)) return;
  const s = cfg.poseSentada && poseSentada(cfg, d.acao) && pronta(img(cfg.poseSentada.imagem));
  const im = s ? img(cfg.poseSentada.imagem) : pe;
  const H = d.tam * ALT, W = (H * im.naturalWidth) / im.naturalHeight, a = transformar(d, H, tmp, !!s);
  desenharSombra(c, d, pe.naturalWidth / pe.naturalHeight);
  c.save();
  c.beginPath(); c.rect(d.x - H * 2, d.y - H * 3, H * 4, H * 3 + 2); c.clip(); // abaixo do chão não aparece
  c.translate(d.x + a[4] * lado, d.y - a[3]);
  c.scale(lado, 1); c.rotate(a[2]); c.scale(a[0], a[1]);
  c.drawImage(im, -W / 2, -H, W, H);
  const ol = !s && cfg.olhos ? img(cfg.olhos) : null, p = ol ? piscar(d) : 0;
  if (p > 0.01 && pronta(ol)) { c.globalAlpha = p; c.drawImage(ol, -W / 2, -H, W, H); }
  c.restore();
}

export function desenharTigela(c, t) {
  const r = 17, ol = '#3a2418';
  c.save(); c.translate(t.x, t.y);
  c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 2, r * 1.1, r * 0.35, 0, 0, 7); c.fill();
  c.fillStyle = ol; c.beginPath(); c.ellipse(0, -5, r + 2, r * 0.45 + 2, 0, 0, 7); c.fill();
  c.fillStyle = '#d94f45'; c.beginPath(); c.moveTo(-r, -6); c.lineTo(-r * 0.75, 0); c.lineTo(r * 0.75, 0); c.lineTo(r, -6); c.closePath(); c.fill();
  c.fillStyle = '#b8392f'; c.beginPath(); c.ellipse(0, -6, r, r * 0.38, 0, 0, 7); c.fill();
  if (t.cheio > 0.05) { const k = Math.sqrt(t.cheio); c.fillStyle = t.tipo === 'comida' ? '#8a5a2e' : '#6fc3ff'; c.beginPath(); c.ellipse(0, -6, r * 0.82 * k, r * 0.28 * k, 0, 0, 7); c.fill(); }
  c.restore();
}
