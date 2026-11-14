# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

O dono e a esposa, cada um no seu celular (iPhone), com o app instalado na tela de início ("Nossa casinha"). Leigos em tecnologia. Uso principal: à noite, deitados na cama com a luz do quarto apagada, ligando/ajustando o ar-condicionado e mexendo na TV. Também abrem fora de casa para conferir o quarto ou ligar o ar antes de chegar.

## Product Purpose

Controle remoto da casa pelo celular: ar-condicionado Gree e TV (AOC/genérica) por uma placa ESP32 com emissor infravermelho, sensor de temperatura e umidade do quarto, modo automático, horários programados, gráfico da temperatura máxima e atalho da Siri. Sucesso = apertar um botão e o ar/TV obedecerem na hora, sem pensar.

## Operating Context

- App de fora: https://motoraapp.github.io/motora-frota/ar/ (`ar/index.html`), login com a conta master do MOTORA, comandos vão pela nuvem (Supabase) e a placa busca a cada 3 s.
- App de casa: servido pela própria placa (`ar/firmware/gree-esp32/web.h`, `http://gree.local`), sem internet, resposta imediata. Blocos compartilhados ("Horários programados", "Sensor do quarto", "Aparelho", "Atualização sem fio", "TV AOC") têm de ser idênticos nos dois (o `verificar.mjs` confere).
- Quarto escuro: a tela não pode ofuscar.

## Capabilities and Constraints

- Abas Ar | TV. Ar: ligar/desligar, temperatura 16–30, modos (Frio, Quente, Seco, Vent, Auto), ventilação, Swing/Turbo/Luz/X-Fan/Sleep, temperatura do quarto com seta e hora, gráfico (7 dias/Mês/Ano), modo automático, horários, ajustes (modelo do controle, Siri, desligar placa). TV: ligar, setas/OK, volume (segurar repete), canal, números, menu, aprender botões, "Achar minha TV".
- **Velocidade dos botões é requisito:** resposta visual imediata ao toque, sem animação que atrase, sem biblioteca nova, sem fonte externa que bloqueie a página.
- O app de casa vive na memória da placa (cada byte conta); só muda com versão nova da placa, liberada pelo dono.
- Sem zoom (pinça, toque duplo, foco em campo).
- Português do Brasil, linguagem simples.

## Brand Commitments

Nome "Nossa casinha", ícone de casinha com coração (`ar/icon.svg`, `ar/icon-*.png`, azul #2f7cf6). Tema escuro.

## Product Principles

1. Um toque, uma ação, resposta na hora.
2. Legível no escuro, sem ofuscar.
3. O mais usado à mão; o raro guardado.
4. Palavras de casa, não de técnico.

## Accessibility & Inclusion

Alvos de toque de 44 px ou mais; texto de 12 px ou mais; contraste 4,5:1; nada que dependa só de cor (a seta da temperatura também tem texto para leitor de tela).
