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
for (const f of ['manifest.json', 'apk-version.json']) {
  try {
    JSON.parse(readFileSync(join(raiz, f), 'utf8').replace(/^﻿/, ''));
    console.log(`ok   ${f}`);
  } catch (e) {
    erros++;
    console.log(`ERRO ${f}: ${e.message}`);
  }
}

console.log(erros ? `\n${erros} problema(s) encontrado(s).` : '\nTudo certo.');
process.exit(erros ? 1 : 0);
