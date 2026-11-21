# Controle da TV Box no Nossa casinha — desenho

Data: 20/11/2026. Pedido do dono: "monte um controle no app" para a TV Box (MX9, RK3229) que foi deixada só com o Zuxo Player.

## Por quê
A box virou "aparelho de um app só" (quiosque do Zuxo, sem Google). O controle físico dela é ruim/pode sumir, e o app de controle do Google não funciona mais (o Google foi removido). O dono quer comandar a box pelo celular, no mesmo app que já comanda o ar e a TV.

## Objetivos
- Aba nova **"Box"** no Nossa casinha (app de fora `ar/index.html` e app de casa `web.h`, mesmo bloco nos dois, como Ar e TV).
- Botões: setas + OK, Voltar, Início, Menu, Vol +/−, Mudo, Play/Pausa, **Abrir Zuxo**, **Teclado** (digitar texto na busca do Zuxo), **Reiniciar box**.
- Segurar seta/volume repete (igual ao volume da TV: 0,45 s, depois a cada 0,3 s, máx. 40 por toque).
- Mostrar se a placa conseguiu falar com a box (ok / sem resposta / pede autorização).

## Não objetivos
- Mouse/touchpad, espelhar a tela, instalar coisas na box pelo app.
- Controlar a box por infravermelho.
- Mexer no banco (o `ar_send` já aceita qualquer objeto JSON até 500 caracteres e 60 por minuto).

## Antiobjetivos (seria falha mesmo funcionando)
- Instalar qualquer app/serviço na box (a box tem 1 GB de RAM e foi enxugada de propósito).
- Deixar o ar/TV mais lentos ou instáveis: a placa já está no limite de memória para TLS + websocket.

## Restrições encontradas
- Placa do ar (ESP32, 192.168.1.83) e box (192.168.1.87) estão no mesmo Wi-Fi.
- A box tem ADB pela rede na porta 5555 **sem autenticação** (`ro.adb.secure=0`), Android 7.1.2.
- O app de fora é https (GitHub Pages): o navegador não deixa falar direto com a box. Tem que passar pela placa.
- Publicar (push do site, nova versão da placa, OTA) só com autorização do dono.

## Abordagens
1. **Placa fala ADB com a box pela rede (escolhida pelo dono).** Qualquer cômodo, sem aprender códigos, permite "Abrir Zuxo", teclado e reiniciar. Custa uma versão nova da placa com um cliente ADB mínimo.
2. Placa manda infravermelho para a box. Precisa estar de frente para o LED e aprender o controle (o receptor não leu controle em 14/11). Só faz o que o controle físico faz.
3. Celular direto na box: impossível a partir do site https.

## Como (decidido)
- **Comando no banco:** `{box:{k:"<tecla>"}}`, `{box:{txt:"<texto>"}}`, `{box:{abrir:"zuxo"}}`, `{box:{reiniciar:true}}`, `{boxIp:"a.b.c.d"}`.
  Teclas → keyevent Android: up 19, down 20, left 21, right 22, ok 23, back 4, home 3, menu 82, volup 24, voldown 25, mute 164, play 85.
- **Placa (versão 24):** cliente ADB mínimo em `adb.h` sobre `WiFiClient` (TCP comum, sem TLS): CNXN → espera CNXN (se vier AUTH, para e registra "pede autorização") → OPEN `shell:<comando>` → lê OKAY/WRTE/CLSE (responde OKAY a cada WRTE) → fecha. Uma conexão por lote de comandos, timeout curto (1,5 s), fila pequena para não travar o laço do ar. Comandos: `input keyevent N`, `input text '<texto escapado>'`, `monkey -p com.zuxoplayer.app 1`, `reboot`.
  IP da box guardado na memória da placa (`bx_ip`, padrão 192.168.1.87), trocável pelo app em Ajustes. Estado novo `bx` = {ok, m (última mensagem), ms}.
- **Apps:** aba "Box" (ícone de caixinha) ao lado de Ar e TV, no bloco compartilhado; textos e ícones no padrão visual atual (iOS escuro). Só aparece com a placa na versão 24 (`S.fw>=24`).
- **Testes:** funções puras do pacote ADB (cabeçalho, soma, mágica) e o escape do texto ficam em `adb.h` e ganham teste Node no `verificar.yml`, como `regras.h`; o `verificar.mjs` confere que os blocos de `web.h` e `ar/index.html` continuam iguais; compilação da placa já roda no workflow. Teste de verdade: placa na bancada (ou a do dono, depois de autorizado) mandando keyevent para a box.

## Fica para quem constrói
- Desenho exato dos botões (seguir o bloco da TV Sony).
- Achar a box sozinha na rede (varrer a porta 5555) — opcional, depois.
- Reservar o IP da box no roteador é recomendação ao dono, não código.
