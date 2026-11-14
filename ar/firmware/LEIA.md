# Placa do ar-condicionado (gree-esp32)

Código da placa em `gree-esp32/` (reescrito em 13/11/2026; o código da versão 1 se perdeu e só existia o `.bin`).

- `gree-esp32.ino`: Wi-Fi (rede `GreeCtl`, senha `12345678`, quando não acha a rede da casa), app de casa em `http://gree.local`, infravermelho (controle universal com IRremoteESP8266, leitura do controle original e busca automática), sensor do quarto, horários programados, modo automático, nuvem (`ar_device_sync` no Supabase a cada 3 s) e atualização sem fio (`versao.json`, instala sozinha entre 03:00 e 03:59).
- `regras.h`: regra do modo automático. No horário escolhido, liga no Frio (na temperatura escolhida) quando o quarto está **acima** da temperatura escolhida (versão 3; antes esperava alvo + 1 °C); nessa temperatura ou abaixo, não liga. Desliga quando cai a alvo − 1 °C, só se foi o automático que ligou e só dentro do horário. Testada por `node .github/scripts/teste-ar-auto.mjs`.
- **TV AOC (versão 4):** controle universal da TV AOC comum. Códigos NEC, endereço 0/189 (lista pública irdb), tabela `TECLAS_TV` (22 botões; as setas também são canal ▲▼ e volume ◄►). O mesmo emissor D4 manda para o ar e para a TV, então a TV precisa "ver" a placa. Comandos: `{tecla:"volUp"}`, `{tvAprender:"volUp"}` (o próximo sinal do controle original, em até 30 s, vira o código desse botão, guardado como `tv_<botão>` e `tv_lista`), `{tvEsquecer:"volUp"}`. Estado: `tv:{a, l, m, mn}`. As telas têm abas **Ar** e **TV** (bloco "TV AOC", igual nos dois apps; o `verificar.mjs` confere também se os botões da tela são os mesmos da `TECLAS_TV`).
- **Controle universal de TV (versão 5):** `tv_universal.h` tem 86 "famílias" de TV (protocolo + endereço, com ligar, vol±, mudo, canal±), gerado por `ferramentas/gerar-tv-universal.mjs` a partir do `tv.ir` do Flipper Zero (flipperdevices/flipperzero-firmware, GPL-3.0; só os códigos "parsed"). Busca: `{tvBusca:"start|next|prev|again|ok|stop"}` manda o "ligar" de cada família a cada 3 s; `ok` grava a família em `tv_fam` (estado `tv.f`, 0 = códigos AOC). Com família escolhida, os outros botões (OK, menu, números…) dizem "ainda não tem código" até serem ensinados. A TV do dono (controle SKY-8014, genérico de AOC) não respondeu aos códigos AOC 0/189, e o receptor IR da placa não leu o controle dele em 14/11/2026 (pino D27 pode não ser o da placa real).
- `web.h`: páginas do app de casa. Os blocos de horários, automático, aparelho e atualização são iguais aos de `ar/index.html` (o `verificar.mjs` confere). Mudou um, mude o outro.
- `estado.h` (estruturas) e `certs.h` (certificados raiz, os mesmos da versão 1).
- Pinos: emissor IR D4, receptor IR D27, DHT22 D25 (`diagram.json`).
- Dados guardados: a placa procura a gaveta da memória onde está a chave `ckey` (da versão 1) e continua usando a mesma. A identidade (`p_id`) é o número de fábrica do chip. Assim a placa não perde a ligação com a conta.

## Compilar

Núcleo **esp32 2.0.17** (o mesmo da versão 1), partições **min_spiffs**, bibliotecas IRremoteESP8266 2.8.6, DHT sensor library 1.4.6, Adafruit Unified Sensor 1.1.15 e ArduinoJson 7.2.1. No PC do dono o `arduino-cli` vem com o Arduino IDE:

```
"%LOCALAPPDATA%\Programs\Arduino IDE\resources\app\lib\backend\resources\arduino-cli.exe" compile --fqbn esp32:esp32:esp32:PartitionScheme=min_spiffs --output-dir build ar/firmware/gree-esp32
```

O workflow `verificar.yml` (tarefa `placa-ar`) compila a cada push.

## Publicar uma versão nova

1. Aumente `FW_VERSAO` no `.ino` e compile.
2. Copie `build/gree-esp32.ino.bin` para `gree-vN.bin` e gere a imagem completa (`esptool merge_bin`: bootloader 0x1000, partições 0x8000, boot_app0 0xe000, programa 0x10000).
3. Troque `versao.json` para `{"versao":N,"url":".../gree-vN.bin"}`. A placa instala sozinha de madrugada, ou na hora em Ajustes do controle → Atualizar agora.

Arquivos: `gree.bin` e `gree-esp32-completo.bin` = versão 1 (a do código perdido); `gree-v5.bin` e `gree-esp32-completo-v5.bin` = versão 5 (as versões 2 a 4 estão no histórico do Git). Instalada na placa em 13/11/2026: versão 2, testada e funcionando (mesma identidade, ligada à conta).
