#pragma once
// Protocolo ADB mínimo para mandar comandos à TV Box pela rede (versão 24).
// Só as contas puras ficam aqui (testadas em .github/scripts/teste-ar-adb.mjs); a conexão fica no gree-esp32.ino.
// Mantenha C simples: o teste transforma este arquivo em JavaScript.
#include <stdint.h>
#include <string.h>

#define ADB_CNXN 0x4e584e43
#define ADB_OPEN 0x4e45504f
#define ADB_OKAY 0x59414b4f
#define ADB_WRTE 0x45545257
#define ADB_CLSE 0x45534c43
#define ADB_AUTH 0x48545541

uint32_t adbSoma(const uint8_t *d, int n) {
  uint32_t s = 0;
  for (int i = 0; i < n; i++) s += (uint8_t)d[i];
  return s;
}

// Cabeçalho de 24 bytes, tudo em little-endian: comando, arg0, arg1, tamanho, soma, mágica (comando XOR 0xFFFFFFFF).
void adbCabecalho(uint8_t *h, uint32_t cmd, uint32_t a0, uint32_t a1, uint32_t len, uint32_t soma) {
  uint32_t v[6] = {cmd, a0, a1, len, soma, cmd ^ 0xFFFFFFFF};
  for (int i = 0; i < 6; i++)
    for (int b = 0; b < 4; b++) h[i * 4 + b] = (v[i] >> (8 * b)) & 255;
}

uint32_t adbLe32(const uint8_t *p) {
  return (uint32_t)p[0] | ((uint32_t)p[1] << 8) | ((uint32_t)p[2] << 16) | ((uint32_t)p[3] << 24);
}

// Nome da tecla no app -> código do Linux do controle remoto da box (/dev/input/event0, "110b0030.pwm";
// o Android traduz pelo mapa 110b0030_pwm.kl). Versão 25: a placa escreve a tecla direto no controle (~0,1 s)
// em vez de "input keyevent" (~2,1 s na box de 1 GB, abre uma máquina Java por tecla). Desconhecida = -1.
int adbTecla(const char *k) {
  if (!strcmp(k, "up")) return 103;
  if (!strcmp(k, "down")) return 108;
  if (!strcmp(k, "left")) return 105;
  if (!strcmp(k, "right")) return 106;
  if (!strcmp(k, "ok")) return 232;       // DPAD_CENTER (o ENTER 28 não existe neste controle)
  if (!strcmp(k, "back")) return 158;
  if (!strcmp(k, "home")) return 102;
  if (!strcmp(k, "menu")) return 139;
  if (!strcmp(k, "volup")) return 115;
  if (!strcmp(k, "voldown")) return 114;
  if (!strcmp(k, "mute")) return 113;
  if (!strcmp(k, "play")) return 164;
  return -1;
}

// Um evento do Linux (struct input_event de 32 bits, 16 bytes): hora zerada (o kernel ignora), tipo, código, valor.
void adbEvento(uint8_t *e, int tipo, int codigo, int valor) {
  for (int i = 0; i < 8; i++) e[i] = 0;
  e[8] = tipo & 255; e[9] = (tipo >> 8) & 255;
  e[10] = codigo & 255; e[11] = (codigo >> 8) & 255;
  for (int b = 0; b < 4; b++) e[12 + b] = (valor >> (8 * b)) & 255;
}

// Caracteres que podem ir no "input text" sem virar comando de shell. Espaço é tratado à parte (vira %s).
bool adbCharPermitido(int c) {
  if (c >= 'a' && c <= 'z') return true;
  if (c >= 'A' && c <= 'Z') return true;
  if (c >= '0' && c <= '9') return true;
  return c == '.' || c == ',' || c == '-' || c == '_' || c == '@' || c == ':' || c == '!';   // sem ? (curinga do shell)
}
