// Teste da página "Cachorros articulados" (ar/cachorros/): os desenhos do dono recortados em peças
// (cabeça, tronco, rabo e 3 pedaços por pata) e as poses desenhadas inteiras.
// Roda as MESMAS contas de pose da página (trecho "poses" de ar/cachorros/index.html) e confere:
//  - todo arquivo de imagem citado em rig.js e poses.js existe;
//  - em todos os movimentos (60 quadros por segundo) nenhuma pata afunda no chão e o cachorro não flutua
//    (o "apoio no chão" deixa a pata mais baixa encostada);
//  - nenhum tranco: junta pulando num quadro bem mais que nos vizinhos (regressão do "Dar a pata", que pulava 7°);
//  - o corpo não dá pulinho (regressão: a pata no ar raspava o chão e o corpo subia 19 px de uma vez);
//  - piscar nunca troca a boca (regressão: a Maya piscava de língua de fora no meio do latido).
// Os buracos nas emendas são testados na pasta de origem (cachorro/ferramentas/testar_pose.py, com os PNG).
// Roda: node .github/scripts/teste-ar-cachorros.mjs
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '../..');
const pasta = join(raiz, 'ar/cachorros');
const html = readFileSync(join(pasta, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
const trecho = (a, b) => { const i = html.indexOf(a), j = html.indexOf(b, i); assert.ok(i >= 0 && j > i, 'trecho ' + a); return html.slice(i, j); };

const ctx = { window: {}, Math };
vm.createContext(ctx);
vm.runInContext(readFileSync(join(pasta, 'rig.js'), 'utf8') + '\n' + readFileSync(join(pasta, 'poses.js'), 'utf8') +
  '\nvar RIGS = window.RIGS, POSES = window.POSES; var atual, mov;', ctx);
vm.runInContext(trecho('const BOCA = {', 'const tela').replace(/\bconst\b/g, 'var') + '\n' +
  trecho('// ---------- poses ----------', '// ---------- desenho ----------') + '\n' +
  (html.match(/function cabecaAtual[\s\S]*?\n\}\n/) || [''])[0], ctx);
const RIGS = ctx.window.RIGS, POSES = ctx.window.POSES;
const MOVS = { parado: 2.7, andar: 0.91, correr: 0.53, rabo: 0.42, latir: 0.625, pata: 2.6 };
const BOCA_ABERTA = {   // quais cabeças estão de boca aberta (null = cabeça normal do desenho)
  pincher_malhado: { null: false, olhos_fechados: false, boca_aberta: true },
  pincher_caramelo: { null: false, olhos_fechados: false },
  maya: { null: true, olhos_fechados: true, boca_fechada: false },
};

let ok = 0; const t = async (n, f) => { await f(); ok++; console.log('ok   ' + n); };
const pose = (c, m, tt) => { ctx.atual = c; ctx.mov = m; return vm.runInContext(`pose(${tt})`, ctx); };

// mesma conta do canvas: matriz de cada peça e ponto mais baixo da sola de cada pé
function folgas(c, P) {
  const rig = RIGS[c], porId = {}, mundo = {}, r = {};
  rig.partes.forEach(p => porId[p.id] = p);
  const mult = (a, b) => [a[0]*b[0] + a[2]*b[1], a[1]*b[0] + a[3]*b[1], a[0]*b[2] + a[2]*b[3], a[1]*b[2] + a[3]*b[3], a[0]*b[4] + a[2]*b[5] + a[4], a[1]*b[4] + a[3]*b[5] + a[5]];
  const giro = (px, py, a) => { const co = Math.cos(a), s = Math.sin(a); return [co, s, -s, co, px - co*px + s*py, py - s*px - co*py]; };
  const m = p => mundo[p.id] || (mundo[p.id] = !p.pai ? mult([1, 0, 0, 1, 0, P.corpoY], giro(p.eixo[0], p.eixo[1], P.corpoA))
    : mult(m(porId[p.pai]), giro(p.eixo[0], p.eixo[1], P.ang[p.id] || 0)));
  for (const p of rig.partes) {
    if (!p.solas) continue;
    const chao = Math.max(...p.solas.map(q => q[1])), mm = m(p);
    r[p.id] = chao - Math.max(...p.solas.map(([x, y]) => mm[1]*x + mm[3]*y + mm[5]));   // + acima, - abaixo do chão
  }
  return r;
}

await t('toda imagem citada em rig.js e poses.js existe', () => {
  const faltam = [];
  for (const r of Object.values(RIGS)) {
    for (const f of [r.original, ...r.partes.map(p => p.arquivo), ...Object.values(r.cabecas).map(c => c.arquivo)])
      if (!existsSync(join(pasta, f))) faltam.push(f);
  }
  for (const d of Object.values(POSES)) for (const p of d.poses) for (const q of p.quadros)
    if (!existsSync(join(pasta, q.arquivo))) faltam.push(q.arquivo);
  assert.deepEqual(faltam, []);
});

await t('cada cachorro tem cabeça, tronco e as 4 patas com 3 pedaços e solas', () => {
  for (const [c, r] of Object.entries(RIGS)) {
    const ids = new Set(r.partes.map(p => p.id));
    for (const id of ['cabeca', 'tronco']) assert.ok(ids.has(id), `${c} sem ${id}`);
    for (const pata of ['frente_perto', 'frente_longe', 'tras_perto', 'tras_longe'])
      for (const i of [0, 1, 2]) assert.ok(ids.has(`pata_${pata}_${i}`), `${c} sem pata_${pata}_${i}`);
    assert.equal(r.partes.filter(p => p.solas).length, 4, `${c}: 4 pés com sola`);
  }
});

for (const c of Object.keys(RIGS)) for (const [m, dur] of Object.entries(MOVS)) {
  await t(`${c} / ${m}: pés no chão, sem tranco e sem pulinho do corpo`, () => {
    const n = Math.round(dur * 2 * 60) + 2, Ps = [];
    for (let i = 0; i < n; i++) Ps.push(pose(c, m, i / 60));
    for (const [i, P] of Ps.entries()) {
      const f = Object.values(folgas(c, P));
      assert.ok(Math.min(...f) >= -4, `pata afunda ${(-Math.min(...f)).toFixed(1)} px no chão (t=${(i / 60).toFixed(2)}s)`);
      assert.ok(Math.min(...f) <= 8, `flutuando ${Math.min(...f).toFixed(1)} px (t=${(i / 60).toFixed(2)}s)`);
    }
    for (let i = 1; i < n; i++)
      assert.ok(Math.abs(Ps[i].corpoY - Ps[i - 1].corpoY) <= 8, `corpo pulou ${Math.abs(Ps[i].corpoY - Ps[i - 1].corpoY).toFixed(1)} px num quadro (t=${(i / 60).toFixed(2)}s)`);
    const juntas = new Set(Ps.flatMap(P => Object.keys(P.ang)));
    for (const j of juntas) {
      const d = Ps.slice(1).map((P, i) => Math.abs((P.ang[j] || 0) - (Ps[i].ang[j] || 0)));
      for (let i = 1; i < d.length - 1; i++) {
        const viz = (d[i - 1] + d[i + 1]) / 2;
        assert.ok(!(d[i] > 0.05 && d[i] > 2.5 * viz), `tranco em ${j}: ${(d[i] * 180 / Math.PI).toFixed(1)}° num quadro (t=${((i + 1) / 60).toFixed(2)}s)`);
      }
    }
  });
}

await t('piscar nunca troca a boca (nem no meio do latido)', () => {
  for (const c of Object.keys(RIGS)) for (const m of Object.keys(MOVS)) for (let i = 0; i < 120; i += 3) {
    const P = pose(c, m, i / 60), rig = RIGS[c];
    const nome = pisca => { const img = ctx.cabecaAtual(rig, P, pisca); return img ? Object.keys(rig.cabecas).find(k => rig.cabecas[k] === img) : null; };
    const boca = n => BOCA_ABERTA[c][n === null ? 'null' : n];
    assert.equal(boca(nome(true)), boca(nome(false)), `${c}/${m} t=${(i / 60).toFixed(2)}s`);
  }
});

await t('poses desenhadas: de um cachorro que existe e com escala razoável', () => {
  for (const [c, d] of Object.entries(POSES)) {
    assert.ok(RIGS[c], `pose de cachorro que não existe: ${c}`);
    for (const p of d.poses) for (const q of p.quadros)
      assert.ok(q.escala >= 0.6 && q.escala <= 1.4, `${c}/${p.id}: escala ${q.escala}`);
  }
});

await t('cachorros da tela: toda pose desenhada existe e é de uma ação que o app usa', async () => {
  const { POSES_DESENHADAS } = await import('../../ar/caes/poses-desenhadas.js');
  const { NOMES_ACOES } = await import('../../ar/caes/animacoes.js');
  const acoes = new Set([...NOMES_ACOES, 'peeM', 'peeF']);
  for (const [id, d] of Object.entries(POSES_DESENHADAS)) for (const [a, p] of Object.entries(d)) {
    assert.ok(acoes.has(a), `${id}: ação ${a} não existe no app`);
    assert.ok(existsSync(join(raiz, 'ar/caes/img', p.imagem)), `${id}: falta ${p.imagem}`);
    assert.ok(!['walk', 'run', 'bark'].includes(a), `${id}: ${a} tem que continuar com as peças`);
  }
});

await t('script da página compila', () => {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  assert.ok(scripts.length >= 1);
  for (const s of scripts) new vm.Script(s);
});

console.log(`\n${ok} testes ok`);
