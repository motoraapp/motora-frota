// Caixinha para impressão 3D da placa do "Nossa casinha" (ESP32 DevKit na protoboard de 400 furos).
// Gera caixa-base.stl e caixa-tampa.stl nesta pasta. Rodar: cd ar/caixa && npm install && node caixa.mjs
// Todas as medidas em milímetros. Para outra protoboard, troque bbX/bbY (830 furos: 165 x 55).
import modeling from '@jscad/modeling';
import stlSerializer from '@jscad/stl-serializer';
import { writeFileSync } from 'node:fs';

const { primitives: p, booleans: b, transforms: t, extrusions: e, text, expansions, measurements } = modeling;

export const P = {
  bbX: 83, bbY: 55.5,      // protoboard 400 furos (82,5 x 54,5) com folga
  folga: 1.5,              // espaço em volta da protoboard
  altInterna: 40,          // protoboard + ESP32 + fios por cima
  parede: 2.2, fundo: 2, raio: 4,
  tampa: 2.2, aba: 6, abaEsp: 1.6, ajuste: 0.25,  // tampa de encaixe: aba que entra na caixa
  janela: { l: 40, a: 16, z: 26 },                // infravermelho (LED e receptor), parede da frente
  usb: { l: 16, a: 11, z: 20 },                   // cabo USB, lado esquerdo
};
const iX = P.bbX + 2 * P.folga, iY = P.bbY + 2 * P.folga;
const oX = iX + 2 * P.parede, oY = iY + 2 * P.parede, oZ = P.fundo + P.altInterna;

const bloco = (x, y, z, r) => e.extrudeLinear({ height: z }, p.roundedRectangle({ size: [x, y], roundRadius: Math.min(r, x / 2 - 0.01, y / 2 - 0.01) }));
// Furo arredondado atravessando uma parede: largura l, altura a, centro em (x, y, z). eixo 'y' = frente/trás, 'x' = lados.
function furo(eixo, l, a, x, y, z) {
  const f = t.translate([0, 0, -P.parede * 2], bloco(l, a, P.parede * 4, Math.min(3, a / 2 - 0.01)));
  const girado = eixo === 'y' ? t.rotateX(Math.PI / 2, f) : t.rotateY(Math.PI / 2, t.rotateZ(Math.PI / 2, f));
  return t.translate([x, y, z], girado);
}

export function base() {
  let g = b.subtract(bloco(oX, oY, oZ, P.raio), t.translate([0, 0, P.fundo], bloco(iX, iY, oZ, P.raio - P.parede)));
  const furos = [
    furo('y', P.janela.l, P.janela.a, 0, -oY / 2, P.fundo + P.janela.z),       // frente: infravermelho
    furo('x', P.usb.l, P.usb.a, -oX / 2, 0, P.fundo + P.usb.z),                // esquerda: USB
    t.translate([0, -oY / 2, oZ - 1], p.cuboid({ size: [14, P.parede * 3, 2.2] })),  // entalhe para abrir a tampa
  ];
  for (let i = -2.5; i <= 2.5; i++) furos.push(furo('x', 2.6, 24, oX / 2, i * 5, P.fundo + 22));   // direita: ar para o sensor
  for (let i = -3.5; i <= 3.5; i++) furos.push(furo('y', 2.6, 10, i * 6, oY / 2, P.fundo + 14));   // fundo: ar quente sai
  return b.subtract(g, ...furos);
}

function casinha() {  // ícone da casinha (telhado, corpo e porta), 2D, com 18 mm de largura
  const corpo = p.polygon({ points: [[-7, -8], [7, -8], [7, 1], [0, 7.5], [-7, 1]] });
  const telhado = p.polygon({ points: [[-8.1, -0.3], [0, 7.1], [8.1, -0.3], [9.5, 1.2], [0, 9.8], [-9.5, 1.2]] });  // sentido anti-horário
  const porta = p.roundedRectangle({ size: [4.4, 6.5], roundRadius: 1.2, center: [0, -5.6] });
  return b.union(b.subtract(corpo, porta), telhado);
}
function letreiro(frase, altura) {
  const linhas = text.vectorText({ height: altura, align: 'center' }, frase);
  const g = b.union(linhas.map(l => expansions.expand({ delta: altura * 0.09, corners: 'round', segments: 8 }, modeling.geometries.path2.fromPoints({}, l))));
  const [[x0], [x1]] = measurements.measureBoundingBox(g);
  return t.translate([-(x0 + x1) / 2, 0, 0], g);
}

export function tampa() {
  const a = P.ajuste, lX = iX - 2 * a, lY = iY - 2 * a;
  let g = b.union(
    bloco(oX, oY, P.tampa, P.raio),
    t.translate([0, 0, P.tampa], b.subtract(bloco(lX, lY, P.aba, P.raio - P.parede), t.translate([0, 0, -1], bloco(lX - 2 * P.abaEsp, lY - 2 * P.abaEsp, P.aba + 2, 1))))
  );
  // A tampa é impressa de cabeça para baixo: o desenho fica no lado que encosta na mesa, espelhado para ler certo.
  const desenho = t.translate([-5, 0, 0], t.mirrorY(b.union(
    t.translate([0, 14, 0], casinha()), t.translate([0, -6, 0], letreiro('NOSSA', 5)), t.translate([0, -17, 0], letreiro('CASINHA', 5)))));
  const gravado = t.translate([0, 0, -0.01], e.extrudeLinear({ height: 0.8 }, desenho));
  const ventilacao = [];
  for (let i = 0; i < 3; i++) ventilacao.push(t.translate([oX / 2 - 15 + i * 3.6, 0, -1], p.cuboid({ size: [2.2, 30, P.tampa * 3], center: [0, 0, 0] })));
  return b.subtract(g, gravado, ...ventilacao);
}

if (process.argv[1] && process.argv[1].endsWith('caixa.mjs')) {
  for (const [nome, geo] of [['caixa-base', base()], ['caixa-tampa', tampa()]]) {
    const partes = stlSerializer.serialize({ binary: true }, geo);
    writeFileSync(new URL(nome + '.stl', import.meta.url), Buffer.concat(partes.map(x => Buffer.from(x))));
    const [[x0, y0, z0], [x1, y1, z1]] = measurements.measureBoundingBox(geo);
    console.log(`${nome}.stl: ${(x1 - x0).toFixed(1)} x ${(y1 - y0).toFixed(1)} x ${(z1 - z0).toFixed(1)} mm`);
  }
}
