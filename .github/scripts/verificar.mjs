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

console.log(erros ? `\n${erros} problema(s) encontrado(s).` : '\nTudo certo.');
process.exit(erros ? 1 : 0);
