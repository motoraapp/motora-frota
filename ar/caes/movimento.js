// Movimento dos cachorros desenhados, revisado em 15/11/2026 para ficar natural (referências: estudos de marcha de cães e padrões das raças):
//  - andar = passada lateral de 4 tempos (pata de trás e depois a da frente do mesmo lado), cada pata fica ~62% do tempo no chão,
//    volta rápido pelo ar e encolhe ao subir; o pinscher levanta alto as patas da frente (passo "hackney"), a shih tzu anda macio e nivelado;
//  - correr = galope: as de trás empurram juntas, as da frente alcançam juntas, com fase no ar e o corpo dobrando;
//  - parado: fica quieto e muda o olhar de repente (como cachorro de verdade), mexe uma orelha de vez em quando, troca o peso;
//  - rabo abana em rajadas rápidas quando está feliz; ofegar a ~5 vezes por segundo; tremer a ~10 por segundo;
//  - orelhas e rabo atrasam um pouco em relação ao corpo (balanço).
// Duas camadas: transformar() = corpo todo; articular() = cabeça, 2 orelhas, rabo e 4 patas (malha.js). desenho.js (sem WebGL) usa só a primeira.
const S = Math.sin, C = Math.cos, PI = Math.PI, TAU = PI * 2;
const salto = (t) => { const k = (t % 0.45) / 0.45; return k < 0.32 ? S((k / 0.32) * PI) : 0; };
const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

// número "aleatório" repetível para o trecho n (entre -1 e 1)
const acaso = (n, s) => { const x = S(n * 127.1 + s * 311.7) * 43758.5453; return (x - Math.floor(x)) * 2 - 1; };
// valor que fica parado por `periodo` segundos e muda rápido (em `troca` s) para o próximo: é assim que cachorro olha em volta
function degrau(t, periodo, s, troca = 0.28) {
  const n = Math.floor(t / periodo), k = suave((t - n * periodo) / troca);
  return acaso(n - 1, s) + (acaso(n, s) - acaso(n - 1, s)) * k;
}
// pulso curto (0..1) que acontece só em alguns trechos: tremidinha de orelha, rajada de rabo
function pulso(t, periodo, s, chance, dur) {
  const n = Math.floor(t / periodo), u = (t - n * periodo) / dur;
  return acaso(n, s) > 1 - chance * 2 && u < 1 ? S(u * PI) : 0;
}

// uma pata no ciclo da passada: u = 0..1; chão (apoio) por `apoio` do ciclo indo para trás devagar, depois volta rápido pelo ar
function passada(u, apoio, amp, saida) {
  u -= Math.floor(u);
  if (u < apoio) { saida[0] = -amp + 2 * amp * (u / apoio); saida[1] = 0; }
  else { const w = (u - apoio) / (1 - apoio); saida[0] = amp - 2 * amp * suave(w); saida[1] = S(w * PI); }
  return saida;
}

// [esticar x, esticar y, inclinar (rad, + = cabeça para baixo), subir (fração da altura), deslocar x (fração da altura)]
export function xf(a, t, tA, f, p0, sentada) {
  const resp = S(t * 2.6); // ~25 respirações por minuto
  switch (a) {
    case 'walk': return sentada
      ? [1 + 0.012 * S(f * 2), 1 - 0.012 * S(f * 2), 0.03 * S(f), Math.abs(S(f)) * 0.035, 0]   // shih tzu: macio e nivelado, gingando de leve
      : [1, 1 + 0.008 * S(f * 2), 0.012 * S(f * 2 + 0.6), (0.5 - 0.5 * C(f * 2)) * 0.014, 0];      // pinscher: costas firmes, 2 subidinhas por passada
    case 'run': { const k = S(f); // galope: estica no ar, encolhe ao juntar as patas
      return [1 + 0.07 * k, 1 - 0.05 * k, 0.07 * C(f) + 0.04, Math.max(0, S(f - 0.5)) * (sentada ? 0.16 : 0.1), 0]; }
    case 'jump': { const u = Math.max(0, p0); return [1 / (1 + u * 0.35), 1 + u * 0.35, -0.05, 0, 0]; }
    case 'sit': return sentada ? [1, 1 + 0.01 * resp, -0.02, 0, 0] : [1.03, 0.9 + 0.01 * resp, -0.03, 0, 0];
    case 'lie': return sentada ? [1.05, 0.87 + 0.01 * resp, 0.02, 0, 0] : [1.1, 0.64 + 0.012 * resp, 0, 0, 0];
    case 'sleep': return [1.12, 0.6 + 0.03 * S(t * 1.3), 0.02, 0, 0];                                // dormindo respira fundo e devagar
    case 'curl': return [1.05, 0.62 + 0.01 * resp, 0.03, 0, 0.004 * S(t * 63)];
    case 'shiver': return [1, 0.96, 0.014 * S(t * 63), 0, 0.005 * S(t * 57)];                        // tremor ~10 por segundo
    case 'pant': return [1 - 0.01 * S(t * 31), 1 + 0.02 * S(t * 31), 0, 0, 0];                       // ofegar ~5 por segundo
    case 'bark': { const b = salto(tA); return [1 - 0.04 * b, 1 + 0.07 * b, -0.06 * b, 0.05 * b, -0.012 * b]; }
    case 'eat': case 'drink': return [1, 0.97, sentada ? 0.12 : 0.05, 0, 0.01];
    case 'peeM': return [1, 1, -0.05, 0, 0];
    case 'peeF': return [1.04, 0.84, 0.05, 0, 0];
    case 'fight': return [1 + 0.04 * S(t * 8), 1, 0.1 * S(t * 8), Math.max(0, S(t * 5)) * 0.05, 0.02 * S(t * 8)];
    case 'playbow': return [1, 0.93, sentada ? 0.15 : 0.11, 0, 0];
    default: return [1 - 0.006 * resp, 1 + 0.012 * resp, 0.008 * degrau(t, 5.3, 7, 1.2), 0, 0];      // parado: respira e troca o peso devagar
  }
}

// movimento do corpo todo, já misturado com a ação anterior. Devolve [sx, sy, rot, subir (px), deslocar x (px)]
// sentada = está usando o desenho de cachorro sentado (Maya ao sentar/deitar)
export function transformar(d, H, saida = [0, 0, 0, 0, 0], sentada = false) {
  const p0 = d.p ? d.p[0] : 0;
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

// usa o desenho sentado (config.poseSentada) nestas ações
export const poseSentada = (cfg, a) => !!cfg.poseSentada && (a === 'sit' || a === 'lie');

// olhos fechados (0 aberto … 1 fechado): pisca a cada 2 a 5 s (às vezes duas vezes seguidas), fecha ao dormir
export function piscar(d) {
  const t = (d.t || 0) + (d.sem || 0) * 1.7, a = d.acao, per = 3.6, n = Math.floor(t / per);
  const x = t - n * per - (0.5 + 0.5 * acaso(n, 9)) * (per - 0.6);
  let v = x > 0 && x < 0.16 ? S((x / 0.16) * PI) : 0;
  if (acaso(n, 11) > 0.55) { const y = x - 0.3; if (y > 0 && y < 0.16) v = Math.max(v, S((y / 0.16) * PI)); }
  if (a === 'sleep') v = 1;
  if (d.mist < 1 && (d.acaoAnt === 'sleep') !== (a === 'sleep')) { const k = suave(d.mist); v = Math.max(v, a === 'sleep' ? k : 1 - k); }
  return v;
}

// ---- articulações ----
// matriz [a, b, c, d, tx, ty]: x' = a·x + c·y + tx ; y' = b·x + d·y + ty. Gira em volta de (px, py) e encolhe ao longo da pata (k < 1).
function junta(ang, px, py, k = 1) {
  const c = C(ang), s = S(ang), a = c, b = s, cc = -s * k, dd = c * k;
  return [a, b, cc, dd, px - (a * px + cc * py), py - (b * px + dd * py)];
}
const mul = (M, N) => [M[0] * N[0] + M[2] * N[1], M[1] * N[0] + M[3] * N[1], M[0] * N[2] + M[2] * N[3], M[1] * N[2] + M[3] * N[3],
  M[0] * N[4] + M[2] * N[5] + M[4], M[1] * N[4] + M[3] * N[5] + M[5]];

// fração do ciclo em que cada pata pisa. Patas: 0 e 1 = da frente, 2 e 3 = de trás (0 e 2 do mesmo lado).
const ANDAR = [0.25, 0.75, 0, 0.5];     // lateral de 4 tempos: trás, frente do mesmo lado, trás do outro, frente do outro
const GALOPE = [0.5, 0.62, 0, 0.1];     // as de trás empurram quase juntas, depois as da frente
const CHAVES = ['cab', 'orA', 'orB', 'rabo', 'p0', 'p1', 'p2', 'p3', 'k0', 'k1', 'k2', 'k3', 'j0', 'j1', 'j2', 'j3'];
const tmp = [0, 0];

// ângulos (rad; + = sentido horário na tela). cab + = cabeça para baixo; rabo + = para cima; patas + = pé para trás;
// j = dobra do joelho/pulso (+ = pé dobra para trás e para cima); k = encolher a pata
function angulos(a, t, tA, f, d, o) {
  const E = d.energia, al = d.alegria == null ? 0.5 : d.alegria, ph = d.sem || 0, u = f / TAU, shih = d.cfg.raca === 'shihtzu';
  // parado: olhar que fica e muda de repente + microbalanço da respiração; orelha treme sozinha; rabo abana em rajadas
  const olhar = 0.07 * degrau(t, 2.3 + E, ph, 0.25) + 0.012 * S(t * 2.6);
  const trem = pulso(t, 1.7, ph + 3, 0.16, 0.22);
  const rajada = 0.25 + 0.75 * suave(0.5 + 0.5 * degrau(t, 1.9, ph + 5, 0.4) + (al - 0.5));
  const abano = (0.14 + 0.34 * al) * rajada * S(t * (17 + 9 * E) + ph); // 3 a 4 abanadas por segundo
  o.cab = olhar; o.orA = 0.03 * S(t * 2.6 - 0.6); o.orB = o.orA - 0.3 * trem; o.rabo = abano;
  for (let i = 0; i < 4; i++) { o['p' + i] = 0; o['k' + i] = 1; o['j' + i] = 0; }
  switch (a) {
    case 'walk': {
      for (let i = 0; i < 4; i++) {
        const frente = i < 2; passada(u + ANDAR[i], 0.62, (frente ? 0.36 : 0.32) * (shih ? 0.75 : 1), tmp); // shih tzu: patas curtas, passo menor
        o['p' + i] = tmp[0] - (frente ? 0.1 * tmp[1] : 0);             // a da frente estica para a frente no alto do passo
        o['j' + i] = tmp[1] * (shih ? (frente ? 0.55 : 0.45) : (frente ? 1.05 : 0.55)); // dobra ao subir: pinscher alto na frente (hackney); shih tzu macio
        o['k' + i] = 1 - tmp[1] * (frente ? 0.08 : 0.04);
      }
      o.cab = 0.035 * S(f * 2 + 0.9) + olhar * 0.4;                    // a cabeça acompanha as patas da frente (2 vezes por passada)
      o.orA = o.orB = 0.07 * S(f * 2 - 0.7);                           // orelhas atrasadas em relação ao corpo
      o.rabo = 0.12 + 0.6 * abano + 0.05 * S(f * 2 - 1.2); break;
    }
    case 'run': {
      for (let i = 0; i < 4; i++) { passada(u + GALOPE[i], 0.38, 0.72, tmp); o['p' + i] = tmp[0]; o['j' + i] = tmp[1] * (i < 2 ? 1.2 : 0.8); o['k' + i] = 1 - tmp[1] * 0.1; }
      o.cab = -0.1 + 0.07 * S(f + 2.2); o.orA = o.orB = -0.42 + 0.14 * S(f * 2 - 1); o.rabo = 0.3 + 0.25 * S(f - 1.5); break;
    }
    case 'jump': o.p0 = o.p1 = -0.8; o.p2 = o.p3 = 0.55; o.j0 = o.j1 = 1.0; o.j2 = o.j3 = 0.6; o.cab = -0.12; o.orA = o.orB = -0.4; o.rabo = 0.5; break;
    case 'sit': o.cab = -0.05 + olhar; o.rabo = abano * 0.5; break;
    case 'lie': o.cab = 0.1 + olhar * 0.7; o.rabo = abano * 0.25; break;
    case 'sleep': o.cab = 0.45 + 0.02 * S(t * 1.3); o.orA = 0.1; o.orB = 0.1 - 0.2 * pulso(t, 4.1, ph, 0.12, 0.3); o.rabo = 0.03 * S(t * 1.3); break; // sonhando: a orelha mexe
    case 'curl': o.cab = 0.5; o.orA = o.orB = -0.3; o.rabo = -0.6 + 0.03 * S(t * 63); break;
    case 'shiver': o.cab = 0.12 + 0.02 * S(t * 63); o.orA = o.orB = -0.3 + 0.03 * S(t * 57); o.rabo = -0.5 + 0.04 * S(t * 60); break;
    case 'pant': o.cab = olhar * 0.6 + 0.02 * S(t * 31); o.rabo = abano; break;
    case 'bark': { const k = salto(tA); o.cab = -0.22 * k; o.orA = o.orB = -0.22 * k; o.p0 = o.p1 = -0.1 * k; o.rabo = 0.4 * S(t * 24); break; }
    case 'eat': case 'drink': { const m = a === 'eat' ? S(t * 9) : S(t * 13); // comer mastiga; beber lambe mais rápido
      o.cab = 0.55 + 0.06 * m; o.orA = o.orB = 0.15 + 0.04 * S(t * 9 - 0.8); o.p0 = o.p1 = -0.14; o.rabo = 0.25 * S(t * 19 + ph); break; }
    case 'peeM': o.p2 = -1.15; o.j2 = 0.5; o.cab = -0.1 + olhar * 0.5; o.rabo = 0.25; break;
    case 'peeF': o.cab = 0.1; o.rabo = 0.35; break;
    case 'fight': o.p0 = -0.9 + 0.5 * S(t * 12); o.p1 = -0.9 + 0.5 * S(t * 12 + PI); o.j0 = 0.6 + 0.4 * S(t * 12 + 1); o.j1 = 0.6 + 0.4 * S(t * 12 + PI + 1); o.cab = 0.15 * S(t * 3); o.orA = o.orB = -0.2 + 0.1 * S(t * 8 - 1); o.rabo = 0.5 * S(t * 24); break;
    case 'playbow': o.p0 = o.p1 = -0.55; o.cab = 0.25; o.rabo = 0.5 * S(t * 26); break;
    default: break; // idle
  }
}

const A1 = {}, A2 = {};
// escreve as matrizes das 12 articulações em M (48 números) e T (24 números): cabeça, orelha A, orelha B, rabo, 4 patas (ombro/quadril), 4 joelhos
export function articular(d, ossos, M, T) {
  angulos(d.acao, d.t, d.tA, d.fase, d, A1);
  if (d.mist < 1) {
    angulos(d.acaoAnt, d.t, d.tAnt, d.fase, d, A2);
    const k = suave(d.mist);
    for (const c of CHAVES) A1[c] = A2[c] + (A1[c] - A2[c]) * k;
  }
  if (d.cfg.raca === 'shihtzu') { A1.cab *= 0.5; A1.orA *= 0.6; A1.orB *= 0.6; } // sentada e fofa: cabeça e orelhas mexem menos
  const mh = junta(A1.cab, ossos.cabeca.p[0], ossos.cabeca.p[1]);
  const mats = [mh, mul(mh, junta(A1.orA, ossos.orelhas[0].p[0], ossos.orelhas[0].p[1])), mul(mh, junta(A1.orB, ossos.orelhas[1].p[0], ossos.orelhas[1].p[1])),
    junta(A1.rabo, ossos.rabo.p[0], ossos.rabo.p[1])];
  for (let i = 0; i < 4; i++) mats.push(junta(A1['p' + i], ossos.pernas[i].p[0], ossos.pernas[i].p[1], A1['k' + i]));
  for (let i = 0; i < 4; i++) { const pe = ossos.pernas[i], jo = pe.j || [pe.p[0], pe.p[1] + 50]; mats.push(mul(mats[4 + i], junta(A1['j' + i], jo[0], jo[1]))); }
  for (let i = 0; i < 12; i++) { const m = mats[i]; M[i * 4] = m[0]; M[i * 4 + 1] = m[1]; M[i * 4 + 2] = m[2]; M[i * 4 + 3] = m[3]; T[i * 2] = m[4]; T[i * 2 + 1] = m[5]; }
}
