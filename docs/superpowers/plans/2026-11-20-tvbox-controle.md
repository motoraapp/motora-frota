# Controle da TV Box no Nossa casinha — plano

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** aba "Box" no Nossa casinha que manda teclas, texto, "Abrir Zuxo" e "Reiniciar" para a TV Box, pela placa do ar, via ADB na rede.

**Architecture:** o app grava `{box:{...}}` em `ar.cmd` (como hoje). A placa (versão 24) aplica em `aplicar()`, põe numa fila pequena e, no `loop()`, abre TCP com a box (porta 5555), faz CNXN → OPEN `shell:<cmd>` → lê até CLSE e fecha. Funções puras do protocolo em `adb.h`, testadas em Node como o `regras.h`.

**Tech Stack:** ESP32 Arduino (núcleo 2.0.17, `WiFiClient`), ArduinoJson 7; JS puro nos apps; testes Node puro.

**Spec:** `docs/superpowers/specs/2026-11-20-tvbox-controle-design.md`

## Global Constraints
- Nenhuma biblioteca nova na placa nem no Node.
- Nada muda no banco (`ar_send` já aceita o comando).
- Bloco do app compartilhado começa com o comentário `// TV Box` e termina em `})();`, idêntico em `ar/firmware/gree-esp32/web.h` e `ar/index.html`.
- Aba "Box" só aparece com `S.fw>=24`.
- Teclas: up 19, down 20, left 21, right 22, ok 23, back 4, home 3, menu 82, volup 24, voldown 25, mute 164, play 85.
- IP padrão da box `192.168.1.87`, chave NVS `bx_ip`.
- Não publicar (push, OTA) sem autorização do dono.

## Review Focus
1. Box desligada/fora da rede: a placa não pode travar o ar — conexão com timeout de 1,5 s, no máximo 1 tentativa por lote, e `bx.m` = "sem resposta".
2. Texto com aspas, `;`, `&`, `$`, crase ou barra: nunca pode virar comando de shell — só passam caracteres permitidos (`adbCharPermitido`), espaço vira `%s`.
3. Box pedindo autorização (AUTH em vez de CNXN): para, `bx.m` = "a box pediu autorização", não repete em laço.
4. Segurar seta/volume: muitas teclas seguidas não podem estourar memória — fila de no máximo 16; o que passar disso é descartado.
5. IP inválido vindo do app (`boxIp`): ignora se `IPAddress.fromString` falhar.

---

### Task 1: Protocolo ADB puro (`adb.h`) com teste

**Files:**
- Create: `ar/firmware/gree-esp32/adb.h`
- Create: `.github/scripts/teste-ar-adb.mjs`
- Modify: `.github/workflows/verificar.yml` (passo `node .github/scripts/teste-ar-adb.mjs` junto dos outros `teste-ar-*`)

**Interfaces (produz):**
- `#define ADB_CNXN 0x4e584e43`, `ADB_OPEN 0x4e45504f`, `ADB_OKAY 0x59414b4f`, `ADB_WRTE 0x45545257`, `ADB_CLSE 0x45534c43`, `ADB_AUTH 0x48545541`
- `uint32_t adbSoma(const uint8_t *d, int n)` — soma dos bytes.
- `void adbCabecalho(uint8_t *h, uint32_t cmd, uint32_t a0, uint32_t a1, uint32_t len, uint32_t soma)` — 24 bytes little-endian: cmd, a0, a1, len, soma, cmd ^ 0xFFFFFFFF.
- `uint32_t adbLe32(const uint8_t *p)` — lê little-endian.
- `int adbTecla(const char *k)` — nome → keycode da tabela das Global Constraints; desconhecida = -1.
- `bool adbCharPermitido(int c)` — A–Z, a–z, 0–9 e `. , - _ @ : ! ?`; resto falso (espaço é tratado à parte).

- [ ] **Step 1: teste que falha.** `teste-ar-adb.mjs` lê `adb.h`, transforma em JS (tirar `const`, `unsigned`, tipos `uint8_t/uint32_t/int/char/bool/void`, `*` dos parâmetros; `strcmp` = `(a,b)=>a===b?0:1`; `#define` → `const`) e confere:
  - `adbSoma([1,2,250],3)` = 253
  - cabeçalho de CNXN(0x01000000, 4096, len 7, soma 0x2b4): bytes 0–3 = `43 4e 58 4e`, 20–23 = `bc b1 a7 b1`
  - `adbLe32([0x43,0x4e,0x58,0x4e])` = ADB_CNXN
  - `adbTecla('ok')`=23, `'home'`=3, `'mute'`=164, `'xyz'`=-1
  - `adbCharPermitido` verdadeiro para `a Z 5 . @`; falso para `' " ; & | $ \` \\ ( ) < > espaço`
- [ ] **Step 2:** `node .github/scripts/teste-ar-adb.mjs` → falha (arquivo não existe).
- [ ] **Step 3:** escrever `adb.h` com as funções acima (C simples, sem `String`).
- [ ] **Step 4:** teste passa.
- [ ] **Step 5: prova contra a box real.** `ferramentas/adb-teste.mjs <ip> <tecla>` (Node `net`, usa as mesmas funções transformadas de `adb.h`) manda `input keyevent` para 192.168.1.87 e imprime CNXN recebido / OKAY / CLSE. Esperado: a tecla chega (conferir com `adb shell dumpsys activity` ou na tela). Não entra no workflow (precisa da box).
- [ ] **Step 6:** commit `Nossa casinha: protocolo ADB da TV Box (adb.h) com teste`.

### Task 2: Placa versão 24 — fila e conexão com a box

**Files:**
- Modify: `ar/firmware/gree-esp32/gree-esp32.ino` (include `adb.h`; `aplicar()` perto da linha 481; `estadoJson()` linha 418; `loop()` linha 787; leitura de NVS no `setup` perto da linha 765; constante de versão da placa)
- Modify: `ar/firmware/versao.json` (24)

**Interfaces:**
- Consome: tudo da Task 1.
- Produz: comando `{box:{k}}`, `{box:{txt}}`, `{box:{abrir:"zuxo"}}`, `{box:{reiniciar:true}}`, `{boxIp:"a.b.c.d"}`; estado `bx` = `{ok:bool, m:string, ms:int, ip:string}`.

- [ ] **Step 1:** `aplicar()`: monta a linha de shell e põe na fila `bxFila` (array de 16 `String`, descarta se cheia): tecla → `input keyevent N`; texto → `input text ` + caracteres permitidos (espaço = `%s`, máx. 60); abrir → `monkey -p com.zuxoplayer.app 1`; reiniciar → `reboot`. `boxIp` válido → grava `bx_ip` e troca o IP.
- [ ] **Step 2:** `bxEnviar(const String &cmd)`: `WiFiClient` com `setTimeout(1500)`, connect, envia CNXN (payload `host::\0`), lê 24 bytes; AUTH → `bx.m="a box pediu autorização"` e sai; CNXN → OPEN (local id 1, payload `shell:`+cmd+`\0`), lê pacotes até CLSE ou 1,5 s, respondendo OKAY a cada WRTE; fecha. Atualiza `bx.ok`, `bx.m` ("ok" / "sem resposta"), `bx.ms`.
- [ ] **Step 3:** `loop()`: se a fila tem item e passou 150 ms do último envio, `bxEnviar` do primeiro e tira da fila. Se falhou por "sem resposta", esvazia a fila (Review Focus 1).
- [ ] **Step 4:** `estadoJson()` grava `bx`; versão da placa = 24; `versao.json` = 24.
- [ ] **Step 5:** compilar: `"%LOCALAPPDATA%\Programs\Arduino IDE\resources\app\lib\backend\resources\arduino-cli.exe" compile --fqbn esp32:esp32:esp32:PartitionScheme=min_spiffs --output-dir build ar/firmware/gree-esp32` → sem erro; anotar uso de memória (não pode passar do que a versão 23 usa + 8 KB de RAM).
- [ ] **Step 6:** commit `Nossa casinha: placa versão 24 controla a TV Box pela rede`.

### Task 3: Aba "Box" nos dois apps

**Files:**
- Modify: `ar/index.html` (bloco novo depois do bloco `// TV AOC`, linha ~528)
- Modify: `ar/firmware/gree-esp32/web.h` (mesmo bloco, depois da linha 264)
- Modify: `.github/scripts/verificar.mjs:207` (acrescentar `'// TV Box'` à lista de blocos iguais)

**Interfaces:** consome `send(p)`, `S`, `ui` e as abas criadas pelo bloco `// TV AOC` (`.abas`, `#pAr`, `#pTv`).

- [ ] **Step 1: teste que falha.** Acrescentar `'// TV Box'` em `verificar.mjs`; `node .github/scripts/verificar.mjs` → ERRO (bloco não existe).
- [ ] **Step 2:** bloco `// TV Box`: cria a 3ª aba "Box" (`#aba-box`, painel `#pBox`), escondida se `(S.fw||0)<24`; botões: cruz com OK, Voltar, Início, Menu, Vol −/+, Mudo, Play/Pausa, "Abrir Zuxo", "Teclado" (campo de texto + Enviar → `{box:{txt}}`), "Reiniciar box" (pede confirmação). Cada botão → `send({box:{k:'<tecla>'}})`. Segurar setas e volume repete (0,45 s, depois 0,3 s, máx. 40), igual ao `REP` da TV. Linha de status com `S.bx.m`. Em Ajustes: campo "IP da TV Box" → `send({boxIp})`. Visual: mesmas classes do bloco da TV (`.tvx`, `.tvnav`, `.tvr`).
- [ ] **Step 3:** copiar o bloco idêntico para `web.h`.
- [ ] **Step 4:** `node .github/scripts/verificar.mjs` → `ok ar: bloco "TV Box" igual...` e zero erros; compilar a placa de novo (web.h mudou).
- [ ] **Step 5: conferência visual.** Abrir `ar/index.html` local com `S.fw=24` simulado (painel de depuração ou `S` no console) em 375 px: aba aparece, botões cabem, nada sobrepõe.
- [ ] **Step 6:** commit `Nossa casinha: aba Box no app`.

### Task 4: Guia e verificação final

**Files:** `CLAUDE.md` (seção do `ar/`, versão 24 e comando `box`), `ar/firmware/LEIA.md` (versão 24, `adb.h`, estado `bx`, IP), `ar/PRODUCT.md` se citar as abas.

- [ ] **Step 1:** atualizar os guias.
- [ ] **Step 2:** rodar o mesmo do workflow: `node .github/scripts/verificar.mjs` + todos os `teste-ar-*.mjs` + compilar a placa → tudo ok.
- [ ] **Step 3:** revisores do projeto (`.claude/agents/`) e corrigir o que apontarem.
- [ ] **Step 4:** commit `Nossa casinha: guia da versão 24 (TV Box)`. **Sem push** até o dono autorizar; depois do push: OTA `{"ota":"now"}`, conferir `fw=24` e testar a aba com a box.
