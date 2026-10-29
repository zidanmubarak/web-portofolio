import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/lib/motion/smooth-scroll";
import { Shell } from "@/components/shell/shell";
import { copy } from "@/content/copy.en";
import { profile } from "@/content/profile";

/**
 * Archivo carries display and body (width axis 78 for names, 100 for prose).
 * Martian Mono carries labels, indices, clocks, coordinates and numerals.
 * Both are OFL and self-hosted by next/font — no runtime request to Google.
 */
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const mono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mono",
  display: "swap",
  // Labels live below the fold; skipping preload keeps LCP on the hero name.
  preload: false,
});

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  keywords: [...copy.meta.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  applicationName: copy.meta.title,
  icons: {
    icon: "/images/profil/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          <Shell>{children}</Shell>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
