/**
 * Tuning knobs for <SubpixelPortrait>. `FINAL_PRESET` is the approved set from
 * the /dev/subpixel sweep; see vault `subpixel-notes.md` for what was rejected.
 *
 * v2 ("photo first"): the photograph is the image, the RGB matrix is a fine
 * material over it, and the chromatic fringe lives on the silhouette edge only.
 */

export type SubpixelLayout = "stripe" | "delta";

export type SubpixelParams = {
  /** Cell size in CSS px at rest. 2–3 keeps the face sharp; the matrix reads up close. */
  cellSize: number;
  /** Macro cell size the intro starts from, in CSS px. */
  introCellSize: number;
  /** Black matrix between cells, as a fraction of one cell. */
  gap: number;
  /** RGB strip texture over the photo (0 = clean photo, 1 = strong screen door). */
  matrix: number;
  /** Horizontal R/B misregistration offset on the silhouette edge, in CSS px. */
  fringe: number;
  /** Highlight bloom around bright areas. */
  glow: number;
  /** Lifts deep blacks inside the mask so the black suit keeps a silhouette. */
  lift: number;
  /** Paper bounce picked up from the alpha edge. */
  rim: number;
  /** Saturation. */
  sat: number;
  /** Loupe radius in CSS px. */
  lensRadius: number;
  /** Loupe magnification (1 = off). Small on purpose: a loupe, not a crop. */
  lensMag: number;
  /** Scanline shimmer, 0 or 1 (hard-capped at +-1.5% inside the shader). */
  scan: number;
  /** Square cells or PenTile-style half-cell staggered rows. */
  layout: SubpixelLayout;
  /** Paper plate colour, sRGB hex. */
  paper: string;
};

export const FINAL_PRESET: SubpixelParams = {
  cellSize: 2.6,
  introCellSize: 16,
  gap: 0.16,
  matrix: 0.3,
  fringe: 0.9,
  glow: 0.18,
  lift: 0.7,
  rim: 0.24,
  sat: 1.04,
  lensRadius: 96,
  lensMag: 1.24,
  scan: 0.4,
  layout: "stripe",
  paper: "#E7E1D5",
};

export const PRESET_LABEL = "rubric-subpixel-v2";

/** Variants worth keeping next to the final preset. */
export const PRESET_VARIANTS = {
  stripe: FINAL_PRESET,
  delta: { ...FINAL_PRESET, layout: "delta" as SubpixelLayout },
  print: { ...FINAL_PRESET, fringe: 1.6, matrix: 0.42 },
} satisfies Record<string, SubpixelParams>;

export function mergeParams(base: SubpixelParams, patch?: Partial<SubpixelParams>): SubpixelParams {
  return patch ? { ...base, ...patch } : base;
}

/** "#RRGGBB" -> [0..1, 0..1, 0..1]. */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0").slice(0, 6);
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return [1, 1, 1];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
