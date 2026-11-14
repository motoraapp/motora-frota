// Partes comuns das caixinhas do "Nossa casinha": formas arredondadas, furos nas paredes, casinha e letreiro.
import modeling from '@jscad/modeling';
import stlSerializer from '@jscad/stl-serializer';
import { writeFileSync } from 'node:fs';

export const M = modeling;
const { primitives: p, booleans: b, transforms: t, extrusions: e, text, expansions, measurements } = modeling;

// Bloco arredondado nos cantos (vista de cima), do chão (z = 0) até a altura z, centrado em x e y.
export const bloco = (x, y, z, r) => e.extrudeLinear({ height: z }, p.roundedRectangle({ size: [x, y], roundRadius: Math.min(r, x / 2 - 0.01, y / 2 - 0.01) }));

// Furo arredondado atravessando uma parede de espessura `parede`: largura l, altura a, centro em (x, y, z).
// eixo 'y' = paredes da frente e de trás; 'x' = paredes dos lados.
export function furo(eixo, l, a, x, y, z, parede) {
  const f = t.translate([0, 0, -parede * 2], bloco(l, a, parede * 4, Math.min(3, a / 2 - 0.01)));
  const girado = eixo === 'y' ? t.rotateX(Math.PI / 2, f) : t.rotateY(Math.PI / 2, t.rotateZ(Math.PI / 2, f));
  return t.translate([x, y, z], girado);
}
// Furo redondo na parede da frente/trás (eixo y), diâmetro d.
export function furoRedondo(d, x, y, z, parede) {
  return t.translate([x, y, z], t.rotateX(Math.PI / 2, p.cylinder({ radius: d / 2, height: parede * 4, segments: 48 })));
}

// Ícone da casinha (telhado, corpo e porta), 2D, com 19 mm de largura.
export function casinha() {
  const corpo = p.polygon({ points: [[-7, -8], [7, -8], [7, 1], [0, 7.5], [-7, 1]] });
  const telhado = p.polygon({ points: [[-8.1, -0.3], [0, 7.1], [8.1, -0.3], [9.5, 1.2], [0, 9.8], [-9.5, 1.2]] });  // sentido anti-horário
  const porta = p.roundedRectangle({ size: [4.4, 6.5], roundRadius: 1.2, center: [0, -5.6] });
  return b.union(b.subtract(corpo, porta), telhado);
}
// Texto 2D centrado, com traço grosso o bastante para a impressora.
export function letreiro(frase, altura) {
  const linhas = text.vectorText({ height: altura, align: 'center' }, frase);
  const g = b.union(linhas.map(l => expansions.expand({ delta: altura * 0.09, corners: 'round', segments: 8 }, modeling.geometries.path2.fromPoints({}, l))));
  const [[x0], [x1]] = measurements.measureBoundingBox(g);
  return t.translate([-(x0 + x1) / 2, 0, 0], g);
}
// Desenho da tampa (casinha + "NOSSA CASINHA"), espelhado: a tampa é impressa de cabeça para baixo.
export function desenhoTampa(escala = 1) {
  return t.mirrorY(t.scale([escala, escala, 1], b.union(
    t.translate([0, 14, 0], casinha()), t.translate([0, -6, 0], letreiro('NOSSA', 5)), t.translate([0, -17, 0], letreiro('CASINHA', 5)))));
}

export function salvarStl(url, nome, geo) {
  const partes = stlSerializer.serialize({ binary: true }, geo);
  writeFileSync(new URL(nome + '.stl', url), Buffer.concat(partes.map(x => Buffer.from(x))));
  const [[x0, y0, z0], [x1, y1, z1]] = measurements.measureBoundingBox(geo);
  console.log(`${nome}.stl: ${(x1 - x0).toFixed(1)} x ${(y1 - y0).toFixed(1)} x ${(z1 - z0).toFixed(1)} mm`);
}
