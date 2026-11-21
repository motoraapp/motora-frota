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

// Nome da tecla no app -> keycode do Android. Desconhecida = -1.
int adbTecla(const char *k) {
  if (!strcmp(k, "up")) return 19;
  if (!strcmp(k, "down")) return 20;
  if (!strcmp(k, "left")) return 21;
  if (!strcmp(k, "right")) return 22;
  if (!strcmp(k, "ok")) return 23;
  if (!strcmp(k, "back")) return 4;
  if (!strcmp(k, "home")) return 3;
  if (!strcmp(k, "menu")) return 82;
  if (!strcmp(k, "volup")) return 24;
  if (!strcmp(k, "voldown")) return 25;
  if (!strcmp(k, "mute")) return 164;
  if (!strcmp(k, "play")) return 85;
  return -1;
}

// Caracteres que podem ir no "input text" sem virar comando de shell. Espaço é tratado à parte (vira %s).
bool adbCharPermitido(int c) {
  if (c >= 'a' && c <= 'z') return true;
  if (c >= 'A' && c <= 'Z') return true;
  if (c >= '0' && c <= '9') return true;
  return c == '.' || c == ',' || c == '-' || c == '_' || c == '@' || c == ':' || c == '!' || c == '?';
}
