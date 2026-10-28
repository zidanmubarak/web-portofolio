import { readFileSync } from "node:fs";
import { join } from "node:path";

export type SignatureArt = {
  viewBox: string;
  /** The single <path> element with its stroke attributes, verbatim. */
  pathMarkup: string;
  /** Measured path length in user units (getTotalLength in Chrome). */
  length: number;
};

let cached: SignatureArt | null = null;

/**
 * The signature is traced once (card t_d921dc6a) and shipped as an asset. The
 * intro reads the path at build time and hands it to the client component, so
 * the markup never has to be transcribed by hand and the overlay itself still
 * only exists once JavaScript runs.
 */
export function signatureArt(): SignatureArt {
  if (cached) return cached;

  const root = process.cwd();
  const svg = readFileSync(
    join(root, "public", "signature", "signature.svg"),
    "utf8",
  );
  const meta = JSON.parse(
    readFileSync(join(root, "public", "signature", "signature.json"), "utf8"),
  ) as { totalLengthPx?: number };

  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? "0 0 600.67 409.73";
  const pathMarkup = /<path[\s\S]*?\/>/.exec(svg)?.[0] ?? "";
  const length = Number(meta.totalLengthPx) || 3407.32;

  cached = { viewBox, pathMarkup, length };
  return cached;
}
