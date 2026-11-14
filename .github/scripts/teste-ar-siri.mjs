// Teste da Siri do "Nossa casinha": a frase falada vira o comando certo para a placa.
// Testa supabase/functions/ar-siri/frase.js (o mesmo arquivo que a função do servidor usa).
// Rodar: node .github/scripts/teste-ar-siri.mjs
import { entender } from '../../supabase/functions/ar-siri/frase.js';

let erros = 0;
const EST = { power: false, temp: 24, mode: 1, auto: { on: false } };
function caso(frase, cmds, estado = EST) {
  const r = entender(frase, estado);
  const ok = JSON.stringify(r.cmds) === JSON.stringify(cmds) && typeof r.resposta === 'string' && r.resposta.length > 0;
  if (ok) console.log(`ok   "${frase}" -> ${JSON.stringify(cmds)} | ${r.resposta}`);
  else { erros++; console.log(`ERRO "${frase}": deu ${JSON.stringify(r.cmds)} (${r.resposta}), esperado ${JSON.stringify(cmds)}`); }
}

// Ar
caso('ligue o ar no 18', [{ power: true, temp: 18 }]);
caso('Liga o ar-condicionado em 22 graus', [{ power: true, temp: 22 }]);
caso('ligar o ar', [{ power: true }]);
caso('desligue o ar', [{ power: false }]);
caso('desliga o ar condicionado', [{ power: false }]);
caso('coloca o ar no 20', [{ power: true, temp: 20 }]);
caso('coloca o ar no 20', [{ temp: 20 }], { ...EST, power: true });
caso('ligue o ar no dezoito', [{ power: true, temp: 18 }]);
caso('ar no frio', [{ mode: 1 }], { ...EST, power: true });
caso('liga o ar no quente 26', [{ power: true, temp: 26, mode: 4 }]);
caso('aumenta a temperatura do ar', [{ temp: 25 }], { ...EST, power: true });
caso('abaixa a temperatura', [{ temp: 23 }], { ...EST, power: true });
caso('ligue o ar no 40', []);
caso('liga o automático', [{ auto: { on: true } }]);
caso('desliga o modo automático do ar', [{ auto: { on: false } }]);

// TV
caso('ligue a TV', [{ tecla: 'power' }]);
caso('desliga a televisão', [{ tecla: 'power' }]);
caso('aumenta o volume', [{ tecla: 'volUp' }, { tecla: 'volUp' }]);
caso('aumente o volume 4 vezes', [{ tecla: 'volUp' }, { tecla: 'volUp' }, { tecla: 'volUp' }, { tecla: 'volUp' }]);
caso('abaixa o volume da tv', [{ tecla: 'volDn' }, { tecla: 'volDn' }]);
caso('tira o som da tv', [{ tecla: 'mute' }]);
caso('coloca no canal 13', [{ tecla: 'n1' }, { tecla: 'n3' }]);
caso('próximo canal', [{ tecla: 'chUp' }]);
caso('canal anterior', [{ tecla: 'chDn' }]);

// Não entendeu: nada é enviado e a resposta explica
caso('faz um café', []);
caso('', []);

console.log(erros ? `\n${erros} problema(s) na Siri.` : '\nSiri: tudo certo.');
process.exit(erros ? 1 : 0);
