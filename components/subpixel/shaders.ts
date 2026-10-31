/**
 * SubpixelPortrait - GLSL ES 3.00 sources (WebGL2).
 *
 * The portrait is a photograph first and a screen second. The full-resolution
 * cutout is the image; a fine RGB matrix is laid over it as material (a screen
 * door you notice up close, not a mosaic that hides the face), and the
 * chromatic misregistration of a three-pass print lives only on the silhouette
 * edge (design-direction §1.1: "efek RGB subpixel hanya di tepi portrait").
 *
 * During the intro the matrix starts coarse and the photo resolves into it:
 * cell-average colour -> full detail. The loupe is an optical loupe with a
 * small magnification (1.2x) that *clears* the matrix inside its radius, so
 * hovering makes the face sharper instead of blockier.
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
uniform float uMatrix;       // RGB strip texture strength over the photo (0..1)
uniform float uPhoto;        // 0 = cell-average mosaic, 1 = full-resolution photo
uniform float uFringe;       // edge misregistration offset, device px
uniform float uEdge;         // edge misregistration strength (0..1)
uniform float uGlow;         // highlight bloom
uniform float uLift;         // shadow lift inside the mask (black suit)
uniform float uRim;          // paper bounce on the silhouette edge
uniform float uSat;          // saturation
uniform float uScan;         // scanline shimmer, hard-capped at +-1.5%
uniform float uLens;         // loupe magnification minus one, already ramped
uniform float uLensAmount;   // 0..1, how "on" the loupe is
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

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  // ---------------------------------------------------------------- loupe
  // A real loupe, not a zoom crop: small magnification, and the matrix fades
  // out inside it so the photograph underneath comes back.
  vec2 lensUV = uLensPos / uRes;
  float lensDist = distance(gl_FragCoord.xy, uLensPos);
  float lensFill = 1.0 - smoothstep(uLensRadius * 0.55, uLensRadius, lensDist);
  float mag = 1.0 + uLens * lensFill;
  vec2 uvM = lensUV + (uv - lensUV) / mag;
  float reveal = smoothstep(0.05, 0.7, lensFill) * uLensAmount;

  // ---------------------------------------------------------------- scroll
  // A gentle upward drift while the plate leaves the viewport.
  uvM.y += uScroll * 0.032;

  // Early out: most of the frame is the paper plate (or nothing). One cheap
  // low-mip alpha read skips the whole cell/shading path for those pixels.
  if (textureLod(uTex, uvM, 6.0).a < 0.006) {
    fragColor = uPlate > 0.5 ? vec4(uPaper, 1.0) : vec4(0.0);
    return;
  }

  // ---------------------------------------------------------------- grid
  vec2 g = uvM * uGrid;
  float rowShift = uDelta * mod(floor(g.y), 2.0) * 0.5;
  g.x += rowShift;
  vec2 cellIdx = floor(g);
  vec2 local = fract(g);
  vec2 cellUV = (cellIdx + 0.5) / uGrid;

  // ---------------------------------------------------------------- sampling
  // One screen pixel in uv space; the loupe scales it so LOD follows the lens.
  vec2 px = 1.0 / (uRes * mag);
  vec2 ddx = vec2(px.x, 0.0);
  vec2 ddy = vec2(0.0, px.y);

  // Analytic cell derivatives -> the GPU picks the mip that covers one cell,
  // i.e. a true area average for the mosaic stage of the intro.
  vec4 fine = textureGrad(uTex, uvM, ddx, ddy);

  // R/B passes shifted by the fringe offset (straight alpha, colour-bled
  // cutout: the RGB outside the mask is still subject colour).
  vec2 off = vec2(uFringe / (uRes.x * mag), 0.0);
  vec4 passR = textureGrad(uTex, uvM - off, ddx, ddy);
  vec4 passB = textureGrad(uTex, uvM + off, ddx, ddy);

  // Silhouette edge, measured on the alpha of the shifted passes. This is the
  // only place the portrait gets loud colour: a print-registration fringe.
  float edge = clamp((abs(passR.a - fine.a) + abs(passB.a - fine.a)) * 2.6, 0.0, 1.0);

  float cover = smoothstep(0.38, 0.62, fine.a);
  if (cover <= 0.002) {
    fragColor = uPlate > 0.5 ? vec4(uPaper, 1.0) : vec4(0.0);
    return;
  }

  // ---------------------------------------------------------------- image
  // Mosaic (cell average) -> photograph, driven by the intro and the loupe.
  float detail = clamp(uPhoto + reveal * 0.65, 0.0, 1.0);
  vec3 base = fine.rgb;
  // The area average is only needed while the intro is still a mosaic. uPhoto
  // is a uniform, so this is a uniform branch: no divergence, one fetch saved.
  if (uPhoto < 0.999) {
    vec2 cellStep = vec2(1.0 / (uGrid.x * mag), 1.0 / (uGrid.y * mag));
    vec4 cell = textureGrad(uTex, cellUV, vec2(cellStep.x, 0.0), vec2(0.0, cellStep.y));
    base = mix(cell.rgb, fine.rgb, detail);
  }

  // ---------------------------------------------------------------- matrix
  // Three subpixel strips per cell. They redistribute colour; they never eat
  // luminance (the old 1/3-area model is what forced the emit gain that blew
  // out the highlights).
  float pad = uGap * 0.5;
  float inner = 1.0 - uGap;
  float slot = inner / 3.0;
  float aa = 1.0 * uGrid.x / (uRes.x * mag);   // ~1 device px in cell units
  vec2 p = local - 0.5;

  float s0 = 0.0, s1 = 0.0, s2 = 0.0;
  for (int i = 0; i < 3; i++) {
    float cx = pad + slot * (float(i) + 0.5) - 0.5;
    float d = sdRoundRect(vec2(p.x - cx, p.y), vec2(slot * 0.5 - 0.02, inner * 0.5), slot * 0.42);
    float s = 1.0 - smoothstep(-aa, aa, d);
    if (i == 0) s0 = s;
    else if (i == 1) s1 = s;
    else s2 = s;
  }

  float coverage = clamp(s0 + s1 + s2, 0.0, 1.0);
  vec3 chan = vec3(s0, s1, s2) - coverage / 3.0;
  float matrixAmt = uMatrix * (1.0 - 0.85 * reveal) * (0.45 + 0.55 * uPhoto);

  base *= 1.0 + chan * matrixAmt * 0.55;
  // Black matrix: a whisper of shading in the gaps, never a punched hole.
  base *= mix(1.0, 0.80, (1.0 - coverage) * matrixAmt);

  // ---------------------------------------------------------------- bloom
  // Only highlights spill, and only a little; a broad bloom is what made the
  // old version read as a smear instead of a screen.
  if (uGlow > 0.001) {
    float lod = min(log2(max(1.0, uRes.x / uGrid.x)) + 2.2, 5.0);
    vec4 blur = textureLod(uTex, uvM, lod);
    float hi = smoothstep(0.58, 0.96, dot(blur.rgb, LUMA)) * blur.a;
    base += hi * uGlow * 0.35 * vec3(1.0, 0.97, 0.93);
  }

  // ---------------------------------------------------------------- edge
  // Paper bounce keeps the black suit off the black surface; the misregistered
  // channels then tint that same edge instead of drawing a ring.
  float rim = edge * uRim * cover;
  base = mix(base, uPaper, rim * 0.85);

  // Misregistration hairline: the R pass misses the silhouette on one side and
  // the B pass on the other, so the edge splits warm/cool like a three-pass
  // print. Only the boundary gets this; the face never does.
  float warmEdge = clamp((fine.a - passR.a) * 1.8, 0.0, 1.0);
  float coolEdge = clamp((fine.a - passB.a) * 1.8, 0.0, 1.0);
  base += (vec3(1.0, 0.30, 0.16) * warmEdge + vec3(0.16, 0.40, 1.0) * coolEdge)
        * uEdge * smoothstep(0.12, 0.5, fine.a) * 1.6;

  // ---------------------------------------------------------------- grade
  float lum = dot(base, LUMA);
  base += uLift * (1.0 - smoothstep(0.0, 0.28, lum)) * 0.045;
  base = mix(vec3(lum), base, uSat);

  // Diagonal sweep: cells light up from the top-left corner outwards.
  float order = (cellIdx.x / max(uGrid.x, 1.0) + (1.0 - cellIdx.y / max(uGrid.y, 1.0))) * 0.5;
  float lit = smoothstep(order - 0.004, order + 0.02, uIntroLit);
  float a = cover * lit;

  // Scanline shimmer, at most +-1.5%.
  base *= 1.0 + 0.015 * uScan * sin(gl_FragCoord.y * 0.8 - uTime * 1.6);

  base += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  if (uPlate > 0.5) {
    fragColor = vec4(mix(uPaper, base, a), 1.0);
  } else {
    // Premultiplied alpha: no fringe of light bleeding outside the cutout.
    fragColor = vec4(base * a, a);
  }
}
`;
