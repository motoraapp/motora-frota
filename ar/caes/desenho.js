// Cachorros em desenho animado: a imagem de cada cachorro (ar/caes/img/*.png, feitas a partir dos desenhos do dono) ganha movimento
// por cima: respirar, pulinhos ao andar, empinar ao latir, achatar para sentar/deitar/dormir, balançar ao brincar, inclinar para comer.
// As imagens olham para a direita; o app espelha quando o cachorro anda para a esquerda. Para mudar a aparência, troque o PNG.
const IMG = {};
function carregar(cfg) {
  if (!IMG[cfg.id]) { const i = new Image(); i.decoding = 'async'; i.src = new URL('./img/' + cfg.imagem, import.meta.url).href; IMG[cfg.id] = i; }
  return IMG[cfg.id];
}
export function precarregar(cfgs) { cfgs.forEach(carregar); }

const ALT = 1.3; // altura do desenho = tamanho × 1,3
export const alturaCabeca = () => ALT;

const S = Math.sin, PI = Math.PI;
const salto = (t) => { const k = (t % 0.45) / 0.45; return k < 0.32 ? S((k / 0.32) * PI) : 0; };

// [esticar x, esticar y, inclinar (rad, + = cabeça para baixo), subir (fração da altura), deslocar x (fração da altura)]
function xf(a, t, tA, f, p) {
  switch (a) {
    case 'walk': return [1, 1 + 0.015 * S(f * 2), 0.035 * S(f), Math.abs(S(f)) * 0.04, 0];
    case 'run': return [1 + 0.05 * S(f * 2 + 1), 1 - 0.04 * S(f * 2 + 1), 0.11 + 0.03 * S(f * 2), Math.max(0, S(f)) * 0.1, 0];
    case 'jump': { const u = Math.max(0, p ? p[0] : 0); return [1 / (1 + u * 0.35), 1 + u * 0.35, -0.05, 0, 0]; }
    case 'sit': return [1.03, 0.9 + 0.012 * S(t * 2.2), -0.03, 0, 0];
    case 'lie': return [1.1, 0.64 + 0.012 * S(t * 2), 0, 0, 0];
    case 'sleep': return [1.12, 0.6 + 0.03 * S(t * 1.5), 0.02, 0, 0];
    case 'curl': return [1.05, 0.62 + 0.01 * S(t * 2), 0.03, 0, 0.004 * S(t * 55)];
    case 'shiver': return [1, 0.96, 0.02 * S(t * 55), 0, 0.006 * S(t * 47)];
    case 'pant': return [1 - 0.012 * S(t * 14), 1 + 0.028 * S(t * 14), 0, 0, 0];
    case 'bark': { const b = salto(tA); return [1 - 0.04 * b, 1 + 0.08 * b, -0.07 * b, 0.06 * b, 0]; }
    case 'eat': case 'drink': return [1, 0.96, 0.3 + 0.07 * S(t * 9), 0, 0.01];
    case 'peeM': return [1, 1, -0.13, 0, 0];
    case 'peeF': return [1.04, 0.84, 0.05, 0, 0];
    case 'fight': return [1 + 0.04 * S(t * 8), 1, 0.13 * S(t * 8), Math.max(0, S(t * 5)) * 0.05, 0.02 * S(t * 8)];
    case 'playbow': return [1, 0.92, 0.32, 0, 0];
    default: return [1 - 0.007 * S(t * 2.4), 1 + 0.014 * S(t * 2.4), 0.015 * S(t * 0.8), 0, 0]; // idle: respirando
  }
}

export function desenharCao(c, d, lado) {
  const cfg = d.cfg, im = carregar(cfg);
  if (!im.complete || !im.naturalWidth) return;
  const s = d.tam, H = s * ALT, W = (H * im.naturalWidth) / im.naturalHeight, p = d.p;
  const a = xf(d.acao, d.t, d.tA, d.fase, [p[0]]);
  if (d.mist < 1) { // mistura 0,25 s com a ação anterior
    const b = xf(d.acaoAnt, d.t, d.tAnt, d.fase, [0]), k = d.mist * d.mist * (3 - 2 * d.mist);
    for (let i = 0; i < 5; i++) a[i] = b[i] + (a[i] - b[i]) * k;
  }
  const sub = a[3] * H + Math.max(0, p[0]) * s; // pulo grande do evento de brincar (p[0] = subir)
  // sombra no chão
  c.fillStyle = 'rgba(0,0,0,0.25)'; c.beginPath(); c.ellipse(d.x, d.y, W * 0.36 * (1 - Math.min(0.3, sub / H)), s * 0.07, 0, 0, 7); c.fill();
  c.save();
  c.translate(d.x + a[4] * H * lado, d.y - sub);
  c.scale(lado, 1); c.rotate(a[2]); c.scale(a[0], a[1]);
  c.drawImage(im, -W / 2, -H, W, H);
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
