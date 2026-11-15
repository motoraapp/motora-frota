// Movimento dos cachorros desenhados. Duas camadas:
//  1) transformar(): movimento do corpo todo (respirar, pulinho ao andar, achatar para deitar, empinar ao latir...)
//  2) articular(): ângulo de cada articulação (cabeça, 2 orelhas, rabo, 4 patas) por ação, com mistura de 0,25 s entre ações.
// Quem desenha (malha.js, com WebGL) usa os dois; desenho.js (sem WebGL) usa só o primeiro.
const S = Math.sin, C = Math.cos, PI = Math.PI;
const salto = (t) => { const k = (t % 0.45) / 0.45; return k < 0.32 ? S((k / 0.32) * PI) : 0; };
const suave = (x) => x * x * (3 - 2 * x);

// [esticar x, esticar y, inclinar (rad, + = cabeça para baixo), subir (fração da altura), deslocar x (fração da altura)]
export function xf(a, t, tA, f, p0, sentada) {
  const bob = sentada ? 0.075 : 0.04, bal = sentada ? 0.07 : 0.035;
  switch (a) {
    case 'walk': return [1, 1 + 0.015 * S(f * 2), bal * S(f), Math.abs(S(f)) * bob, 0];
    case 'run': return [1 + 0.05 * S(f * 2 + 1), 1 - 0.04 * S(f * 2 + 1), 0.11 + 0.03 * S(f * 2), Math.max(0, S(f)) * (sentada ? 0.14 : 0.1), 0];
    case 'jump': { const u = Math.max(0, p0); return [1 / (1 + u * 0.35), 1 + u * 0.35, -0.05, 0, 0]; }
    case 'sit': return [1.03, sentada ? 1 : 0.9 + 0.012 * S(t * 2.2), -0.03, 0, 0];
    case 'lie': return [1.1, 0.64 + 0.012 * S(t * 2), 0, 0, 0];
    case 'sleep': return [1.12, 0.6 + 0.03 * S(t * 1.5), 0.02, 0, 0];
    case 'curl': return [1.05, 0.62 + 0.01 * S(t * 2), 0.03, 0, 0.004 * S(t * 55)];
    case 'shiver': return [1, 0.96, 0.02 * S(t * 55), 0, 0.006 * S(t * 47)];
    case 'pant': return [1 - 0.012 * S(t * 14), 1 + 0.028 * S(t * 14), 0, 0, 0];
    case 'bark': { const b = salto(tA); return [1 - 0.04 * b, 1 + 0.08 * b, -0.07 * b, 0.06 * b, 0]; }
    case 'eat': case 'drink': return [1, 0.96, sentada ? 0.12 : 0.04, 0, 0.01];
    case 'peeM': return [1, 1, -0.06, 0, 0];
    case 'peeF': return [1.04, 0.84, 0.05, 0, 0];
    case 'fight': return [1 + 0.04 * S(t * 8), 1, 0.1 * S(t * 8), Math.max(0, S(t * 5)) * 0.05, 0.02 * S(t * 8)];
    case 'playbow': return [1, 0.92, sentada ? 0.15 : 0.1, 0, 0];
    default: return [1 - 0.007 * S(t * 2.4), 1 + 0.014 * S(t * 2.4), 0.012 * S(t * 0.8), 0, 0]; // idle: respirando
  }
}

// movimento do corpo todo, já misturado com a ação anterior. Devolve [sx, sy, rot, subir (px), deslocar x (px)]
export function transformar(d, H, saida = [0, 0, 0, 0, 0]) {
  const sentada = d.cfg.raca === 'shihtzu', p0 = d.p ? d.p[0] : 0;
  const a = xf(d.acao, d.t, d.tA, d.fase, p0, sentada);
  if (d.mist < 1) {
    const b = xf(d.acaoAnt, d.t, d.tAnt, d.fase, 0, sentada), k = suave(d.mist);
    for (let i = 0; i < 5; i++) a[i] = b[i] + (a[i] - b[i]) * k;
  }
  saida[0] = a[0]; saida[1] = a[1]; saida[2] = a[2];
  saida[3] = a[3] * H + Math.max(0, p0) * d.tam; // pulo grande do evento de brincar (p[0] = subir)
  saida[4] = a[4] * H;
  return saida;
}

// ---- articulações ----
// matriz [a, b, c, d, tx, ty]: x' = a·x + c·y + tx ; y' = b·x + d·y + ty
const rot = (a, px, py) => { const c = C(a), s = S(a); return [c, s, -s, c, px - (c * px - s * py), py - (s * px + c * py)]; };
const mul = (M, N) => [M[0] * N[0] + M[2] * N[1], M[1] * N[0] + M[3] * N[1], M[0] * N[2] + M[2] * N[3], M[1] * N[2] + M[3] * N[3],
  M[0] * N[4] + M[2] * N[5] + M[4], M[1] * N[4] + M[3] * N[5] + M[5]];

const OFF_ANDAR = [PI / 2, PI * 1.5, 0, PI], OFF_CORRER = [0, 0.35, PI, PI + 0.35];
const CHAVES = ['cab', 'orA', 'orB', 'rabo', 'p0', 'p1', 'p2', 'p3'];

// ângulos (rad; + = sentido horário na tela). cab + = cabeça para baixo; rabo + = rabo para cima; pernas + = pé para trás
function angulos(a, t, tA, f, d, o) {
  const E = d.energia, al = d.alegria == null ? 0.5 : d.alegria, ph = d.sem || 0;
  o.cab = 0.045 * S(t * 0.9 + ph) + 0.03 * S(t * 2.3 + ph * 2);
  o.orA = o.orB = 0.09 * S(t * 1.3 + ph);
  o.orB -= Math.max(0, S(t * 0.43 + ph * 3) - 0.93) * 9; // de vez em quando uma orelha dá uma tremidinha
  o.rabo = (0.16 + 0.3 * al) * S(t * (7 + 6 * E) + ph);
  o.p0 = o.p1 = o.p2 = o.p3 = 0;
  switch (a) {
    case 'walk':
      for (let i = 0; i < 4; i++) o['p' + i] = 0.38 * S(f + OFF_ANDAR[i]);
      o.cab += 0.05 * S(f * 2); o.rabo += 0.1; break;
    case 'run':
      for (let i = 0; i < 4; i++) o['p' + i] = 0.72 * S(f + OFF_CORRER[i]);
      o.cab = -0.08 + 0.06 * S(f * 2); o.orA = o.orB = -0.38 + 0.1 * S(f * 2); o.rabo = 0.35 + 0.3 * S(f * 2); break;
    case 'jump': o.p0 = o.p1 = -0.8; o.p2 = o.p3 = 0.55; o.cab = -0.12; o.orA = o.orB = -0.4; o.rabo = 0.5; break;
    case 'sit': o.cab = -0.05 + 0.04 * S(t * 0.7 + ph); o.rabo *= 0.5; break;
    case 'lie': o.cab = 0.1 + 0.04 * S(t * 0.4 + ph); o.rabo *= 0.3; break;
    case 'sleep': o.cab = 0.45 + 0.02 * S(t * 1.5); o.orA = o.orB = 0.1; o.rabo = 0.05 * S(t * 1.5); break;
    case 'curl': o.cab = 0.5; o.orA = o.orB = -0.3; o.rabo = -0.6 + 0.04 * S(t * 55); break;
    case 'shiver': o.cab = 0.12 + 0.025 * S(t * 55); o.orA = o.orB = -0.3; o.rabo = -0.5 + 0.05 * S(t * 47); break;
    case 'pant': o.cab += 0.03 * S(t * 14); o.rabo *= 1.2; break;
    case 'bark': { const k = salto(tA); o.cab = -0.22 * k; o.orA = o.orB = -0.2 * k; o.rabo = 0.5 * S(t * 15); break; }
    case 'eat': case 'drink': o.cab = 0.55 + 0.07 * S(t * 9); o.orA = o.orB = 0.15; o.p0 = o.p1 = -0.14; o.rabo = 0.3 * S(t * 11 + ph); break;
    case 'peeM': o.p2 = -1.15; o.cab = -0.1; o.rabo = 0.25; break;
    case 'peeF': o.cab = 0.1; o.rabo = 0.35; break;
    case 'fight': o.p0 = -0.9 + 0.5 * S(t * 12); o.p1 = -0.9 + 0.5 * S(t * 12 + PI); o.cab = 0.15 * S(t * 3); o.orA = o.orB = -0.2; o.rabo = 0.5 * S(t * 12); break;
    case 'playbow': o.p0 = o.p1 = -0.55; o.cab = 0.25; o.rabo = 0.5 * S(t * 13); break;
    default: break; // idle
  }
}

const A1 = {}, A2 = {};
// escreve as matrizes das 8 articulações em M (32 números) e T (16 números), na ordem: cabeça, orelha A, orelha B, rabo, 4 patas
export function articular(d, ossos, M, T) {
  angulos(d.acao, d.t, d.tA, d.fase, d, A1);
  if (d.mist < 1) {
    angulos(d.acaoAnt, d.t, d.tAnt, d.fase, d, A2);
    const k = suave(d.mist);
    for (const c of CHAVES) A1[c] = A2[c] + (A1[c] - A2[c]) * k;
  }
  if (d.cfg.raca === 'shihtzu') { A1.cab *= 0.5; A1.orA *= 0.6; A1.orB *= 0.6; } // sentada e fofa: cabeça e orelhas mexem menos
  const mh = rot(A1.cab, ossos.cabeca.p[0], ossos.cabeca.p[1]);
  const mats = [mh, mul(mh, rot(A1.orA, ossos.orelhas[0].p[0], ossos.orelhas[0].p[1])), mul(mh, rot(A1.orB, ossos.orelhas[1].p[0], ossos.orelhas[1].p[1])),
    rot(A1.rabo, ossos.rabo.p[0], ossos.rabo.p[1])];
  for (let i = 0; i < 4; i++) mats.push(rot(A1['p' + i], ossos.pernas[i].p[0], ossos.pernas[i].p[1]));
  for (let i = 0; i < 8; i++) { const m = mats[i]; M[i * 4] = m[0]; M[i * 4 + 1] = m[1]; M[i * 4 + 2] = m[2]; M[i * 4 + 3] = m[3]; T[i * 2] = m[4]; T[i * 2 + 1] = m[5]; }
}
