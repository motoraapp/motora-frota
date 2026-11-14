// Entende a frase falada para a Siri e devolve os comandos da placa (mesmo formato do app).
// Usado pela função ar-siri e testado por .github/scripts/teste-ar-siri.mjs. Sem IA: só palavras-chave.
const NUMEROS = { dezesseis: 16, dezessete: 17, dezoito: 18, dezenove: 19, vinte: 20, 'vinte e um': 21, 'vinte e dois': 22,
  'vinte e tres': 23, 'vinte e quatro': 24, 'vinte e cinco': 25, 'vinte e seis': 26, 'vinte e sete': 27, 'vinte e oito': 28,
  'vinte e nove': 29, trinta: 30, um: 1, dois: 2, tres: 3, quatro: 4, cinco: 5, seis: 6, sete: 7, oito: 8, nove: 9, dez: 10 };
const MODOS = [[/\bfri[oa]\b|gelar|resfri/, 1, 'frio'], [/quente|aquec|esquent/, 4, 'quente'], [/\bsec[oa]\b|desumid/, 2, 'seco'], [/ventil/, 3, 'ventilar']];
const EXEMPLO = 'Diga, por exemplo: ligue o ar no 18, desligue o ar, ligue a TV ou aumente o volume.';

function limpar(t) {
  let s = String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  // números falados por extenso viram algarismos (os maiores primeiro)
  for (const [p, n] of Object.entries(NUMEROS).sort((a, b) => b[0].length - a[0].length)) s = s.replace(new RegExp('\\b' + p + '\\b', 'g'), String(n));
  return s;
}
const repetir = (k, n) => Array.from({ length: n }, () => ({ tecla: k }));

export function entender(frase, estado) {
  const s = limpar(frase), st = estado || {};
  if (!s) return { cmds: [], resposta: 'Não ouvi nada. ' + EXEMPLO };
  const nums = (s.match(/\b\d+\b/g) || []).map(Number);
  const desligar = /\bdeslig/.test(s), ligar = !desligar && /\blig/.test(s);
  const tv = /\btv\b|televis/.test(s);
  const volume = /volume|\bsom\b|\bmudo\b|silenci/.test(s), canal = /\bcanal\b|\bcanais\b/.test(s);

  // ----- TV -----
  if (tv || volume || canal) {
    if (/\bmudo\b|silenci|tira o som|tirar o som|sem som/.test(s)) return { cmds: [{ tecla: 'mute' }], resposta: 'Pronto, mudo na TV.' };
    if (volume) {
      const vezes = Math.min(10, Math.max(1, nums[0] || 2));
      if (/aument|sob|subir|mais alto|aumentar/.test(s)) return { cmds: repetir('volUp', vezes), resposta: `Pronto, aumentei o volume ${vezes} vezes.` };
      if (/abaix|diminu|baix|menos/.test(s)) return { cmds: repetir('volDn', vezes), resposta: `Pronto, abaixei o volume ${vezes} vezes.` };
    }
    if (canal) {
      if (nums.length && nums[0] < 1000) return { cmds: String(nums[0]).split('').map(d => ({ tecla: 'n' + d })), resposta: `Pronto, canal ${nums[0]}.` };
      if (/proxim|sob|subir|seguinte|muda|troca/.test(s)) return { cmds: [{ tecla: 'chUp' }], resposta: 'Pronto, próximo canal.' };
      if (/anterior|desc|baix|volt/.test(s)) return { cmds: [{ tecla: 'chDn' }], resposta: 'Pronto, canal anterior.' };
    }
    if (tv && (ligar || desligar)) return { cmds: [{ tecla: 'power' }], resposta: desligar ? 'Pronto, mandei desligar a TV.' : 'Pronto, mandei ligar a TV.' };
    if (tv && /\bmenu\b/.test(s)) return { cmds: [{ tecla: 'menu' }], resposta: 'Pronto, menu da TV.' };
    if (tv && /fonte|entrada|\bav\b/.test(s)) return { cmds: [{ tecla: 'fonte' }], resposta: 'Pronto, troquei a entrada da TV.' };
    return { cmds: [], resposta: 'Não entendi o que fazer na TV. Diga, por exemplo: ligue a TV, aumente o volume ou coloque no canal 13.' };
  }

  // ----- Modo automático (sensor do quarto) -----
  if (/automatic|sensor/.test(s)) {
    if (desligar) return { cmds: [{ auto: { on: false } }], resposta: 'Pronto, desliguei o modo automático.' };
    if (ligar || /ativ/.test(s)) return { cmds: [{ auto: { on: true } }], resposta: 'Pronto, liguei o modo automático.' };
  }

  // ----- Ar -----
  const temAr = /\bar\b|ar condicionado|temperatura|grau/.test(s) || nums.length > 0 || MODOS.some(([r]) => r.test(s));
  if (!temAr) return { cmds: [], resposta: 'Não entendi. ' + EXEMPLO };
  if (desligar) return { cmds: [{ power: false }], resposta: 'Pronto, desliguei o ar.' };
  const c = {};
  const temp = nums.find(n => n >= 10 && n <= 40);
  if (temp !== undefined) {
    if (temp < 16 || temp > 30) return { cmds: [], resposta: 'O ar vai de 16 a 30 graus. Escolha uma temperatura nessa faixa.' };
    c.temp = temp;
  } else if (/aument|sob|subir|mais quente/.test(s)) c.temp = Math.min(30, (st.temp || 24) + 1);
  else if (/abaix|diminu|baix|mais frio/.test(s)) c.temp = Math.max(16, (st.temp || 24) - 1);
  const modo = MODOS.find(([r]) => r.test(s));
  if (modo) c.mode = modo[1];
  const ligarAr = ligar || (!st.power && c.temp !== undefined && /coloc|poe|bota|deix|ajust|muda/.test(s));
  if (ligarAr) {
    const cmd = { power: true, ...c };
    const t = c.temp ?? st.temp;
    return { cmds: [cmd], resposta: `Pronto, liguei o ar${t ? ' em ' + t + ' graus' : ''}${modo ? ' no ' + modo[2] : ''}.` };
  }
  if (!Object.keys(c).length) return { cmds: [], resposta: 'Não entendi o que fazer no ar. ' + EXEMPLO };
  const partes = [];
  if (c.temp !== undefined) partes.push('ar em ' + c.temp + ' graus');
  if (modo) partes.push('modo ' + modo[2]);
  return { cmds: [c], resposta: 'Pronto, ' + partes.join(' e ') + (st.power ? '.' : '. O ar está desligado; diga "ligue o ar" para ligar.') };
}
