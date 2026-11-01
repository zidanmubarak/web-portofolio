import Link from "next/link";
import { Section } from "@/components/ui/section";
import { WorkRail } from "@/components/work/work-rail";
import { selectedProjects } from "@/content";
import { getSiteContent } from "@/content/server";
import { localizedHref } from "@/lib/i18n";

/**
 * 03 - Selected Work. The rail owns the pinned horizontal motion; this wrapper
 * keeps the contract id/rail and the link to the full index.
 */
export async function Work() {
  const { locale, copy, projects } = await getSiteContent();

  return (
    <Section
      id="work"
      index="03"
      label={copy.work.label}
      meta={
        <Link
          href={localizedHref(locale, "/work")}
          className="link-wipe text-ink hover:text-accent"
        >
          {copy.work.viewAll}
          <span aria-hidden="true">↗</span>
        </Link>
      }
      flush
      className="min-h-svh pt-[calc(var(--topbar-h)+16px)]"
      bodyClassName="mt-0 pb-8 pt-4 md:mt-0"
      labelledBy="work-heading"
    >
      <h2
        id="work-heading"
        className="u-display max-w-[18ch] text-title leading-[0.94] tracking-[-0.035em] text-ink"
      >
        {copy.work.heading.join(" ")}
      </h2>
      <WorkRail projects={selectedProjects(projects)} />
    </Section>
  );
}
