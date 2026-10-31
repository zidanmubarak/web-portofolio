import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Martian_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/lib/motion/smooth-scroll";
import { Shell } from "@/components/shell/shell";
import { Loader } from "@/components/loader/loader";
import { LoaderGate } from "@/components/loader/loader-gate";
import { I18nProvider } from "@/components/i18n/provider";
import { contentFor } from "@/content/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

/**
 * Archivo carries display and body (width axis 78 for names, 100 for prose).
 * Martian Mono carries labels, indices, clocks, coordinates and numerals.
 * Both are OFL and self-hosted by next/font, with no runtime request to Google.
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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { copy, profile } = contentFor(lang);
  const home = lang === defaultLocale ? "/" : `/${lang}`;

  return {
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
      canonical: home,
      languages: {
        id: "/",
        en: "/en",
        "x-default": "/",
      },
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
      url: home,
      siteName: profile.name,
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? ["en_US"] : ["id_ID"],
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = contentFor(lang);
  const { profile, links, copy, education, sources } = content;

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
    knowsAbout:
      lang === "id"
        ? [
            "Machine learning",
            "Computer vision",
            "Vision-language model",
            "Optical character recognition",
            "Next.js",
            "TypeScript",
          ]
        : [
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

  return (
    <html
      lang={lang}
      data-loader="pending"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body id="top">
        <I18nProvider
          value={{
            locale: lang,
            copy,
            profile,
            links,
            sources,
          }}
        >
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
        </I18nProvider>
      </body>
    </html>
  );
}
