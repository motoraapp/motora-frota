// Animações feitas por código. Cada ação escreve uma "pose" (lista de números) e o motor mistura a anterior com a nova em 0,25 s.
export const Y = 0, PX = 1, RZ = 2, TZ = 3, NX = 4, NY = 5, HX = 6, HY = 7, HZ = 8, JAW = 9, TONG = 10,
  EARX = 11, EARZ = 12, TAILX = 13, TAILY = 14, TAILC = 15, HIP = 16, KNEE = 20, LIFT = 24, BLINK = 28, SQ = 29, N = 30;
export const MISTURA = 0.25; // segundos

const S = Math.sin, C = Math.cos, mx = Math.max, TAU = Math.PI * 2;

function base(p, d) {
  p.fill(0);
  p[TAILX] = d.shih ? -0.15 : -0.75; p[TAILC] = d.shih ? 0.9 : 0.25;
  p[SQ] = 0.012 * S(d.t * 2.4);                       // respiração
}
function abanar(p, d, t, amp, f) { p[TAILY] = S(t * TAU * f) * amp; }
const alegria = (d) => 0.35 + d.alegria * 0.45;

const A = {
  idle(p, t, d) {
    base(p, d);
    abanar(p, d, t, 0.18 * alegria(d), 0.8 + d.energia * 1.4);
    p[HY] = 0.22 * S(t * 0.31 + d.sem) + 0.1 * S(t * 0.83); p[HX] = 0.05 * S(t * 0.5);
    p[EARZ] = 0.05 * S(t * 0.7 + d.sem); p[RZ] = 0.02 * S(t * 0.6);
    if (d.energia > 0.8) p[Y] = 0.006 * S(t * 9); // o pinscher não para quieto
  },
  walk(p, t, d) {
    base(p, d);
    const f = d.fase, off = d.offAndar;
    for (let i = 0; i < 4; i++) { const a = f + off[i]; p[HIP + i] = 0.42 * S(a); p[KNEE + i] = mx(0, -C(a)) * (i < 2 ? 0.7 : 0.9); }
    p[Y] = 0.012 * Math.abs(S(f * 2)); p[NX] = 0.05 * S(f * 2); p[RZ] = 0.025 * S(f);
    abanar(p, d, t, 0.25 * alegria(d), 1.6 + d.energia);
  },
  run(p, t, d) {
    base(p, d);
    const f = d.fase, off = d.offCorrer;
    for (let i = 0; i < 4; i++) { const a = f + off[i]; p[HIP + i] = 0.8 * S(a); p[KNEE + i] = mx(0, -C(a)) * 1.1; }
    p[PX] = 0.12 * S(f + 1.6); p[Y] = 0.05 * mx(0, S(f)); p[NX] = -0.1 * S(f + 1.6);
    p[EARX] = 0.55; p[TAILX] = d.shih ? -0.4 : -1.35; p[TAILY] = 0.15 * S(f * 2);
  },
  jump(p, t, d) { // 0,8 s: agacha, voa, cai
    base(p, d);
    const s = Math.min(1, t / 0.8);
    if (s < 0.25) { const k = s / 0.25; p[Y] = -0.1 * k; for (let i = 0; i < 4; i++) { p[HIP + i] = i < 2 ? -0.3 * k : 0.4 * k; p[KNEE + i] = 0.7 * k; } p[PX] = 0.1 * k; }
    else if (s < 0.8) { const k = (s - 0.25) / 0.55; p[Y] = -0.1 + 0.6 * S(k * Math.PI) + 0.1 * k; p[PX] = -0.35 * C(k * Math.PI); for (let i = 0; i < 4; i++) { p[HIP + i] = i < 2 ? -0.7 : 0.7; p[KNEE + i] = 0.6; } p[EARX] = 0.4; }
    else { const k = (s - 0.8) / 0.2; p[Y] = -0.05 * S(k * Math.PI); }
    p[TAILY] = 0.4 * S(t * 20);
  },
  playbow(p, t, d) {
    base(p, d);
    p[PX] = 0.42; p[Y] = -0.06; p[TZ] = -0.03; p[NX] = -0.55; p[HX] = -0.2;
    p[HIP] = p[HIP + 1] = -1.0; p[KNEE] = p[KNEE + 1] = 1.2; p[HIP + 2] = p[HIP + 3] = -0.42;
    p[TAILX] = d.shih ? -0.1 : -0.35; abanar(p, d, t, 0.55, 3.5); p[EARX] = -0.1;
  },
  sit(p, t, d) {
    base(p, d);
    p[PX] = -0.55; p[Y] = -0.13 * d.perna / 0.5; p[NX] = 0.42; p[HX] = 0.05;
    p[HIP] = p[HIP + 1] = 0.55; p[HIP + 2] = p[HIP + 3] = -0.75; p[KNEE + 2] = p[KNEE + 3] = 1.9;
    p[TAILX] = -2.1; abanar(p, d, t, 0.12 * alegria(d), 0.9);
    p[HY] = 0.2 * S(t * 0.4 + d.sem);
  },
  lie(p, t, d) {
    base(p, d);
    p[Y] = -d.perna * 0.86; p[NX] = 0.15;
    p[HIP] = p[HIP + 1] = -1.45; p[KNEE] = p[KNEE + 1] = 0.15;
    p[HIP + 2] = p[HIP + 3] = -1.25; p[KNEE + 2] = p[KNEE + 3] = 2.5; p[LIFT + 2] = p[LIFT + 3] = 0.3;
    p[TAILX] = -2.4; p[EARX] = 0.2; p[HY] = 0.25 * S(t * 0.25 + d.sem);
    abanar(p, d, t, 0.06 * alegria(d), 0.6);
  },
  sleep(p, t, d) {
    A.lie(p, t, d);
    p[NX] = 0.75; p[HX] = 0.25; p[HY] = 0.45; p[HZ] = 0.3; p[RZ] = 0.12; p[BLINK] = 1; p[TAILY] = 0.3;
    p[SQ] = 0.03 * S(t * 1.5); p[EARX] = 0.35;
  },
  curl(p, t, d) { // frio: encolhido e tremendo
    A.lie(p, t, d);
    p[NX] = 0.6; p[HY] = 0.6; p[HZ] = 0.25; p[RZ] = 0.1; p[TAILX] = -2.7; p[TAILY] = 0.5; p[EARX] = 0.6;
    p[RZ] += 0.025 * S(t * 55); p[Y] += 0.006 * S(t * 47);
  },
  bark(p, t, d) {
    A.idle(p, t, d);
    const k = (t % 0.45) / 0.45, j = k < 0.32 ? S((k / 0.32) * Math.PI) : 0;
    p[JAW] = 0.55 * j; p[HX] = -0.18 * j; p[NX] = -0.12 * j; p[Y] += 0.02 * j; p[EARX] = -0.12; p[HY] *= 0.2;
    abanar(p, d, t, 0.4, 3);
  },
  pant(p, t, d) {
    A.idle(p, t, d);
    p[JAW] = 0.32 + 0.05 * S(t * 14); p[TONG] = 1; p[SQ] = 0.03 * S(t * 14); p[EARX] = 0.15; p[HY] *= 0.5;
  },
  shiver(p, t, d) {
    base(p, d);
    p[Y] = -0.05; p[EARX] = 0.6; p[TAILX] = -2.6; p[NX] = 0.25;
    for (let i = 0; i < 4; i++) { p[HIP + i] = i < 2 ? 0.12 : -0.25; p[KNEE + i] = 0.35; }
    p[RZ] = 0.03 * S(t * 55); p[Y] += 0.008 * S(t * 47); p[HY] = 0.1 * S(t * 0.5);
  },
  eat(p, t, d) {
    base(p, d);
    p[NX] = 1.05; p[HX] = 0.45; p[PX] = 0.15; p[Y] = -0.04; p[HIP] = p[HIP + 1] = -0.2;
    p[JAW] = 0.25 * mx(0, S(t * 9)); p[HX] += 0.06 * S(t * 9); abanar(p, d, t, 0.3, 2);
  },
  drink(p, t, d) {
    A.eat(p, t, d);
    p[JAW] = 0.18; p[TONG] = 0.5 + 0.5 * S(t * 11); p[HX] = 0.45 + 0.03 * S(t * 11);
  },
  peeM(p, t, d) { // macho levanta a perna
    base(p, d);
    p[LIFT + 3] = 1.25; p[HIP + 3] = -0.35; p[KNEE + 3] = 0.5; p[RZ] = 0.12; p[Y] = -0.015; p[TAILX] = -0.5; p[HY] = 0.3;
  },
  peeF(p, t, d) { // fêmea agacha
    base(p, d);
    p[PX] = -0.32; p[Y] = -0.1 * d.perna / 0.5; p[HIP] = p[HIP + 1] = 0.3; p[HIP + 2] = p[HIP + 3] = -0.5; p[KNEE + 2] = p[KNEE + 3] = 1.35;
    p[NX] = 0.25; p[TAILX] = -0.35; p[HY] = 0.2;
  },
  fight(p, t, d) { // brincadeira de briga: empina, patinha, mordidinha de mentira
    base(p, d);
    const em = mx(0, S(t * 5.2 + d.sem));
    p[PX] = -0.65 * em; p[Y] = 0.1 * em; p[NX] = 0.3 * em;
    p[HIP] = -0.8 + 0.5 * S(t * 12); p[HIP + 1] = -0.8 + 0.5 * S(t * 12 + Math.PI); p[KNEE] = p[KNEE + 1] = 1.0 * em;
    p[HIP + 2] = p[HIP + 3] = 0.3 * em;
    p[JAW] = 0.35 * mx(0, S(t * 7)); p[HY] = 0.35 * S(t * 3); p[HZ] = 0.2 * S(t * 3.3);
    p[EARX] = 0.3; abanar(p, d, t, 0.5, 4);
  },
};
A.walkback = A.walk;
export const ACOES = A;
export const NOMES_ACOES = Object.keys(A);

// pose -> articulações
export function aplicarPose(m, p, d) {
  m.corpo.position.y = m.alturaBase + p[Y]; m.corpo.position.z = p[TZ];
  m.corpo.rotation.set(p[PX], 0, p[RZ]);
  m.tronco.scale.x = m.tronco.userData.sx * (1 + p[SQ]); m.tronco.scale.y = m.tronco.userData.sy * (1 + p[SQ]);
  m.pescoco.rotation.set(m.pescoco.userData.base + p[NX], p[NY], 0);
  m.cabeca.rotation.set(m.cabeca.userData.base + p[HX], p[HY], p[HZ]);
  m.mandibula.rotation.x = p[JAW];
  const tg = p[TONG]; m.lingua.scale.set(1, 1, 0.5 + tg * 0.9); m.lingua.position.y = 0.018 - tg * 0.01; m.lingua.visible = tg > 0.02 || p[JAW] > 0.2;
  for (let i = 0; i < 2; i++) {
    const o = m.orelhas[i], s = i === 0 ? 1 : -1;
    if (d.shih) { o.rotation.x = -p[EARX] * 0.3 + 0.08 * S(d.t * 1.3); o.rotation.z = s * (0.1 + p[EARZ] * 0.5); }
    else { o.rotation.x = -p[EARX] * 0.9 - 0.1; o.rotation.z = -s * (o.userData.base + p[EARZ] + p[EARX] * 0.35); }
  }
  m.rabo[0].rotation.set(p[TAILX], p[TAILY], 0);
  if (d.semRabo) m.corpo.rotation.y = p[TAILY] * 0.12; // sem rabo: o bumbum rebola quando está feliz
  for (let i = 1; i < m.rabo.length; i++) m.rabo[i].rotation.x = p[TAILC];
  for (let i = 0; i < 4; i++) {
    const pt = m.patas[i];
    pt.quadril.rotation.x = p[HIP + i]; pt.quadril.rotation.z = pt.lado * p[LIFT + i];
    pt.joelho.rotation.x = p[KNEE + i];
  }
  const ab = 1 - 0.92 * Math.min(1, p[BLINK]);
  m.olhos[0].scale.y = m.olhos[1].scale.y = ab;
}
