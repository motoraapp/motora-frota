// Boneco articulado em WebGL: cada desenho (ar/caes/img/*.png) vira uma grade de triângulos e as articulações (cabeça, orelhas, rabo,
// 4 patas com ombro/quadril e joelho/pulso; ver `ossos` em config.js) puxam os pontos da grade, com transição suave entre as partes. Mantém a aparência do desenho e
// dá movimento de verdade. Se o aparelho não tiver WebGL, dogs3d.js usa desenho.js (imagem inteira, sem articulações).
import { articular, transformar } from './movimento.js';

const VS = `
attribute vec2 aUV; attribute vec4 aWa; attribute vec4 aWb; attribute vec4 aWc;
uniform vec2 uNat; uniform vec4 uM[12]; uniform vec2 uT[12];
uniform vec4 uG; uniform vec4 uP; uniform vec2 uRes;
varying vec2 vUV;
void main() {
  vec2 p0 = aUV * uNat;
  float w[12];
  w[0] = aWa.x; w[1] = aWa.y; w[2] = aWa.z; w[3] = aWa.w; w[4] = aWb.x; w[5] = aWb.y; w[6] = aWb.z; w[7] = aWb.w;
  w[8] = aWc.x; w[9] = aWc.y; w[10] = aWc.z; w[11] = aWc.w;
  vec2 p = p0;
  for (int i = 0; i < 12; i++) {
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
  vUV = aUV;
}`;
const FS = `precision mediump float; varying vec2 vUV; uniform sampler2D uTex; void main() { gl_FragColor = texture2D(uTex, vUV); }`;

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
  const L = { aUV: gl.getAttribLocation(pr, 'aUV'), aWa: gl.getAttribLocation(pr, 'aWa'), aWb: gl.getAttribLocation(pr, 'aWb'), aWc: gl.getAttribLocation(pr, 'aWc') };
  const U = {}; for (const n of ['uNat', 'uM', 'uT', 'uG', 'uP', 'uRes', 'uTex']) U[n] = gl.getUniformLocation(pr, n);
  gl.uniform1i(U.uTex, 0);
  gl.enableVertexAttribArray(L.aUV); gl.enableVertexAttribArray(L.aWa); gl.enableVertexAttribArray(L.aWb); gl.enableVertexAttribArray(L.aWc);

  const imgs = {}; // id -> { img, tex, buf, idx, n, pronto }
  const M = new Float32Array(48), T = new Float32Array(24), xfm = [0, 0, 0, 0, 0];
  let W = 1, H = 1;

  function construir(cfg, o) {
    const img = o.img, nw = img.naturalWidth, nh = img.naturalHeight, os = cfg.ossos;
    const regs = [os.cabeca, os.orelhas[0], os.orelhas[1], os.rabo, ...os.pernas]; // mesma ordem das articulações
    for (const pe of os.pernas) if (!pe.j) pe.j = [pe.p[0], pe.p[1] + (nh - pe.p[1]) * 0.5]; // joelho/pulso: meio da pata, se config.js não disser
    const dados = new Float32Array(NX * NY * 14);
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
      const u = i / (NX - 1), v = j / (NY - 1), x = u * nw, y = v * nh, w = new Array(12).fill(0);
      for (let k = 0; k < 8; k++) w[k] = regiao(x, y, regs[k].r, regs[k].f);
      for (let k = 0; k < 4; k++) { const pe = os.pernas[k], baixo = sm((y - pe.j[1]) / (pe.f * 1.6) + 0.5); w[8 + k] = w[4 + k] * baixo; w[4 + k] *= 1 - baixo; } // abaixo do joelho segue o joelho
      w[0] *= 1 - Math.max(w[1], w[2]);                         // a cabeça não leva junto o que a orelha mexe sozinha
      const soma = w.reduce((a, b) => a + b, 0); if (soma > 1) for (let k = 0; k < 12; k++) w[k] /= soma;
      const b = (j * NX + i) * 14; dados[b] = u; dados[b + 1] = v; for (let k = 0; k < 12; k++) dados[b + 2 + k] = w[k];
    }
    const idx = new Uint16Array((NX - 1) * (NY - 1) * 6); let q = 0;
    for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX - 1; i++) { const a = j * NX + i, b = a + 1, c = a + NX, d = c + 1; idx.set([a, b, c, b, d, c], q); q += 6; }
    o.buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, o.buf); gl.bufferData(gl.ARRAY_BUFFER, dados, gl.STATIC_DRAW);
    o.idx = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.idx); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    o.n = idx.length;
    o.tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, o.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    o.nat = [nw, nh]; o.pronto = true;
  }
  for (const cfg of cfgs) {
    const o = imgs[cfg.id] = { img: new Image(), pronto: false };
    o.img.decoding = 'async'; o.img.onload = () => { if (!gl.isContextLost()) construir(cfg, o); };
    o.img.src = new URL('./img/' + cfg.imagem, import.meta.url).href;
  }

  return {
    canvas: cv,
    tamanho(w, h, dpr) { W = w; H = h; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); gl.viewport(0, 0, cv.width, cv.height); },
    limpar() { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); },
    larguraDe(cfg) { const o = imgs[cfg.id]; return o && o.pronto ? o.nat[0] / o.nat[1] : 0.75; },
    desenhar(d, lado) {
      const o = imgs[d.cfg.id]; if (!o || !o.pronto) return;
      const alt = d.tam * 1.3, t = transformar(d, alt, xfm);
      articular(d, d.cfg.ossos, M, T);
      gl.bindBuffer(gl.ARRAY_BUFFER, o.buf); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.idx);
      gl.vertexAttribPointer(L.aUV, 2, gl.FLOAT, false, 56, 0); gl.vertexAttribPointer(L.aWa, 4, gl.FLOAT, false, 56, 8); gl.vertexAttribPointer(L.aWb, 4, gl.FLOAT, false, 56, 24); gl.vertexAttribPointer(L.aWc, 4, gl.FLOAT, false, 56, 40);
      gl.bindTexture(gl.TEXTURE_2D, o.tex);
      gl.uniform2f(U.uNat, o.nat[0], o.nat[1]); gl.uniform4fv(U.uM, M); gl.uniform2fv(U.uT, T);
      gl.uniform4f(U.uG, alt / o.nat[1], lado, t[2], 0);
      gl.uniform4f(U.uP, d.x + t[4] * lado, d.y - t[3], t[0], t[1]);
      gl.uniform2f(U.uRes, W, H);
      gl.drawElements(gl.TRIANGLES, o.n, gl.UNSIGNED_SHORT, 0);
    },
    destruir() { for (const id in imgs) { const o = imgs[id]; if (o.tex) gl.deleteTexture(o.tex); if (o.buf) gl.deleteBuffer(o.buf); if (o.idx) gl.deleteBuffer(o.idx); } gl.getExtension('WEBGL_lose_context')?.loseContext(); cv.remove(); },
  };
}
