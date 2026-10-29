/**
 * Tuning knobs for <SubpixelPortrait>. `FINAL_PRESET` is the approved set from
 * the /dev/subpixel sweep; see vault `subpixel-notes.md` for what was rejected.
 */

export type SubpixelLayout = "stripe" | "delta";

export type SubpixelParams = {
  /** Resolved cell size in CSS px (4–6 keeps the matrix legible without moiré). */
  cellSize: number;
  /** Macro cell size the intro starts from, in CSS px. */
  introCellSize: number;
  /** Black matrix between cells, as a fraction of one cell. */
  gap: number;
  /** Horizontal R/B channel offset in thirds of a cell (chromatic fringing). */
  fringe: number;
  /** Bloom around the lit subpixels. */
  glow: number;
  /** Emission gain for the strips (they only cover ~1/3 of a cell). */
  emit: number;
  /** Lifts deep blacks inside the mask so the black suit keeps a silhouette. */
  lift: number;
  /** Rim light picked up from the alpha edge. */
  rim: number;
  /** Saturation after the filmic shoulder. */
  sat: number;
  /** Loupe radius in CSS px. */
  lensRadius: number;
  /** Loupe magnification (1 = off). */
  lensMag: number;
  /** Scanline shimmer, 0 or 1 (hard-capped at +-2% inside the shader). */
  scan: number;
  /** Square cells or PenTile-style half-cell staggered rows. */
  layout: SubpixelLayout;
  /** Paper plate colour, sRGB hex. */
  paper: string;
};

export const FINAL_PRESET: SubpixelParams = {
  cellSize: 4.5,
  introCellSize: 28,
  gap: 0.24,
  fringe: 0.6,
  glow: 0.32,
  emit: 2.1,
  lift: 1,
  rim: 0.3,
  sat: 1.12,
  lensRadius: 140,
  lensMag: 1.9,
  scan: 1,
  layout: "stripe",
  paper: "#E7E1D5",
};

export const PRESET_LABEL = "rubric-subpixel-v1";

/** Variants worth keeping next to the final preset. */
export const PRESET_VARIANTS = {
  stripe: FINAL_PRESET,
  delta: { ...FINAL_PRESET, layout: "delta" as SubpixelLayout },
  "crt-soft": { ...FINAL_PRESET, glow: 0.95, fringe: 1.15, gap: 0.24, scan: 1 },
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
