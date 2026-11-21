// Regras da placa do ar: "A mimi?" e volume da TV. Só C++ simples, sem Arduino:
// o teste .github/scripts/teste-ar-regras.mjs lê este arquivo e roda estas mesmas funções.
// Escreva só com bool/int/float, if e return, para o teste conseguir ler.
// O modo automático (sensor do quarto) saiu na versão 24 (pedido do dono, 20/11/2026).
#pragma once

// "A mimi?" (versão 8, pedido do dono): fase 1 = Frio 20° com turbo e ventilação máxima por 2 h; fase 2 = 22°.
// Na fase 2, se o quarto passar de 22 °C volta para 20°, e quando cair a 21 °C sobe para 22° de novo.
// Devolve a temperatura nova para o ar (0 = não mexe). passou = ms desde o toque no botão.
#define MIMI_FASE1 7200000
struct MimiMem { bool on; int fase; };
int regraMimi(MimiMem &m, unsigned long passou, bool temLeitura, float quarto, int temp) {
  if (m.fase == 1) {
    if (passou >= MIMI_FASE1) { m.fase = 2; return 22; }
    return 0;
  }
  if (!temLeitura) return 0;
  if (temp >= 22 && quarto > 22) return 20;
  if (temp <= 20 && quarto <= 21) return 22;
  return 0;
}

// Volume da TV pela barra (versão 17): com o volume escondido o 1º toque só mostra; com ele na tela cada toque muda 1
// (de 0 a 100). Devolve o volume depois de um toque.
int volDepois(int vol, bool visivel, bool sobe) {
  if (!visivel) return vol;
  if (sobe) return vol < 100 ? vol + 1 : 100;
  return vol > 0 ? vol - 1 : 0;
}
