import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content/profile";

export const runtime = "nodejs";
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "assets", "fonts");

let fontsPromise: Promise<
  Array<{ name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }>
> | null = null;

function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(join(fontDir, "Archivo-Display.ttf")),
      readFile(join(fontDir, "MartianMono-Regular.ttf")),
    ]).then(([display, mono]) => [
      {
        name: "Archivo",
        data: display.buffer.slice(
          display.byteOffset,
          display.byteOffset + display.byteLength
        ) as ArrayBuffer,
        weight: 600 as const,
        style: "normal" as const,
      },
      {
        name: "Martian Mono",
        data: mono.buffer.slice(
          mono.byteOffset,
          mono.byteOffset + mono.byteLength
        ) as ArrayBuffer,
        weight: 400 as const,
        style: "normal" as const,
      },
    ]);
  }
  return fontsPromise;
}

/**
 * The share card is the same composition as the site: black ground, a paper
 * plate, one accent rule, and the two-line name. It is rendered from the same
 * fonts the site uses, so a shared link never looks like a template.
 */
export default async function OpengraphImage() {
  const fonts = await loadFonts();
  const [first, second] = profile.headline;
  const coordinates = `${profile.location.coordinates.lat.toFixed(4)} N / ${profile.location.coordinates.lng.toFixed(4)} E`;
  const host = (process.env.NEXT_PUBLIC_SITE_URL || "https://zidanmubarak.vercel.app")
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0B0A",
          color: "#F2EDE4",
          padding: "56px 64px 48px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Martian Mono",
            fontSize: 17,
            letterSpacing: 2.4,
            textTransform: "uppercase",
            color: "#9A968C",
          }}
        >
          <span style={{ color: "#F2EDE4" }}>{profile.name}</span>
          <span>Portfolio / 2026</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Archivo",
                fontSize: 186,
                fontWeight: 600,
                lineHeight: 0.82,
                letterSpacing: -9,
                textTransform: "uppercase",
              }}
            >
              <span>{first}</span>
              <span>{second}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginTop: 30,
                fontFamily: "Martian Mono",
                fontSize: 19,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#9A968C",
              }}
            >
              <span style={{ width: 54, height: 3, backgroundColor: "#FF4A2E" }} />
              <span>{profile.role}</span>
              <span style={{ color: "#3D3B35" }}>·</span>
              <span>Vision-language</span>
              <span style={{ color: "#3D3B35" }}>·</span>
              <span>OCR</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 228,
              height: 228,
              marginBottom: 6,
              backgroundColor: "#E7E1D5",
              color: "#111110",
              padding: 20,
              fontFamily: "Martian Mono",
              fontSize: 15,
              letterSpacing: 1.6,
              textTransform: "uppercase",
            }}
          >
            <span>Fig. 01</span>
            <span
              style={{
                fontFamily: "Archivo",
                fontSize: 96,
                fontWeight: 600,
                lineHeight: 0.8,
                letterSpacing: -4,
              }}
            >
              ZM
            </span>
            <span style={{ color: "#5F5B52" }}>Banda Aceh, ID</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #2B2A26",
            paddingTop: 20,
            fontFamily: "Martian Mono",
            fontSize: 16,
            letterSpacing: 1.8,
            textTransform: "uppercase",
            color: "#9A968C",
          }}
        >
          <span>{coordinates}</span>
          <span style={{ color: "#F2EDE4" }}>{host}</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
