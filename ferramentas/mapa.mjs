// Gera MAPA-LINHAS.md: o índice do código com o número da linha de cada função, ação e tela.
// Uso (na pasta motora-frota):  node ferramentas/mapa.mjs
// Rode de novo depois de qualquer mudança no código (o mapa é refeito do zero em menos de 1 segundo).
// Para a IA: NÃO leia o mapa inteiro. Procure nele com Grep (ex.: "gerarPixAuto") e depois leia só
// as linhas certas do arquivo (Read com offset/limit). Assim não é preciso abrir o index.html inteiro.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (f) => path.relative(RAIZ, f).replace(/\\/g, '/');
const listar = (dir, ext) => fs.existsSync(path.join(RAIZ, dir))
  ? fs.readdirSync(path.join(RAIZ, dir), { recursive: true }).map(String)
    .filter((f) => ext.some((e) => f.endsWith(e)) && !f.includes('node_modules') && !f.includes('test'))
    .map((f) => path.join(RAIZ, dir, f)).sort()
  : [];

const ARQUIVOS = [
  path.join(RAIZ, 'index.html'),
  path.join(RAIZ, 'sw.js'),
  ...listar('robo-whatsapp', ['.js']),
  ...listar('robo-bb', ['.js']),
  ...listar('supabase/functions', ['.ts']),
].filter((f) => fs.existsSync(f));

// o que vira item do mapa
const REGRAS = [
  [/^\s*\/\/\s*={3,}\s*([^=]*[A-Za-zÀ-ú][^=]*?)\s*=*\s*$/, (m) => `**${m[1]}**`],     // // ===== SEÇÃO =====
  [/^\s*\/\/\s*-{3,}\s*(.+?)\s*-*\s*$/, (m) => `*${m[1]}*`],                          // // ---------- parte ----------
  [/^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/, (m) => `${m[1]}()`],
  [/^\s{0,8}(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/, (m) => `${m[1]}()`],
  [/if\s*\(\s*body\.(acao|type)\s*===\s*"([^"]+)"/, (m) => `${m[1]} "${m[2]}"`],     // ações das funções do servidor
  [/<!--\s*(.{4,90}?)\s*-->/, (m) => `<!-- ${m[1]} -->`],                              // comentários do HTML
  [/<(?:div|section|form)\b[^>]*\bid="((?:sec|modal|tabDrv|area|panel|tab)[A-Z][\w]*)"/, (m) => `#${m[1]}`], // telas e janelas
];

let saida = `# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)\n\n`
  + `Gerado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}. Procure aqui com Grep e leia só as linhas indicadas.\n`
  + `Formato: \`linha: nome\`. O guia por assunto está em GUIA-CODIGO.md.\n`;

for (const f of ARQUIVOS) {
  const linhas = fs.readFileSync(f, 'utf8').split('\n');
  const itens = [];
  linhas.forEach((l, i) => {
    if (l.length > 4000) l = l.slice(0, 4000); // linhas enormes (imagens embutidas) não interessam
    for (const [re, fmt] of REGRAS) { const m = l.match(re); if (m) { itens.push(`${i + 1}: ${fmt(m)}`); break; } }
  });
  saida += `\n## ${rel(f)} (${linhas.length} linhas)\n\n${itens.join('\n') || '(sem itens)'}\n`;
}
const sql = listar('supabase', ['.sql']).map((f) => {
  const p = fs.readFileSync(f, 'utf8').split('\n').find((l) => l.startsWith('--')) || '';
  return `- ${rel(f)}: ${p.replace(/^--\s*/, '').slice(0, 160)}`;
});
saida += `\n## SQL aplicado no Supabase (supabase/*.sql)\n\n${sql.join('\n')}\n`;
fs.writeFileSync(path.join(RAIZ, 'MAPA-LINHAS.md'), saida);
console.log(`MAPA-LINHAS.md atualizado: ${ARQUIVOS.length} arquivos, ${saida.split('\n').length} linhas.`);
