// Cachorros 3D por cima da tela. Para usar em qualquer página:
//   import { iniciarCachorros } from './src/dogs3d.js';
//   const caes = iniciarCachorros({ getAmbiente: () => ({ fora, quarto, arLigado, modo, alvo }) });
//   caes.destruir();   // desliga e libera a memória
// Só os cachorros recebem toque; o resto da tela continua clicável.
import { CACHORROS } from './config.js';
import { ACOES, aplicarPose, N, MISTURA, NY, HX, HY, BLINK, JAW } from './animacoes.js';
import { criarNecessidades } from './necessidades.js';
import { desenharCao, desenharSombra, desenharTigela, alturaCabeca, precarregar } from './desenho.js';
import { criarMalha } from './malha.js';

const INCLINA = 0.42;                 // câmera um pouco de cima
const FPS = 30;
const rand = (a, b) => a + Math.random() * (b - a);
const escolher = (l) => l[(Math.random() * l.length) | 0];
const PI = Math.PI;
const difAng = (a, b) => { let d = (a - b) % (2 * PI); if (d > PI) d -= 2 * PI; if (d < -PI) d += 2 * PI; return d; };

export function temWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

export function iniciarCachorros(op = {}) {
  const cfgs = op.configs || CACHORROS;
  const getAmb = op.getAmbiente || (() => ({}));
  const SEL_PEGA = op.seletorPegar || '[data-dog-pega]', SEL_AR = op.seletorAr || '[data-dog-ar]';
  const nec = criarNecessidades(cfgs);
  let som = (() => { try { return localStorage.getItem('casinha_caes_som') === '1'; } catch { return false; } })();
  const ouvintes = [];
  const ouvir = (alvo, ev, f, o) => { alvo.addEventListener(ev, f, o); ouvintes.push([alvo, ev, f, o]); };

  // ---------- camadas da página ----------
  const camada = document.createElement('div');
  camada.className = 'caes-camada';
  camada.innerHTML = '<div class="caes-pocas"></div><div class="caes-baloes"></div>';
  const pocas = camada.firstChild, baloes = camada.lastChild;
  document.body.appendChild(camada);
  const barra = criarBarra(soltar);
  document.body.appendChild(barra.el);

  const W = () => window.innerWidth, H = () => window.innerHeight;
  // O 3D só carrega se a página pedir (op.motor3d = { THREE, ...módulo modelo.js }); assim o desenho não baixa a biblioteca 3D.
  const { THREE, criarModelo, sombraTextura, descartarCompartilhadas } = op.motor3d || {};
  const gl = op.estilo === '3d' && !!op.motor3d && temWebGL(); // padrão: desenho animado 2D (leve, funciona em qualquer aparelho)
  let tela2 = null, c2 = null, pr2 = 1, malha = null;
  const ordem = [];
  const caes = [];
  let renderer, cena, camera, rodando = true, raf = 0, tempo = 0, ultQuadro = 0, ultNec = Date.now(), fps = 0, qFps = 0, tFps = 0;
  let proxEvento = rand(8, 14), eventoAtivo = null, dedo = { x: 0, y: 0, em: -99 }, engolir = 0, tris = 0;
  const tigelas = [];
  let sombraTex, geoTigela, mTigela, mRacao, mAgua;

  // ---------- 3D ----------
  if (gl) {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.domElement.className = 'caes-tela';
    camada.insertBefore(renderer.domElement, baloes);
    cena = new THREE.Scene();
    camera = new THREE.OrthographicCamera(0, 1, 0, -1, 1, 6000); camera.position.z = 3000;
    cena.add(new THREE.HemisphereLight(0xfff4e6, 0x4a4f5c, 1.5));
    const luz = new THREE.DirectionalLight(0xfff0dd, 2.1); luz.position.set(-0.6, 1, 0.9); cena.add(luz);
    const contra = new THREE.DirectionalLight(0xcfe0ff, 1.9); contra.position.set(0.4, 0.7, -1); cena.add(contra); // luz de recorte
    const preench = new THREE.DirectionalLight(0xffe8d0, 0.5); preench.position.set(0.8, -0.2, 0.6); cena.add(preench);
    sombraTex = sombraTextura();
    geoTigela = new THREE.LatheGeometry([[0.0, 0], [0.42, 0], [0.5, 0.05], [0.56, 0.3], [0.5, 0.32], [0.44, 0.1], [0, 0.1]].map(([x, y]) => new THREE.Vector2(x, y)), 18);
    mTigela = new THREE.MeshStandardMaterial({ color: 0xd94f45, roughness: 0.35 });
    mRacao = new THREE.MeshStandardMaterial({ color: 0x8a5a2e, roughness: 0.9 });
    mAgua = new THREE.MeshStandardMaterial({ color: 0x6fc3ff, roughness: 0.08, transparent: true, opacity: 0.85 });
  } else {
    tela2 = document.createElement('canvas'); tela2.className = 'caes-tela'; c2 = tela2.getContext('2d');
    camada.insertBefore(tela2, baloes);
    malha = op.semMalha ? null : criarMalha(cfgs); // cachorros articulados (WebGL); sem WebGL, a imagem inteira
    if (malha) camada.insertBefore(malha.canvas, baloes); else precarregar(cfgs);
  }

  cfgs.forEach((cfg, i) => {
    const d = {
      cfg, i, x: 0, y: 0, ang: 0, visivel: true, acao: 'idle', acaoAnt: 'idle', tA: 0, tAnt: 0, mist: 1,
      pa: new Float32Array(N), pb: new Float32Array(N), p: new Float32Array(N),
      fase: 0, offAndar: [PI / 2, PI * 1.5, 0, PI], offCorrer: [0, 0.35, PI, PI + 0.35],
      energia: cfg.energia, shih: cfg.raca === 'shihtzu', semRabo: cfg.rabo === false, perna: cfg.corpo.perna, sem: Math.random() * 10, alegria: 0.5, t: 0,
      tarefas: [], tarefa: null, ly: 0, lp: 0, pisca: rand(1, 4), piscaV: 0, prox: rand(2, 6), pedido: rand(20, 40), dormindo: false, acordadoAte: 0,
      ocupado: false, zzz: 0, tam: cfg.tamanho,
    };
    if (gl) {
      d.m = criarModelo(cfg, sombraTex);
      d.pos = new THREE.Group(); d.incl = new THREE.Group(); d.incl.rotation.x = INCLINA;
      d.pos.add(d.incl); d.incl.add(d.m.raiz); cena.add(d.pos);
      tris += d.m.tris;
      d.altCab = (d.m.alturaBase + 0.32) * cfg.tamanho * Math.cos(INCLINA);
    } else {
      d.altCab = alturaCabeca(cfg) * cfg.tamanho; d.lado = 1;
    }
    caes.push(d); ordem.push(d);
  });

  function casa(d) {
    const r = barra.el.getBoundingClientRect(), x0 = 128, w = Math.max(120, W() - x0 - 24);
    return { x: x0 + (w * (d.i + 0.5)) / cfgs.length, y: r.top + Math.min(r.height * 0.78, 46) };
  }
  function tamanhoTela() {
    if (gl) { renderer.setSize(W(), H()); camera.right = W(); camera.bottom = -H(); camera.updateProjectionMatrix(); }
    else { pr2 = Math.min(2, window.devicePixelRatio || 1); tela2.width = Math.round(W() * pr2); tela2.height = Math.round(H() * pr2); if (malha) malha.tamanho(W(), H(), pr2); }
    for (const d of caes) if (!d.ocupado && !d.tarefa) { const c = casa(d); d.x = c.x; d.y = c.y; }
  }
  tamanhoTela();
  for (const d of caes) { const c = casa(d); d.x = c.x; d.y = c.y; d.ang = rand(-0.6, 0.6); }

  // ---------- ambiente ----------
  const amb = { calor: false, frio: false, noite: false, ar: false };
  function lerAmbiente() {
    const a = getAmb() || {};
    const hora = Number.isFinite(a.hora) ? a.hora : new Date().getHours() + new Date().getMinutes() / 60;
    amb.noite = hora >= 22 || hora < 6;
    amb.ar = !!a.arLigado;
    const q = Number(a.quarto), f = Number(a.fora);
    amb.calor = q > 28 || (!amb.ar && f > 30);
    amb.frio = q < 20 || (amb.ar && a.modo === 'frio' && Number(a.alvo) <= 18) || (!amb.ar && f < 18);
    if (amb.calor && amb.frio) amb.frio = false;
  }
  lerAmbiente();

  // ---------- ações e tarefas ----------
  function setAcao(d, nome) {
    if (d.acao === nome) return;
    d.acaoAnt = d.acao; d.tAnt = d.tA; d.acao = nome; d.tA = 0; d.mist = 0;
  }
  function tarefas(d, lista, ocupado = true) {
    d.tarefas = lista; d.tarefa = null; d.ocupado = ocupado; d.dormindo = false; proxima(d);
  }
  function proxima(d) {
    d.tarefa = d.tarefas.shift() || null;
    const t = d.tarefa;
    if (!t) { d.ocupado = false; d.prox = rand(1, 3); return; }
    t.tt = 0;
    if (t.t === 'acao') setAcao(d, t.a);
    if (t.t === 'latir') { setAcao(d, 'bark'); t.n = t.n || 2; t.feitos = 0; balao(d, t.texto || 'au!', 0.45 * t.n + 0.6); }
    if (t.t === 'esperar') setAcao(d, t.a || 'idle');
    if (t.t === 'fn') { t.f(d); proxima(d); }
    if (t.t === 'sumir') { d.visivel = false; proxima(d); }
    if (t.t === 'aparecer') { d.x = t.x; d.y = t.y; d.visivel = true; proxima(d); }
  }
  const velocidade = (d, modo) => d.tam * (modo === 'run' ? 3.4 + d.energia : 1.0 + d.energia * 0.5);

  function andar(d, t, dt) {
    const dx = t.x - d.x, dy = t.y - d.y, dist = Math.hypot(dx, dy);
    const modo = t.modo || 'walk';
    setAcao(d, modo);
    if (dist < 1.5) { d.x = t.x; d.y = t.y; return true; }
    const angAlvo = Math.atan2(dx, dy);
    if (!t.re) d.ang += difAng(angAlvo, d.ang) * Math.min(1, dt * (modo === 'run' ? 9 : 6));
    const v = Math.min(dist, velocidade(d, modo) * dt * (t.re ? 0.45 : 1));
    d.x += (dx / dist) * v; d.y += (dy / dist) * v;
    d.fase += ((t.re ? -v : v) / (d.tam * (modo === 'run' ? 1.05 : 0.5))) * PI;
    return false;
  }

  function rodarTarefa(d, dt) {
    const t = d.tarefa; if (!t) return;
    t.tt += dt;
    let fim = false;
    switch (t.t) {
      case 'ir': fim = andar(d, t, dt); break;
      case 'acao': case 'esperar': fim = t.tt >= t.dur; break;
      case 'latir': {
        const k = Math.floor(d.tA / 0.45);
        if (k >= t.feitos && t.feitos < t.n) { t.feitos++; latido(d); }
        fim = d.tA >= 0.45 * t.n + 0.1; break;
      }
      case 'virar': {
        const alvo = t.alvo === 'usuario' ? 0 : t.ang !== undefined ? t.ang : Math.atan2(t.alvo.x - d.x, t.alvo.y - d.y);
        setAcao(d, Math.abs(difAng(alvo, d.ang)) > 0.25 ? 'walk' : t.a || 'idle');
        d.ang += difAng(alvo, d.ang) * Math.min(1, dt * 7); d.fase += dt * 8;
        fim = Math.abs(difAng(alvo, d.ang)) < 0.06 || t.tt > 1.5; break;
      }
      case 'sincronizar': fim = t.g.n >= t.g.total || t.tt > 6; if (!t.contou) { t.g.n++; t.contou = true; } setAcao(d, 'idle'); break;
      case 'puxar': { // morde o botão e puxa para trás alguns pixels; o botão volta com mola
        setAcao(d, 'walk');
        const k = Math.min(1, t.tt / 1.1), off = -t.dx * k;
        if (!t.ini) { t.ini = true; t.el.style.transition = 'none'; t.x0 = d.x; }
        d.x = t.x0 + off; d.fase -= dt * 9;
        t.el.style.translate = `${off.toFixed(1)}px ${(Math.sin(t.tt * 18) * 1.2).toFixed(1)}px`;
        t.el.style.rotate = `${(-off * 0.15).toFixed(1)}deg`;
        if (k >= 1) { soltarElemento(t.el); fim = true; }
        break;
      }
      default: fim = true;
    }
    if (fim && d.tarefa === t) proxima(d);
  }
  function soltarElemento(el) {
    el.style.transition = 'translate .6s cubic-bezier(.3,1.9,.5,1), rotate .6s cubic-bezier(.3,1.9,.5,1)';
    el.style.translate = '0px 0px'; el.style.rotate = '0deg';
    setTimeout(() => { el.style.transition = ''; el.style.translate = ''; el.style.rotate = ''; }, 700);
  }

  // ---------- eventos ----------
  const borda = (lado, y) => ({ x: lado < 0 ? -60 : W() + 60, y });
  function voltarParaCasa(d, modo = 'walk') {
    const c = casa(d);
    return [{ t: 'ir', x: c.x, y: c.y, modo }, { t: 'virar', ang: rand(-0.5, 0.5) }, { t: 'fn', f: () => { if (eventoAtivo && eventoAtivo.caes.every((x) => x === d || !x.ocupado)) eventoAtivo = null; } }];
  }
  const livres = () => caes.filter((d) => !d.ocupado && !d.dormindo);
  function iniciarEvento(nome, caesEv) { eventoAtivo = { nome, caes: caesEv }; }

  const EVENTOS = {
    visita(d = escolher(livres())) {
      if (!d) return false;
      const lado = d.x < W() / 2 ? -1 : 1, ent = escolher([-1, 1]), py = rand(0.28, 0.6) * H(), px = rand(0.25, 0.75) * W();
      iniciarEvento('visita', [d]);
      tarefas(d, [
        { t: 'ir', ...borda(lado, d.y - 10), modo: 'run' }, { t: 'sumir' }, { t: 'esperar', dur: rand(0.8, 2) },
        { t: 'aparecer', ...borda(ent, py) }, { t: 'ir', x: px, y: py + rand(-30, 30), modo: 'run' },
        { t: 'virar', alvo: 'usuario' }, { t: 'esperar', dur: 0.4 }, { t: 'latir', n: d.energia > 0.8 ? 3 : 2 }, { t: 'esperar', dur: 0.5 },
        { t: 'ir', ...borda(-ent, py + rand(-80, 80)), modo: 'run' }, { t: 'sumir' }, { t: 'esperar', dur: rand(1, 2.5) },
        { t: 'aparecer', ...borda(lado, casa(d).y) }, ...voltarParaCasa(d),
      ]);
      return true;
    },
    briga(a, b) {
      const l = livres(); a = a || escolher(l); b = b || escolher(l.filter((x) => x !== a));
      if (!a || !b) return false;
      iniciarEvento('briga', [a, b]);
      const mx = W() * rand(0.4, 0.6), my = H() * rand(0.55, 0.7), g = { n: 0, total: 2 }, sep = (a.tam + b.tam) * 0.36;
      const roteiro = (d, s, outro) => [
        { t: 'ir', x: mx + s * sep, y: my, modo: 'run' }, { t: 'sincronizar', g }, { t: 'virar', ang: s > 0 ? -PI / 2 : PI / 2 },
        { t: 'acao', a: 'playbow', dur: 0.8 }, { t: 'acao', a: 'fight', dur: 1.6 }, { t: 'acao', a: 'jump', dur: 0.8 },
        { t: 'fn', f: () => balao(d, s > 0 ? 'grrr' : 'rrr…', 0.9) }, { t: 'acao', a: 'fight', dur: 1.4 },
        { t: 'ir', x: mx + s * sep * 1.35, y: my, re: true }, { t: 'acao', a: 'playbow', dur: 0.6 }, { t: 'acao', a: 'fight', dur: 1.2 },
        { t: 'fn', f: () => { d.alegria = 1; } }, { t: 'acao', a: 'idle', dur: 0.6 }, ...voltarParaCasa(d, 'run'),
      ];
      tarefas(a, roteiro(a, -1, b)); tarefas(b, roteiro(b, 1, a));
      return true;
    },
    pegar(d = escolher(livres())) {
      if (!d) return false;
      const lim = barra.el.getBoundingClientRect().top - 20;
      const els = [...document.querySelectorAll(SEL_PEGA)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.top > 40 && r.bottom < lim - d.tam * 0.2 && r.left > 0 && r.right < W(); });
      const el = escolher(els); if (!el) return false;
      const r = el.getBoundingClientRect(), daEsq = r.left + r.width / 2 > W() / 2;
      const fx = daEsq ? r.left - d.tam * 0.55 : r.right + d.tam * 0.55, fy = r.top + r.height / 2 + d.altCab * 0.82;
      iniciarEvento('pegar', [d]);
      tarefas(d, [
        { t: 'ir', x: fx + (daEsq ? -40 : 40), y: fy + 10, modo: 'run' }, { t: 'ir', x: fx, y: fy }, { t: 'virar', ang: daEsq ? PI / 2 : -PI / 2 },
        { t: 'acao', a: 'bark', dur: 0.3 }, { t: 'puxar', el, dx: (daEsq ? 1 : -1) * rand(14, 24) }, { t: 'virar', alvo: 'usuario' },
        { t: 'latir', n: 1, texto: 'hehe' }, ...voltarParaCasa(d, 'run'),
      ]);
      return true;
    },
    xixi(d) {
      d = d || [...livres()].sort((a, b) => nec.de(b.cfg.id).bexiga - nec.de(a.cfg.id).bexiga)[0];
      if (!d) return false;
      const lim = barra.el.getBoundingClientRect().top - 30;
      const canto = escolher([[34, H() * 0.3], [W() - 34, H() * 0.3], [34, lim - 40], [W() - 34, lim - 40]]);
      iniciarEvento('xixi', [d]);
      const lado = canto[0] < W() / 2 ? 1 : -1;
      tarefas(d, [
        { t: 'ir', x: canto[0] + lado * 10, y: canto[1], modo: 'walk' }, { t: 'acao', a: 'eat', dur: 0.9 }, // cheirinho
        { t: 'virar', ang: lado > 0 ? PI / 2 : -PI / 2 },
        { t: 'fn', f: () => poca(d) }, { t: 'acao', a: d.cfg.sexo === 'M' ? 'peeM' : 'peeF', dur: 2.6 },
        { t: 'fn', f: () => nec.definir(d.cfg.id, 'bexiga', 0) }, { t: 'acao', a: 'idle', dur: 0.4 }, ...voltarParaCasa(d),
      ]);
      return true;
    },
    ar(d = escolher(livres())) { // calor: vai para perto do ar
      const el = document.querySelector(SEL_AR); if (!d || !el) return false;
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > H()) return false;
      iniciarEvento('ar', [d]);
      tarefas(d, [{ t: 'ir', x: r.left + rand(0.25, 0.75) * r.width, y: Math.min(r.bottom + d.altCab, H() * 0.7), modo: 'walk' }, { t: 'virar', alvo: 'usuario' },
        { t: 'acao', a: amb.ar ? 'lie' : 'pant', dur: 9 }, { t: 'acao', a: 'pant', dur: 3 }, ...voltarParaCasa(d)]);
      return true;
    },
  };

  function diretor(dt) {
    if (eventoAtivo && !eventoAtivo.caes.some((d) => d.ocupado)) eventoAtivo = null;
    if (eventoAtivo || amb.noite) return;
    proxEvento -= dt;
    if (proxEvento > 0) return;
    proxEvento = rand(22, 48) * (amb.ar ? 1.6 : 1);
    const bex = caes.reduce((s, d) => Math.max(s, nec.de(d.cfg.id).bexiga), 0);
    const opcoes = [['visita', 4], ['briga', livres().length >= 2 ? 2 : 0], ['pegar', 1.5], ['xixi', bex / 35], ['ar', amb.calor ? 3 : 0]];
    let tot = opcoes.reduce((s, o) => s + o[1], 0), r = Math.random() * tot;
    for (const [nome, peso] of opcoes) { r -= peso; if (r <= 0) { EVENTOS[nome](); break; } }
  }

  // em casa: escolhe a postura conforme o clima e a hora
  function ocioso(d, dt) {
    if (d.ocupado || d.tarefa) return;
    const n = nec.de(d.cfg.id);
    d.alegria = Math.max(0, Math.min(1, 1 - (Math.max(n.fome, n.sede) - 25) / 60));
    const acordado = tempo < d.acordadoAte;
    if (amb.noite && !acordado) {
      if (!d.dormindo) { d.dormindo = true; setAcao(d, 'sleep'); }
      d.zzz -= dt; if (d.zzz < 0) { d.zzz = rand(3, 5); balao(d, 'zzz', 2.2, true); }
      return;
    }
    if (d.dormindo) { d.dormindo = false; setAcao(d, 'idle'); }
    d.pedido -= dt;
    if (d.pedido < 0 && (n.fome >= 70 || n.sede >= 70)) {
      d.pedido = rand(40, 75);
      tarefas(d, [{ t: 'virar', alvo: 'usuario' }, { t: 'latir', n: 2, texto: n.fome >= n.sede ? '🍖?' : '💧?' }], false);
      return;
    }
    d.prox -= dt; if (d.prox > 0) return;
    d.prox = rand(6, 15) * (1.4 - d.energia * 0.6);
    let a;
    if (amb.frio) a = escolher(['shiver', 'curl', 'curl']);
    else if (amb.calor) a = escolher(['pant', 'pant', amb.ar ? 'lie' : 'pant']);
    else if (amb.ar) a = escolher(d.energia > 0.8 ? ['lie', 'sit', 'idle'] : ['lie', 'lie', d.energia < 0.5 ? 'sleep' : 'sit']);
    else a = escolher(d.energia > 0.8 ? ['idle', 'idle', 'sit', 'playbow'] : d.energia > 0.5 ? ['idle', 'sit', 'lie'] : ['lie', 'sit', 'lie', 'idle']);
    if (a === 'playbow') { tarefas(d, [{ t: 'acao', a: 'playbow', dur: 1 }, { t: 'acao', a: 'idle', dur: 0.1 }], false); return; }
    if (Math.random() < 0.25 && !amb.frio) { // às vezes dá uma voltinha em casa
      const c = casa(d);
      tarefas(d, [{ t: 'ir', x: c.x + rand(-22, 22), y: c.y }, { t: 'virar', ang: rand(-0.7, 0.7) }, { t: 'acao', a, dur: 0.1 }], false);
      return;
    }
    setAcao(d, a);
  }

  // ---------- toque, olhar, latido, balões ----------
  function acharCao(x, y) {
    let melhor = null, md = 1;
    for (const d of caes) {
      if (!d.visivel) continue;
      const cy = d.y - d.altCab * 0.5, nx = (x - d.x) / (d.tam * 0.6), ny = (y - cy) / (d.altCab * 0.65);
      const q = nx * nx + ny * ny; if (q < md) { md = q; melhor = d; }
    }
    return melhor;
  }
  ouvir(window, 'pointerdown', (e) => {
    if (e.target.closest?.('[data-sem-caes], .caes-item')) return; // janelas por cima e a barra continuam normais
    const d = acharCao(e.clientX, e.clientY);
    if (!d) return;
    e.stopPropagation(); e.stopImmediatePropagation(); if (e.cancelable) e.preventDefault();
    engolir = performance.now();
    acordarAudio();
    tocar(d);
  }, { capture: true });
  ouvir(window, 'click', (e) => { if (performance.now() - engolir < 700) { e.stopPropagation(); e.stopImmediatePropagation(); e.preventDefault(); } }, { capture: true });
  ouvir(window, 'pointermove', (e) => { dedo.x = e.clientX; dedo.y = e.clientY; dedo.em = tempo; }, { passive: true });
  ouvir(window, 'resize', tamanhoTela);
  ouvir(document, 'visibilitychange', () => { if (document.hidden) pausar(); else continuar(); });

  function tocar(d) {
    mostrarIndicador(d);
    if (d.dormindo || d.acao === 'sleep') {
      d.acordadoAte = tempo + 25; d.dormindo = false;
      tarefas(d, [{ t: 'acao', a: 'playbow', dur: 0.9 }, { t: 'virar', alvo: 'usuario' }, { t: 'latir', n: 1, texto: 'au?' }], false);
      return;
    }
    if (d.ocupado) { balao(d, 'au!', 0.8); latido(d); return; }
    tarefas(d, [{ t: 'virar', alvo: 'usuario' }, { t: 'latir', n: d.energia > 0.8 ? 2 : 1 }, { t: 'acao', a: 'idle', dur: 0.4 }], false);
  }

  const pool = [];
  function balao(d, texto, dur = 1.2, leve = false) {
    let b = pool.find((x) => !x.ativo);
    if (!b) { b = { el: document.createElement('div') }; baloes.appendChild(b.el); pool.push(b); }
    b.ativo = true; b.d = d; b.fim = tempo + dur; b.el.textContent = texto;
    b.el.className = 'caes-balao' + (leve ? ' leve' : '') + (d.x > W() - 70 ? ' esq' : '');
    b.el.style.opacity = '1';
  }
  function moverBaloes() {
    for (const b of pool) {
      if (!b.ativo) continue;
      if (tempo > b.fim || !b.d.visivel) { b.ativo = false; b.el.style.opacity = '0'; continue; }
      b.el.style.transform = `translate3d(${b.d.x.toFixed(0)}px,${(b.d.y - b.d.altCab - 8).toFixed(0)}px,0)`;
    }
  }
  let indicador;
  function mostrarIndicador(d) {
    const n = nec.de(d.cfg.id);
    if (!indicador) { indicador = document.createElement('div'); indicador.className = 'caes-ind'; baloes.appendChild(indicador); }
    const barra = (v, cor) => `<i><b style="width:${(100 - v).toFixed(0)}%;background:${cor}"></b></i>`;
    indicador.innerHTML = `<strong>${d.cfg.artigo === 'a' ? 'A' : 'O'} ${d.cfg.nome}</strong><span>🍖 ${barra(n.fome, '#ff9f0a')}</span><span>💧 ${barra(n.sede, '#64d2ff')}</span>`;
    indicador.style.transform = `translate3d(${Math.min(W() - 130, Math.max(8, d.x - 60)).toFixed(0)}px,${Math.max(8, d.y - d.altCab - 92).toFixed(0)}px,0)`;
    indicador.classList.add('on'); clearTimeout(indicador._t); indicador._t = setTimeout(() => indicador.classList.remove('on'), 2600);
  }

  function poca(d) {
    const p = document.createElement('div'); p.className = 'caes-poca';
    const atras = d.tam * 0.35, x = d.x - Math.sin(d.ang) * atras, y = d.y - Math.cos(d.ang) * atras * 0.6;
    p.style.cssText = `left:${x - d.tam * 0.3}px;top:${y - d.tam * 0.1}px;width:${d.tam * 0.6}px;height:${d.tam * 0.22}px`;
    pocas.appendChild(p);
    requestAnimationFrame(() => p.classList.add('on'));
    setTimeout(() => p.classList.remove('on'), 6500);
    setTimeout(() => p.remove(), 8000);
  }

  // latido sintetizado (sem arquivo de som); só com a chave ligada
  let ac;
  function acordarAudio() { if (som && !ac) try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch {} if (ac?.state === 'suspended') ac.resume(); }
  function latido(d) {
    if (!som || !ac) return;
    const t = ac.currentTime, v = d.cfg.voz || 1;
    const o = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(560 * v, t); o.frequency.exponentialRampToValueAtTime(300 * v, t + 0.13);
    f.type = 'bandpass'; f.frequency.value = 1300 * v; f.Q.value = 1.4;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.35, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(f); f.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + 0.18);
  }

  // ---------- comida e água ----------
  function soltar(tipo, x, y) {
    const lim = barra.el.getBoundingClientRect().top - 12;
    y = Math.min(y, lim);
    let tg = null;
    if (gl) {
      tg = new THREE.Group(); const incl = new THREE.Group(); incl.rotation.x = INCLINA; tg.add(incl);
      const tig = new THREE.Mesh(geoTigela, mTigela); incl.add(tig);
      const cont = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.06, 16), tipo === 'comida' ? mRacao : mAgua); cont.position.y = 0.24; incl.add(cont);
      tg.scale.setScalar(34); tg.position.set(x, -y, y); cena.add(tg);
      tigelas.push({ g: tg, cont });
    } else {
      tg = { x, y, tipo, cheio: 1 }; tigelas.push(tg);
    }
    const campo = tipo === 'comida' ? 'fome' : 'sede';
    const cand = caes.filter((d) => !eventoAtivo || !eventoAtivo.caes.includes(d) || true);
    const d = cand.sort((a, b) => (nec.de(b.cfg.id)[campo] - Math.hypot(b.x - x, b.y - y) * 0.05) - (nec.de(a.cfg.id)[campo] - Math.hypot(a.x - x, a.y - y) * 0.05))[0];
    if (eventoAtivo?.caes.includes(d)) { eventoAtivo.caes.forEach((c) => { if (c !== d) tarefas(c, voltarParaCasa(c)); }); eventoAtivo = null; }
    const lado = d.x < x ? -1 : 1, fx = x + lado * d.tam * 0.5, fy = y + 2;
    const pre = d.visivel ? [] : [{ t: 'aparecer', ...borda(lado, fy) }];
    const fim = () => {
      nec.alimentar(d.cfg.id, tipo); op.aoAlimentar?.(nec.resumo());
      setTimeout(() => removerTigela(tg), 1800);
    };
    d.acordadoAte = tempo + 30;
    tarefas(d, [...pre, { t: 'ir', x: fx, y: fy, modo: Math.hypot(d.x - fx, d.y - fy) > 160 ? 'run' : 'walk' }, { t: 'virar', ang: lado > 0 ? -PI / 2 : PI / 2 },
      { t: 'acao', a: tipo === 'comida' ? 'eat' : 'drink', dur: 3.6 }, { t: 'fn', f: fim }, { t: 'virar', alvo: 'usuario' },
      { t: 'fn', f: () => { d.alegria = 1; balao(d, tipo === 'comida' ? 'nham!' : 'slurp!', 1); } }, { t: 'acao', a: 'idle', dur: 1.4 }, ...voltarParaCasa(d)]);
    const tb = tigelas[tigelas.length - 1]; tb.dono = d; tb.campo = tipo;
  }
  function removerTigela(tg) {
    if (!gl) { const j = tigelas.indexOf(tg); if (j >= 0) tigelas.splice(j, 1); return; }
    const i = tigelas.findIndex((t) => t.g === tg); if (i < 0) return;
    cena.remove(tg); tigelas[i].cont.geometry.dispose(); tigelas.splice(i, 1);
  }

  // ---------- laço (30 qps, pausa em segundo plano) ----------
  function quadro(agora) {
    raf = requestAnimationFrame(quadro);
    if (agora - ultQuadro < 1000 / FPS - 2) return;
    const dt = Math.min(0.1, (agora - ultQuadro) / 1000 || 0.033); ultQuadro = agora;
    tempo += dt;
    qFps++; if (agora - tFps >= 1000) { fps = (qFps * 1000) / (agora - tFps); qFps = 0; tFps = agora; }
    const real = Date.now(); nec.passar((real - ultNec) / 1000, amb.calor); ultNec = real;
    if (((tempo * 2) | 0) !== (((tempo - dt) * 2) | 0)) lerAmbiente();
    diretor(dt);
    for (const d of caes) atualizar(d, dt);
    for (const tb of tigelas) if (tb.dono && tb.dono.acao === (tb.campo === 'comida' ? 'eat' : 'drink')) { const k = Math.max(0.2, 1 - tb.dono.tA / 3.6); if (gl) tb.cont.scale.setScalar(k); else tb.cheio = k; }
    moverBaloes();
    if (gl) renderer.render(cena, camera);
    else {
      c2.setTransform(pr2, 0, 0, pr2, 0, 0); c2.clearRect(0, 0, W(), H());
      for (const tb of tigelas) desenharTigela(c2, tb);
      ordem.sort(porY);
      if (malha) { malha.limpar(); for (const d of ordem) if (d.visivel) { desenharSombra(c2, d, malha.larguraDe(d.cfg)); malha.desenhar(d, d.lado); } }
      else for (const d of ordem) if (d.visivel) desenharCao(c2, d, d.lado);
    }
  }
  const porY = (a, b) => a.y - b.y;
  function atualizar(d, dt) {
    d.t += dt; d.tA += dt; d.tAnt += dt; if (d.mist < 1) d.mist = Math.min(1, d.mist + dt / MISTURA);
    rodarTarefa(d, dt); ocioso(d, dt);
    ACOES[d.acao](d.pa, d.tA, d);
    if (d.mist < 1) {
      ACOES[d.acaoAnt](d.pb, d.tAnt, d);
      const k = d.mist * d.mist * (3 - 2 * d.mist);
      for (let i = 0; i < N; i++) d.p[i] = d.pb[i] + (d.pa[i] - d.pb[i]) * k;
    } else d.p.set(d.pa);
    // olhar: segue o dedo/cursor de leve; senão, às vezes olha para a pessoa
    const quieto = d.acao === 'sleep' || d.acao === 'eat' || d.acao === 'drink' || d.acao === 'run' || d.acao.startsWith('pee');
    let ay = 0, ap = 0;
    if (!quieto) {
      if (tempo - dedo.em < 2.5) {
        const dx = dedo.x - d.x, dy = dedo.y - d.y;
        ay = Math.max(-1, Math.min(1, difAng(Math.atan2(dx, Math.max(dy, -30)), d.ang)));
        ap = Math.max(-0.35, Math.min(0.15, (dedo.y - (d.y - d.altCab)) / 600));
      } else if (d.tarefa?.t === 'latir' || d.tarefa?.t === 'esperar') ay = Math.max(-1, Math.min(1, difAng(0, d.ang)));
    }
    d.ly += (ay - d.ly) * Math.min(1, dt * 5); d.lp += (ap - d.lp) * Math.min(1, dt * 5);
    d.p[NY] += d.ly * 0.4; d.p[HY] += d.ly * 0.6; d.p[HX] += d.lp;
    if (d.acao !== 'sleep') {
      d.pisca -= dt;
      if (d.pisca < 0) { d.piscaV = 1; if (d.pisca < -0.13) { d.pisca = rand(2, 6); d.piscaV = 0; } }
      d.p[BLINK] = Math.max(d.p[BLINK], d.piscaV);
    }
    if (!gl) { const sx = Math.sin(d.ang); if (sx > 0.2) d.lado = 1; else if (sx < -0.2) d.lado = -1; return; }
    aplicarPose(d.m, d.p, d);
    d.pos.visible = d.visivel;
    d.pos.position.set(d.x, -d.y, d.y);
    d.m.yaw.rotation.y = d.ang;
  }
  function pausar() { rodando = false; cancelAnimationFrame(raf); nec.salvar(); }
  function continuar() { if (rodando) return; rodando = true; ultQuadro = performance.now(); raf = requestAnimationFrame(quadro); }
  ultQuadro = performance.now(); raf = requestAnimationFrame(quadro);

  // ---------- API ----------
  return {
    caes, necessidades: nec, comWebGL: gl,
    disparar(nome, id) {
      const d = id ? caes.find((c) => c.cfg.id === id) : undefined;
      if (EVENTOS[nome]) { if (d) d.ocupado = false; return EVENTOS[nome](d); }
      const alvo = d || caes[0];
      if (nome === 'latir') return tocar(alvo);
      if (nome === 'dormir') { alvo.acordadoAte = 0; tarefas(alvo, [{ t: 'acao', a: 'sleep', dur: 8 }], false); return; }
      if (nome === 'pular') return tarefas(alvo, [{ t: 'acao', a: 'jump', dur: 0.8 }], false);
      if (nome === 'comida' || nome === 'agua') return soltar(nome === 'agua' ? 'agua' : 'comida', rand(0.3, 0.7) * W(), H() * 0.55);
      if (ACOES[nome]) return tarefas(alvo, [{ t: 'acao', a: nome, dur: 4 }], false);
    },
    definirSom(v) { som = !!v; try { localStorage.setItem('casinha_caes_som', som ? '1' : '0'); } catch {} if (som) acordarAudio(); },
    get som() { return som; },
    destacarJogo() { barra.destacar(); },
    reler: lerAmbiente,
    ambiente: amb,
    estilo: gl ? '3d' : malha ? 'desenho articulado' : 'desenho',
    stats: () => ({ fps: Math.round(fps), triangulos: gl ? renderer.info.render.triangles : 0, chamadas: gl ? renderer.info.render.calls : 0, porCachorro: caes.map((d) => [d.cfg.id, d.m?.tris || 0]), trisModelos: tris, pixelRatio: gl ? renderer.getPixelRatio() : 1 }),
    destruir() {
      cancelAnimationFrame(raf); rodando = false; nec.salvar();
      for (const [a, e, f, o] of ouvintes) a.removeEventListener(e, f, o);
      for (const tb of [...tigelas]) removerTigela(tb.g);
      if (gl) {
        for (const d of caes) d.m.descartar();
        descartarCompartilhadas(); sombraTex.dispose(); geoTigela.dispose(); mTigela.dispose(); mRacao.dispose(); mAgua.dispose();
        renderer.dispose(); renderer.forceContextLoss?.();
      }
      if (malha) malha.destruir();
      ac?.close?.(); camada.remove(); barra.el.remove();
    },
  };
}

// Barra do rodapé com 🍖 e 💧: arraste para a tela e solte.
function criarBarra(aoSoltar) {
  const el = document.createElement('div');
  el.className = 'caes-barra';
  el.innerHTML = '<button type="button" class="caes-item" data-tipo="comida" aria-label="Arraste a comida para a tela">🍖</button><button type="button" class="caes-item" data-tipo="agua" aria-label="Arraste a água para a tela">💧</button><span class="caes-dica">arraste</span>';
  let fantasma = null, tipo = null;
  el.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('.caes-item'); if (!b) return;
    e.preventDefault(); tipo = b.dataset.tipo; b.setPointerCapture(e.pointerId);
    fantasma = document.createElement('div'); fantasma.className = 'caes-fantasma'; fantasma.textContent = b.textContent; document.body.appendChild(fantasma);
    mover(e);
  });
  const mover = (e) => { if (fantasma) fantasma.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-70%)`; };
  el.addEventListener('pointermove', mover);
  const fim = (e, ok) => {
    if (!fantasma) return;
    fantasma.remove(); fantasma = null;
    if (ok && e.clientY < el.getBoundingClientRect().top - 8) aoSoltar(tipo, e.clientX, e.clientY);
    else { el.classList.add('dica'); setTimeout(() => el.classList.remove('dica'), 1600); }
  };
  el.addEventListener('pointerup', (e) => fim(e, true));
  el.addEventListener('pointercancel', (e) => fim(e, false));
  return { el, destacar() { el.classList.add('chama'); setTimeout(() => el.classList.remove('chama'), 5000); } };
}
