import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteRail } from "@/components/layout/site-rail";
import { SettleController } from "@/components/settle-controller";
import { SkipLink } from "@/components/skip-link";
import { WorkDetailBody } from "@/components/work/work-detail-body";
import { chrome } from "@/lib/i18n/chrome";
import { en, type Copy } from "@/lib/i18n/copy-en";
import { id } from "@/lib/i18n/copy-id";
import {
  workDetails,
  workDetailSlugs,
  type WorkItemSummary,
} from "@/lib/work-details";

/** The site's only photograph, and a real file in `public/` (1333 × 2000). */
const OG_IMAGE = "/images/portrait/hero-01.jpg";
const OG_IMAGE_WIDTH = 1333;
const OG_IMAGE_HEIGHT = 2000;

/**
 * Origin used to turn the relative OG image path into an absolute URL. Next
 * falls back to http://localhost:3000 on its own; making it explicit keeps the
 * build warning quiet and gives the deploy one place to set the real origin.
 */
const METADATA_BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function pickItem(copy: Copy, slug: string): WorkItemSummary | null {
  const item = copy.work.items.find((entry) => entry.id === slug);
  if (!item) {
    return null;
  }
  return {
    title: item.title,
    year: item.year,
    role: item.role,
    stack: item.stack,
  };
}

/** The three featured projects own a detail deck; nothing else is built. */
export function generateStaticParams() {
  return workDetailSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = workDetails.en[slug];
  const item = pickItem(en, slug);
  if (!detail || !item) {
    // Resolve the 404 during metadata, before any HTML is flushed, so an
    // unknown slug never streams a 200 shell.
    notFound();
  }
  const title = `${item.title} — ${detail.kicker}`;
  return {
    metadataBase: new URL(METADATA_BASE),
    title,
    description: detail.summary,
    openGraph: {
      type: "article",
      title,
      description: detail.summary,
      images: [
        {
          url: OG_IMAGE,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: chrome.en.portraitAlt,
        },
      ],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  const detailEn = workDetails.en[slug];
  const detailId = workDetails.id[slug];
  const itemEn = pickItem(en, slug);
  const itemId = pickItem(id, slug);

  if (!detailEn || !detailId || !itemEn || !itemId) {
    notFound();
  }

  return (
    <>
      <SkipLink />
      <SiteRail base="/" current="work" />
      <div className="page">
        <SiteHeader />
        <main id="main">
          <WorkDetailBody
            index={workDetailSlugs.indexOf(slug)}
            total={workDetailSlugs.length}
            details={{ en: detailEn, id: detailId }}
            items={{ en: itemEn, id: itemId }}
          />
        </main>
        <Footer />
      </div>
      <SettleController />
    </>
  );
}
