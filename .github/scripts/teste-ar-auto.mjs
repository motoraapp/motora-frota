// Teste do modo automático do ar-condicionado (placa gree-esp32).
// Lê as funções de ar/firmware/gree-esp32/regras.h (C++ simples), transforma em JavaScript e roda os casos.
// Rodar: node .github/scripts/teste-ar-auto.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const cpp = readFileSync(join(process.cwd(), 'ar/firmware/gree-esp32/regras.h'), 'utf8');
const js = cpp
  .replace(/^#pragma.*$/gm, '')
  .replace(/^#define\s+(\w+)\s+(.+)$/gm, 'const $1 = $2;')
  .replace(/^struct\s+\w+\s*\{[^}]*\};/gm, '')
  .replace(/^(?:bool|int|void|float)\s+(\w+)\(([^)]*)\)\s*\{/gm, (_, nome, ps) =>
    `function ${nome}(${ps.split(',').map(p => p.trim().split(/[\s&]+/).pop()).join(', ')}) {`);
const R = new Function(`${js}; return { dentroHorario, regraAuto, autoManual, regraMimi, AUTO_NADA, AUTO_LIGAR, AUTO_DESLIGAR };`)();
const NOME = { [R.AUTO_NADA]: 'nada', [R.AUTO_LIGAR]: 'ligar', [R.AUTO_DESLIGAR]: 'desligar' };

let erros = 0;
function caso(titulo, obtido, esperado) {
  if (JSON.stringify(obtido) === JSON.stringify(esperado)) console.log(`ok   ${titulo}`);
  else { erros++; console.log(`ERRO ${titulo}: deu ${JSON.stringify(obtido)}, esperado ${JSON.stringify(esperado)}`); }
}
// Roda uma sequência de minutos com alvo 24 °C, dentro do horário, e devolve o que a placa fez em cada um.
// Cada passo: [temperatura do quarto, ar ligado?, opções]. A memória continua de um passo para o outro.
function rodar(passos, mem = { ligou: false, espera: false }) {
  return passos.map(([q, ligado, o = {}]) => {
    if (o.manual !== undefined) R.autoManual(mem, o.manual, o.ativo ?? true);
    return NOME[R.regraAuto(mem, o.ativo ?? true, o.leitura ?? true, q, 24, o.horario ?? true, ligado)];
  });
}

// Horário
caso('horário: 10:00 está entre 08:00 e 20:00', R.dentroHorario(600, 480, 1200), true);
caso('horário: 21:40 está fora de 08:00 a 20:00', R.dentroHorario(1300, 480, 1200), false);
caso('horário: 20:00 já é fora (fim não conta)', R.dentroHorario(1200, 480, 1200), false);
caso('horário que passa da meia-noite: 01:00 está entre 22:00 e 06:00', R.dentroHorario(60, 1320, 360), true);
caso('horário que passa da meia-noite: 11:40 está fora', R.dentroHorario(700, 1320, 360), false);
caso('horário: começo igual ao fim vale o dia todo', R.dentroHorario(700, 480, 480), true);

// Ligar: no horário, quarto acima da temperatura escolhida (versão 3; antes esperava passar 1 °C)
caso('liga quando o quarto passa da temperatura escolhida (24,1 com alvo 24)', rodar([[24.1, false]]), ['ligar']);
caso('não liga com o quarto exatamente na temperatura (24,0)', rodar([[24.0, false]]), ['nada']);
caso('não liga com o quarto abaixo (21,5)', rodar([[21.5, false]]), ['nada']);
caso('não liga fora do horário', rodar([[27, false, { horario: false }]]), ['nada']);
caso('sem leitura do sensor não faz nada', rodar([[30, false, { leitura: false }]]), ['nada']);
caso('desligado pela pessoa: só liga de novo depois que o quarto esfriar',
  rodar([[26, true], [26, false, { manual: false }], [26, false], [24, false], [25, false]]),
  ['nada', 'nada', 'nada', 'nada', 'ligar']);

// Desligar (novo)
caso('desliga quando cai 2 °C abaixo (pedido do dono, 14/11/2026), se foi o automático que ligou',
  rodar([[25, false], [24, true], [22.1, true], [22.0, true]]), ['ligar', 'nada', 'nada', 'desligar']);
caso('não desliga só 1 °C abaixo (23,0 com alvo 24)', rodar([[25, false], [23.0, true]]), ['ligar', 'nada']);
caso('depois de desligar, liga de novo quando esquentar',
  rodar([[25, false], [22, true], [24.0, false], [24.3, false]]), ['ligar', 'desligar', 'nada', 'ligar']);
caso('não desliga se foi a pessoa que ligou', rodar([[22, true, { manual: true }], [21, true]]), ['nada', 'nada']);
caso('a pessoa religou depois do automático: não desliga mais',
  rodar([[25, false], [23, true, { manual: true }]]), ['ligar', 'nada']);
caso('não desliga fora do horário, e desliga quando o horário volta',
  rodar([[25, false], [22, true, { horario: false }], [22, true]]), ['ligar', 'nada', 'desligar']);
caso('não desliga sem leitura do sensor', rodar([[25, false], [20, true, { leitura: false }]]), ['ligar', 'nada']);
caso('automático desligado e religado: não desliga o ar que ficou ligado',
  rodar([[25, false], [25, true, { ativo: false }], [22, true]]), ['ligar', 'nada', 'nada']);

// A mimi (versão 8): 20° com turbo por 2 h; depois 22°, volta a 20° se o quarto passar de 22 °C e sobe para 22° de novo quando cair a 21 °C.
const H2 = 2 * 3600 * 1000;
function mimi(passos) { const m = { fase: 1 }; return passos.map(([passou, q, temp, leitura = true]) => [R.regraMimi(m, passou, leitura, q, temp), m.fase]); }
caso('a mimi: antes de 2 h não muda nada', mimi([[H2 - 60000, 23, 20]]), [[0, 1]]);
caso('a mimi: com 2 h sobe para 22° e passa para a fase 2', mimi([[H2, 21, 20]]), [[22, 2]]);
caso('a mimi: no 22°, quarto passou de 22 °C volta para 20°', mimi([[H2, 21, 20], [H2 + 6e5, 22.4, 22]]), [[22, 2], [20, 2]]);
caso('a mimi: no 22°, quarto em 22,0 °C fica', mimi([[H2, 21, 20], [H2 + 6e5, 22.0, 22]]), [[22, 2], [0, 2]]);
caso('a mimi: no 20°, quarto caiu a 21 °C sobe para 22° de novo', mimi([[H2, 23, 20], [H2 + 6e5, 23, 22], [H2 + 12e5, 21.0, 20]]), [[22, 2], [20, 2], [22, 2]]);
caso('a mimi: no 20°, quarto em 21,5 °C fica', mimi([[H2, 23, 20], [H2 + 6e5, 21.5, 20]]), [[22, 2], [0, 2]]);
caso('a mimi: sem leitura do sensor fica onde está', mimi([[H2, 23, 20], [H2 + 6e5, 25, 22, false]]), [[22, 2], [0, 2]]);

console.log(erros ? `\n${erros} problema(s) no modo automático.` : '\nModo automático: tudo certo.');
process.exit(erros ? 1 : 0);
