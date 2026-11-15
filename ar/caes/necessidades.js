// Fome, sede e bexiga de cada cachorro. Guardadas no aparelho (localStorage) e calculadas pelo tempo passado ao abrir.
import { TAXA } from './logica.js';

const CHAVE = 'casinha_caes_v1';
const BEXIGA_H = 100 / (10 * 3600e3); // enche sozinha em ~10 h; água acelera

export function criarNecessidades(cachorros) {
  let dados = {};
  try { dados = JSON.parse(localStorage.getItem(CHAVE) || '{}'); } catch {}
  const agora = Date.now();
  const n = {};
  for (const c of cachorros) {
    const d = dados[c.id] || { fome: 35, sede: 35, bexiga: 20, em: agora, comeu: 0, bebeu: 0 };
    const dt = Math.max(0, agora - (d.em || agora));
    n[c.id] = {
      fome: Math.min(100, d.fome + dt * TAXA.fome), sede: Math.min(100, d.sede + dt * TAXA.sede),
      bexiga: Math.min(100, d.bexiga + dt * BEXIGA_H), comeu: d.comeu || 0, bebeu: d.bebeu || 0,
    };
  }
  let ultSalvo = 0;
  const api = {
    de: (id) => n[id],
    // dt em segundos; calor faz a sede subir mais rápido
    passar(dtS, calor) {
      const ms = dtS * 1000;
      for (const id in n) {
        const x = n[id];
        x.fome = Math.min(100, x.fome + ms * TAXA.fome);
        x.sede = Math.min(100, x.sede + ms * TAXA.sede * (calor ? 1.8 : 1));
        x.bexiga = Math.min(100, x.bexiga + ms * BEXIGA_H);
      }
      if (performance.now() - ultSalvo > 10000) api.salvar();
    },
    alimentar(id, tipo, quanto = 70) {
      const x = n[id];
      if (tipo === 'comida') { x.fome = Math.max(0, x.fome - quanto); x.comeu = Date.now(); }
      else { x.sede = Math.max(0, x.sede - quanto); x.bebeu = Date.now(); x.bexiga = Math.min(100, x.bexiga + 35); }
      api.salvar();
    },
    definir(id, campo, v) { n[id][campo] = Math.max(0, Math.min(100, v)); api.salvar(); },
    salvar() {
      ultSalvo = performance.now();
      const em = Date.now(), out = {};
      for (const id in n) out[id] = { ...n[id], em };
      try { localStorage.setItem(CHAVE, JSON.stringify(out)); } catch {}
    },
    // o que vai para o servidor de avisos
    resumo() {
      const em = Date.now();
      return cachorros.map((c) => ({ id: c.id, nome: c.nome, artigo: c.artigo, fome: Math.round(n[c.id].fome), sede: Math.round(n[c.id].sede), em }));
    },
  };
  return api;
}
