// Teste dos avisos de fome e sede dos cachorros (Elvis, Belinha, Maya): as regras que a função ar-caes usa
// (ar/caes/logica.js): fome/sede sobem com o tempo, 1 aviso por cachorro e necessidade a cada 2 h, silêncio das 22h às 7h, agrupar.
// Roda: node .github/scripts/teste-ar-caes.mjs
import assert from 'node:assert/strict';
import { calcularAviso, nivel, TAXA } from '../../ar/caes/logica.js';

const tz = 'America/Sao_Paulo';
const as = (h) => Date.parse(`2026-11-15T${String(h).padStart(2, '0')}:00:00-03:00`);
const c = (id, nome, artigo, fome, sede, em) => ({ id, nome, artigo, fome, sede, em });
let ok = 0; const t = (n, f) => { f(); ok++; console.log('ok   ' + n); };

t('fome sobe com o tempo (0 -> 100 em 8 h)', () => { assert.equal(Math.round(nivel(c('a', 'A', 'o', 0, 0, as(8)), 'fome', as(12))), 50); assert.equal(nivel(c('a', 'A', 'o', 90, 0, as(8)), 'fome', as(20)), 100); });
t('ninguém com fome: sem aviso', () => assert.equal(calcularAviso([c('elvis', 'Elvis', 'o', 10, 10, as(10))], {}, as(10), tz), null));
t('um com fome: mensagem com o nome', () => {
  const m = calcularAviso([c('elvis', 'Elvis', 'o', 80, 10, as(10))], {}, as(10), tz);
  assert.equal(m.corpo, 'O Elvis está com fome! 🍖'); assert.deepEqual(m.marcar, ['elvis:fome']); assert.equal(m.url, './?jogo=1');
});
t('sede: "quer água"', () => assert.equal(calcularAviso([c('maya', 'Maya', 'a', 0, 75, as(10))], {}, as(10), tz).corpo, 'A Maya quer água 💧'));
t('fica com fome sozinha com o app fechado', () => assert.ok(calcularAviso([c('elvis', 'Elvis', 'o', 20, 0, as(8))], {}, as(14), tz)));
t('no máximo 1 aviso a cada 2 h', () => {
  const l = [c('elvis', 'Elvis', 'o', 90, 0, as(10))];
  assert.equal(calcularAviso(l, { 'elvis:fome': as(9) }, as(10), tz), null);
  assert.ok(calcularAviso(l, { 'elvis:fome': as(8) }, as(10), tz));
});
t('silêncio das 22h às 7h', () => {
  const l = [c('elvis', 'Elvis', 'o', 95, 95, as(10))];
  for (const h of [22, 23, 0, 3, 6]) assert.equal(calcularAviso(l, {}, as(h), tz), null, 'hora ' + h);
  assert.ok(calcularAviso(l, {}, as(7), tz)); assert.ok(calcularAviso(l, {}, as(21), tz));
});
t('mais de um: agrupa numa notificação só', () => {
  const m = calcularAviso([c('elvis', 'Elvis', 'o', 90, 0, as(10)), c('belinha', 'Belinha', 'a', 85, 80, as(10)), c('maya', 'Maya', 'a', 0, 90, as(10))], {}, as(10), tz);
  assert.equal(m.corpo, 'O Elvis e a Belinha estão com fome 🍖 e a Belinha e a Maya querem água 💧.');
  assert.equal(m.marcar.length, 4);
});
t('taxas coerentes', () => assert.ok(TAXA.sede > TAXA.fome));
console.log(`\n${ok} testes passaram`);
