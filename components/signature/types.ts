/** Shape of the generated signature data (see scripts/signature/build.py). */

export type SignatureStroke = {
  /** Stable id from the skeleton graph. */
  id: number;
  /** 1-based writing order. */
  order: number;
  /** Human name of the pen stroke (left-loop, tall-crossbar, …). */
  name: string;
  /** Centre line in the signature viewBox, cubic Bezier. */
  d: string;
  /** Mask stroke width in viewBox units (covers the local ink width). */
  width: number;
  /** Measured ink width at the thinnest and thickest point, in px. */
  inkWidth: [number, number];
  /** Centre-line length in viewBox units. */
  length: number;
  /** Mean absolute curvature, rad/px. Higher = slower pen. */
  curvature: number;
  /** Relative pen speed (1 = straight run, 0.55 = tight loop). */
  speed: number;
  /** Draw duration at 1x, seconds. Pen lifts are stored separately. */
  duration: number;
  /** Distance from the previous stroke's end (pen lift), px. */
  liftBefore: number;
  start: [number, number];
  end: [number, number];
};

export type SignatureData = {
  viewBox: [number, number];
  /** Filled silhouette, including holes (fill-rule evenodd). */
  silhouette: string;
  strokes: SignatureStroke[];
  /** Draw + lift duration at 1x (seconds). */
  totalDuration: number;
  source: {
    file: string;
    format: string;
    pixels: [number, number];
    crop: [number, number, number, number];
  };
};
