import type { Metadata } from "next";
import Link from "next/link";
import { WorkIndex } from "@/components/work/work-index";
import { TextLink } from "@/components/ui/text-link";
import { copy, profile, selectedProjects } from "@/content";

const title = copy.work.indexHeading.join(" ");
const fullTitle = copy.meta.titleTemplate.replace("%s", title);

export const metadata: Metadata = {
  title,
  description: copy.work.indexIntro,
  alternates: { canonical: "/work" },
  openGraph: {
    title: fullTitle,
    description: copy.work.indexIntro,
    type: "website",
    url: "/work",
  },
};

/**
 * /work — the numbered index. Kept server-rendered; only the hover preview and
 * the row links are client.
 */
export default function WorkIndexPage() {
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
            {selectedProjects.length} projects · 2026
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
              Every row opens a page. The first one is the full thesis case
              study; the others are shorter project notes.
            </p>
            <TextLink href="/#work" className="mt-6 text-small text-ink">
              {copy.work.backToWork}
            </TextLink>
          </div>
        </div>
      </header>

      <section
        aria-label={copy.work.label}
        className="u-container mt-14 md:mt-20"
      >
        <WorkIndex projects={selectedProjects} />
      </section>

      <footer className="u-container mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4 lg:pr-12">
        <p className="u-label text-ink-muted">
          {copy.work.label} · {profile.name}
        </p>
        <Link
          href="/#contact"
          className="link-wipe u-label text-ink hover:text-accent"
        >
          {copy.nav.items.find((item) => item.id === "contact")?.label ??
            "Contact"}
          <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </article>
  );
}
