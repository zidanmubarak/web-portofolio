/**
 * SubpixelPortrait — GLSL ES 3.00 sources (WebGL2).
 *
 * The portrait is never blitted as a photo. Every fragment resolves to one cell
 * of an LED-like matrix: three rounded vertical subpixel strips (R, G, B) whose
 * intensity is read from an area-averaged (mip filtered) sample of the cutout,
 * with per-channel horizontal offsets for realistic chromatic fringing.
 *
 * Coordinate space: gl_FragCoord in device pixels, origin bottom-left.
 * Cells live in "cell units": 1 unit = one cell; the grid is uGrid cells wide/tall.
 */

export const VERTEX_SHADER = /* glsl */ `#version 300 es
void main() {
  // Fullscreen triangle, no attributes, no buffers.
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;

uniform sampler2D uTex;

uniform vec2  uRes;          // drawing buffer size, device px
uniform vec2  uGrid;         // number of cells (x, y)
uniform float uGap;          // black matrix, fraction of a cell (0..0.4)
uniform float uFringe;       // 0..1.5 channel offset strength
uniform float uGlow;         // bloom / bloom-spill amount
uniform float uEmit;         // subpixel emission gain (strips only cover ~1/3 of a cell)
uniform float uLift;         // shadow lift inside the mask (black suit)
uniform float uRim;          // rim light from the mask edge
uniform float uSat;          // saturation after the filmic shoulder
uniform float uScan;         // scanline shimmer, capped at 2%
uniform float uLens;         // loupe magnification (0 = off)
uniform float uLensRadius;   // device px
uniform vec2  uLensPos;      // device px, origin bottom-left
uniform float uIntroLit;     // 0..1 diagonal sweep
uniform float uScroll;       // 0..1 hero exit progress
uniform float uDelta;        // 0 = square grid, 1 = half-cell staggered rows
uniform vec3  uPaper;        // paper plate colour (sRGB)
uniform float uPlate;        // 1 = paint the paper plate behind the subject
uniform float uTime;         // seconds

out vec4 fragColor;

const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

vec3 toLinear(vec3 c) { return pow(max(c, 0.0), vec3(2.2)); }
vec3 toSrgb(vec3 c) { return pow(max(c, 0.0), vec3(1.0 / 2.2)); }

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Filmic shoulder: an emissive subpixel matrix needs headroom, otherwise skin
// clips to white the moment the strips get enough gain to read as lit.
vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  // ---------------------------------------------------------------- loupe
  vec2 lensUV = uLensPos / uRes;
  float lensDist = distance(gl_FragCoord.xy, uLensPos);
  float lensInfl = 1.0 - smoothstep(uLensRadius * 0.18, uLensRadius, lensDist);
  float mag = 1.0 + uLens * lensInfl;
  vec2 uvM = lensUV + (uv - lensUV) / mag;

  // ---------------------------------------------------------------- scroll
  // The image drifts up a touch while the cells grow, so the hero "unweaves".
  uvM.y += uScroll * 0.045;

  // Early out: most of the frame is the paper plate (or nothing). One cheap
  // low-mip alpha read skips the whole cell/shading path for those pixels.
  if (textureLod(uTex, uvM, 6.0).a < 0.006) {
    fragColor = uPlate > 0.5 ? vec4(uPaper, 1.0) : vec4(0.0);
    return;
  }

  // ---------------------------------------------------------------- grid
  vec2 g = uvM * uGrid;
  vec2 cellIdx = floor(g);
  float rowShift = uDelta * mod(cellIdx.y, 2.0) * 0.5;
  g.x += rowShift;
  cellIdx = floor(g);
  vec2 local = fract(g);

  // Diagonal sweep: cells light up from the top-left corner outwards.
  float order = (cellIdx.x / max(uGrid.x, 1.0) + (1.0 - cellIdx.y / max(uGrid.y, 1.0))) * 0.5;
  float lit = smoothstep(order - 0.004, order + 0.018, uIntroLit);

  vec2 cellUV = (cellIdx + 0.5) / uGrid;
  // Analytic derivatives -> the GPU picks the mip level that covers one cell,
  // i.e. a true area average instead of a nearest neighbour poke.
  vec2 ddx = vec2(1.0 / (uGrid.x * mag), 0.0);
  vec2 ddy = vec2(0.0, 1.0 / (uGrid.y * mag));

  // ---------------------------------------------------------------- sampling
  float ox = uFringe * (1.0 / uGrid.x) * 0.3333;
  vec4 sR = textureGrad(uTex, cellUV - vec2(ox, 0.0), ddx, ddy);
  vec4 sG = textureGrad(uTex, cellUV, ddx, ddy);
  vec4 sB = textureGrad(uTex, cellUV + vec2(ox, 0.0), ddx, ddy);

  vec3 srgbCell = vec3(sR.r, sG.g, sB.b);
  float alpha = max(sG.a, max(sR.a, sB.a) * 0.85);

  // Partial cells at the silhouette edge; nothing at all outside the subject.
  // A crisp threshold keeps the cutout from smearing into a one-cell grey ring:
  // a cell only lights up once it is really covered by the subject.
  float cover = smoothstep(0.42, 0.56, alpha);
  if (cover <= 0.002) {
    fragColor = uPlate > 0.5 ? vec4(uPaper, 1.0) : vec4(0.0);
    return;
  }

  vec3 lin = toLinear(srgbCell);

  // Shadow lift: a black suit on a dark stage otherwise collapses into the
  // background. Lift only the deep values, keep the midtones intact.
  float lum = dot(lin, LUMA);
  vec3 lifted = lin + uLift * (1.0 - smoothstep(0.0, 0.34, lum)) * vec3(0.0085, 0.0075, 0.0068);

  // ---------------------------------------------------------------- strips
  float pad = uGap * 0.5;
  float inner = 1.0 - uGap;
  float slot = inner / 3.0;
  float aa = 1.25 * uGrid.x / (uRes.x * mag);   // ~1 device px in cell units
  vec2 p = local - 0.5;

  float s0 = 0.0, s1 = 0.0, s2 = 0.0;
  for (int i = 0; i < 3; i++) {
    float cx = pad + slot * (float(i) + 0.5) - 0.5;
    float d = sdRoundRect(vec2(p.x - cx, p.y), vec2(slot * 0.5 - 0.015, inner * 0.5), slot * 0.45);
    float s = 1.0 - smoothstep(-aa, aa, d);
    if (i == 0) s0 = s;
    else if (i == 1) s1 = s;
    else s2 = s;
  }

  vec3 emission = vec3(lifted.r * s0, lifted.g * s1, lifted.b * s2);
  float stripCover = max(s0, max(s1, s2));

  // Black matrix never goes fully black: a whisper of the cell colour keeps the
  // matrix from reading as holes punched in the silhouette.
  emission += lifted * 0.045 * (1.0 - stripCover);

  // ---------------------------------------------------------------- bloom
  // The bloom mip is capped: during the macro intro the cells are huge and an
  // uncapped low mip turns the whole figure into one soft grey smear.
  if (uGlow > 0.001) {
    float lod = min(log2(max(1.0, uRes.x / uGrid.x)) + 2.4, 5.5);
    vec4 blur = textureLod(uTex, uvM, lod);
    vec3 bloom = toLinear(blur.rgb) * smoothstep(0.35, 0.8, blur.a);
    emission += bloom * uGlow * 0.30 * mix(0.18, 1.0, uIntroLit) * (0.35 + 0.65 * (1.0 - stripCover));
  }

  // ---------------------------------------------------------------- rim light
  // Reuses the fringe samples' alpha: no extra texture fetches for the edge.
  float edge = clamp(max(abs(sR.a - sG.a), abs(sB.a - sG.a)) * 3.2, 0.0, 1.0);
  // Rim stays *inside* the silhouette: solid cells only, never on the boundary AA.
  emission += toLinear(uPaper) * edge * uRim * smoothstep(0.55, 0.92, alpha) * (0.35 + 0.65 * stripCover);

  // ---------------------------------------------------------------- grade
  emission *= cover * lit;

  // Emissive gain: three strips cover roughly a third of each cell, so the
  // strips themselves have to be brighter than the averaged colour to read.
  emission *= uEmit;
  emission *= 1.0 + 0.10 * lensInfl * step(0.01, uLens);

  // Filmic shoulder + a touch of contrast so the face keeps its form.
  emission = aces(emission);
  emission = mix(emission, smoothstep(0.0, 1.0, emission), 0.18);
  // The shoulder desaturates skin; pull a little colour back.
  emission = clamp(mix(vec3(dot(emission, LUMA)), emission, uSat), 0.0, 1.0);

  // Scanline shimmer, at most +-2%.
  emission *= 1.0 + 0.02 * uScan * sin(gl_FragCoord.y * 0.55 - uTime * 1.7);

  vec3 outCol = toSrgb(emission);
  outCol += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  if (uPlate > 0.5) {
    fragColor = vec4(mix(uPaper, outCol, cover * lit), 1.0);
  } else {
    // Premultiplied alpha: no fringe of light bleeding outside the cutout.
    float a = cover * lit;
    fragColor = vec4(outCol * a, a);
  }
}
`;
