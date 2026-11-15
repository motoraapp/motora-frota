// Movimento dos cachorros desenhados (revisado em 15/11/2026 para ficar natural; referências: estudos de marcha de cães e padrões das raças).
// Regra: o desenho NUNCA é achatado nem esticado. Sentar, deitar e dormir = baixar o corpo; o que passa da linha do chão não aparece.
// Articulações (usadas por desenho.js): pescoço, cabeça, boca, 2 orelhas, rabo em 2 partes e, em cada pata, ombro/quadril, joelho e pulso.
//  - andar = passada lateral de 4 tempos (pata de trás e depois a da frente do mesmo lado), cada pata ~62% do tempo no chão; ao subir
//    dobra o joelho e o pulso (o pé "pendura") e estica antes de pisar; pinscher levanta alto as da frente (hackney), shih tzu anda macio;
//  - correr = galope: as de trás empurram juntas, as da frente alcançam juntas, com fase no ar;
//  - cabeça: o pescoço leva uma parte do movimento e a cabeça o resto; orelhas e ponta do rabo atrasam um pouco (balanço natural);
//  - parado: olha em volta mudando o olhar de repente, mexe uma orelha, troca o peso; os agitados (Belinha, Elvis) se mexem mais;
//  - rabo abana em onda e em rajadas; ofegar ~5 vezes por segundo; tremer ~10 por segundo; piscar a cada 2 a 5 s.
export const NB = 24; // número de articulações
const S = Math.sin, C = Math.cos, PI = Math.PI, TAU = PI * 2;
const salto = (t) => { const k = (t % 0.45) / 0.45; return k < 0.32 ? S((k / 0.32) * PI) : 0; };
const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

// número "aleatório" repetível para o trecho n (entre -1 e 1)
const acaso = (n, s) => { const x = S(n * 127.1 + s * 311.7) * 43758.5453; return (x - Math.floor(x)) * 2 - 1; };
// valor que fica parado por `periodo` segundos e muda (em `troca` s) para o próximo: é assim que cachorro olha em volta
function degrau(t, periodo, s, troca = 0.28) {
  const n = Math.floor(t / periodo), k = suave((t - n * periodo) / troca);
  return acaso(n - 1, s) + (acaso(n, s) - acaso(n - 1, s)) * k;
}
// pulso curto (0..1) que acontece só em alguns trechos: tremidinha de orelha, trocar a patinha
function pulso(t, periodo, s, chance, dur) {
  const n = Math.floor(t / periodo), u = (t - n * periodo) / dur;
  return acaso(n, s) > 1 - chance * 2 && u < 1 ? S(u * PI) : 0;
}
// uma pata no ciclo da passada: u = 0..1. Devolve [ângulo da pata, quanto está no ar (0..1), andamento no ar (0..1; -1 = no chão)]
function passada(u, apoio, amp, saida) {
  u -= Math.floor(u);
  if (u < apoio) { saida[0] = -amp + 2 * amp * (u / apoio); saida[1] = 0; saida[2] = -1; }
  else { const w = (u - apoio) / (1 - apoio); saida[0] = amp - 2 * amp * suave(w); saida[1] = S(w * PI); saida[2] = w; }
  return saida;
}

// corpo todo: [inclinar (rad, + = cabeça para baixo), subir (fração da altura; negativo = baixar), deslocar x (fração da altura)]
function corpo(a, t, tA, f, p0, sentada) {
  switch (a) {
    case 'walk': return sentada ? [0, 0, 0] : [0.01 * S(f * 2 + 0.6), (0.5 - 0.5 * C(f * 2)) * 0.012, 0]; // 2 subidinhas por passada
    case 'run': return [0.03 * C(f) + 0.02, Math.max(0, S(f - 0.5)) * 0.06, 0];
    case 'jump': return [-0.05, 0, 0];
    case 'sit': return sentada ? [-0.02, 0, 0] : [-0.24, -0.12, -0.03];     // pinscher: traseiro no chão, peito alto
    case 'lie': return sentada ? [0.02, -0.02, 0] : [0, -0.3, 0];            // barriga no chão
    case 'sleep': case 'curl': return [0.02, -0.31, 0];
    case 'shiver': return [0.012 * S(t * 63), -0.03, 0.004 * S(t * 57)];
    case 'bark': { const b = salto(tA); return [-0.05 * b, 0.035 * b, -0.01 * b]; }
    case 'eat': case 'drink': return [0.05, -0.02, 0.01];
    case 'peeM': return [-0.05, 0, 0];
    case 'peeF': return [-0.1, -0.08, 0];
    case 'fight': return [0.08 * S(t * 8), Math.max(0, S(t * 5)) * 0.04, 0.015 * S(t * 8)];
    case 'playbow': return [0.2, -0.06, 0];
    // novos (15/11/2026, pedido do dono: mais agitados)
    case 'tug': return [-0.07 + 0.025 * S(t * 12), -0.02, -0.012 + 0.006 * S(t * 6)]; // puxando o botão: corpo para trás, sacode
    case 'hop': return [-0.05 * C(t * 14), 0, 0];                                      // pulinhos de alegria (a altura vem de animacoes.js)
    case 'wiggle': return [0.025 * S(t * 16), 0, 0.012 * S(t * 16 + 0.5)];          // rebolado: o corpo todo abana junto com o rabo
    case 'shake': { const e = tA < 1.1 ? S((tA / 1.1) * PI) : 0; return [0.05 * S(t * 42) * e, 0.008 * e, 0.018 * S(t * 42 + 1) * e]; } // sacudir o pelo
    case 'sniff': return [0.06 + 0.01 * S(f * 2 + 0.6), (0.5 - 0.5 * C(f * 2)) * 0.008, 0]; // cheirando o chão
    default: return [0.006 * degrau(t, 5.3, 7, 1.2), 0, 0]; // parado: troca o peso devagar
  }
}

// movimento do corpo todo, já misturado com a ação anterior. Devolve [1, 1, inclinar, subir (px), deslocar x (px)]
// (as duas primeiras posições ficam sempre 1: o desenho não é achatado). sentada = está usando o desenho sentado (Maya).
export function transformar(d, H, saida = [1, 1, 0, 0, 0], sentada = false) {
  const p0 = d.p ? d.p[0] : 0;
  const a = corpo(d.acao, d.t, d.tA, d.fase, p0, sentada);
  if (d.mist < 1) {
    const b = corpo(d.acaoAnt, d.t, d.tAnt, d.fase, 0, sentada), k = suave(d.mist);
    for (let i = 0; i < 3; i++) a[i] = b[i] + (a[i] - b[i]) * k;
  }
  saida[0] = 1; saida[1] = 1; saida[2] = a[0];
  saida[3] = a[1] * H + Math.max(0, p0) * d.tam; // pulo grande do evento de brincar (p[0] = subir)
  saida[4] = a[2] * H;
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
// matriz [a, b, c, d, tx, ty]: x' = a·x + c·y + tx ; y' = b·x + d·y + ty. Gira em volta de (px, py).
function junta(ang, px, py) {
  const c = C(ang), s = S(ang);
  return [c, s, -s, c, px - (c * px - s * py), py - (s * px + c * py)];
}
const ID = [1, 0, 0, 1, 0, 0];
const mul = (M, N) => [M[0] * N[0] + M[2] * N[1], M[1] * N[0] + M[3] * N[1], M[0] * N[2] + M[2] * N[3], M[1] * N[2] + M[3] * N[3],
  M[0] * N[4] + M[2] * N[5] + M[4], M[1] * N[4] + M[3] * N[5] + M[5]];

// fração do ciclo em que cada pata pisa. Patas: 0 e 1 = da frente, 2 e 3 = de trás (0 e 2 do mesmo lado).
const ANDAR = [0.25, 0.75, 0, 0.5];     // lateral de 4 tempos: trás, frente do mesmo lado, trás do outro, frente do outro
const GALOPE = [0.5, 0.62, 0, 0.1];     // as de trás empurram quase juntas, depois as da frente
const CHAVES = ['pesc', 'cab', 'boca', 'orA', 'orB', 'rabo', 'rabo2', 'p0', 'p1', 'p2', 'p3', 'j0', 'j1', 'j2', 'j3', 'w0', 'w1', 'w2', 'w3'];
const tmp = [0, 0, 0];

// olhar (cabeça) do cachorro parado num instante t
const olharEm = (t, ph, agitado) => (agitado ? 0.1 : 0.07) * degrau(t, agitado ? 1.4 : 2.6, ph, agitado ? 0.18 : 0.25);
// abano do rabo num instante t (em rajadas quando está feliz)
function abanoEm(t, ph, E, al) {
  const rajada = 0.25 + 0.75 * suave(0.5 + 0.5 * degrau(t, 1.9, ph + 5, 0.4) + (al - 0.5));
  return (0.14 + 0.34 * al) * rajada * S(t * (17 + 9 * E) + ph); // 3 a 4 abanadas por segundo
}

// ângulos (rad; + = sentido horário na tela). pesc/cab + = para baixo; boca + = abre; rabo + = para cima;
// p = pata inteira (+ = pé para trás); j = joelho/cotovelo (+ = dobra para trás); w = pulso/jarrete (+ = pé dobra para trás)
function angulos(a, t, tA, f, d, o) {
  const E = d.energia, al = d.alegria == null ? 0.5 : d.alegria, ph = d.sem || 0, u = f / TAU, shih = d.cfg.raca === 'shihtzu';
  const agitado = E > 0.8;
  const olhar = olharEm(t, ph, agitado) + 0.012 * S(t * 2.6);
  const virada = olharEm(t, ph, agitado) - olharEm(t - 0.12, ph, agitado); // a cabeça acabou de virar: as orelhas balançam atrasadas
  const trem = pulso(t, agitado ? 1.1 : 1.7, ph + 3, agitado ? 0.3 : 0.16, 0.22);
  const abano = abanoEm(t, ph, E, al), abanoAtras = abanoEm(t - 0.07, ph, E, al);
  o.pesc = olhar * 0.4; o.cab = olhar * 0.6; o.boca = 0;
  o.orA = 0.03 * S(t * 2.6 - 0.6) - 2.2 * virada - (agitado ? 0.2 * pulso(t, 1.6, ph + 8, 0.25, 0.2) : 0); o.orB = o.orA - 0.3 * trem;
  o.rabo = abano; o.rabo2 = abanoAtras * 0.8; // a ponta acompanha atrasada: o rabo faz onda
  for (let i = 0; i < 4; i++) { o['p' + i] = 0; o['j' + i] = 0; o['w' + i] = 0; }
  if (agitado) { const pe = pulso(t, E > 0.95 ? 1.6 : 2.2, ph + 13, 0.35, 0.35); o.p0 = -0.15 * pe; o.j0 = 0.6 * pe; o.w0 = 0.5 * pe; } // levanta e baixa uma patinha
  switch (a) {
    case 'walk': {
      for (let i = 0; i < 4; i++) {
        const frente = i < 2; passada(u + ANDAR[i], 0.62, (frente ? 0.3 : 0.26) * (shih ? 0.75 : 1), tmp);
        const ar = tmp[1], prog = tmp[2];
        o['p' + i] = tmp[0];
        o['j' + i] = ar * (shih ? (frente ? 0.45 : 0.35) : (frente ? 0.8 : 0.45));         // dobra ao subir (pinscher alto na frente)
        o['w' + i] = prog < 0 ? 0 : (frente ? 0.75 : 0.5) * S(prog * PI) * (1 - prog * 0.6) - (prog > 0.75 ? 0.12 * suave((prog - 0.75) / 0.25) : 0); // pé pendura e estica antes de pisar
      }
      o.pesc = 0.025 * S(f * 2 + 0.9) + olhar * 0.25; o.cab = 0.012 * S(f * 2 + 1.4) + olhar * 0.35; // a cabeça acompanha as patas da frente
      o.orA = o.orB = 0.06 * S(f * 2 - 0.7);                                                         // orelhas atrasadas em relação ao corpo
      o.rabo = 0.12 + 0.6 * abano + 0.05 * S(f * 2 - 1.2); o.rabo2 = 0.5 * abanoAtras + 0.05 * S(f * 2 - 1.8); break;
    }
    case 'run': {
      for (let i = 0; i < 4; i++) {
        passada(u + GALOPE[i], 0.4, shih ? 0.25 : 0.36, tmp); // 0,36: com mais abertura a emenda da pata com a barriga aparecia // shih tzu: patas curtas e peludas, galope curto
        o['p' + i] = tmp[0]; o['j' + i] = tmp[1] * (i < 2 ? 0.7 : 0.5) * (shih ? 0.5 : 1); o['w' + i] = tmp[2] < 0 ? 0 : 0.6 * S(tmp[2] * PI);
      }
      o.pesc = -0.05 + 0.04 * S(f + 2.2); o.cab = -0.03 + 0.02 * S(f + 2.6); o.orA = o.orB = -0.32 + 0.1 * S(f * 2 - 1);
      o.rabo = 0.3 + 0.15 * S(f - 1.5); o.rabo2 = 0.15 * S(f - 2.1); break;
    }
    case 'jump': o.p0 = o.p1 = -0.55; o.p2 = o.p3 = 0.4; o.j0 = o.j1 = 0.7; o.j2 = o.j3 = 0.45; o.w0 = o.w1 = 0.5; o.w2 = o.w3 = 0.4;
      o.pesc = -0.08; o.cab = -0.05; o.orA = o.orB = -0.4; o.rabo = 0.5; o.rabo2 = 0.2; break;
    case 'sit': o.p0 = o.p1 = 0.24; o.p2 = o.p3 = -0.5; o.j2 = o.j3 = 1.0; o.w2 = o.w3 = -0.5; o.pesc = -0.02 + olhar * 0.4; o.rabo = abano * 0.4; o.rabo2 = abanoAtras * 0.3; break;
    case 'lie': o.p0 = o.p1 = -0.9; o.j0 = o.j1 = 1.9; o.w0 = o.w1 = -0.6; o.p2 = o.p3 = -1.05; o.j2 = o.j3 = 2.15; o.w2 = o.w3 = -0.9; o.pesc = 0.05 + olhar * 0.3; o.cab = 0.03 + olhar * 0.4; o.rabo = abano * 0.25; o.rabo2 = abanoAtras * 0.2; break;
    case 'sleep': o.p0 = o.p1 = -0.9; o.j0 = o.j1 = 1.9; o.w0 = o.w1 = -0.6; o.p2 = o.p3 = -1.05; o.j2 = o.j3 = 2.15; o.w2 = o.w3 = -0.9;
      o.pesc = 0.2 + 0.01 * S(t * 1.3); o.cab = 0.12; o.orA = 0.1; o.orB = 0.1 - 0.2 * pulso(t, 4.1, ph, 0.12, 0.3); o.rabo = 0.03 * S(t * 1.3); o.rabo2 = 0; break; // sonhando: a orelha mexe
    case 'curl': o.p0 = o.p1 = -1.2; o.j0 = o.j1 = 0.6; o.w0 = o.w1 = 0.2; o.p2 = o.p3 = -1.05; o.j2 = o.j3 = 2.15; o.w2 = o.w3 = -0.9;
      o.pesc = 0.25; o.cab = 0.15; o.orA = o.orB = -0.3; o.rabo = -0.6 + 0.03 * S(t * 63); o.rabo2 = -0.3; break;
    case 'shiver': o.pesc = 0.08 + 0.015 * S(t * 63); o.cab = 0.04; o.orA = o.orB = -0.3 + 0.03 * S(t * 57); o.rabo = -0.5 + 0.04 * S(t * 60); o.rabo2 = -0.3; break;
    case 'pant': o.boca = 0.3 + 0.03 * S(t * 31); o.cab += 0.015 * S(t * 31); o.rabo = abano; break;
    case 'bark': { const k = salto(tA); o.boca = 0.42 * k; o.pesc = -0.12 * k; o.cab = -0.1 * k; o.orA = o.orB = -0.22 * k; o.p0 = o.p1 = -0.08 * k; o.rabo = 0.4 * S(t * 24); o.rabo2 = 0.3 * S(t * 24 - 0.8); break; }
    case 'eat': case 'drink': { const m = a === 'eat' ? S(t * 9) : S(t * 13); // comer mastiga; beber lambe mais rápido
      o.boca = a === 'eat' ? 0.42 * Math.max(0, m) : 0.2 * Math.max(0, m);
      o.pesc = 0.26 + 0.03 * m; o.cab = 0.14 + 0.04 * m; o.orA = o.orB = 0.15 + 0.04 * S(t * 9 - 0.8); o.p0 = o.p1 = -0.12; o.j0 = o.j1 = 0.1;
      o.rabo = 0.25 * S(t * 19 + ph); o.rabo2 = 0.2 * S(t * 19 + ph - 0.8); break; }
    case 'peeM': o.p2 = -1.0; o.j2 = 0.5; o.w2 = 0.3; o.pesc = -0.06 + olhar * 0.3; o.rabo = 0.25; break;
    case 'peeF': o.p2 = o.p3 = -0.3; o.j2 = o.j3 = 0.5; o.pesc = 0.06; o.rabo = 0.35; break;
    case 'fight': o.boca = 0.25 * Math.max(0, S(t * 7));
      o.p0 = -0.6 + 0.35 * S(t * 12); o.p1 = -0.6 + 0.35 * S(t * 12 + PI); o.j0 = 0.55 + 0.25 * S(t * 12 + 1); o.j1 = 0.55 + 0.25 * S(t * 12 + PI + 1); o.w0 = o.w1 = 0.4;
      o.pesc = 0.08 * S(t * 3); o.cab = 0.05 * S(t * 3.5); o.orA = o.orB = -0.2 + 0.1 * S(t * 8 - 1); o.rabo = 0.5 * S(t * 24); o.rabo2 = 0.4 * S(t * 24 - 0.8); break;
    case 'playbow': o.p0 = o.p1 = -0.7; o.j0 = o.j1 = 0.2; o.w0 = o.w1 = -0.1; o.pesc = 0.05; o.cab = -0.05; o.rabo = 0.5 * S(t * 26); o.rabo2 = 0.4 * S(t * 26 - 0.8); break;
    // ---- novos (15/11/2026) ----
    case 'tug': { // morde o botão e puxa: abre e fecha a boca (mordidas), sacode a cabeça, patas firmes, rabo a mil
      const m = Math.max(0, S(t * 12)); o.boca = 0.08 + 0.36 * m;
      o.pesc = (shih ? 0.06 : -0.06) + 0.1 * S(t * 9); o.cab = (shih ? 0.04 : -0.04) + 0.14 * S(t * 9 + 0.6); // Maya: cabeça não vai para trás (o cabelo descolava do rabo)
      o.p0 = o.p1 = -0.3 + 0.06 * S(t * 6); o.j0 = o.j1 = 0.2; o.p2 = o.p3 = 0.22 + 0.06 * S(t * 6 + PI); o.j2 = o.j3 = 0.3;
      o.orA = o.orB = -0.3 + 0.12 * S(t * 9 - 0.8); o.rabo = 0.45 + 0.35 * S(t * 24); o.rabo2 = 0.3 * S(t * 24 - 0.8); break;
    }
    case 'hop': { // pulinhos: no ar encolhe as patas, orelhas balançam, boca aberta de alegria
      const ar = Math.abs(S(t * 7));
      o.p0 = o.p1 = -0.3 * ar; o.j0 = o.j1 = 0.8 * ar; o.w0 = o.w1 = 0.4 * ar; o.p2 = o.p3 = 0.28 * ar; o.j2 = o.j3 = 0.5 * ar;
      o.boca = 0.22; o.pesc = -0.05 * ar; o.orA = o.orB = -0.25 + 0.3 * S(t * 14 - 1); o.rabo = 0.5 + 0.35 * S(t * 26); o.rabo2 = 0.3 * S(t * 26 - 0.8); break;
    }
    case 'wiggle': { // rebolado de alegria: rabo e corpo abanam juntos, patinhas da frente sapateiam, sorriso
      o.rabo = 0.25 + 0.5 * S(t * 16); o.rabo2 = 0.45 * S(t * 16 - 0.8); o.boca = 0.18 + 0.05 * S(t * 16);
      o.cab = 0.06 * S(t * 16 + 1); o.orA = o.orB = -0.15 + 0.08 * S(t * 16 - 0.5);
      o.p0 = -0.18 * Math.max(0, S(t * 8)); o.j0 = 0.5 * Math.max(0, S(t * 8)); o.p1 = -0.18 * Math.max(0, S(t * 8 + PI)); o.j1 = 0.5 * Math.max(0, S(t * 8 + PI)); break;
    }
    case 'tilt': { // cabeça de lado (curioso): inclina para um lado, para, inclina para o outro; orelhas em pé
      const lado = degrau(t, 1.3, ph + 21, 0.22);
      o.cab = 0.3 * lado; o.pesc = -0.05; o.orA = -0.28 + 0.1 * lado; o.orB = -0.28 - 0.1 * lado; o.rabo = 0.2 + 0.15 * S(t * 10); o.rabo2 = 0.12 * S(t * 10 - 0.8); break;
    }
    case 'shake': { // sacode o pelo (depois de beber, ao acordar): cabeça, orelhas e rabo chacoalham e param
      const e = tA < 1.1 ? S((tA / 1.1) * PI) : 0;
      o.pesc = 0.2 * S(t * 42) * e; o.cab = 0.25 * S(t * 42 + 0.7) * e; o.orA = 0.6 * S(t * 42 + 1.4) * e; o.orB = 0.6 * S(t * 42 + 2) * e;
      o.rabo = 0.5 * S(t * 42 + 1) * e; o.rabo2 = 0.4 * S(t * 42 + 1.8) * e; o.boca = 0.1 * e; break;
    }
    case 'sniff': { // anda devagar cheirando o chão: passada curta, focinho baixo que treme
      for (let i = 0; i < 4; i++) { const frente = i < 2; passada(u + ANDAR[i], 0.65, (frente ? 0.2 : 0.18) * (shih ? 0.75 : 1), tmp); o['p' + i] = tmp[0]; o['j' + i] = tmp[1] * (frente ? 0.55 : 0.35); o['w' + i] = tmp[2] < 0 ? 0 : 0.4 * S(tmp[2] * PI); }
      o.pesc = 0.3 + 0.02 * S(f * 2); o.cab = 0.16 + 0.025 * S(t * 30); o.orA = o.orB = 0.1; o.rabo = 0.25 + 0.3 * abano; o.rabo2 = 0.3 * abanoAtras; break;
    }
    default: break; // idle
  }
}

const A1 = {}, A2 = {};
// ângulos de todas as partes neste instante, já misturados com a ação anterior (usado por desenho.js)
export function angulosDe(d) {
  angulos(d.acao, d.t, d.tA, d.fase, d, A1);
  if (d.mist < 1) {
    angulos(d.acaoAnt, d.t, d.tAnt, d.fase, d, A2);
    const k = suave(d.mist);
    for (const c of CHAVES) A1[c] = A2[c] + (A1[c] - A2[c]) * k;
  }
  if (d.cfg.raca === 'shihtzu') { // cabeça grande e pelo comprido: mexe menos (senão o pelo abre)
    A1.pesc *= 0.4; A1.cab *= 0.4; A1.orA *= 0.2; A1.orB *= 0.2; A1.rabo *= 0.36; A1.rabo2 *= 0.36; // mais movimento que antes (15/11/2026), ainda bem menos que os pinschers
    const deitada = d.acao === 'sleep' || d.acao === 'curl' || d.acao === 'lie';
    for (let i = 0; i < 4; i++) { const k = deitada ? 0 : 0.5; A1['p' + i] *= k; A1['j' + i] *= k; A1['w' + i] *= k; }
  }
  return A1;
}
// escreve as matrizes das 24 articulações em M (96 números) e T (48 números). Ordem: 0 pescoço, 1 cabeça, 2 boca, 3 orelha A,
// 4 orelha B, 5 rabo, 6 ponta do rabo, 7-10 ombro/quadril, 11-14 joelho, 15-18 pulso/jarrete, 19-23 livres.
export function articular(d, ossos, M, T) {
  angulos(d.acao, d.t, d.tA, d.fase, d, A1);
  if (d.mist < 1) {
    angulos(d.acaoAnt, d.t, d.tAnt, d.fase, d, A2);
    const k = suave(d.mist);
    for (const c of CHAVES) A1[c] = A2[c] + (A1[c] - A2[c]) * k;
  }
  if (d.cfg.raca === 'shihtzu') { A1.pesc *= 0.6; A1.cab *= 0.6; A1.orA *= 0.6; A1.orB *= 0.6; } // pelo comprido: cabeça e orelhas mexem menos
  const pp = ossos.pescoco ? ossos.pescoco.p : ossos.cabeca.p;
  const mn = junta(A1.pesc, pp[0], pp[1]);
  const mh = mul(mn, junta(A1.cab, ossos.cabeca.p[0], ossos.cabeca.p[1]));
  const bo = ossos.boca ? ossos.boca.p : ossos.cabeca.p;
  const r = ossos.rabo, mr = junta(A1.rabo, r.p[0], r.p[1]), p2 = r.p2 || r.p;
  const mats = [mn, mh, mul(mh, junta(A1.boca, bo[0], bo[1])),
    mul(mh, junta(A1.orA, ossos.orelhas[0].p[0], ossos.orelhas[0].p[1])), mul(mh, junta(A1.orB, ossos.orelhas[1].p[0], ossos.orelhas[1].p[1])),
    mr, mul(mr, junta(A1.rabo2, p2[0], p2[1]))];
  const quadris = [], joelhos = [];
  for (let i = 0; i < 4; i++) { const pe = ossos.pernas[i]; quadris.push(junta(A1['p' + i], pe.p[0], pe.p[1])); }
  for (let i = 0; i < 4; i++) { const pe = ossos.pernas[i], jo = pe.j || pe.p; joelhos.push(mul(quadris[i], junta(A1['j' + i], jo[0], jo[1]))); }
  mats.push(...quadris, ...joelhos);
  for (let i = 0; i < 4; i++) { const pe = ossos.pernas[i], pu = pe.w || pe.j || pe.p; mats.push(mul(joelhos[i], junta(A1['w' + i], pu[0], pu[1]))); }
  while (mats.length < NB) mats.push(ID);
  for (let i = 0; i < NB; i++) { const m = mats[i]; M[i * 4] = m[0]; M[i * 4 + 1] = m[1]; M[i * 4 + 2] = m[2]; M[i * 4 + 3] = m[3]; T[i * 2] = m[4]; T[i * 2 + 1] = m[5]; }
}
