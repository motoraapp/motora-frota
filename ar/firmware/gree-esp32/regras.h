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
  if (!noHorario) return AUTO_NADA;
  if (!arLigado && !e.espera && quarto >= alvo + 1) { e.ligou = true; return AUTO_LIGAR; }
  if (arLigado && e.ligou && quarto <= alvo - 1) { e.ligou = false; return AUTO_DESLIGAR; }
  return AUTO_NADA;
}

// Alguém (app, controle original, horário programado, busca) ligou ou desligou o ar: o ar deixa de ser do automático.
void autoManual(AutoMem &e, bool ligado, bool autoAtivo) {
  e.ligou = false;
  if (!ligado && autoAtivo) e.espera = true;
}
