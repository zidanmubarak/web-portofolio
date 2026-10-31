import type { Metadata } from "next";
import Link from "next/link";
import { WorkIndex } from "@/components/work/work-index";
import { TextLink } from "@/components/ui/text-link";
import { selectedProjects } from "@/content";
import { contentFor, getSiteContent } from "@/content/server";

import { isLocale, localizedHref } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { copy } = contentFor(lang);
  const title = copy.work.indexHeading.join(" ");
  const fullTitle = copy.meta.titleTemplate.replace("%s", title);

  return {
    title,
    description: copy.work.indexIntro,
    alternates: {
      canonical: localizedHref(lang, "/work"),
      languages: { id: "/work", en: "/en/work", "x-default": "/work" },
    },
    openGraph: {
      title: fullTitle,
      description: copy.work.indexIntro,
      type: "website",
      url: localizedHref(lang, "/work"),
      locale: lang === "id" ? "id_ID" : "en_US",
    },
  };
}

/**
 * /work - the numbered index. Kept server-rendered; only the hover preview and
 * the row links are client.
 */
export default async function WorkIndexPage() {
  const { locale, copy, profile, projects } = await getSiteContent();
  const work = selectedProjects(projects);

  return (
    <article className="pb-24 md:pb-32">
      <header className="u-container pt-[calc(var(--topbar-h)+40px)] md:pt-[calc(var(--topbar-h)+64px)]">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-3">
          <p className="u-label text-ink-muted">
            <span className="text-accent">03</span>
            <span aria-hidden="true"> / </span>
            {copy.work.label}
          </p>
          <p className="u-label text-ink-muted">
            {work.length} {copy.work.projectsLabel} · 2026
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-grid">
          <div className="lg:col-span-9">
            <h1 className="u-display text-display text-ink">
              {copy.work.indexHeading.join(" ")}
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-ink-muted">
              {copy.work.indexIntro}
            </p>
          </div>

          <div className="lg:col-span-3 lg:pr-12 lg:pt-2">
            <p className="u-label text-ink-muted">
              {profile.name} · {profile.location.city}, ID
            </p>
            <p className="mt-3 text-small text-ink-muted">
              {copy.work.indexNote}
            </p>
            <TextLink
              href={localizedHref(locale, "/#work")}
              className="mt-6 text-small text-ink"
            >
              {copy.work.backToWork}
            </TextLink>
          </div>
        </div>
      </header>

      <section
        aria-label={copy.work.label}
        className="u-container mt-14 md:mt-20"
      >
        <WorkIndex projects={work} />
      </section>

      <footer className="u-container mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4 lg:pr-12">
        <p className="u-label text-ink-muted">
          {copy.work.label} · {profile.name}
        </p>
        <Link
          href={localizedHref(locale, "/#contact")}
          className="link-wipe u-label text-ink hover:text-accent"
        >
          {copy.nav.items.find((item) => item.id === "contact")?.label ??
            copy.nav.items[0]?.label ??
            "Contact"}
          <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </article>
  );
}
