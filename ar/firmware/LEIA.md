# Placa do ar-condicionado (gree-esp32)

Código da placa em `gree-esp32/` (reescrito em 13/11/2026; o código da versão 1 se perdeu e só existia o `.bin`).

- `gree-esp32.ino`: Wi-Fi (rede `GreeCtl`, senha `12345678`, quando não acha a rede da casa), app de casa em `http://gree.local`, infravermelho (controle universal com IRremoteESP8266, leitura do controle original e busca automática), sensor do quarto, horários programados, modo automático, nuvem (`ar_device_sync` no Supabase a cada 3 s) e atualização sem fio (`versao.json`, instala sozinha entre 03:00 e 03:59).
- `regras.h`: regras do "A mimi?" (`regraMimi`) e do volume da TV (`volDepois`). Testadas por `node .github/scripts/teste-ar-regras.mjs`, que também garante que o modo automático não voltou. **O modo automático saiu na versão 24** (pedido do dono, 20/11/2026).
- **TV AOC (versão 4):** controle universal da TV AOC comum. Códigos NEC, endereço 0/189 (lista pública irdb), tabela `TECLAS_TV` (22 botões; as setas também são canal ▲▼ e volume ◄►). O mesmo emissor D4 manda para o ar e para a TV, então a TV precisa "ver" a placa. Comandos: `{tecla:"volUp"}`, `{tvAprender:"volUp"}` (o próximo sinal do controle original, em até 30 s, vira o código desse botão, guardado como `tv_<botão>` e `tv_lista`), `{tvEsquecer:"volUp"}`. Estado: `tv:{a, l, m, mn}`. As telas têm abas **Ar** e **TV** (bloco "TV AOC", igual nos dois apps; o `verificar.mjs` confere também se os botões da tela são os mesmos da `TECLAS_TV`).
- **Controle universal de TV (versão 5):** `tv_universal.h` tem 86 "famílias" de TV (protocolo + endereço, com ligar, vol±, mudo, canal±), gerado por `ferramentas/gerar-tv-universal.mjs` a partir do `tv.ir` do Flipper Zero (flipperdevices/flipperzero-firmware, GPL-3.0; só os códigos "parsed"). Busca: `{tvBusca:"start|next|prev|again|ok|stop"}` manda o "ligar" de cada família a cada 3 s; `ok` grava a família em `tv_fam` (estado `tv.f`, 0 = códigos AOC). Com família escolhida, os outros botões (OK, menu, números…) dizem "ainda não tem código" até serem ensinados. A TV do dono (controle SKY-8014, genérico de AOC) não respondeu aos códigos AOC 0/189, e o receptor IR da placa não leu o controle dele em 14/11/2026 (pino D27 pode não ser o da placa real).
- `web.h`: páginas do app de casa. Os blocos de horários, automático, aparelho e atualização são iguais aos de `ar/index.html` (o `verificar.mjs` confere). Mudou um, mude o outro.
- **Leitura do quarto (14/11/2026):** o bloco "Sensor do quarto" mostra "Última leitura às HH:MM" (app de fora: `DEV.last_seen`; app de casa: hora do aparelho) e uma seta comparando com a última leitura diferente, guardada no aparelho (`localStorage` `tq`): vermelha ▲ = esquentando, verde ▼ = esfriando. Só a tela mudou; no app de casa entra quando sair uma versão nova da placa.
- **Segurar volume (14/11/2026):** no bloco "TV AOC", segurar Volume + ou − repete o botão (0,45 s, depois a cada 0,3 s, no máximo 40 por toque; `REP`, `pararRep`). No app de fora os comandos chegam em lotes a cada 3 s (a placa busca a cada 3 s) e valem os limites do `ar_send` (60 por minuto). Só a tela mudou.
- **Versão 24 (20/11/2026): modo automático retirado** (pedido do dono): saíram `checarAuto`, `regraAuto`, as faixas, a janela/lá fora (`{fora}` é ignorado), o comando `{auto}` e o estado `auto`; o bloco "Sensor do quarto" dos apps só mostra a leitura. A Siri responde que o automático foi retirado. Chaves `a_*` antigas ficam esquecidas na memória da placa. **E controle da TV Box pela rede.** Aba **"Box"** nos dois apps (bloco `// TV Box`, só com `S.fw>=24`). A placa fala ADB com a TV Box (MX9/RK3229, só o Zuxo Player, ADB na porta 5555 sem senha): conecta, CNXN → OPEN `<destino>` → OKAY a cada WRTE até CLSE (`bxEnviar`; contas puras em `adb.h`, teste `node .github/scripts/teste-ar-adb.mjs`). Comandos: `{box:{k:"up|down|left|right|ok|back|home|menu|volup|voldown|mute|play"}}` (`input keyevent`; teclas seguidas vão juntas), `{box:{txt}}` (`input text`, só letras, números e `. , - _ @ : !`, espaço = `%s`, máx. 60), `{box:{abrir:"zuxo"}}` (`am start`), `{box:{reiniciar:true}}` (serviço `reboot:`), `{boxIp:"a.b.c.d"}` (NVS `bx_ip`, padrão 192.168.1.87). Fila de 16 (`bxFila`, `cuidarBox`); box fora = desiste em 1,5 s, esvazia a fila e descarta comandos por 10 s (`bxFalhaEm`); espera até 3 s pela resposta; recusa = "recusou o comando". Estado `bx` = {ip, ok, m, ms}. Prova contra a box: `node ferramentas/adb-teste.mjs 192.168.1.87 "echo ola"`. **A box atende só UMA conexão ADB por vez** (20/11/2026): com o `adb` do PC conectado, a placa fica "sem resposta"; rode `adb disconnect` depois de mexer pelo PC. Provado na box: echo, `input keyevent 3 0`, `am start` do Zuxo e `input text`.
- **Versão 23 (20/11/2026):** no Gree cada comando do ar sai 2 vezes, com 150 ms entre elas (`enviar`). Motivo: o dono contou que o ar "às vezes obedece, às vezes não"; o Gree manda o estado inteiro, então a 2ª cópia não muda nada e só dá outra chance. Outras marcas continuam com 1 envio (botão liga/desliga poderia desfazer).
- **Versão 22 (17/11/2026):** a espera do automático (depois que a pessoa desliga o ar) acaba também quando o horário escolhido termina (`regraAuto` em `regras.h`, testada). Antes só acabava com o quarto na temperatura escolhida; com uma escolhida que o quarto não alcança sozinho (ex.: 19 °C), o automático nunca mais ligava. Compilada e publicada pelo `pages.yml` (passo "Placa do ar"), sem o PC.
- **Versão 17 (14/11/2026):** barra de volume da TV: `{tvVol:N}` (a placa conta o volume em `tv_vol` e dá um toque a cada 200 ms; o 1º toque com o volume escondido só mostra, regra `volDepois`), `{tvVolZerar:true}`, `{tvVolDefinir:N}`; estado `tv.v`/`tv.va`.
- **Versão 16 (14/11/2026):** o `HTTPClient` da busca é `static`: local, o destrutor fechava a conexão e cada busca abria uma conexão segura nova (~3,3 s). Agora a conexão fica aberta entre as buscas.
- **Versão 15 (14/11/2026):** diário da busca no estado (`sy`: tempo da última e da maior, quantas reusaram a conexão e quantas abriram nova).
- **Versão 14 (14/11/2026):** busca de volta a cada 3 s, sempre (mantém a conexão segura aberta; com 10 s o servidor fechava e cada cutucão esperava ~3 s).
- **Versão 13 (14/11/2026):** websocket próprio em cima do `WiFiClientSecure` (`rtConectar`, `rtLer`, `rtQuadro`): a biblioteca WebSockets nunca conectou na placa. Sem biblioteca nova.
- **Versão 12 (14/11/2026):** nova tentativa do websocket a cada 20 s, fechando antes a conexão da busca para sobrar memória; estado `hmax` e `rtd.t`.
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

Núcleo **esp32 2.0.17** (o mesmo da versão 1), partições **min_spiffs**, bibliotecas IRremoteESP8266 2.8.6, DHT sensor library 1.4.6, Adafruit Unified Sensor 1.1.15 e ArduinoJson 7.2.1. No PC do dono o `arduino-cli` vem com o Arduino IDE:

```
"%LOCALAPPDATA%\Programs\Arduino IDE\resources\app\lib\backend\resources\arduino-cli.exe" compile --fqbn esp32:esp32:esp32:PartitionScheme=min_spiffs --output-dir build ar/firmware/gree-esp32
```

O workflow `verificar.yml` (tarefa `placa-ar`) compila a cada push.

## Publicar uma versão nova

**Sem o PC (desde a versão 22):** aumente `FW_VERSAO` no `.ino` e publique na `main`. Se não existir `gree-vN.bin` para esse número, o `pages.yml` compila a placa, publica `ar/firmware/gree-vN.bin` e troca o `versao.json` do site (o do repositório fica como está; se a compilação falhar, o site continua com a versão anterior). Depois mande `{"ota":"now"}` em `ar.cmd`. A imagem completa (placa nova) continua sendo gerada no PC.

1. Aumente `FW_VERSAO` no `.ino` e compile.
2. Copie `build/gree-esp32.ino.bin` para `gree-vN.bin` e gere a imagem completa (`esptool merge_bin`: bootloader 0x1000, partições 0x8000, boot_app0 0xe000, programa 0x10000).
3. Troque `versao.json` para `{"versao":N,"url":".../gree-vN.bin"}`. A placa instala sozinha de madrugada, ou na hora em Ajustes do controle → Atualizar agora.

Arquivos: `gree.bin` e `gree-esp32-completo.bin` = versão 1 (a do código perdido); `gree-v21.bin` e `gree-esp32-completo-v21.bin` = versão 21 (as versões 2 a 20 estão no histórico do Git). Instalada na placa em 13/11/2026: versão 2, testada e funcionando (mesma identidade, ligada à conta).

## Esquema de ligação

`esquema.svg` / `esquema.png`: DHT22 no D25 (com 10 kΩ entre DADOS e 3V3), receptor IR (VS1838B) no D27, LED IR no D4 com resistor de 220 Ω até o GND, tudo em 3V3/GND da ESP32. Tirado do `diagram.json`; o receptor não leu o controle em 14/11/2026, então confira o pino dele na placa real.
