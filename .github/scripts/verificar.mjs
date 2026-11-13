// Confere se o app não tem erro de sintaxe antes de ir para o ar.
// Roda no GitHub Actions (verificar.yml) e também na máquina: node .github/scripts/verificar.mjs
import { readFileSync, readdirSync, writeFileSync, mkdtempSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const raiz = process.cwd();
const temp = mkdtempSync(join(tmpdir(), 'verificar-'));
let erros = 0;

function checarJs(rotulo, arquivo) {
  try {
    execFileSync(process.execPath, ['--check', arquivo], { stdio: 'pipe' });
    console.log(`ok   ${rotulo}`);
  } catch (e) {
    erros++;
    console.log(`ERRO ${rotulo}\n${String(e.stderr || e.message).trim()}\n`);
  }
}

// 1. Scripts dentro do index.html
const html = readFileSync(join(raiz, 'index.html'), 'utf8');
const blocos = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)];
blocos.forEach((m, i) => {
  const ehModulo = /type\s*=\s*["']?module/i.test(m[1]);
  const linha = html.slice(0, m.index).split('\n').length;
  const arq = join(temp, `index-script-${i + 1}.${ehModulo ? 'mjs' : 'js'}`);
  // linhas em branco antes do código para o erro apontar a linha certa do index.html
  writeFileSync(arq, '\n'.repeat(linha - 1) + m[2]);
  checarJs(`index.html (script ${i + 1}, linha ${linha})`, arq);
});

// 2. Arquivos .js soltos
for (const f of ['sw.js']) if (existsSync(join(raiz, f))) checarJs(f, join(raiz, f));
const robo = join(raiz, 'robo-whatsapp');
if (existsSync(robo)) {
  for (const f of readdirSync(robo).filter(n => n.endsWith('.js'))) checarJs(`robo-whatsapp/${f}`, join(robo, f));
}

// 3. Arquivos JSON
for (const f of ['manifest.json', 'apk-version.json', 'ar/firmware/versao.json', 'ar/firmware/diagram.json']) {
  if (!existsSync(join(raiz, f))) continue;
  try {
    JSON.parse(readFileSync(join(raiz, f), 'utf8').replace(/^﻿/, ''));
    console.log(`ok   ${f}`);
  } catch (e) {
    erros++;
    console.log(`ERRO ${f}: ${e.message}`);
  }
}

// 4. Regra do "Cobrar a partir de" (desconto/valor extra): o app e as duas funções do servidor têm que decidir igual.
{
  const fontes = {
    'index.html': [readFileSync(join(raiz, 'index.html'), 'utf8'), /function ajusteVale\(a, vencIso\) \{ return ([^;]+); \}/],
    'motora-lembretes': [readFileSync(join(raiz, 'supabase/functions/motora-lembretes/index.ts'), 'utf8'), /const ajusteVale = \(a: Extra, vencIso\?: string\) => ([^;]+);/],
    'motora-asaas': [readFileSync(join(raiz, 'supabase/functions/motora-asaas/index.ts'), 'utf8'), /const ajusteVale = \(a: Extra, vencIso\?: string\) => ([^;]+);/],
  };
  const casos = [
    [{}, '2026-11-16', true], [{ a_partir: '2026-11-16' }, '2026-11-16', true], [{ a_partir: '2026-11-17' }, '2026-11-16', false],
    [{ a_partir: '2026-11-01' }, '2026-11-16', true], [{ a_partir: '2026-12-07' }, undefined, true], [null, '2026-11-16', true],
  ];
  for (const [nome, [texto, re]] of Object.entries(fontes)) {
    const m = texto.match(re);
    if (!m) { erros++; console.log(`ERRO ${nome}: função ajusteVale não encontrada`); continue; }
    const f = new Function('a', 'vencIso', `return ${m[1].replace(/a\?\./g, '(a || {}).')};`); // a?.x -> (a || {}).x (JS puro)
    const falhou = casos.find(([a, v, esperado]) => Boolean(f(a, v)) !== esperado);
    if (falhou) { erros++; console.log(`ERRO ${nome}: ajusteVale(${JSON.stringify(falhou[0])}, ${falhou[1]}) deveria ser ${falhou[2]}`); }
    else console.log(`ok   ${nome}: regra "cobrar a partir de"`);
  }
}

// 5. Regra da caução: parcela mínima de R$ 100, o resto vai para a última; app e funções do servidor calculam igual.
{
  const pegar = (texto, inicio) => { // corpo entre chaves a partir do primeiro "{" depois de "inicio"
    const i = texto.indexOf(inicio); if (i < 0) return null;
    let j = texto.indexOf('{', i + inicio.length), n = 0;
    for (let k = j; k < texto.length; k++) { if (texto[k] === '{') n++; else if (texto[k] === '}' && --n === 0) return texto.slice(j, k + 1); }
    return null;
  };
  const html = readFileSync(join(raiz, 'index.html'), 'utf8');
  const fn = (corpo, ...args) => corpo && new Function(...args, corpo.replace(/^\{|\}$/g, ''));
  const plano = fn(pegar(html, 'function cauPlano(total, entrada, n)'), 'total', 'entrada', 'n');
  const CAU_MIN = 100;
  const exemplos = [ // [total, entrada, vezes pedidas] -> parcelas esperadas
    [[775, 0, 8], [100, 100, 100, 100, 100, 100, 100, 75]],
    [[750, 0, 8], [100, 100, 100, 100, 100, 100, 100, 50]],
    [[2000, 0, 20], Array(20).fill(100)],
    [[1000, 0, 3], [333.33, 333.33, 333.34]],
    [[500, 0, 8], [100, 100, 100, 100, 100]],
    [[2200, 200, 20], Array(20).fill(100)],
    [[60, 0, 3], [60]],
  ];
  const implementacoes = {
    'index.html': fn(pegar(html, 'function cauParcela(c, k)'), 'c', 'k'),
    'motora-lembretes': fn(pegar(readFileSync(join(raiz, 'supabase/functions/motora-lembretes/index.ts'), 'utf8'), 'const cauParcela = (c: Extra, k: number) =>'), 'c', 'k'),
    'motora-asaas': fn(pegar(readFileSync(join(raiz, 'supabase/functions/motora-asaas/index.ts'), 'utf8'), 'const cauParcela = (c: Extra, k: number) =>'), 'c', 'k'),
  };
  if (!plano) { erros++; console.log('ERRO index.html: cauPlano não encontrada'); }
  for (const [nome, parcela] of Object.entries(implementacoes)) {
    if (!parcela || !plano) { erros++; console.log(`ERRO ${nome}: cauParcela não encontrada`); continue; }
    const falha = exemplos.find(([[total, entrada, n], esperado]) => {
      const p = new Function('CAU_MIN', `return (${plano.toString()})`)(CAU_MIN)(total, entrada, n);
      const c = { forma: 'parcelada', total, entrada, parcelas: p.parcelas, valor_parcela: p.valor_parcela };
      const obtido = Array.from({ length: p.parcelas }, (_, i) => parcela(c, i + 1));
      return JSON.stringify(obtido) !== JSON.stringify(esperado);
    });
    if (falha) { erros++; console.log(`ERRO ${nome}: caução ${falha[0].join('/')} deveria virar ${falha[1].join(' + ')}`); }
    else console.log(`ok   ${nome}: regra da caução (775 em 8x = 7x de 100 + 1x de 75)`);
  }
}

// 6. Regra de multa (10%) e juros (2% ao mês pro rata die, mês 30d, prorrogação fim de semana): app e servidor calculam igual.
{
  const pegar = (texto, inicio) => {
    const i = texto.indexOf(inicio); if (i < 0) return null;
    let j = texto.indexOf('{', i + inicio.length), n = 0;
    for (let k = j; k < texto.length; k++) { if (texto[k] === '{') n++; else if (texto[k] === '}' && --n === 0) return texto.slice(j, k + 1); }
    return null;
  };
  const htmlTxt = readFileSync(join(raiz, 'index.html'), 'utf8');
  const lemTxt = readFileSync(join(raiz, 'supabase/functions/motora-lembretes/index.ts'), 'utf8');
  const asaasTxt = readFileSync(join(raiz, 'supabase/functions/motora-asaas/index.ts'), 'utf8');
  const buildFn = (src, sigData, sigPrazo, sigCalc) => {
    const c1 = pegar(src, sigData), c2 = pegar(src, sigPrazo), c3 = pegar(src, sigCalc);
    if (!c1 || !c2 || !c3) return null;
    return new Function('principal', 'dueAtIso', 'nowMs', 'cfg', `
      const r2 = n => Math.round(n * 100) / 100;
      function atrasoDataBR(v) ${c1}
      function atrasoPrazoUtil(dueDateStr) ${c2}
      function calcEncargosAtraso(principal, dueAtIso, nowMs, cfg) ${c3}
      return calcEncargosAtraso(principal, dueAtIso, nowMs, cfg);
    `);
  };
  const cfg = { ativo: true, multa_pct: 10, juros_mes_pct: 2, vigencia_desde: '2026-11-12' };
  const casosAtr = [
    // Segunda 16/11 23:59 -> antes do prazo: 0
    [500, '2026-11-16T23:59:59-03:00', Date.parse('2026-11-16T23:50:00-03:00'), cfg, { dias: 0, multa: 0, juros: 0, encargos: 0, total: 500 }],
    // Terça 17/11 08:00 (1 dia): 10% multa (50) + 1 dia de 2%/30 (0.33) = 550.33
    [500, '2026-11-16T23:59:59-03:00', Date.parse('2026-11-17T08:00:00-03:00'), cfg, { dias: 1, multa: 50, juros: 0.33, encargos: 50.33, total: 550.33 }],
    // 30 dias exatos: 10% multa (50) + 2% juros (10) = 560.00
    [500, '2026-11-16T23:59:59-03:00', Date.parse('2026-12-16T10:00:00-03:00'), cfg, { dias: 30, multa: 50, juros: 10, encargos: 60, total: 560 }],
    // Sábado 14/11 -> domingo 15 e segunda 16 são isentos (prorrogação dia útil); terça 17 cobra 3 dias retroativos
    [500, '2026-11-14T23:59:59-03:00', Date.parse('2026-11-16T20:00:00-03:00'), cfg, { dias: 0, multa: 0, juros: 0, encargos: 0, total: 500 }],
    [500, '2026-11-14T23:59:59-03:00', Date.parse('2026-11-17T08:00:00-03:00'), cfg, { dias: 3, multa: 50, juros: 1, encargos: 51, total: 551 }],
  ];
  const imps = {
    'index.html': buildFn(htmlTxt, 'function atrasoDataBR(v)', 'function atrasoPrazoUtil(dueDateStr)', 'function calcEncargosAtraso(principal, dueAtIso, nowMs, cfg)'),
    'motora-lembretes': buildFn(lemTxt, 'function atrasoDataBR(v: unknown): string', 'function atrasoPrazoUtil(dueDateStr: string): string', 'function calcEncargosAtraso(principal: number, dueAtIso: unknown, nowMs?: number, cfg?: Extra)'),
    'motora-asaas': buildFn(asaasTxt, 'function atrasoDataBR(v: unknown): string', 'function atrasoPrazoUtil(dueDateStr: string): string', 'function calcEncargosAtraso(principal: number, dueAtIso: unknown, nowMs?: number, cfg?: Extra)'),
  };
  for (const [nome, fnAtr] of Object.entries(imps)) {
    if (!fnAtr) { erros++; console.log(`ERRO ${nome}: calcEncargosAtraso não encontrada`); continue; }
    const f = casosAtr.find(([p, due, now, c, esp]) => JSON.stringify(fnAtr(p, due, now, c)) !== JSON.stringify(esp));
    if (f) { erros++; console.log(`ERRO ${nome}: calcEncargosAtraso(${f[0]}, ${f[1]}) -> ${JSON.stringify(fnAtr(f[0], f[1], f[2], f[3]))}, esperado ${JSON.stringify(f[4])}`); }
    else console.log(`ok   ${nome}: regra de multa 10% + juros 2% ao mês`);
  }
}

console.log(erros ? `\n${erros} problema(s) encontrado(s).` : '\nTudo certo.');
process.exit(erros ? 1 : 0);
