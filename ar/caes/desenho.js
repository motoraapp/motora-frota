// Desenho dos cachorros por QUADROS (16/11/2026): os sprites transparentes do dono (pasta animacao, 1024x1024) foram
// recortados, calibrados para o cachorro ter o mesmo tamanho em todas as poses e reduzidos para o celular por
// ferramentas/caes-sprites.ps1 (ar/caes/img/sprites/<cão>/<pose>.png + sprites-dados.js). Nada é esticado: largura e altura
// usam o mesmo fator; espelhar = só virar de lado. Cada quadro é encaixado pelos PÉS (linha de baixo do desenho) e pelo meio
// da caixa do desenho, então a troca de quadro não dá salto.
// O que cada ação mostra (e os efeitos: tremor no frio, respiração no calor, piscar) fica em `quadroDe`.
import { SPRITES } from './sprites-dados.js';
import { NARIZ } from './narizes.js';

const ALT = 1.3; // altura do cachorro em pé = tamanho × 1,3 (as escalas de sempre: Elvis 54, Belinha 66, Maya 80)
export const alturaCabeca = () => ALT;

// ---------- imagens ----------
const IMG = {};
const url = (id, nome) => new URL(`./img/sprites/${id}/${nome}.png`, import.meta.url).href;
function img(id, nome) {
  const k = id + '/' + nome;
  if (!IMG[k]) { const i = new Image(); i.decoding = 'async'; i.src = url(id, nome); IMG[k] = i; }
  return IMG[k];
}
const pronta = (i) => i && i.complete && i.naturalWidth > 0;
const PRIMEIRO = ['base', 'olhos_fechados', 'andando_1', 'andando_2', 'correndo_1', 'correndo_2', 'latindo', 'boca_aberta', 'boca_fechada', 'sentado'];
// carrega todos os quadros (o que aparece logo primeiro). Devolve uma promessa que termina quando todos estão prontos.
export function precarregar(cfgs) {
  const nomes = (c) => Object.keys(SPRITES[c.id] || {}).filter((n) => n !== '_ref').sort((a, b) => PRIMEIRO.includes(b) - PRIMEIRO.includes(a));
  const todas = cfgs.flatMap((c) => nomes(c).map((n) => img(c.id, n)));
  return Promise.all(todas.map((i) => (pronta(i) ? null : i.decode().catch(() => {}))));
}
// o quadro ainda não carregou: mantém o último que já apareceu (nunca mostra outro desenho por engano)
const ultimo = new Map();
// quanto o NARIZ fica à frente do meio do corpo numa pose (px na tela): o cachorro para com o nariz dentro da vasilha
export function bocaDe(cfg, pose) { const S = SPRITES[cfg.id], n = NARIZ[cfg.id] && NARIZ[cfg.id][pose]; return n == null ? cfg.tamanho * 0.5 : n * (cfg.tamanho * ALT / S._ref); }
export function larguraDe(cfg) { const s = SPRITES[cfg.id]?.base; return s ? s[0] / s[1] : 0.75; }

// ---------- qual quadro mostrar ----------
const acaso = (n, s) => { const x = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
// sequência em laço: [[pose, ms], ...]
function seq(lista, t) {
  let tot = 0; for (const [, ms] of lista) tot += ms;
  let x = ((t * 1000) % tot + tot) % tot;
  for (const q of lista) { if (x < q[1]) return q; x -= q[1]; }
  return lista[0];
}
// piscar natural: olho fechado por ~100 ms a cada 2 a 5 s (às vezes duas piscadas seguidas)
function piscando(d) {
  const t = d.t + (d.sem || 0) * 1.7, per = 3.4, n = Math.floor(t / per), x = t - n * per - acaso(n, 9) * (per - 0.5);
  return (x > 0 && x < 0.1) || (acaso(n, 11) > 0.6 && x > 0.28 && x < 0.38);
}
const PASSOS = ['andando_passo_1', 'andando_passo_2', 'andando_2', 'andando_passo_4', 'andando_1']; // Elvis: a pata sobe e desce aos poucos
const GALOPE = ['correndo_2', 'correndo_entre_1', 'correndo_inicio', 'correndo_entre_2', 'correndo_1'];
const tem = (id, n) => !!SPRITES[id]?.[n];
const quad = { s: 'base', f: 1, dx: 0, dy: 0, sy: 1 };

// devolve { s: pose, f: espelho extra (1/-1), dx px, dy (fração da altura, para cima), sy (escala vertical do efeito) }
export function quadroDe(d) {
  const id = d.cfg.id, a = d.acao, t = d.tA, maya = id === 'maya';
  const q = quad; q.s = 'base'; q.f = 1; q.dx = 0; q.dy = 0; q.sy = 1;
  const fechada = maya ? 'boca_fechada' : 'base'; // Maya: o desenho base é de boca aberta (língua)
  const aberta = maya ? 'base' : 'boca_aberta';
  switch (a) {
    case 'walk': case 'walkback': case 'sniff': { // um passo por vez: pata à frente, apoia (em pé), a outra pata, apoia (pedido do dono 16/11/2026)
      const u = ((d.fase / Math.PI) % 2 + 2) % 2;
      if (tem(id, 'andando_passo_1')) { // Elvis: 5 desenhos, a pata da frente sobe e desce aos poucos (um passo de cada vez)
        q.s = PASSOS[Math.floor(u / 2 * PASSOS.length) % PASSOS.length]; q.dy = 0.014 * Math.abs(Math.sin(d.fase * 2.5)); break;
      }
      const meio = fechada;
      q.s = u < 0.5 ? 'andando_1' : u < 1 ? meio : u < 1.5 ? 'andando_2' : meio;
      q.dy = 0.014 * Math.abs(Math.sin(d.fase * 2)); break;
    }
    case 'run': { // galope: 1 = esticado no ar (sobe um pouco), 2 = encolhido no chão
      const s = Math.sin(d.fase);
      if (tem(id, 'correndo_inicio')) { // Elvis: galope em 5 desenhos (encolhido, pousando, impulso, esticando, esticado no ar)
        const u = ((d.fase / (Math.PI * 2)) % 1 + 1) % 1; q.s = GALOPE[Math.floor(u * GALOPE.length) % GALOPE.length]; q.dy = q.s === 'correndo_1' ? 0.07 : q.s === 'correndo_entre_2' ? 0.03 : 0; break;
      }
      q.s = s >= 0 ? 'correndo_1' : 'correndo_2'; q.dy = s >= 0 ? 0.07 * s : 0; break;
    }
    case 'sit': if (tem(id, 'sentando_meio') && t < 0.28) { q.s = 'sentando_meio'; break; } // meio do caminho ao sentar
      q.s = maya ? (piscando(d) ? 'sentado_olhos_fechados' : 'sentado') : 'sentado'; break;
    case 'lie': q.s = tem(id, 'deitando_transicao') ? 'deitando_transicao' : 'sentado'; break;
    case 'sleep': q.s = 'dormindo_deitado'; q.sy = 1 + 0.01 * Math.sin(d.t * 2.2); break; // respira devagar
    case 'curl': case 'shiver': // frio: deitado encolhido, tremendo (±1,5 px a cada ~45 ms)
      q.s = 'tremendo_frio'; q.dx = (Math.floor(d.t * 1000 / 45) % 2 ? 1.5 : -1.5); break;
    case 'pant': q.s = 'sentindo_calor'; q.sy = 1 + 0.015 * Math.sin(d.t * Math.PI * 2 * 2.2); break; // calor: ofegando (0,985 a 1,015)
    // latir: o desenho de LATINDO (boca aberta gritando, não a língua de fora) mantido o latido todo, sem trocar de pose (as patas não
    // mexem); a cada 'au' (0,45 s) o corpo dá um impulso curto para trás e para cima
    case 'bark': { const k = (t % 0.45) / 0.45, au = k < 0.32 ? Math.sin((k / 0.32) * Math.PI) : 0; q.s = 'latindo'; q.dx = -1.2 * au; q.dy = 0.012 * au; break; }
    case 'rosnar': q.s = 'rosnando'; q.dx = Math.sin(d.t * 70) * 0.6; break;
    // come/bebe com o focinho na vasilha quase o tempo todo (balançando de leve); só de vez em quando levanta a cabeça
    case 'eat': q.s = seq([['comendo', 2300], [fechada, 420]], t)[0]; if (q.s === 'comendo') q.dx = Math.sin(d.t * 18) * 0.8; break;
    case 'drink': q.s = seq([['bebendo', 2300], [fechada, 420]], t)[0]; if (q.s === 'bebendo') q.dx = Math.sin(d.t * 22) * 0.6; break;
    case 'peeM': case 'peeF': q.s = 'fazendo_xixi'; break;
    case 'jump': { const k = Math.min(1, t / 0.8); q.s = k > 0.15 && k < 0.85 ? 'correndo_2' : 'base'; q.dy = Math.sin(Math.PI * k) * 0.5; break; }
    case 'hop': { const ar = Math.abs(Math.sin(t * 7)); q.s = ar > 0.4 ? 'correndo_2' : aberta; q.dy = ar * 0.16; break; }
    case 'playbow': q.s = tem(id, 'deitando_transicao') ? 'deitando_transicao' : 'latindo'; break;
    case 'fight': q.s = seq([['rosnando', 220], ['latindo', 160], ['correndo_2', 200]], t)[0]; if (q.s === 'correndo_2') q.dy = 0.06; break;
    case 'tug': q.s = seq([['rosnando', 95], [fechada, 95]], t)[0]; q.dx = Math.sin(d.t * 18) * 1.2; break; // morde: abre e fecha a boca
    case 'wiggle': q.s = seq([[aberta, 170], [fechada, 170]], t)[0]; q.dx = Math.sin(d.t * 16) * 2; break;
    case 'tilt': case 'cabeca': q.s = seq([['mexendo_cabeca', 320], [fechada, 260]], t)[0]; break; // mexe a cabeça
    case 'shake': q.s = seq([['mexendo_cabeca', 70], [fechada, 70]], t)[0]; q.dx = t < 1.1 ? Math.sin(d.t * 45) * 2 : 0; break;
    case 'encostar': q.s = 'encostando_giro_frente'; break;
    // pedir comida: a Maya fica de pé nas 2 patas com as patinhas junto do peito (NÃO ergue os braços: o desenho _2 não é usado,
    // pedido do dono 16/11/2026), dando pulinhos leves; os pinschers latem
    case 'pedir': if (tem(id, 'pedindo_patas_no_ar')) { q.s = 'pedindo_patas_no_ar'; q.dy = 0.025 * Math.abs(Math.sin(t * 5.5)); } else q.s = seq([[aberta, 160], [fechada, 140]], t)[0]; break;
    case 'frente': q.s = tem(id, 'andando_frente') ? 'andando_frente' : 'encostando_giro_frente'; break;
    case 'lingua': q.s = tem(id, 'lingua') ? 'lingua' : aberta; break;
    case 'rodar': case 'deitar': { // volta completa no próprio eixo (deitar: termina deitando)
      const giro = [['encostando_giro_frente', 1], ['encostando_giro_frente', -1], ['virando_costas', -1], ['virando_costas', 1]];
      const passo = 0.2, i = Math.floor(t / passo);
      if (a === 'deitar') {
        if (i === 0) { q.s = fechada; break; }
        if (i <= 4) { q.s = giro[i - 1][0]; q.f = giro[i - 1][1]; break; }
        q.s = tem(id, 'deitando_transicao') ? 'deitando_transicao' : 'sentado'; break;
      }
      const g = giro[i % 4]; q.s = g[0]; q.f = g[1]; break;
    }
    default: // parado: pisca
      q.s = piscando(d) ? 'olhos_fechados' : fechada;
  }
  if (!tem(id, q.s)) q.s = 'base';
  return q;
}

// ---------- desenhar ----------
export function desenharSombra(c, d, larg, dy) {
  c.fillStyle = 'rgba(0,0,0,0.22)'; c.beginPath();
  c.ellipse(d.x, d.y, Math.max(6, larg * 0.36 * (1 - Math.min(0.45, dy))), d.tam * 0.065, 0, 0, 7); c.fill();
}
export function desenharCao(c, d, lado = 1, comSombra = true) {
  const id = d.cfg.id, S = SPRITES[id]; if (!S) return;
  const q = quadroDe(d);
  let s = q.s, im = img(id, s);
  if (pronta(im)) ultimo.set(d, s);
  else { s = ultimo.get(d) || 'base'; im = img(id, s); if (!pronta(im)) return; } // ainda carregando: segura o quadro anterior
  const [w, h, ax, ay, olha] = S[s], H = d.tam * ALT, k = H / S._ref;
  const espelho = (lado < 0 ? -1 : 1) * olha * q.f;
  const sobe = q.dy * H;
  if (comSombra) desenharSombra(c, d, w * k, q.dy);
  c.save();
  c.translate(Math.round((d.x + q.dx) * 2) / 2, Math.round((d.y - sobe) * 2) / 2);
  c.scale(espelho * k, k * q.sy);                // mesmo fator na largura e na altura (o efeito sy é só a respiração, ±1,5%)
  c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high';
  c.drawImage(im, -ax, -ay, w, h);
  c.restore();
}

// vasilha com a comida (grãozinhos de ração) ou a água (com brilho) DENTRO dela, em DUAS partes para o focinho entrar nela:
// parte 'fundo' (sombra, interior e conteúdo) é desenhada ANTES do cachorro; parte 'frente' (a parede da frente) DEPOIS dele,
// cobrindo a parte de baixo do focinho. cheio: 1 cheia … 0 vazia (vai baixando enquanto ele come/bebe)
export function desenharTigela(c, t, parte = 'tudo') {
  const r = 17, borda = '#3a2418', k = (t.r || 17) / 17, cy = -13; // cy: altura do centro da boca da vasilha
  c.save(); c.translate(t.x, t.y); c.scale(k, k);
  if (parte !== 'frente') {
    c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 2, r * 1.15, r * 0.35, 0, 0, 7); c.fill();
    c.fillStyle = '#7d2a22'; c.beginPath(); c.ellipse(0, cy, r, r * 0.36, 0, 0, 7); c.fill();
    if (t.cheio > 0.04) {
      c.save(); c.beginPath(); c.ellipse(0, cy, r - 1.5, r * 0.36 - 1, 0, 0, 7); c.clip();
      const nivel = cy + (1 - t.cheio) * 5;
      if (t.tipo === 'comida') {
        c.fillStyle = '#7a4a22'; c.fillRect(-r, nivel - 1, r * 2, 20);
        for (let q = 0; q < 22; q++) { const a = q * 2.4, rr = (q % 7) / 7; const x = Math.cos(a) * (r - 4) * rr, y = nivel + 0.5 + Math.sin(a) * 3.5 * rr;
          c.fillStyle = q % 3 ? '#a8692f' : '#8c5426'; c.beginPath(); c.ellipse(x, y, 2.6, 1.8, a, 0, 7); c.fill(); }
      } else {
        c.fillStyle = '#4fb3f0'; c.fillRect(-r, nivel - 1, r * 2, 20);
        c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(-4, nivel + 1, 5, 1.3, -0.1, 0, 7); c.fill();
      }
      c.restore();
    }
  }
  if (parte !== 'fundo') { // parede da frente: cobre a parte de baixo do focinho
    c.fillStyle = '#d94f45'; c.strokeStyle = borda; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(-r, cy); c.lineTo(-r * 0.78, 0); c.quadraticCurveTo(0, 3, r * 0.78, 0); c.lineTo(r, cy); c.ellipse(0, cy, r, r * 0.36, 0, 0, Math.PI); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#f28a80'; c.lineWidth = 1.2; c.beginPath(); c.ellipse(0, cy, r, r * 0.36, 0, 0.15, Math.PI - 0.15); c.stroke();
  }
  c.restore();
}
