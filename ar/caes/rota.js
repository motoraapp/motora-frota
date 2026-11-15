// Rota dos cachorros (16/11/2026, regra do dono): eles só andam/correm na HORIZONTAL, em faixas de altura fixa.
// Para mudar de altura: andam até sair inteiros por uma lateral, trocam a altura fora da tela e entram de novo pela lateral
// na faixa nova. Nunca sobem ou descem pelo meio da tela. Testado em .github/scripts/teste-ar-caes-sprites.mjs.
//
// rota(x0, y0, x1, y1, largura da tela, fora) → lista de pontos [{x, y, salto}] a seguir em ordem.
// `salto: true` = troca de altura instantânea (acontece fora da tela: x < -fora/2 ou x > largura + fora/2).
// fora = quanto além da borda o cachorro precisa ir para sumir inteiro (≥ metade da largura dele).
export const MESMA_FAIXA = 2; // px: diferença de altura que ainda conta como a mesma faixa
export function rota(x0, y0, x1, y1, W, fora) {
  if (Math.abs(y1 - y0) <= MESMA_FAIXA) return [{ x: x1, y: y0, salto: false }];
  // sai pela lateral que dá o caminho mais curto (ir até a borda + voltar da mesma borda até o destino)
  const esq = (x0 + fora) + (x1 + fora), dir = (W + fora - x0) + (W + fora - x1);
  const bx = esq <= dir ? -fora : W + fora;
  return [{ x: bx, y: y0, salto: false }, { x: bx, y: y1, salto: true }, { x: x1, y: y1, salto: false }];
}
// o cachorro está fora da tela (pode trocar de altura sem ninguém ver)?
export const foraDaTela = (x, W, fora) => x <= -fora * 0.5 || x >= W + fora * 0.5;
