// Teste de regressão da lentidão (12/11/2026): a recarga (loadAndRender) não pode fazer consultas ao banco em fila.
// Antes eram 4 rodadas seguidas (perfil -> tabelas -> termos -> aparência), 1 a 2,5 s por toque no 4G.
// Roda as funções de verdade do index.html contra um banco falso que demora 50 ms por consulta.
// Uso: node .github/scripts/teste-recarga.mjs [arquivo.html]   (sai com erro se passar de 1 rodada com o perfil já conhecido)
import { readFileSync } from 'node:fs';

const html = readFileSync(process.argv[2] || 'index.html', 'utf8');
function funcao(nome) {
  const i = html.search(new RegExp(`\\n\\s*(async\\s+)?function ${nome}\\(`));
  if (i < 0) return '';
  let j = html.indexOf(') {', i) + 2, n = 0; // chave do corpo (não a de um parâmetro { a, b })
  for (let k = j; k < html.length; k++) { if (html[k] === '{') n++; else if (html[k] === '}' && --n === 0) return html.slice(i, k + 1); }
  return '';
}
const nomes = ['loadAndRender', 'carregarDados', 'aplicarDados', 'loadTermsAcceptances', 'loadDesignCfg', 'loadDriverFeatures'];
const codigo = nomes.map(funcao).join('\n');

const ATRASO = 50;
let rodadas = 0, ultimaRodada = -1e9;
const t0 = Date.now();
const resposta = (tab, unico) => ({ data: unico ? (tab === 'profiles' ? { id: 'u1', role: 'master', vehicle_id: null } : null) : [], error: null });
const consulta = (tab) => {
  let unico = false;
  const q = {
    select: () => q, order: () => q, eq: () => q, in: () => q, limit: () => q,
    maybeSingle: () => { unico = true; return q; }, single: () => { unico = true; return q; },
    then: (ok, erro) => {
      const agora = Date.now() - t0;
      if (agora - ultimaRodada > ATRASO / 2) { rodadas++; ultimaRodada = agora; } // consultas que saem juntas contam como 1 rodada
      return new Promise(r => setTimeout(() => r(resposta(tab, unico)), ATRASO)).then(ok, erro);
    },
  };
  return q;
};
const sb = { from: consulta };
const state = { user: { id: 'u1' }, profile: { id: 'u1', role: 'master', vehicle_id: null } };
const ctx = { sb, state, designCfg: {}, masterBack: () => null, lsDel: () => {}, switchingAccount: false, MASTER_BACK_KEY: 'k', markUpdated: () => {}, renderApp: () => {}, allFeaturesOn: () => ({}) };
const rodar = new Function(...Object.keys(ctx), `${codigo}\nreturn loadAndRender();`);

const inicio = Date.now();
await rodar(...Object.values(ctx));
const ms = Date.now() - inicio;
console.log(`recarga com perfil conhecido: ${rodadas} rodada(s) de banco, ${ms} ms (cada consulta demora ${ATRASO} ms)`);
if (rodadas > 1) { console.log('ERRO: a recarga voltou a fazer consultas em fila (deixa o app lento no celular).'); process.exit(1); }
console.log('ok');
