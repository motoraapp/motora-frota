// Teste das regras da placa do ar (gree-esp32): "A mimi?" e volume da TV. O modo automático saiu na versão 24 (pedido do dono, 20/11/2026).
// Lê as funções de ar/firmware/gree-esp32/regras.h (C++ simples), transforma em JavaScript e roda os casos.
// Rodar: node .github/scripts/teste-ar-regras.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const cpp = readFileSync(join(process.cwd(), 'ar/firmware/gree-esp32/regras.h'), 'utf8');
const js = cpp
  .replace(/^#pragma.*$/gm, '')
  .replace(/^#define\s+(\w+)\s+(.+)$/gm, 'const $1 = $2;')
  .replace(/^struct\s+\w+\s*\{[^}]*\};/gm, '')
  .replace(/^(?:bool|int|void|float)\s+(\w+)\(([^)]*)\)\s*\{/gm, (_, nome, ps) =>
    `function ${nome}(${ps.split(',').map(p => p.trim().split(/[\s&]+/).pop()).join(', ')}) {`);
const R = new Function(`${js}; return { regraMimi, volDepois };`)();

let erros = 0;
function caso(titulo, obtido, esperado) {
  if (JSON.stringify(obtido) === JSON.stringify(esperado)) console.log(`ok   ${titulo}`);
  else { erros++; console.log(`ERRO ${titulo}: deu ${JSON.stringify(obtido)}, esperado ${JSON.stringify(esperado)}`); }
}

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

// Volume da TV pela barra (versão 17): com o volume escondido o 1º toque só mostra; com ele na tela (some 1 s depois) cada toque muda 1.
// Simula a placa: um toque a cada 200 ms até chegar no alvo. Devolve [toques, volume final, hora do último toque].
function barra(vol, alvo, agora, ultToque) { let n = 0; while (alvo !== vol) { if (n > 300) break; const visivel = ultToque !== null && agora - ultToque < 1000; vol = R.volDepois(vol, visivel, alvo > vol); ultToque = agora; n++; agora += 200; } return [n, vol, ultToque]; }
const sobe = barra(0, 50, 0, null);
caso('volume: do 0 ao 50 com o volume escondido são 51 toques', sobe.slice(0, 2), [51, 50]);
caso('volume: logo depois (menos de 1 s), do 50 ao 40 são 10 toques', barra(50, 40, sobe[2] + 500, sobe[2]).slice(0, 2), [10, 40]);
caso('volume: depois de mais de 1 s, do 50 ao 40 são 11 toques', barra(50, 40, sobe[2] + 3000, sobe[2]).slice(0, 2), [11, 40]);
caso('volume: não passa de 100 nem de 0', [R.volDepois(100, true, true), R.volDepois(0, true, false)], [100, 0]);
caso('volume: zerar (acha que está no 100) chega no 0 em 101 toques', barra(100, 0, 0, null).slice(0, 2), [101, 0]);

// Modo automático retirado (versão 24, pedido do dono): não pode voltar por engano na placa nem nos apps.
{
  const ler = (a) => readFileSync(join(process.cwd(), a), "utf8");
  const ino = ler("ar/firmware/gree-esp32/gree-esp32.ino"), web = ler("ar/firmware/gree-esp32/web.h"), app = ler("ar/index.html");
  caso("automático fora do regras.h", /regraAuto|autoManual|regraFaixa|foraMaisFrio|AutoMem/.test(cpp), false);
  caso("automático fora da placa", /checarAuto|salvarAuto|p\["auto"\]|d\["auto"\]/.test(ino), false);
  caso("automático fora do app de casa", /send\(\{auto|Modo automático \(sensor/.test(web), false);
  caso("automático fora do app de fora", /send\(\{auto|Modo automático \(sensor/.test(app), false);
}

if (erros) { console.log(`\n${erros} erro(s)`); process.exit(1); }
