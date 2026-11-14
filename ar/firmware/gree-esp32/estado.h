// Estruturas da placa (ficam aqui para o Arduino conhecer antes das funções).
#pragma once
#include <Arduino.h>

// mode: 0 Auto, 1 Frio, 2 Seco, 3 Vent, 4 Quente (números do controle Gree, os mesmos dos apps).
struct Estado { bool power = false; int mode = 1, temp = 24, fan = 0; bool swing = false, light = true, turbo = false, xfan = false, sleep = false; int model = 1, proto = 24; };
struct Horario { int d, h, m, a, t, o, e; };
struct Automatico { bool on = false; int alvo = 24, de = 480, ate = 1200; };
// Último sinal lido do controle original.
struct Leitura { int n = 0; String proto, hex, text; bool ac = false; int pid = 0, model = 0; bool paraNuvem = false; };
