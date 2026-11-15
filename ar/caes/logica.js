// Regras dos avisos de fome e sede (sem dependências: usada pelo servidor local, pela Edge Function e pelos testes).
// Cada cachorro chega como {id, nome, artigo, fome, sede, em}: fome/sede 0..100 medidas no instante `em` (ms).
export const TAXA = { fome: 100 / (8 * 3600e3), sede: 100 / (6 * 3600e3) }; // 0→100 em 8 h (fome) e 6 h (sede)
export const LIMITE = 70;              // a partir daqui avisa
export const INTERVALO = 2 * 3600e3;   // no máximo 1 aviso por cachorro e necessidade a cada 2 h
export const SILENCIO = [22, 7];       // não avisa das 22h às 7h

export function nivel(c, tipo, agora) {
  return Math.min(100, Math.max(0, Number(c[tipo]) || 0) + Math.max(0, agora - (Number(c.em) || agora)) * TAXA[tipo]);
}

export function horaLocal(agora, tz) {
  try { return Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: tz || 'America/Sao_Paulo' }).format(agora)); }
  catch { return new Date(agora).getHours(); }
}

const nomeDe = (c, mai = true) => (c.artigo ? (mai ? c.artigo[0].toUpperCase() : c.artigo[0]) + c.artigo.slice(1) + ' ' : '') + c.nome;
const juntar = (l) => l.length < 2 ? l[0] : l.slice(0, -1).join(', ') + ' e ' + l[l.length - 1];

// Devolve {titulo, corpo, url, marcar: ['id:fome', ...]} ou null. `avisos` = {'id:fome': ms do último aviso}.
// semSilencio = true só nos testes locais (ignora o horário de silêncio).
export function calcularAviso(cachorros, avisos, agora, tz, semSilencio = false) {
  const h = horaLocal(agora, tz);
  if (!semSilencio && (h >= SILENCIO[0] || h < SILENCIO[1])) return null;
  const pend = [];
  for (const c of cachorros || []) for (const tipo of ['fome', 'sede']) {
    const k = c.id + ':' + tipo;
    if (nivel(c, tipo, agora) >= LIMITE && agora - (Number(avisos?.[k]) || 0) >= INTERVALO) pend.push({ c, tipo, k });
  }
  if (!pend.length) return null;
  const url = './?jogo=1';
  if (pend.length === 1) {
    const { c, tipo } = pend[0];
    return { titulo: 'Nossa casinha', corpo: tipo === 'fome' ? `${nomeDe(c)} está com fome! 🍖` : `${nomeDe(c)} quer água 💧`, url, marcar: [pend[0].k] };
  }
  const fome = [...new Set(pend.filter((p) => p.tipo === 'fome').map((p) => nomeDe(p.c, false)))];
  const sede = [...new Set(pend.filter((p) => p.tipo === 'sede').map((p) => nomeDe(p.c, false)))];
  const partes = [];
  if (fome.length) partes.push(`${juntar(fome)} ${fome.length > 1 ? 'estão' : 'está'} com fome 🍖`);
  if (sede.length) partes.push(`${juntar(sede)} ${sede.length > 1 ? 'querem' : 'quer'} água 💧`);
  const txt = partes.join(' e ') + '.';
  return { titulo: 'Os cachorros estão chamando!', corpo: txt[0].toUpperCase() + txt.slice(1), url, marcar: pend.map((p) => p.k) };
}
