// Boneco articulado em WebGL: cada desenho (ar/caes/img/*.png) vira uma grade de triângulos e as articulações (cabeça, orelhas, rabo,
// 4 patas com ombro/quadril e joelho/pulso; ver `ossos` em config.js) puxam os pontos da grade, com transição suave entre as partes.
// Piscar e dormir: a camada `olhos` (pedaço do desenho de olhos fechados) aparece por cima. Maya: troca para o desenho sentada ao
// sentar/deitar, com transição suave. Se o aparelho não tiver WebGL, dogs3d.js usa desenho.js (imagem inteira, sem articulações).
import { articular, transformar, piscar, poseSentada } from './movimento.js';

const VS = `
attribute vec2 aUV; attribute vec4 aWa; attribute vec4 aWb; attribute vec4 aWc; attribute vec4 aWd;
uniform vec2 uNat; uniform vec4 uM[16]; uniform vec2 uT[16];
uniform vec4 uG; uniform vec4 uP; uniform vec2 uRes;
varying vec2 vUV; varying float vY;
void main() {
  vec2 p0 = aUV * uNat;
  float w[16];
  w[0] = aWa.x; w[1] = aWa.y; w[2] = aWa.z; w[3] = aWa.w; w[4] = aWb.x; w[5] = aWb.y; w[6] = aWb.z; w[7] = aWb.w;
  w[8] = aWc.x; w[9] = aWc.y; w[10] = aWc.z; w[11] = aWc.w; w[12] = aWd.x; w[13] = aWd.y; w[14] = aWd.z; w[15] = aWd.w;
  vec2 p = p0;
  for (int i = 0; i < 16; i++) {
    vec4 m = uM[i];
    vec2 q = vec2(m.x * p0.x + m.z * p0.y, m.y * p0.x + m.w * p0.y) + uT[i];
    p += w[i] * (q - p0);
  }
  vec2 l = (p - vec2(uNat.x * 0.5, uNat.y)) * uG.x * vec2(uP.z, uP.w);
  float c = cos(uG.z), s = sin(uG.z);
  l = vec2(c * l.x - s * l.y, s * l.x + c * l.y);
  l.x *= uG.y;
  vec2 sc = vec2(uP.x + l.x, uP.y + l.y);
  gl_Position = vec4(sc.x / uRes.x * 2.0 - 1.0, 1.0 - sc.y / uRes.y * 2.0, 0.0, 1.0);
  vUV = aUV; vY = sc.y;
}`;
const FS = `precision mediump float; varying vec2 vUV; varying float vY; uniform sampler2D uTex; uniform sampler2D uOlhos; uniform float uPisca; uniform float uAlfa; uniform float uChao;
void main() { if (vY > uChao) discard; vec4 a = texture2D(uTex, vUV); vec4 b = texture2D(uOlhos, vUV) * uPisca; gl_FragColor = (a * (1.0 - b.a) + b) * uAlfa; }`;

const NX = 26, NY = 34; // grade de pontos
const sm = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const regiao = (x, y, r, f) => sm((x - r[0]) / f) * sm((r[2] - x) / f) * sm((y - r[1]) / f) * sm((r[3] - y) / f);

export function criarMalha(cfgs) {
  const cv = document.createElement('canvas'); cv.className = 'caes-tela';
  const gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const sh = (tipo, fonte) => { const s = gl.createShader(tipo); gl.shaderSource(s, fonte); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  const L = { aUV: gl.getAttribLocation(pr, 'aUV'), aWa: gl.getAttribLocation(pr, 'aWa'), aWb: gl.getAttribLocation(pr, 'aWb'), aWc: gl.getAttribLocation(pr, 'aWc'), aWd: gl.getAttribLocation(pr, 'aWd') };
  const U = {}; for (const n of ['uNat', 'uM', 'uT', 'uG', 'uP', 'uRes', 'uTex', 'uOlhos', 'uPisca', 'uAlfa', 'uChao']) U[n] = gl.getUniformLocation(pr, n);
  gl.uniform1i(U.uTex, 0); gl.uniform1i(U.uOlhos, 1);
  for (const k of ['aUV', 'aWa', 'aWb', 'aWc', 'aWd']) gl.enableVertexAttribArray(L[k]);

  const textura = (fonte) => {
    const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    if (fonte) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fonte);
    else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  };
  const vazia = textura(null); // sem olhos fechados
  const todas = [vazia], buffers = [];

  // uma pose = um desenho com as articulações dele
  function construir(P) {
    const img = P.img, nw = img.naturalWidth, nh = img.naturalHeight, os = P.ossos;
    const regs = [os.cabeca, os.orelhas[0], os.orelhas[1], os.rabo, ...os.pernas]; // mesma ordem das articulações
    for (const pe of os.pernas) if (!pe.j) pe.j = [pe.p[0], pe.p[1] + (nh - pe.p[1]) * 0.5]; // joelho/pulso: meio da pata, se config.js não disser
    const boca = os.boca || { p: [0, 0], r: [-10, -10, -5, -5], f: 1 };
    const dados = new Float32Array(NX * NY * 18);
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
      const u = i / (NX - 1), v = j / (NY - 1), x = u * nw, y = v * nh, w = new Array(16).fill(0);
      for (let k = 0; k < 8; k++) w[k] = regiao(x, y, regs[k].r, regs[k].f);
      for (let k = 0; k < 4; k++) { const pe = os.pernas[k], baixo = sm((y - pe.j[1]) / (pe.f * 1.6) + 0.5); w[8 + k] = w[4 + k] * baixo; w[4 + k] *= 1 - baixo; } // abaixo do joelho segue o joelho
      w[12] = regiao(x, y, boca.r, boca.f);                     // mandíbula (abre e fecha a boca)
      w[0] *= 1 - Math.max(w[1], w[2], w[12]);                  // a cabeça não leva junto o que a orelha e a boca mexem sozinhas
      const soma = w.reduce((a, b) => a + b, 0); if (soma > 1) for (let k = 0; k < 16; k++) w[k] /= soma;
      const b = (j * NX + i) * 18; dados[b] = u; dados[b + 1] = v; for (let k = 0; k < 16; k++) dados[b + 2 + k] = w[k];
    }
    const idx = new Uint16Array((NX - 1) * (NY - 1) * 6); let q = 0;
    for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX - 1; i++) { const a = j * NX + i, b = a + 1, c = a + NX, d = c + 1; idx.set([a, b, c, b, d, c], q); q += 6; }
    P.buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, P.buf); gl.bufferData(gl.ARRAY_BUFFER, dados, gl.STATIC_DRAW);
    P.idx = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, P.idx); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    buffers.push(P.buf, P.idx);
    P.n = idx.length; P.tex = textura(img); todas.push(P.tex); P.nat = [nw, nh]; P.pronto = true;
  }
  const carregar = (arq, pronto) => { const i = new Image(); i.decoding = 'async'; i.onload = () => { if (!gl.isContextLost()) pronto(i); }; i.src = new URL('./img/' + arq, import.meta.url).href; return i; };
  const poses = {}; // id -> { pe, sentada }
  for (const cfg of cfgs) {
    const pe = { ossos: cfg.ossos, olhosTex: vazia, pronto: false };
    pe.img = carregar(cfg.imagem, () => construir(pe));
    if (cfg.olhos) carregar(cfg.olhos, (i) => { pe.olhosTex = textura(i); todas.push(pe.olhosTex); });
    const o = poses[cfg.id] = { pe, sentada: null };
    if (cfg.poseSentada) { const s = o.sentada = { ossos: cfg.poseSentada.ossos, olhosTex: vazia, pronto: false }; s.img = carregar(cfg.poseSentada.imagem, () => construir(s)); }
  }

  const M = new Float32Array(64), T = new Float32Array(32), xfm = [0, 0, 0, 0, 0];
  let W = 1, H = 1;
  function desenharPose(P, d, lado, alfa, sentada) {
    const alt = d.tam * 1.3, t = transformar(d, alt, xfm, sentada);
    articular(d, P.ossos, M, T);
    gl.bindBuffer(gl.ARRAY_BUFFER, P.buf); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, P.idx);
    gl.vertexAttribPointer(L.aUV, 2, gl.FLOAT, false, 72, 0); gl.vertexAttribPointer(L.aWa, 4, gl.FLOAT, false, 72, 8); gl.vertexAttribPointer(L.aWb, 4, gl.FLOAT, false, 72, 24); gl.vertexAttribPointer(L.aWc, 4, gl.FLOAT, false, 72, 40); gl.vertexAttribPointer(L.aWd, 4, gl.FLOAT, false, 72, 56);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, P.olhosTex);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, P.tex);
    gl.uniform1f(U.uPisca, P.olhosTex === vazia ? 0 : piscar(d)); gl.uniform1f(U.uAlfa, alfa);
    gl.uniform2f(U.uNat, P.nat[0], P.nat[1]); gl.uniform4fv(U.uM, M); gl.uniform2fv(U.uT, T);
    gl.uniform4f(U.uG, alt / P.nat[1], lado, t[2], 0);
    gl.uniform4f(U.uP, d.x + t[4] * lado, d.y - t[3], t[0], t[1]);
    gl.uniform2f(U.uRes, W, H); gl.uniform1f(U.uChao, d.y + 2); // abaixo do chão não aparece (patas "dobradas por baixo" ao deitar)
    gl.drawElements(gl.TRIANGLES, P.n, gl.UNSIGNED_SHORT, 0);
  }

  return {
    canvas: cv,
    tamanho(w, h, dpr) { W = w; H = h; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); gl.viewport(0, 0, cv.width, cv.height); },
    limpar() { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); },
    larguraDe(cfg) { const P = poses[cfg.id] && poses[cfg.id].pe; return P && P.pronto ? P.nat[0] / P.nat[1] : 0.75; },
    desenhar(d, lado) {
      const o = poses[d.cfg.id]; if (!o || !o.pe.pronto) return;
      const pode = o.sentada && o.sentada.pronto;
      const agora = pode && poseSentada(d.cfg, d.acao), antes = pode && poseSentada(d.cfg, d.acaoAnt);
      if (d.mist < 1 && agora !== antes) { // troca de desenho (em pé <-> sentada) com transição suave
        const k = d.mist * d.mist * (3 - 2 * d.mist);
        desenharPose(antes ? o.sentada : o.pe, d, lado, 1 - k, antes);
        desenharPose(agora ? o.sentada : o.pe, d, lado, k, agora);
      } else desenharPose(agora ? o.sentada : o.pe, d, lado, 1, agora);
    },
    destruir() { for (const t of todas) gl.deleteTexture(t); for (const b of buffers) gl.deleteBuffer(b); gl.getExtension('WEBGL_lose_context')?.loseContext(); cv.remove(); },
  };
}
