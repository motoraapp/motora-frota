// Teste dos cachorros por sprites (16/11/2026): Elvis, Belinha e Maya com os PNG transparentes do dono.
// Confere, sem navegador:
//  - todos os sprites pedidos pelo dono existem, com o tamanho do sprites-dados.js, fundo transparente (bordas vazias, sem
//    quadrado branco) e os pés na linha de baixo (âncora);
//  - o mesmo cachorro tem o mesmo tamanho em todas as poses (escala calibrada: a régua é a largura da caixa da cabeça... aqui
//    simplificado: nenhuma pose passa de 1,6x a altura do em pé nem fica menor que 0,3x);
//  - qual quadro cada ação mostra (quadroDe): volta completa antes de deitar, tremor de ±1,5 px a cada ~45 ms no frio,
//    respiração entre 0,985 e 1,015 no calor, piscar de 80 a 120 ms, Maya pedindo nas 2 patas só com o desenho de patinhas no peito,
//    Elvis de pata levantada e as meninas agachadas no xixi, comer/beber com pausa de cabeça erguida, latido alternando;
//  - rota.js: andar SÓ na horizontal; trocar de altura só fora da tela (sai pela lateral e entra de novo na faixa nova);
//  - dogs3d.js: o motor usa a rota e nunca muda a altura do cachorro andando (regressão).
// Roda: node .github/scripts/teste-ar-caes-sprites.mjs
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '../..');
const { SPRITES } = await import('../../ar/caes/sprites-dados.js');
const { quadroDe } = await import('../../ar/caes/desenho.js');
const { rota, foraDaTela } = await import('../../ar/caes/rota.js');
const { CACHORROS } = await import('../../ar/caes/config.js');

let ok = 0;
const t = async (nome, f) => { try { await f(); ok++; console.log('  ✓ ' + nome); } catch (e) { console.log('  ✗ ' + nome + '\n    ' + e.message); process.exitCode = 1; } };

function lerPng(arq) {
  const b = readFileSync(arq); let p = 8, w = 0, h = 0, tipo = 0; const idat = [];
  while (p < b.length) { const n = b.readUInt32BE(p), tt = b.toString('latin1', p + 4, p + 8), d = b.subarray(p + 8, p + 8 + n); if (tt === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); tipo = d[9]; } if (tt === 'IDAT') idat.push(d); if (tt === 'IEND') break; p += 12 + n; }
  assert.equal(tipo, 6, `${arq}: PNG sem canal de transparência`);
  const z = inflateSync(Buffer.concat(idat)), lin = w * 4, px = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) { const f = z[y * (lin + 1)], o = y * lin, s = y * (lin + 1) + 1; for (let i = 0; i < lin; i++) { const a = i >= 4 ? px[o + i - 4] : 0, c = y ? px[o - lin + i] : 0, d = i >= 4 && y ? px[o - lin + i - 4] : 0, x = z[s + i]; let v; if (f === 0) v = x; else if (f === 1) v = x + a; else if (f === 2) v = x + c; else if (f === 3) v = x + ((a + c) >> 1); else { const pp = a + c - d, pa = Math.abs(pp - a), pb = Math.abs(pp - c), pc = Math.abs(pp - d); v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? c : d); } px[o + i] = v & 255; } }
  return { w, h, A: (x, y) => px[(y * w + x) * 4 + 3] };
}

// os arquivos que o dono mandou (16/11/2026), pelo nome que o app usa
const PEDIDOS = {
  elvis: ['base', 'olhos_fechados', 'boca_aberta', 'lingua', 'sentado', 'mexendo_cabeca', 'andando_1', 'andando_2', 'correndo_1', 'correndo_2',
    'encostando_giro_frente', 'virando_costas', 'deitando_transicao', 'dormindo_deitado', 'fazendo_xixi', 'latindo', 'rosnando', 'comendo', 'bebendo', 'sentindo_calor', 'tremendo_frio',
    'andando_passo_1', 'andando_passo_2', 'andando_passo_3', 'andando_passo_4', 'correndo_entre_1', 'correndo_entre_2', 'correndo_inicio', 'correndo_2_pouso', 'sentando_meio',
    'acordando', 'costas_total', 'curioso', 'frente_total', 'meio_comer', 'pulo_pouso', 'pulo_prep'],
  belinha: ['base', 'olhos_fechados', 'boca_aberta', 'sentado', 'mexendo_cabeca', 'andando_1', 'andando_2', 'andando_frente', 'correndo_1', 'correndo_2',
    'encostando_giro_frente', 'virando_costas', 'dormindo_deitado', 'fazendo_xixi', 'latindo', 'rosnando', 'comendo', 'bebendo', 'sentindo_calor', 'tremendo_frio',
    'andando_passo_1', 'andando_passo_2', 'andando_passo_3', 'correndo_entre_1', 'deitando_transicao', 'sentando_meio',
    'acordando', 'costas_total', 'frente_total', 'meio_comer', 'pulo_pouso', 'pulo_prep'],
  maya: ['sentado', 'sentado_olhos_fechados', 'base', 'boca_fechada', 'olhos_fechados', 'mexendo_cabeca', 'pedindo_patas_no_ar', 'pedindo_patas_no_ar_2',
    'andando_1', 'andando_2', 'andando_frente', 'correndo_1', 'correndo_2', 'encostando_giro_frente', 'virando_costas', 'deitando_transicao', 'dormindo_deitado',
    'fazendo_xixi', 'latindo', 'rosnando', 'comendo', 'bebendo', 'sentindo_calor', 'tremendo_frio'],
};

await t('todos os sprites do dono existem (37 Elvis, 32 Belinha, 24 Maya), com o tamanho certo e fundo transparente', () => {
  for (const [id, nomes] of Object.entries(PEDIDOS)) {
    assert.ok(SPRITES[id], `sem sprites para ${id}`);
    assert.equal(Object.keys(SPRITES[id]).filter((n) => n !== '_ref').length, nomes.length, `${id}: quantidade de sprites`);
    for (const n of nomes) {
      const s = SPRITES[id][n], arq = join(raiz, 'ar/caes/img/sprites', id, n + '.png');
      assert.ok(s, `${id}: falta ${n} em sprites-dados.js`); assert.ok(existsSync(arq), `${id}: falta o arquivo ${n}.png`);
      const p = lerPng(arq);
      assert.equal(p.w, s[0], `${id}/${n}: largura`); assert.equal(p.h, s[1], `${id}/${n}: altura`);
      // borda toda transparente: nada cortado nas bordas e nenhum fundo branco/quadrado
      for (let x = 0; x < p.w; x++) { assert.equal(p.A(x, 0), 0, `${id}/${n}: borda de cima não é transparente`); assert.equal(p.A(x, p.h - 1), 0, `${id}/${n}: borda de baixo`); }
      for (let y = 0; y < p.h; y++) { assert.equal(p.A(0, y), 0, `${id}/${n}: borda esquerda`); assert.equal(p.A(p.w - 1, y), 0, `${id}/${n}: borda direita`); }
      // pés na âncora: a linha mais baixa do desenho fica no y dos pés (±1,5 px)
      let pe = -1; for (let y = p.h - 1; y >= 0 && pe < 0; y--) for (let x = 0; x < p.w; x++) if (p.A(x, y) > 20) { pe = y + 1; break; }
      assert.ok(Math.abs(pe - s[3]) <= 1.5, `${id}/${n}: pés em ${pe}, âncora em ${s[3]}`);
      assert.ok(s[4] === 1 || s[4] === -1, `${id}/${n}: lado inválido`);
      assert.ok(s[1] <= SPRITES[id]._ref * 1.6 && s[1] >= SPRITES[id]._ref * 0.3, `${id}/${n}: tamanho fora da escala (${s[1]} px para ${SPRITES[id]._ref})`);
    }
  }
});

await t('escala dos cachorros na tela: Elvis o menor, Maya a maior (tamanhos de sempre)', () => {
  const tam = Object.fromEntries(CACHORROS.map((c) => [c.id, c.tamanho]));
  assert.ok(tam.elvis < tam.belinha && tam.belinha < tam.maya, JSON.stringify(tam));
  const src = readFileSync(join(raiz, 'ar/caes/desenho.js'), 'utf8');
  assert.match(src, /c\.scale\(espelho \* k, k \* q\.sy\)/, 'largura e altura têm que usar o mesmo fator (sem esticar)');
});

const cao = (id, acao, tA, extra = {}) => ({ cfg: CACHORROS.find((c) => c.id === id), acao, tA, t: 100 + tA, fase: 0, sem: 0, ...extra });
const quadros = (id, acao, ate, passo = 0.005, extra) => { const out = []; for (let s = 0; s < ate; s += passo) { const q = quadroDe(cao(id, acao, s, extra)); out.push({ ...q, tA: s }); } return out; };
const sequencia = (lista) => lista.reduce((a, q) => { const k = q.s + (q.f < 0 ? '(esp)' : ''); if (a[a.length - 1] !== k) a.push(k); return a; }, []);

await t('antes de dormir: volta completa no próprio eixo e depois deita (os três)', () => {
  for (const id of ['elvis', 'belinha', 'maya']) {
    const seq = sequencia(quadros(id, 'deitar', 1.4));
    const volta = id === 'maya' ? ['encostando_giro_frente', 'encostando_giro_frente(esp)', 'virando_costas(esp)', 'virando_costas']
      : ['encostando_giro_frente', 'frente_total', 'encostando_giro_frente(esp)', 'virando_costas(esp)', 'costas_total', 'virando_costas'];
    assert.deepEqual(seq.slice(1), [...volta, 'deitando_transicao'], `${id}: ${seq.join(' > ')}`);
    assert.equal(quadroDe(cao(id, 'sleep', 1)).s, 'dormindo_deitado');
  }
});

await t('frio: deitados encolhidos, tremendo ±1,5 px a cada ~45 ms', () => {
  for (const id of ['elvis', 'belinha', 'maya']) for (const a of ['curl', 'shiver']) {
    const qs = quadros(id, a, 1, 0.001);
    assert.ok(qs.every((q) => q.s === 'tremendo_frio'), `${id}/${a}: tem que ser o desenho deitado tremendo`);
    assert.ok(qs.every((q) => Math.abs(Math.abs(q.dx) - 1.5) < 1e-9), `${id}/${a}: tremor de 1,5 px`);
    let trocas = 0; for (let i = 1; i < qs.length; i++) if (Math.sign(qs[i].dx) !== Math.sign(qs[i - 1].dx)) trocas++;
    assert.ok(trocas >= 20 && trocas <= 24, `${id}/${a}: ${trocas} trocas por segundo (esperado ~22, a cada 45 ms)`);
  }
});

await t('calor: ofegando com respiração entre 0,985 e 1,015', () => {
  for (const id of ['elvis', 'belinha', 'maya']) {
    const qs = quadros(id, 'pant', 2, 0.002);
    assert.ok(qs.every((q) => q.s === 'sentindo_calor'));
    const sy = qs.map((q) => q.sy);
    assert.ok(Math.min(...sy) >= 0.985 - 1e-9 && Math.max(...sy) <= 1.015 + 1e-9, `${id}: ${Math.min(...sy)}..${Math.max(...sy)}`);
    assert.ok(Math.max(...sy) - Math.min(...sy) > 0.025, `${id}: respiração quase parada`);
  }
});

await t('piscar: olho fechado de 80 a 120 ms nas poses paradas e sentadas', () => {
  for (const [id, acao, fechado] of [['elvis', 'idle', 'olhos_fechados'], ['belinha', 'idle', 'olhos_fechados'], ['maya', 'idle', 'olhos_fechados'], ['maya', 'sit', 'sentado_olhos_fechados']]) {
    const qs = quadros(id, acao, 30, 0.002); let dur = 0, piscadas = [];
    for (const q of qs) { if (q.s === fechado) dur += 0.002; else if (dur) { piscadas.push(dur); dur = 0; } }
    assert.ok(piscadas.length >= 6, `${id}/${acao}: só ${piscadas.length} piscadas em 30 s`);
    assert.ok(piscadas.every((d) => d >= 0.078 && d <= 0.122), `${id}/${acao}: ${piscadas.map((d) => Math.round(d * 1000)).join(',')} ms`);
  }
});

await t('Maya com fome: de pé nas 2 patas SEM erguer os braços (só o desenho de patinhas no peito); pinschers latem', () => {
  const qs = quadros('maya', 'pedir', 3);
  assert.ok(qs.every((q) => q.s === 'pedindo_patas_no_ar'), 'a Maya não pode erguer os braços (pedindo_patas_no_ar_2)');
  assert.ok(Math.max(...qs.map((q) => q.dy)) > 0.01, 'sem os pulinhos de pedir');
  const src = readFileSync(join(raiz, 'ar/caes/desenho.js'), 'utf8');
  assert.ok(!/'pedindo_patas_no_ar_2'/.test(src), 'desenho.js não pode usar o desenho de braços erguidos');
  // latir (e pedir dos pinschers, rebolar): a boca abre e fecha sem mexer as patas = só desenhos do mesmo corpo do em pé
  const mesmoCorpo = { elvis: ['base', 'boca_aberta', 'olhos_fechados'], belinha: ['base', 'boca_aberta', 'olhos_fechados'], maya: ['base', 'boca_fechada', 'olhos_fechados'] };
  // latir: SEMPRE o desenho de latindo (boca gritando; a língua de fora era errada), parado, sem trocar de pose
  for (const id of ['elvis', 'belinha', 'maya']) assert.deepEqual(sequencia(quadros(id, 'bark', 3)), ['latindo'], id + ' latindo');
  for (const id of ['elvis', 'belinha', 'maya']) for (const a of ['wiggle', ...(id === 'maya' ? [] : ['pedir'])]) {
    const seq = sequencia(quadros(id, a, 3));
    assert.ok(seq.length >= 4 && seq.every((x) => mesmoCorpo[id].includes(x)), id + '/' + a + ': ' + seq.join(' > '));
  }
});

await t('andar um passo por vez (passo, em pé, outro passo, em pé) com sobe e desce leve', () => {
  for (const id of ['elvis', 'belinha', 'maya']) {
    const w = []; for (let f = 0; f < Math.PI * 2; f += 0.02) w.push({ ...quadroDe(cao(id, 'walk', 0, { fase: f })) });
    const seq = sequencia(w);
    if (id !== 'maya') { // 4 desenhos, uma pata no ar de cada vez: trás cá, frente cá, trás lá, frente lá
      assert.deepEqual(seq, id === 'elvis' ? ['andando_passo_1', 'andando_passo_2', 'andando_passo_3', 'andando_passo_4'] : ['andando_passo_1', 'andando_passo_2', 'andando_passo_3', 'andando_frente'], id + ': ' + seq.join(' > ')); continue;
    }
    assert.equal(seq.length, 4, id + ': ' + seq.join(' > '));
    assert.ok(seq[0] === 'andando_1' && seq[2] === 'andando_2' && seq[1] === seq[3], id + ': ' + seq.join(' > '));
    assert.ok(Math.max(...w.map((q) => q.dy)) < 0.03, id + ': pulando demais ao andar');
  }
});

await t('Elvis nunca rosna para a Maya; comida e água dentro da tigela com o focinho nela', () => {
  const m = readFileSync(join(raiz, 'ar/caes/dogs3d.js'), 'utf8'), br = m.slice(m.indexOf('briga(a, b) {'), m.indexOf('pegar(d ='));
  assert.ok(br.includes("const manso = (d, outro) => d.cfg.id === 'elvis' && ehMaya(outro);"), 'falta a regra do Elvis manso com a Maya');
  const rosnaSemRegra = br.replace(/manso\(d, outro\) \? '\w+' : '(rosnar|fight)'/g, '').replace(/ehMaya\(d\) \? \{ t: 'acao', a: 'rosnar'/g, '');
  assert.ok(!/a: '(rosnar|fight)'/.test(rosnaSemRegra), 'na briga, rosnar/brigar só depois de checar o Elvis com a Maya');
  assert.ok(m.includes("bocaDe(d.cfg, tipo === 'comida' ? 'comendo' : 'bebendo')"), 'o cachorro tem que parar com a boca na tigela');
  const q = m.slice(m.indexOf('function quadro('));
  const fundo = q.indexOf("desenharTigela(c2, tb, 'fundo')"), cao = q.indexOf('desenharCao(c2'), frente = q.indexOf("desenharTigela(c2, tb, 'frente')");
  assert.ok(fundo > 0 && fundo < cao && cao < frente, 'o fundo da vasilha vem ANTES do cachorro e a parede da frente DEPOIS (o focinho entra na vasilha)');
});

await t('xixi: Elvis de pata levantada, Belinha e Maya agachadas; comer e beber com pausa de cabeça erguida', () => {
  assert.equal(quadroDe(cao('elvis', 'peeM', 1)).s, 'fazendo_xixi');
  assert.equal(quadroDe(cao('belinha', 'peeF', 1)).s, 'fazendo_xixi');
  assert.equal(quadroDe(cao('maya', 'peeF', 1)).s, 'fazendo_xixi');
  for (const id of ['elvis', 'belinha', 'maya']) for (const [a, s] of [['eat', 'comendo'], ['drink', 'bebendo']]) {
    const seq = sequencia(quadros(id, a, 6)); // vasilha quase o tempo todo, pausa de cabeça erguida a cada ~2,7 s
    assert.ok(seq.filter((x) => x === s).length >= 2 && seq.filter((x) => x !== s).length >= 1, `${id}/${a}: ${seq.join(' > ')}`);
  }
});

await t('correr alterna os 2 desenhos com um saltinho na fase no ar; andar alterna os 2 passos', () => {
  for (const id of ['elvis', 'belinha', 'maya']) {
    const run = []; for (let f = 0; f < Math.PI * 4; f += 0.05) run.push({ ...quadroDe(cao(id, 'run', 0, { fase: f })) });
    assert.ok(sequencia(run).length >= 4, `${id}: corrida não alterna`);
    assert.ok(run.some((q) => q.s === 'correndo_1' && q.dy > 0.03), `${id}: sem salto na fase no ar`);
    assert.ok(run.every((q) => q.s !== 'correndo_2' || q.dy === 0), `${id}: correndo_2 é no chão`);
    const walk = []; for (let f = 0; f < Math.PI * 4; f += 0.05) walk.push(quadroDe(cao(id, 'walk', 0, { fase: f })).s);
    assert.ok(id !== 'maya' ? walk.includes('andando_passo_1') && walk.includes('andando_passo_3') : walk.includes('andando_1') && walk.includes('andando_2'));
  }
});

await t('toda ação do app mostra um desenho que existe', async () => {
  const { NOMES_ACOES } = await import('../../ar/caes/animacoes.js');
  for (const id of ['elvis', 'belinha', 'maya']) for (const a of [...NOMES_ACOES, 'peeM', 'peeF']) for (const s of [0, 0.37, 1.1, 2.9]) {
    const q = quadroDe(cao(id, a, s, { fase: s * 3 }));
    assert.ok(SPRITES[id][q.s], `${id}/${a}: desenho ${q.s} não existe`);
  }
});

await t('rota: só na horizontal; trocar de altura só fora da tela (sai pela lateral e volta)', () => {
  const W = 400, fora = 100; let n = 0;
  for (let i = 0; i < 4000; i++) {
    const x0 = (i * 37) % W, y0 = 100 + ((i * 53) % 500), x1 = (i * 91) % W, y1 = i % 3 ? 100 + ((i * 29) % 500) : y0;
    const pts = rota(x0, y0, x1, y1, W, fora); let x = x0, y = y0;
    for (const p of pts) {
      if (p.salto) { assert.ok(foraDaTela(x, W, fora), `troca de altura dentro da tela (x ${x})`); y = p.y; n++; continue; }
      assert.equal(p.y, y, 'andou na vertical'); x = p.x;
    }
    assert.equal(x, x1); assert.equal(y, y1);
  }
  assert.ok(n > 1000, 'o teste não chegou a trocar de faixa');
});

await t('motor: anda pela rota e nunca muda a altura do cachorro na tela', () => {
  const m = readFileSync(join(raiz, 'ar/caes/dogs3d.js'), 'utf8');
  assert.match(m, /import \{ rota \} from '\.\/rota\.js'/);
  const andar = m.slice(m.indexOf('function andar('), m.indexOf('function rodarTarefa('));
  assert.match(andar, /rota\(d\.x, d\.y, t\.x, t\.y/);
  assert.ok(!/d\.y \+=|d\.y -=/.test(m), 'o y do cachorro não pode andar aos poucos (diagonal)');
  const ys = [...m.matchAll(/d\.y = ([^;]+);/g)].map((x) => x[1].trim());
  for (const y of ys) assert.ok(['p.y', 'c.y', 't.y'].includes(y), `d.y = ${y}: só a rota (fora da tela), casa ou aparecer podem mudar a altura`);
  // regressão: antes do xixi o cachorro "cheirava" com a ação de comer e aparecia o desenho comendo sem tigela
  const xixi = m.slice(m.indexOf('xixi(d) {'), m.indexOf('patrulha('));
  assert.ok(!/a: 'eat'/.test(xixi), 'xixi não pode usar a ação de comer para cheirar');
});

await t('personalidade: pinschers latem muito e não param; Maya cochila muito, rosna e pede comida de pé', () => {
  const m = readFileSync(join(raiz, 'ar/caes/dogs3d.js'), 'utf8');
  const oc = m.slice(m.indexOf('function ocioso('), m.indexOf('// ---------- toque'));
  const lista = (re) => (oc.match(re) || [''])[0];
  const pin = lista(/else a = escolher\(\['latir'[^\n]+/), maya = lista(/else if \(maya\) a = escolher\([^\n]+/);
  assert.ok((pin.match(/'latir'/g) || []).length >= 3, 'pinschers: latir tem que ser o mais sorteado');
  assert.ok((maya.match(/'cochilo'/g) || []).length >= 3, 'Maya: cochilar tem que ser o mais sorteado');
  assert.match(m, /function ranzinza\(/); assert.match(m, /ranzinza\(d, dt\); atualizar\(d, dt\)/, 'Maya ranzinza tem que rodar todo quadro');
  assert.match(oc, /maya && pedeComida \? \{ t: 'acao', a: 'pedir'/);
  assert.match(m, /function irDormir\(d\) \{\s*tarefas\(d, \[\{ t: 'acao', a: 'deitar'/, 'dormir sempre com a volta antes');
});

// regressões de 16/11/2026: "quando viram a cabeça o corpo muda de tamanho" e "não mostra um passo por vez"
await t('virar a cabeça não muda o tamanho do corpo; passo devagar o bastante para ver cada passo', () => {
  const src = readFileSync(join(raiz, 'ferramentas/caes-sprites.ps1'), 'utf8');
  assert.match(src, /centro de massa só do corpo e patas/, 'o encaixe tem que ser pelo corpo (a cabeça virada não empurra)');
  // o corpo (do pescoço para baixo) da pose tem que coincidir com o do em pé na MESMA escala: procura a escala em que as silhuetas
  // mais coincidem (pés na mesma linha, encaixe do app) e exige que seja 1,00 ± 0,03
  for (const id of ['elvis', 'belinha', 'maya']) {
    const ref = id === 'maya' ? 'boca_fechada' : 'base', R = SPRITES[id][ref], rb = lerPng(join(raiz, 'ar/caes/img/sprites', id, ref + '.png'));
    const posesCorpo = ['mexendo_cabeca', 'latindo', 'olhos_fechados', id === 'maya' ? 'base' : 'boca_aberta', ...(id === 'elvis' ? ['lingua'] : [])];
    for (const n of posesCorpo) {
      const P = SPRITES[id][n], pb = lerPng(join(raiz, 'ar/caes/img/sprites', id, n + '.png')), esp = P[4] < 0, corte = R[3] - R[1] * 0.55;
      let melhor = [0, 1];
      for (let sc = 0.85; sc <= 1.1501; sc += 0.01) {
        let inter = 0, uni = 0;
        for (let y = Math.floor(corte); y < R[3]; y += 2) for (let x = -20; x < R[0] + 20; x += 2) {
          const a = x >= 0 && x < rb.w && rb.A(x, y) > 100, dx = (x - R[2]) / sc, px = Math.round(esp ? P[2] - dx : P[2] + dx), py = Math.round(P[3] + (y - R[3]) / sc);
          const b = px >= 0 && py >= 0 && px < pb.w && py < pb.h && pb.A(px, py) > 100; if (a && b) inter++; if (a || b) uni++;
        }
        if (inter / uni > melhor[0]) melhor = [inter / uni, sc];
      }
      assert.ok(Math.abs(melhor[1] - 1) <= 0.03 + 1e-9, `${id}/${n}: o corpo fica ${((1 / melhor[1] - 1) * 100).toFixed(0)}% maior/menor que no em pé`);
    }
  }
  // Maya sentada piscando nao pode mudar de tamanho
  assert.ok(Math.abs(SPRITES.maya.sentado[1] - SPRITES.maya.sentado_olhos_fechados[1]) <= 3, 'Maya sentada muda de tamanho ao piscar');
  const m = readFileSync(join(raiz, 'ar/caes/dogs3d.js'), 'utf8');
  const div = +m.match(/modo === 'run' \? 0\.55 : (0\.\d+)\)\)\) \* PI/)[1];
  // cada quadro do passo = PI/2 de fase = tam*div/2 px; na velocidade de andar do mais agitado (tam*(0,95+0,35)) tem que durar >= 0,17 s
  assert.ok((div / 2) / (0.95 + 0.35) >= 0.17, `quadro de passo dura só ${((div / 2) / 1.3).toFixed(2)} s`);
});
// regressão de 16/11/2026: "eles estão com a cara fora da vasilha e deve ser dentro"
await t('comer e beber: o nariz para no meio da vasilha (posição achada no desenho) e a vasilha é do tamanho do cachorro', async () => {
  const { NARIZ } = await import('../../ar/caes/narizes.js');
  for (const id of ['elvis', 'belinha', 'maya']) for (const p of ['comendo', 'bebendo']) {
    assert.ok(typeof NARIZ[id]?.[p] === 'number' && NARIZ[id][p] > 20, `${id}/${p}: sem a posição do nariz (rode ferramentas/caes-nariz.mjs)`);
  }
  const m = readFileSync(join(raiz, 'ar/caes/dogs3d.js'), 'utf8'), d = readFileSync(join(raiz, 'ar/caes/desenho.js'), 'utf8');
  assert.ok(m.includes("fx = x + lado * bocaDe(d.cfg, tipo === 'comida' ? 'comendo' : 'bebendo')"), 'o cachorro tem que parar com o nariz no centro da vasilha');
  assert.ok(m.includes('tb.r = Math.max(17, d.tam * 0.34)'), 'vasilha do tamanho de quem come');
  assert.ok(d.includes("['comendo', 2100]") && d.includes("[['comendo', 2300], [fechada, 420]]"), 'come com o focinho na vasilha quase o tempo todo');
});
console.log(`\n${ok} testes ok`);
