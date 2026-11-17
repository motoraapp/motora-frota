// Regras do modo automático (sensor do quarto). Só C++ simples, sem Arduino:
// o teste .github/scripts/teste-ar-auto.mjs lê este arquivo e roda estas mesmas funções.
// Escreva só com bool/int/float, if e return, para o teste conseguir ler.
#pragma once

#define AUTO_NADA 0
#define AUTO_LIGAR 1
#define AUTO_DESLIGAR 2

// Minuto do dia (0..1439) está dentro da janela de..ate? A janela pode passar da meia-noite. de == ate: o dia todo.
bool dentroHorario(int agora, int de, int ate) {
  if (de == ate) return true;
  if (de < ate) return agora >= de && agora < ate;
  return agora >= de || agora < ate;
}

// ligou: o ar está ligado porque o automático ligou. espera: a pessoa desligou o ar; só liga de novo depois que o quarto esfriar.
struct AutoMem { bool ligou; bool espera; };

// Chamada a cada minuto. Devolve o que fazer com o ar.
int regraAuto(AutoMem &e, bool ativo, bool temLeitura, float quarto, int alvo, bool noHorario, bool arLigado) {
  if (!ativo) { e.ligou = false; e.espera = false; return AUTO_NADA; }
  if (!temLeitura) return AUTO_NADA;
  if (e.espera && quarto <= alvo) e.espera = false;
  if (!arLigado) e.ligou = false;
  // Versão 22: a espera acaba quando o horário termina. Antes só acabava com o quarto na temperatura escolhida, e com
  // uma escolhida que o quarto nunca alcança sozinho (ex.: 19 °C em Goiânia) o automático nunca mais ligava.
  if (!noHorario) { e.espera = false; return AUTO_NADA; }
  if (!arLigado && !e.espera && quarto > alvo) { e.ligou = true; return AUTO_LIGAR; }  // acima da temperatura escolhida (versão 3)
  if (arLigado && e.ligou && quarto <= alvo - 2) { e.ligou = false; return AUTO_DESLIGAR; }  // versão 7: 2 °C abaixo (pedido do dono)
  return AUTO_NADA;
}

// Alguém (app, controle original, horário programado, busca) ligou ou desligou o ar: o ar deixa de ser do automático.
void autoManual(AutoMem &e, bool ligado, bool autoAtivo) {
  e.ligou = false;
  if (!ligado && autoAtivo) e.espera = true;
}

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

// Faixas do automático (versão 19, pedido do dono): o ar começa no máximo e vai suavizando perto da temperatura escolhida.
// d = quarto − escolhida. Faixa 1 (d >= 3): 16°, turbo, ventilação 3 | 2 (d >= 1,5): 18°, ventilação 3 |
// 3 (d >= 0,5): escolhida − 2, ventilação 2 | 4: a escolhida, ventilação 1. Cada troca dá um bipe no ar, então:
// para uma faixa mais quente troca na hora; para uma mais fria só com 0,3 °C além do limite (AUTO_FOLGA).
#define AUTO_FOLGA 0.3
int faixaDe(float d) {
  if (d >= 3) return 1;
  if (d >= 1.5) return 2;
  if (d >= 0.5) return 3;
  return 4;
}
// atual = faixa em uso (0 = acabou de ligar). Devolve a faixa nova.
int regraFaixa(int atual, float d) {
  if (atual < 1 || atual > 4) return faixaDe(d);
  if (faixaDe(d) > atual) return faixaDe(d);
  if (faixaDe(d - AUTO_FOLGA) < atual) return faixaDe(d - AUTO_FOLGA);
  return atual;
}
// Temperatura no visor do ar em cada faixa (nunca mais quente do que a escolhida; o meio-termo não desce de 18°).
int tempFaixa(int f, int alvo) {
  if (f == 1) return 16;
  if (f == 2) return alvo < 18 ? alvo : 18;
  if (f == 3) return alvo - 2 < 18 ? (alvo < 18 ? alvo : 18) : alvo - 2;
  return alvo;
}
int ventFaixa(int f) {
  if (f <= 2) return 3;
  if (f == 3) return 2;
  return 1;
}

// Lá fora mais frio (versão 20, pedido do dono): se lá fora estiver JANELA_DIF °C ou mais frio do que o quarto, o
// automático não liga o ar e avisa para abrir a janela. temFora = a placa tem a temperatura de lá fora de menos de 1 h.
#define JANELA_DIF 3
bool foraMaisFrio(bool temFora, float fora, float quarto) {
  return temFora && fora <= quarto - JANELA_DIF;
}
