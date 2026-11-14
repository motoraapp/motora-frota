# Caixinhas para impressão 3D (placa do "Nossa casinha")

Duas versões, desenhadas por script (medidas em mm, todas como parâmetros no começo de cada arquivo):

| Versão | Arquivos | Tamanho da base | Para |
|---|---|---|---|
| Protoboard | `caixa-base.stl`, `caixa-tampa.stl` (`caixa.mjs`) | 90 x 63 x 42 | ESP32 numa protoboard de 400 furos |
| Placa solta | `solta-base.stl`, `solta-tampa.stl` (`caixa-solta.mjs`) | 81 x 49 x 35 | ESP32 DevKit v1 de 30 pinos sem protoboard, componentes nos fios |

As duas têm: janela/furo na frente para o LED e o receptor de infravermelho (o sinal não atravessa o plástico), abertura do USB à esquerda, ventilação para o sensor DHT22 medir o ar do quarto, tampa de encaixe com a casinha e "NOSSA CASINHA" gravados e entalhe para abrir. A "placa solta" segura a ESP32 pelas pontas (pinos e fios pendurados embaixo), não encosta nos botões EN/BOOT e tem um cantinho separado para o sensor, com pezinhos para o ar entrar por baixo.

Impressão: PLA, 0,2 mm, 20% de preenchimento, sem suporte. Base de pé; tampa de cabeça para baixo (desenho na mesa).

Gerar de novo depois de mudar uma medida:

```
cd ar/caixa
npm install
node caixa.mjs
node caixa-solta.mjs
```

`comum.mjs` tem as partes usadas pela versão "placa solta" (formas, furos, casinha, letreiro). As imagens `previa-*.png` mostram cada versão.
