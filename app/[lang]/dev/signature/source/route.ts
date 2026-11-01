import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

/**
 * Dev-only source image for the comparison overlay.
 *
 * The original signature photo must never enter `public/` or the build (T4
 * rule), so this route reads `assets/source/ttd-asli.jpg` at request time and
 * only in development. In production it behaves like the rest of `/dev/*`:
 * 404.
 */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }
  try {
    const file = path.join(process.cwd(), "assets", "source", "ttd-asli.jpg");
    const bytes = await readFile(file);
    // The file is a PNG despite the .jpg extension (detected by magic bytes in
    // scripts/signature/imgutil.py); serve the real type.
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "content-type": "image/png",
        "cache-control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Source image not available", { status: 404 });
  }
}
