import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/lib/motion/smooth-scroll";
import { Shell } from "@/components/shell/shell";
import { Loader } from "@/components/loader/loader";
import { LoaderGate } from "@/components/loader/loader-gate";
import { copy } from "@/content/copy.en";
import { profile } from "@/content/profile";
import { links } from "@/content/links";
import { education } from "@/content/education";

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

/** Canonical origin; env wins so previews never claim the production URL. */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://zidanmubarak.vercel.app"
).replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: copy.meta.title,
    template: copy.meta.titleTemplate,
  },
  description: copy.meta.description,
  keywords: [...copy.meta.keywords],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: copy.meta.title,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    title: copy.meta.title,
    description: copy.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

const sameAs = links
  .filter((link) => link.id !== "email" && link.href.startsWith("http"))
  .map((link) => link.href);

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.preferredName,
  url: siteUrl,
  image: `${siteUrl}/images/portrait/portrait-poster.webp`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  description: copy.meta.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    addressCountry: profile.location.countryCode,
  },
  knowsAbout: [
    "Machine learning",
    "Computer vision",
    "Vision-language models",
    "Optical character recognition",
    "Next.js",
    "TypeScript",
  ],
  sameAs,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education[0]?.institution ?? "UIN Ar-Raniry",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-loader="pending"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LoaderGate />
        <script
          type="application/ld+json"
          // Static, content-derived JSON-LD; no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Loader drawDuration={1.45} minDuration={1.35} maxDuration={4} />
        <SmoothScrollProvider>
          <Shell>{children}</Shell>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
