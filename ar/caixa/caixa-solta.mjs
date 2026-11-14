// Caixinha para impressão 3D da placa do "Nossa casinha" SEM protoboard: ESP32 DevKit v1 (30 pinos) solta,
// com DHT22, LED e receptor de infravermelho ligados por fios.
// Gera solta-base.stl e solta-tampa.stl nesta pasta. Rodar: cd ar/caixa && npm install && node caixa-solta.mjs
// Medidas em milímetros (x = comprimento, y = profundidade, z = altura).
import { M, bloco, furo, furoRedondo, desenhoTampa, salvarStl } from './comum.mjs';
const { primitives: p, booleans: b, transforms: t, extrusions: e } = M;

export const P = {
  pcbX: 52, pcbY: 28.6, pcb: 1.6,   // ESP32 DevKit v1 de 30 pinos (51,5 x 28,3)
  vao: 20,           // espaço embaixo da placa para os pinos e os fios (jumper)
  acima: 9,          // espaço em cima da placa (módulo, botões, USB)
  frente: 13,        // espaço entre a placa e a parede da frente (LED, receptor, fios)
  dht: 19,           // cantinho do sensor DHT22 (15 x 25 x 8)
  parede: 2, fundo: 2, raio: 4, pe: 2,
  tampa: 2, aba: 5, abaEsp: 1.6, ajuste: 0.25,
  led: 5.4,          // furo do LED de infravermelho de 5 mm
  receptor: [9, 7.5],// janelinha do receptor (VS1838B)
  usb: [13, 9],      // abertura do cabo micro USB
};
const zonaX = P.pcbX + 4;                        // compartimento da placa
const iX = zonaX + P.parede + P.dht, iY = P.pcbY + 3 + P.frente, iH = P.vao + P.pcb + P.acima;
const oX = iX + 2 * P.parede, oY = iY + 2 * P.parede, oZ = P.fundo + iH;
const x0 = -iX / 2, y0 = -iY / 2;               // canto de dentro (esquerda, frente)
const pcbX0 = x0 + 2, pcbY0 = y0 + P.frente;     // canto da placa (lado do USB, frente)
const zPcb = P.fundo + P.vao;                    // altura de baixo da placa
const xDiv = x0 + zonaX;                         // parede que separa o sensor

export function base() {
  let g = b.subtract(bloco(oX, oY, oZ, P.raio), t.translate([0, 0, P.fundo], bloco(iX, iY, oZ, P.raio - P.parede)));
  // Pezinhos (o ar entra por baixo no cantinho do sensor)
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
    g = b.union(g, t.translate([sx * (oX / 2 - 7), sy * (oY / 2 - 7), -P.pe], p.cylinder({ radius: 4, height: P.pe, center: [0, 0, P.pe / 2] })));
  // Colunas que seguram as pontas da placa (sem pinos nessas pontas), com guias dos lados
  const coluna = (x, y) => t.translate([x, y, P.fundo], e.extrudeLinear({ height: P.vao }, p.rectangle({ size: [4, 5] })));
  const pecas = [];
  for (const xc of [pcbX0 + 2.2, pcbX0 + P.pcbX - 2.2])
    for (const yc of [pcbY0 + 6, pcbY0 + P.pcbY - 6]) pecas.push(coluna(xc, yc));
  for (const yc of [pcbY0 - 1.2, pcbY0 + P.pcbY + 1.2])      // guias: não deixam a placa escorregar para os lados
    for (const xc of [pcbX0 + 2.2, pcbX0 + P.pcbX - 2.2])
      pecas.push(t.translate([xc, yc, P.fundo], e.extrudeLinear({ height: P.vao + 3 }, p.rectangle({ size: [4, 1.6] }))));
  pecas.push(t.translate([pcbX0 + P.pcbX + 1.2, pcbY0 + P.pcbY / 2, P.fundo], e.extrudeLinear({ height: P.vao + 3 }, p.rectangle({ size: [1.6, 8] }))));  // batente na ponta da antena
  // Parede do cantinho do sensor (mais baixa que a caixa, para a aba da tampa e os fios passarem por cima)
  pecas.push(t.translate([xDiv + P.parede / 2, 0, P.fundo], e.extrudeLinear({ height: iH - P.aba - 1 }, p.rectangle({ size: [P.parede, iY] }))));
  g = b.union(g, ...pecas);
  const furos = [
    furoRedondo(P.led, pcbX0 + 16, -oY / 2, P.fundo + 14, P.parede),                       // frente: LED infravermelho
    furo('y', P.receptor[0], P.receptor[1], pcbX0 + 30, -oY / 2, P.fundo + 14, P.parede),  // frente: receptor
    furo('x', P.usb[0], P.usb[1], -oX / 2, pcbY0 + P.pcbY / 2, zPcb + P.pcb + 1.5, P.parede),  // esquerda: USB
    t.translate([pcbX0 + 23, -oY / 2, oZ - 1], p.cuboid({ size: [12, P.parede * 3, 2.2] })),   // entalhe para abrir a tampa
  ];
  const xs = xDiv + P.parede + P.dht / 2;
  for (let i = -2; i <= 2; i++) furos.push(furo('x', 2.4, 18, oX / 2, i * 5.5, P.fundo + 14, P.parede));          // lado do sensor
  for (let i = -1; i <= 1; i++) furos.push(t.translate([xs + i * 4.5, 0, -P.pe - 1], p.cuboid({ size: [2.2, iY - 12, 8], center: [0, 0, 2] })));  // chão do sensor
  for (let i = -3; i <= 3; i++) furos.push(furo('y', 2.4, 8, pcbX0 + 10 + i * 5, oY / 2, P.fundo + 8, P.parede)); // fundo: ar quente da placa sai
  return b.subtract(g, ...furos);
}

export function tampa() {
  const a = P.ajuste, lX = iX - 2 * a, lY = iY - 2 * a;
  let g = b.union(
    bloco(oX, oY, P.tampa, P.raio),
    t.translate([0, 0, P.tampa], b.subtract(bloco(lX, lY, P.aba, P.raio - P.parede), t.translate([0, 0, -1], bloco(lX - 2 * P.abaEsp, lY - 2 * P.abaEsp, P.aba + 2, 1)))),
  );
  // Pino que encosta na ponta da antena e segura a placa (longe dos botões EN e BOOT, que ficam no lado do USB).
  // A tampa é impressa de cabeça para baixo, então y fica espelhado.
  const alturaPino = oZ - (zPcb + P.pcb + 0.8) - 0.3;
  g = b.union(g, t.translate([pcbX0 + P.pcbX - 3, -(pcbY0 + P.pcbY / 2), P.tampa], p.cylinder({ radius: 2.5, height: alturaPino, center: [0, 0, alturaPino / 2] })));
  const desenho = t.translate([(x0 + xDiv) / 2, 0, -0.01], e.extrudeLinear({ height: 0.8 }, desenhoTampa(0.85)));
  const xs = xDiv + P.parede + P.dht / 2, vent = [];
  for (let i = -1; i <= 1; i++) vent.push(t.translate([xs + i * 4.5, 0, -1], p.cuboid({ size: [2.2, iY - 12, P.tampa * 3], center: [0, 0, 0] })));
  return b.subtract(g, desenho, ...vent);
}

if (process.argv[1] && process.argv[1].endsWith('caixa-solta.mjs')) {
  salvarStl(import.meta.url, 'solta-base', base());
  salvarStl(import.meta.url, 'solta-tampa', tampa());
}
