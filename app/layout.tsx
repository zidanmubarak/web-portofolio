import "./globals.css";
import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/provider";
import { SignatureIntro } from "@/components/signature-loader";
import { signatureArt } from "@/lib/signature";
import { en } from "@/lib/i18n/copy-en";

/**
 * Both families are self-hosted at build time (no render-blocking Google Fonts
 * @import, no third-party DNS/TLS before first paint) with a metric-matched
 * fallback so the swap does not move layout.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  keywords: [
    "AI",
    "Machine Learning",
    "Python",
    "Data Science",
    "Deep Learning",
    "Portfolio",
  ],
  authors: [{ name: "Zidan Mubarak" }],
  icons: {
    icon: "/images/profil/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const signature = signatureArt();

  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LocaleProvider>{children}</LocaleProvider>
        <SignatureIntro {...signature} />
      </body>
    </html>
  );
}
