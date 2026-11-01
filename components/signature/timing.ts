import type { SignatureStroke } from "./types";

/**
 * Pen-lift pause between strokes: 60-120 ms, longer after a bigger jump.
 * Shared by the component (timeline) and the loader (minimum-duration maths)
 * so both agree on the total.
 */
export function liftSeconds(stroke: SignatureStroke): number {
  if (stroke.liftBefore <= 0) return 0;
  return clamp(0.06 + stroke.liftBefore * 0.0016, 0.06, 0.12);
}

/** Total playback length of the draw at 1x (strokes + lifts). */
export function drawTotal(strokes: SignatureStroke[]): number {
  return strokes.reduce(
    (total, stroke, index) =>
      total + stroke.duration + (index === 0 ? 0 : liftSeconds(stroke)),
    0
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
