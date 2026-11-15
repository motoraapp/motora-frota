// Cachorros 3D por cima da tela. Para usar em qualquer página:
//   import { iniciarCachorros } from './src/dogs3d.js';
//   const caes = iniciarCachorros({ getAmbiente: () => ({ fora, quarto, arLigado, modo, alvo }) });
//   caes.destruir();   // desliga e libera a memória
// Só os cachorros recebem toque; o resto da tela continua clicável.
import { CACHORROS } from './config.js';
import { ACOES, aplicarPose, N, MISTURA, NY, HX, HY, BLINK, JAW } from './animacoes.js';
import { criarNecessidades } from './necessidades.js';
import { desenharCao, desenharTigela, alturaCabeca, precarregar, bocaDe } from './desenho.js';
import { rota } from './rota.js';

const INCLINA = 0.42;                 // câmera um pouco de cima
const FPS = 60; // movimento fluido (pedido do dono); pausa sozinho com o app em segundo plano
const rand = (a, b) => a + Math.random() * (b - a);
const escolher = (l) => l[(Math.random() * l.length) | 0];
const PI = Math.PI, TAU = PI * 2;
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
  let tela2 = null, c2 = null, pr2 = 1;
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
    precarregar(cfgs); // desenho 2D: peças do desenho do dono + patas desenhadas (desenho.js)
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
    else { pr2 = Math.min(2, window.devicePixelRatio || 1); tela2.width = Math.round(W() * pr2); tela2.height = Math.round(H() * pr2); }
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
  const velocidade = (d, modo) => d.tam * (modo === 'run' ? 3.4 + d.energia : modo === 'sniff' ? 0.45 + d.energia * 0.2 : 0.95 + d.energia * 0.35);

  // quanto além da borda o cachorro precisa ir para sumir inteiro (o desenho correndo/deitado é mais comprido que alto)
  const foraDe = (d) => d.tam * 1.6 + 10;
  // anda SÓ na horizontal (regra do dono, 16/11/2026): se o destino está em outra altura, sai pela lateral, troca a altura
  // fora da tela e volta pela lateral (rota.js). O y do cachorro nunca muda dentro da tela.
  function andar(d, t, dt) {
    const modo = t.modo || 'walk';
    if (!t.pontos) t.pontos = rota(d.x, d.y, t.x, t.y, W(), foraDe(d));
    let p = t.pontos[0];
    while (p && p.salto) { d.y = p.y; t.pontos.shift(); p = t.pontos[0]; } // troca de faixa (fora da tela)
    if (!p) return true;
    setAcao(d, modo);
    const dx = p.x - d.x, dist = Math.abs(dx);
    if (dist < 1.5) { d.x = p.x; t.pontos.shift(); return !t.pontos.length; }
    if (!t.re) d.ang = dx > 0 ? PI / 2 : -PI / 2; // vira para o lado em que anda
    const v = Math.min(dist, velocidade(d, modo) * dt * (t.re ? 0.45 : 1));
    d.x += Math.sign(dx) * v;
    d.fase += ((t.re ? -v : v) / (d.tam * (modo === 'run' ? 0.55 : 0.5))) * PI; // andando: cada quadro do passo dura ~0,2 s // troca de quadro casada com a distância (o pé não escorrega)
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
      case 'virar': { // desenho: virar = olhar para a pessoa (de frente) ou trocar de lado, sem sair do lugar
        if (t.alvo === 'usuario') { setAcao(d, t.tt < 0.45 ? 'frente' : t.a || 'idle'); fim = t.tt >= 0.5; break; }
        const alvo = t.ang !== undefined ? t.ang : (t.alvo.x >= d.x ? PI / 2 : -PI / 2);
        if (Math.abs(Math.sin(alvo)) > 0.2) d.ang = Math.sin(alvo) > 0 ? PI / 2 : -PI / 2;
        setAcao(d, t.a || 'idle'); fim = t.tt >= 0.12; break;
      }
      case 'sincronizar': fim = t.g.n >= t.g.total || t.tt > 6; if (!t.contou) { t.g.n++; t.contou = true; } setAcao(d, 'idle'); break;
      case 'puxar': { // morde o botão e puxa para trás: a boca abre e fecha (mordidas), sacode a cabeça; o botão treme a cada mordida e volta com mola
        setAcao(d, 'tug');
        const dur = t.dur || 1.8, k = Math.min(1, t.tt / dur), off = -t.dx * (k < 0.15 ? k / 0.15 * 0.4 : 0.4 + 0.6 * k);
        if (!t.ini) { t.ini = true; t.el.style.transition = 'none'; t.x0 = d.x; }
        const morde = Math.max(0, Math.sin(d.tA * 12)); // mesma mordida da boca (movimento.js 'tug')
        d.x = t.x0 + off;
        t.el.style.translate = `${(off + Math.sin(d.tA * 9) * 2.5).toFixed(1)}px ${(morde * 2.2 - 1).toFixed(1)}px`;
        t.el.style.rotate = `${(-off * 0.15 + Math.sin(d.tA * 9 + 0.6) * 5).toFixed(1)}deg`;
        if (k >= 1) { soltarElemento(t.el); fim = true; }
        break;
      }
      case 'girar': // volta no próprio eixo (correr atrás do rabo), no mesmo lugar: quadros de giro (desenho.js 'rodar')
        setAcao(d, 'rodar'); fim = t.tt >= (t.dur || 0.8 * (t.voltas || 1)); break;
      case 'seguir': { // corre atrás de outro cachorro (pega-pega)
        const al = t.alvo, lado = al.x > d.x ? -1 : 1;
        const fimSeg = andar(d, { x: al.x + lado * (al.tam + d.tam) * 0.45, y: al.y, modo: 'run' }, dt);
        fim = t.tt >= t.dur || (!al.ocupado && fimSeg);
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
  // Faixas de altura onde os cachorros andam (sempre na horizontal, rota.js); a de baixo, junto da barra, é a de casa.
  const lim = () => barra.el.getBoundingClientRect().top - 24;
  const faixa = () => escolher([0.36, 0.52, 0.68, 0.84]) * lim();
  const borda = (lado, y, d) => ({ x: lado < 0 ? -foraDe(d) : W() + foraDe(d), y });
  function voltarParaCasa(d, modo = 'walk') {
    const c = casa(d);
    return [{ t: 'ir', x: c.x, y: c.y, modo }, { t: 'virar', ang: escolher([-PI / 2, PI / 2]) }, { t: 'fn', f: () => { if (eventoAtivo && eventoAtivo.caes.every((x) => x === d || !x.ocupado)) eventoAtivo = null; } }];
  }
  const livres = () => caes.filter((d) => !d.ocupado && !d.dormindo);
  const sortear = (l) => { let s = l.reduce((a, d) => a + 0.4 + d.energia, 0) * Math.random(); for (const d of l) { s -= 0.4 + d.energia; if (s <= 0) return d; } return l[0]; }; // o agitado entra em mais brincadeiras
  const ehMaya = (d) => d.cfg.raca === 'shihtzu';
  const pinschersLivres = () => livres().filter((d) => !ehMaya(d));
  function iniciarEvento(nome, caesEv) { eventoAtivo = { nome, caes: caesEv }; }
  const latidos = (min = 2, max = 4) => ({ t: 'latir', n: min + ((Math.random() * (max - min + 1)) | 0) }); // os pinschers latem MUITO

  const EVENTOS = {
    visita(d = sortear(livres())) { // sai por um lado, aparece numa faixa lá em cima, late para a pessoa e volta
      if (!d) return false;
      const lado = d.x < W() / 2 ? -1 : 1, ent = escolher([-1, 1]), py = faixa(), px = rand(0.25, 0.75) * W();
      iniciarEvento('visita', [d]);
      tarefas(d, [
        { t: 'ir', ...borda(lado, d.y, d), modo: 'run' }, { t: 'sumir' }, { t: 'esperar', dur: rand(0.8, 2) },
        { t: 'aparecer', ...borda(ent, py, d) }, { t: 'ir', x: px, y: py, modo: 'run' },
        { t: 'virar', alvo: 'usuario' }, ehMaya(d) ? { t: 'acao', a: 'cabeca', dur: 1 } : latidos(3, 5), { t: 'esperar', dur: 0.4 },
        { t: 'ir', ...borda(-ent, py, d), modo: 'run' }, { t: 'sumir' }, { t: 'esperar', dur: rand(1, 2.5) },
        { t: 'aparecer', ...borda(lado, casa(d).y, d) }, ...voltarParaCasa(d),
      ]);
      return true;
    },
    briga(a, b) { // brincadeira de briga numa faixa: rosnam, latem, pulinhos
      const l = livres(); a = a || escolher(l); b = b || escolher(l.filter((x) => x !== a));
      if (!a || !b) return false;
      iniciarEvento('briga', [a, b]);
      const mx = W() * rand(0.35, 0.65), my = faixa(), g = { n: 0, total: 2 }, sep = (a.tam + b.tam) * 0.42;
      // o Elvis nunca rosna para a Maya (regra do dono, 16/11/2026): com ela, ele pula e rebola em vez de rosnar
      const manso = (d, outro) => d.cfg.id === 'elvis' && ehMaya(outro);
      const roteiro = (d, s, outro = s < 0 ? b : a) => [
        { t: 'ir', x: mx + s * sep, y: my, modo: 'run' }, { t: 'sincronizar', g }, { t: 'virar', ang: s > 0 ? -PI / 2 : PI / 2 },
        { t: 'acao', a: manso(d, outro) ? 'wiggle' : 'rosnar', dur: 0.9 }, { t: 'acao', a: manso(d, outro) ? 'hop' : 'fight', dur: 1.6 }, { t: 'acao', a: 'jump', dur: 0.8 },
        { t: 'fn', f: () => balao(d, manso(d, outro) ? '♥' : s > 0 ? 'grrr' : 'rrr…', 0.9) }, ehMaya(d) ? { t: 'acao', a: 'rosnar', dur: 1.2 } : latidos(2, 3),
        { t: 'ir', x: mx + s * sep * 1.4, y: my, re: true }, { t: 'acao', a: manso(d, outro) ? 'wiggle' : 'fight', dur: 1.2 },
        { t: 'fn', f: () => { d.alegria = 1; } }, { t: 'acao', a: 'idle', dur: 0.5 }, ...voltarParaCasa(d, 'run'),
      ];
      tarefas(a, roteiro(a, -1)); tarefas(b, roteiro(b, 1));
      return true;
    },
    pegar(d = sortear(livres())) { // morde um botão e puxa (abre e fecha a boca)
      if (!d) return false;
      const lm = barra.el.getBoundingClientRect().top - 20;
      const els = [...document.querySelectorAll(SEL_PEGA)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.top > 40 && r.bottom < lm - d.tam * 0.2 && r.left > 0 && r.right < W(); });
      const el = escolher(els); if (!el) return false;
      const r = el.getBoundingClientRect(), daEsq = r.left + r.width / 2 > W() / 2;
      const fx = daEsq ? r.left - d.tam * 0.55 : r.right + d.tam * 0.55, fy = r.top + r.height / 2 + d.altCab * 0.82;
      iniciarEvento('pegar', [d]);
      tarefas(d, [
        { t: 'ir', x: fx + (daEsq ? -40 : 40), y: fy, modo: 'run' }, { t: 'ir', x: fx, y: fy }, { t: 'virar', ang: daEsq ? PI / 2 : -PI / 2 },
        { t: 'acao', a: 'rosnar', dur: 0.4 }, { t: 'fn', f: () => balao(d, 'nhac!', 0.8) },
        { t: 'puxar', el, dx: (daEsq ? 1 : -1) * rand(16, 26), dur: d.energia > 0.8 ? rand(1.8, 2.6) : 1.6 }, { t: 'virar', alvo: 'usuario' },
        { t: 'acao', a: 'hop', dur: d.energia > 0.8 ? 0.9 : 0.45 }, { t: 'latir', n: 1, texto: 'hehe' }, ...voltarParaCasa(d, 'run'),
      ]);
      return true;
    },
    xixi(d) { // Elvis levanta a pata; Belinha e Maya agacham
      d = d || [...livres()].sort((a, b) => nec.de(b.cfg.id).bexiga - nec.de(a.cfg.id).bexiga)[0];
      if (!d) return false;
      const canto = escolher([[34, faixa()], [W() - 34, faixa()], [34, casa(d).y], [W() - 34, casa(d).y]]);
      iniciarEvento('xixi', [d]);
      const lado = canto[0] < W() / 2 ? 1 : -1;
      tarefas(d, [
        // cheira o canto andando devagar (antes era a ação de comer: com o desenho "comendo" aparecia sem tigela)
        { t: 'ir', x: canto[0] - lado * 6, y: canto[1], modo: 'walk' }, { t: 'ir', x: canto[0] + lado * 10, y: canto[1], modo: 'sniff' },
        { t: 'virar', ang: lado > 0 ? PI / 2 : -PI / 2 },
        { t: 'fn', f: () => poca(d) }, { t: 'acao', a: d.cfg.sexo === 'M' ? 'peeM' : 'peeF', dur: 2.6 },
        { t: 'fn', f: () => nec.definir(d.cfg.id, 'bexiga', 0) }, { t: 'acao', a: 'idle', dur: 0.4 }, ...voltarParaCasa(d),
      ]);
      return true;
    },
    patrulha(d = sortear(pinschersLivres())) { // pinscher corre de um lado para o outro numa faixa latindo
      if (!d) return false;
      const py = Math.random() < 0.5 ? casa(d).y : faixa(), pts = [];
      for (let i = 0; i < 3; i++) pts.push({ t: 'ir', x: rand(0.08, 0.92) * W(), y: py, modo: 'run' }, latidos(2, 4), ...(i === 1 ? [{ t: 'acao', a: 'cabeca', dur: 0.7 }] : []));
      iniciarEvento('patrulha', [d]);
      tarefas(d, [latidos(1, 2), ...pts, ...voltarParaCasa(d, 'run')]);
      return true;
    },
    zoomies(d = sortear(pinschersLivres())) { // corrida maluca: dispara pela faixa, troca de faixa (pela lateral), rodopia e late
      if (!d) return false;
      const f1 = faixa(), f2 = faixa(), n = d.energia > 0.95 ? 5 : 4, pts = [];
      for (let i = 0; i < n; i++) pts.push({ t: 'ir', x: (i % 2 ? rand(0.75, 0.92) : rand(0.08, 0.25)) * W(), y: i < 2 ? f1 : f2, modo: 'run' },
        ...(i === 1 ? [{ t: 'girar', voltas: 2, dur: 1.6 }] : []), ...(i === 2 ? [{ t: 'acao', a: 'hop', dur: 0.6 }, latidos(2, 3)] : []));
      iniciarEvento('zoomies', [d]);
      tarefas(d, [{ t: 'fn', f: () => balao(d, 'zuuum!', 0.9) }, ...pts, { t: 'acao', a: 'lingua', dur: 1.2 }, ...voltarParaCasa(d, 'run')]);
      return true;
    },
    pegaPega() { // um chama para brincar e o outro corre atrás dele na mesma faixa; no fim os dois rebolam de alegria
      const l = pinschersLivres(); if (l.length < 2) return false;
      const a = sortear(l), b = l.find((x) => x !== a); if (!a || !b) return false;
      iniciarEvento('pegaPega', [a, b]);
      const py = faixa(), pts = [];
      for (let i = 0; i < 4; i++) pts.push({ t: 'ir', x: (i % 2 ? rand(0.7, 0.92) : rand(0.08, 0.3)) * W(), y: py, modo: 'run' });
      tarefas(a, [{ t: 'virar', alvo: b }, latidos(2, 3), { t: 'fn', f: () => balao(a, 'pega eu!', 1) }, ...pts,
        { t: 'acao', a: 'wiggle', dur: 1.2 }, ...voltarParaCasa(a, 'run')]);
      tarefas(b, [{ t: 'esperar', dur: 0.9 }, latidos(2, 3), { t: 'seguir', alvo: a, dur: 14 }, { t: 'acao', a: 'hop', dur: 0.7 }, latidos(1, 2), ...voltarParaCasa(b, 'run')]);
      return true;
    },
    rabo(d = sortear(pinschersLivres())) { // gira atrás do próprio rabo, sacode e late
      if (!d) return false;
      iniciarEvento('rabo', [d]);
      tarefas(d, [{ t: 'acao', a: 'cabeca', dur: 0.6 }, { t: 'girar', voltas: 3, dur: 2.4 }, { t: 'acao', a: 'idle', dur: 0.25 },
        { t: 'girar', voltas: 2, dur: 1.6 }, { t: 'acao', a: 'shake', dur: 1.1 }, latidos(1, 3), { t: 'fn', f: () => { eventoAtivo = null; } }], true);
      return true;
    },
    cheirar(a, b) { // pinscher vai até outro cachorro e se encosta nele (se for a Maya, ela costuma rosnar)
      const l = livres(); a = a || sortear(pinschersLivres()); b = b || escolher(l.filter((x) => x !== a));
      if (!a || !b) return false;
      iniciarEvento('cheirar', [a]);
      const s = a.x <= b.x ? -1 : 1, x = b.x + s * (a.tam + b.tam) * 0.38;
      tarefas(a, [{ t: 'ir', x, y: b.y, modo: Math.abs(a.x - x) > 160 || Math.abs(a.y - b.y) > 2 ? 'run' : 'walk' }, { t: 'virar', ang: s < 0 ? PI / 2 : -PI / 2 },
        { t: 'acao', a: 'encostar', dur: 1.5 }, { t: 'acao', a: 'wiggle', dur: 0.7 }, latidos(1, 3), ...voltarParaCasa(a)]);
      return true;
    },
    ar(d = escolher(livres())) { // calor: vai para perto do ar
      const el = document.querySelector(SEL_AR); if (!d || !el) return false;
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > H()) return false;
      iniciarEvento('ar', [d]);
      tarefas(d, [{ t: 'ir', x: r.left + rand(0.25, 0.75) * r.width, y: Math.min(r.bottom + d.altCab, lim()), modo: 'walk' }, { t: 'virar', alvo: 'usuario' },
        { t: 'acao', a: amb.ar ? 'lie' : 'pant', dur: 9 }, { t: 'acao', a: 'pant', dur: 3 }, ...voltarParaCasa(d)]);
      return true;
    },
  };

  function diretor(dt) {
    if (eventoAtivo && !eventoAtivo.caes.some((d) => d.ocupado)) eventoAtivo = null;
    if (eventoAtivo || amb.noite) return;
    proxEvento -= dt;
    if (proxEvento > 0) return;
    proxEvento = rand(9, 20) * (amb.ar ? 1.4 : 1); // os pinschers não param
    const bex = caes.reduce((s, d) => Math.max(s, nec.de(d.cfg.id).bexiga), 0), dois = livres().length >= 2 ? 1 : 0, pin = pinschersLivres().length;
    const opcoes = [['visita', 2.5], ['briga', 1.5 * dois], ['pegar', 2.5], ['xixi', bex / 35], ['ar', amb.calor ? 3 : 0],
      ['patrulha', pin ? 3 : 0], ['zoomies', amb.calor || !pin ? 0 : 2], ['pegaPega', pin >= 2 ? 2 : 0], ['rabo', pin ? 1.5 : 0], ['cheirar', pin && dois ? 2.5 : 0]];
    let tot = opcoes.reduce((s, o) => s + o[1], 0), r = Math.random() * tot;
    for (const [nome, peso] of opcoes) { r -= peso; if (r <= 0) { EVENTOS[nome](); break; } }
  }

  // deitar para dormir: antes dá uma volta completa no próprio eixo (desenho.js 'deitar'), depois dorme
  function irDormir(d) {
    tarefas(d, [{ t: 'acao', a: 'deitar', dur: 1.45 }, { t: 'fn', f: () => { d.dormindo = true; setAcao(d, 'sleep'); } }], false);
  }
  // Maya ranzinza: quando um pinscher chega perto ou fica latindo sem parar perto dela, fecha a cara e rosna
  function ranzinza(d, dt) {
    if (!ehMaya(d) || !d.visivel || d.ocupado) return;
    d.grr = (d.grr || 0) - dt; if (d.grr > 0) return;
    const perto = caes.find((o) => o !== d && o.visivel && Math.abs(o.y - d.y) < 26 && Math.abs(o.x - d.x) < (o.tam + d.tam) * 0.8);
    const barulho = caes.some((o) => o !== d && o.visivel && o.acao === 'bark' && Math.hypot(o.x - d.x, o.y - d.y) < 280);
    if (!perto && !barulho) { d.irrita = Math.max(0, (d.irrita || 0) - dt * 0.3); return; }
    d.irrita = (d.irrita || 0) + dt * (perto ? 1 : 0) + dt * (barulho ? 0.7 : 0);
    if (d.irrita < (d.dormindo ? 3 : 1.2)) return;
    d.irrita = 0; d.grr = rand(7, 14);
    const dormia = d.dormindo, alvo = perto || caes.find((o) => o !== d && o.acao === 'bark') || null;
    tarefas(d, [...(alvo ? [{ t: 'virar', alvo }] : []), { t: 'fn', f: () => balao(d, 'grrr…', 1.2) }, { t: 'acao', a: 'rosnar', dur: 1.5 },
      ...(dormia ? [{ t: 'fn', f: () => { d.cochiloAte = tempo + rand(30, 90); irDormir(d); } }] : [])], false);
  }

  // em casa: escolhe o que fazer conforme o clima, a hora e o jeito de cada um
  function ocioso(d, dt) {
    if (d.ocupado || d.tarefa) return;
    const n = nec.de(d.cfg.id), maya = ehMaya(d);
    d.alegria = Math.max(0, Math.min(1, 1 - (Math.max(n.fome, n.sede) - 25) / 60));
    const acordado = tempo < d.acordadoAte;
    // dormir: de noite todos; de dia a Maya cochila muito (ciclos longos)
    if ((amb.noite && !acordado) || (d.cochiloAte || 0) > tempo) {
      if (!d.dormindo) { irDormir(d); return; }
      d.zzz -= dt; if (d.zzz < 0) { d.zzz = rand(3, 5); balao(d, 'zzz', 2.2, true); }
      return;
    }
    if (d.dormindo) { d.dormindo = false; tarefas(d, [{ t: 'acao', a: 'shake', dur: 1.1 }, { t: 'acao', a: 'idle', dur: 0.2 }], false); return; } // acorda e sacode
    d.pedido -= dt;
    if (d.pedido < 0 && (n.fome >= (maya ? 55 : 70) || n.sede >= 70)) { // fome: a Maya fica de pé nas 2 patas pedindo; os pinschers latem
      d.pedido = maya ? rand(25, 45) : rand(40, 75);
      const pedeComida = n.fome >= n.sede;
      tarefas(d, [{ t: 'virar', alvo: 'usuario' }, { t: 'fn', f: () => balao(d, pedeComida ? '🍖?' : '💧?', 1.4) },
        maya && pedeComida ? { t: 'acao', a: 'pedir', dur: 3.4 } : latidos(2, 4)], false);
      return;
    }
    d.prox -= dt; if (d.prox > 0) return;
    // Belinha troca de estado a cada ~1,2 a 3 s, Elvis ~1,6 a 4 s, Maya ~5 a 11 s
    d.prox = maya ? rand(5, 11) : d.energia > 0.95 ? rand(1.2, 3) : rand(1.6, 4);
    let a;
    if (amb.frio) a = escolher(['curl', 'curl', 'curl', maya ? 'curl' : 'latir']); // frio: deitados encolhidos, tremendo
    else if (amb.calor) a = escolher(['pant', 'pant', amb.ar ? 'lie' : 'pant', maya ? 'pant' : 'latir']);
    else if (maya) a = escolher(['cochilo', 'cochilo', 'cochilo', 'sit', 'idle', 'cabeca', 'lie', 'frente', amb.ar ? 'cochilo' : 'voltinha']);
    else a = escolher(['latir', 'latir', 'latir', 'cabeca', 'cabeca', 'corridinha', 'corridinha', 'encostar', 'wiggle', 'hop', 'rodinha', 'sit', 'idle',
      'frente', ...(d.cfg.id === 'elvis' ? ['lingua'] : []), ...(amb.ar ? ['lie'] : [])]);
    if (a === 'cochilo') { d.cochiloAte = tempo + rand(45, 150); irDormir(d); return; }
    if (a === 'latir') { tarefas(d, [{ t: 'virar', ang: escolher([-PI / 2, PI / 2]) }, latidos(2, 5), { t: 'acao', a: escolher(['idle', 'lingua', 'cabeca']), dur: rand(0.3, 0.8) }], false); return; }
    if (a === 'encostar') { if (!eventoAtivo && EVENTOS.cheirar(d)) return; a = 'cabeca'; }
    const curta = { wiggle: [1, 1.8], hop: [0.7, 1.3], cabeca: [0.8, 1.8], lingua: [1, 2.2], frente: [0.8, 1.6], sit: [2, 6], lie: [3, 8] }[a];
    if (curta) { tarefas(d, [{ t: 'acao', a, dur: rand(curta[0], curta[1]) }, { t: 'acao', a: 'idle', dur: 0.1 }], false); return; }
    if (a === 'rodinha') { tarefas(d, [{ t: 'girar', voltas: d.energia > 0.95 ? 2 : 1, dur: d.energia > 0.95 ? 1.6 : 0.8 }, latidos(1, 2)], false); return; }
    const c = casa(d);
    if (a === 'corridinha') { // corre pela faixa de casa latindo e volta
      tarefas(d, [{ t: 'ir', x: rand(0.08, 0.92) * W(), y: c.y, modo: 'run' }, latidos(2, 3), { t: 'ir', x: c.x + rand(-20, 20), y: c.y, modo: 'run' }], false); return;
    }
    if (a === 'voltinha') { tarefas(d, [{ t: 'ir', x: c.x + rand(-40, 40), y: c.y, modo: 'walk' }, { t: 'ir', x: c.x, y: c.y, modo: 'walk' }], false); return; }
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
    if (d.dormindo || d.acao === 'sleep' || d.acao === 'deitar') {
      d.acordadoAte = tempo + 25; d.cochiloAte = 0; d.dormindo = false;
      tarefas(d, [{ t: 'acao', a: 'shake', dur: 1 }, { t: 'virar', alvo: 'usuario' }, ehMaya(d) ? { t: 'acao', a: 'rosnar', dur: 0.8 } : { t: 'latir', n: 1, texto: 'au?' }], false);
      return;
    }
    if (d.ocupado) { balao(d, 'au!', 0.8); latido(d); return; }
    // carinho: cada toque tem uma reação diferente (os pinschers pulam, rebolam, se encostam e latem; a Maya mexe a cabeça ou resmunga)
    const reacao = escolher(ehMaya(d) ? ['cabeca', 'wiggle', 'frente', 'rosnar'] : ['hop', 'wiggle', 'cabeca', 'rodinha', 'latir', 'latir', 'encostar']);
    const fim = reacao === 'latir' ? [latidos(2, 4)] : reacao === 'rodinha' ? [{ t: 'girar', voltas: 1, dur: 0.8 }, latidos(1, 2)]
      : [{ t: 'acao', a: reacao, dur: reacao === 'cabeca' ? 1.3 : reacao === 'encostar' ? 1.6 : 0.9 }, { t: 'fn', f: () => balao(d, reacao === 'rosnar' ? 'hmpf' : reacao === 'cabeca' ? '?' : '♥', 0.9) }];
    tarefas(d, [{ t: 'virar', alvo: 'usuario' }, ...fim, { t: 'acao', a: 'idle', dur: 0.4 }], false);
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
    const lado = d.x < x ? -1 : 1, fx = x + lado * bocaDe(d.cfg, tipo === 'comida' ? 'comendo' : 'bebendo') * 0.9, fy = y + 2; // para com o focinho dentro da tigela
    const pre = d.visivel ? [] : [{ t: 'aparecer', ...borda(lado, fy, d) }];
    const fim = () => {
      nec.alimentar(d.cfg.id, tipo); op.aoAlimentar?.(nec.resumo());
      setTimeout(() => removerTigela(tg), 1800);
    };
    d.acordadoAte = tempo + 30; d.cochiloAte = 0; // comida acorda (a Maya volta a cochilar depois)
    tarefas(d, [...pre, { t: 'ir', x: fx, y: fy, modo: Math.hypot(d.x - fx, d.y - fy) > 160 ? 'run' : 'walk' }, { t: 'virar', ang: lado > 0 ? -PI / 2 : PI / 2 },
      { t: 'acao', a: tipo === 'comida' ? 'eat' : 'drink', dur: 3.6 }, { t: 'fn', f: fim }, { t: 'virar', alvo: 'usuario' },
      { t: 'fn', f: () => { d.alegria = 1; balao(d, tipo === 'comida' ? 'nham!' : 'slurp!', 1); } }, { t: 'acao', a: tipo === 'comida' ? 'wiggle' : 'shake', dur: 1.2 }, { t: 'acao', a: 'idle', dur: 0.3 }, ...voltarParaCasa(d)]);
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
    for (const d of caes) { ranzinza(d, dt); atualizar(d, dt); }
    for (const tb of tigelas) if (tb.dono && tb.dono.acao === (tb.campo === 'comida' ? 'eat' : 'drink')) { const k = Math.max(0.2, 1 - tb.dono.tA / 3.6); if (gl) tb.cont.scale.setScalar(k); else tb.cheio = k; }
    moverBaloes();
    if (gl) renderer.render(cena, camera);
    else {
      c2.setTransform(pr2, 0, 0, pr2, 0, 0); c2.clearRect(0, 0, W(), H());
      ordem.sort(porY);
      for (const d of ordem) if (d.visivel) desenharCao(c2, d, d.lado);
      for (const tb of tigelas) desenharTigela(c2, tb); // na frente: o focinho fica dentro da tigela
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
      if (nome === 'dormir') { alvo.acordadoAte = 0; alvo.cochiloAte = tempo + 60; return irDormir(alvo); }
      if (nome === 'pular') return tarefas(alvo, [{ t: 'acao', a: 'jump', dur: 0.8 }], false);
      if (nome === 'comida' || nome === 'agua') return soltar(nome === 'agua' ? 'agua' : 'comida', rand(0.3, 0.7) * W(), H() * 0.55);
      if (ACOES[nome]) return tarefas(alvo, [{ t: 'acao', a: nome, dur: 4 }], false);
    },
    definirSom(v) { som = !!v; try { localStorage.setItem('casinha_caes_som', som ? '1' : '0'); } catch {} if (som) acordarAudio(); },
    get som() { return som; },
    destacarJogo() { barra.destacar(); },
    reler: lerAmbiente,
    ambiente: amb,
    estilo: gl ? '3d' : 'sprites do dono',
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
