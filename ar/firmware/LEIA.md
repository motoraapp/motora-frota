# Placa do ar-condicionado (gree-esp32)

Código da placa em `gree-esp32/` (reescrito em 13/11/2026; o código da versão 1 se perdeu e só existia o `.bin`).

- `gree-esp32.ino`: Wi-Fi (rede `GreeCtl`, senha `12345678`, quando não acha a rede da casa), app de casa em `http://gree.local`, infravermelho (controle universal com IRremoteESP8266, leitura do controle original e busca automática), sensor do quarto, horários programados, modo automático, nuvem (`ar_device_sync` no Supabase a cada 3 s) e atualização sem fio (`versao.json`, instala sozinha entre 03:00 e 03:59).
- `regras.h`: regra do modo automático. No horário escolhido, liga no Frio (na temperatura escolhida) quando o quarto está **acima** da temperatura escolhida (versão 3; antes esperava alvo + 1 °C); nessa temperatura ou abaixo, não liga. Desliga quando cai a alvo − 2 °C (versão 7; antes − 1 °C), só se foi o automático que ligou e só dentro do horário. Testada por `node .github/scripts/teste-ar-auto.mjs`.
- **TV AOC (versão 4):** controle universal da TV AOC comum. Códigos NEC, endereço 0/189 (lista pública irdb), tabela `TECLAS_TV` (22 botões; as setas também são canal ▲▼ e volume ◄►). O mesmo emissor D4 manda para o ar e para a TV, então a TV precisa "ver" a placa. Comandos: `{tecla:"volUp"}`, `{tvAprender:"volUp"}` (o próximo sinal do controle original, em até 30 s, vira o código desse botão, guardado como `tv_<botão>` e `tv_lista`), `{tvEsquecer:"volUp"}`. Estado: `tv:{a, l, m, mn}`. As telas têm abas **Ar** e **TV** (bloco "TV AOC", igual nos dois apps; o `verificar.mjs` confere também se os botões da tela são os mesmos da `TECLAS_TV`).
- **Controle universal de TV (versão 5):** `tv_universal.h` tem 86 "famílias" de TV (protocolo + endereço, com ligar, vol±, mudo, canal±), gerado por `ferramentas/gerar-tv-universal.mjs` a partir do `tv.ir` do Flipper Zero (flipperdevices/flipperzero-firmware, GPL-3.0; só os códigos "parsed"). Busca: `{tvBusca:"start|next|prev|again|ok|stop"}` manda o "ligar" de cada família a cada 3 s; `ok` grava a família em `tv_fam` (estado `tv.f`, 0 = códigos AOC). Com família escolhida, os outros botões (OK, menu, números…) dizem "ainda não tem código" até serem ensinados. A TV do dono (controle SKY-8014, genérico de AOC) não respondeu aos códigos AOC 0/189, e o receptor IR da placa não leu o controle dele em 14/11/2026 (pino D27 pode não ser o da placa real).
- `web.h`: páginas do app de casa. Os blocos de horários, automático, aparelho e atualização são iguais aos de `ar/index.html` (o `verificar.mjs` confere). Mudou um, mude o outro.
- **Leitura do quarto (14/11/2026):** o bloco "Sensor do quarto" mostra "Última leitura às HH:MM" (app de fora: `DEV.last_seen`; app de casa: hora do aparelho) e uma seta comparando com a última leitura diferente, guardada no aparelho (`localStorage` `tq`): vermelha ▲ = esquentando, verde ▼ = esfriando. Só a tela mudou; no app de casa entra quando sair uma versão nova da placa.
- **Segurar volume (14/11/2026):** no bloco "TV AOC", segurar Volume + ou − repete o botão (0,45 s, depois a cada 0,3 s, no máximo 40 por toque; `REP`, `pararRep`). No app de fora os comandos chegam em lotes a cada 3 s (a placa busca a cada 3 s) e valem os limites do `ar_send` (60 por minuto). Só a tela mudou.
- **Versão 11 (14/11/2026):** diário do aviso na hora no estado (`rtd`: conexões, quedas, cutucões, última mensagem) e ping de websocket a cada 15 s.
- **Versão 10 (14/11/2026):** com o aviso na hora ligado, a busca de reserva é a cada 10 s (3 s sem ele) e, depois de aplicar comandos, sincroniza de novo na hora.
- **Versão 9 (14/11/2026):** comando na hora: websocket do Realtime do Supabase (WebSockets 2.7.2) no canal `ar-` + 24 primeiros hexa do sha256 da chave; o banco cutuca a cada comando (`ar_cmd_acorda`) e a placa sincroniza na hora. Só conecta com mais de 70 KB livres; desconecta antes de atualizar. Estado `rt` e `heap`.
- **Versão 8 (14/11/2026):** "A mimi?" feito pela placa: `{mimi:true}` = Frio 20° com turbo e ventilação 3; com 2 h sobe para 22° (sem turbo); depois, a cada 5 min, volta a 20° se o quarto passar de 22 °C e sobe para 22° quando cair a 21 °C (`regraMimi` em `regras.h`). Mexer no ar encerra. O botão não desliga mais a TV.
- **Versão 7 (14/11/2026):** o automático desliga 2 °C abaixo da temperatura escolhida (antes 1 °C; `regras.h`, teste `teste-ar-auto.mjs`).
- **Versão 6 (14/11/2026):** só telas do app de casa: visual novo (padrão do app Casa do iPhone), botão **"A mimi?"** (Frio 20 °C, turbo e ventilação 3 num comando só, mais `tvDesligar:7200`: a placa desliga a TV em 2 h com a tecla power; estado `tv.dz`), seta e hora da leitura, segurar volume, sem zoom. **Regra do dono (14/11/2026): sempre que sair versão nova, atualizar a placa** (aumentar `versao.json`, publicar e mandar `{"ota":"now"}`).
- `estado.h` (estruturas) e `certs.h` (certificados raiz, os mesmos da versão 1).
- Pinos: emissor IR D4, receptor IR D27, DHT22 D25 (`diagram.json`).
- Dados guardados: a placa procura a gaveta da memória onde está a chave `ckey` (da versão 1) e continua usando a mesma. A identidade (`p_id`) é o número de fábrica do chip. Assim a placa não perde a ligação com a conta.

## Compilar

Núcleo **esp32 2.0.17** (o mesmo da versão 1), partições **min_spiffs**, bibliotecas IRremoteESP8266 2.8.6, DHT sensor library 1.4.6, Adafruit Unified Sensor 1.1.15, ArduinoJson 7.2.1 e WebSockets 2.7.2. No PC do dono o `arduino-cli` vem com o Arduino IDE:

```
"%LOCALAPPDATA%\Programs\Arduino IDE\resources\app\lib\backend\resources\arduino-cli.exe" compile --fqbn esp32:esp32:esp32:PartitionScheme=min_spiffs --output-dir build ar/firmware/gree-esp32
```

O workflow `verificar.yml` (tarefa `placa-ar`) compila a cada push.

## Publicar uma versão nova

1. Aumente `FW_VERSAO` no `.ino` e compile.
2. Copie `build/gree-esp32.ino.bin` para `gree-vN.bin` e gere a imagem completa (`esptool merge_bin`: bootloader 0x1000, partições 0x8000, boot_app0 0xe000, programa 0x10000).
3. Troque `versao.json` para `{"versao":N,"url":".../gree-vN.bin"}`. A placa instala sozinha de madrugada, ou na hora em Ajustes do controle → Atualizar agora.

Arquivos: `gree.bin` e `gree-esp32-completo.bin` = versão 1 (a do código perdido); `gree-v11.bin` e `gree-esp32-completo-v11.bin` = versão 11 (as versões 2 a 10 estão no histórico do Git). Instalada na placa em 13/11/2026: versão 2, testada e funcionando (mesma identidade, ligada à conta).

## Esquema de ligação

`esquema.svg` / `esquema.png`: DHT22 no D25 (com 10 kΩ entre DADOS e 3V3), receptor IR (VS1838B) no D27, LED IR no D4 com resistor de 220 Ω até o GND, tudo em 3V3/GND da ESP32. Tirado do `diagram.json`; o receptor não leu o controle em 14/11/2026, então confira o pino dele na placa real.
