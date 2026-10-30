import Link from "next/link";
import { Section } from "@/components/ui/section";
import { WorkRail } from "@/components/work/work-rail";
import { copy, selectedProjects } from "@/content";

/**
 * 03 — Selected Work. The rail owns the pinned horizontal motion; this wrapper
 * keeps the contract id/rail and the link to the full index.
 */
export function Work() {
  return (
    <Section
      id="work"
      index="03"
      label={copy.work.label}
      meta={
        <Link href="/work" className="link-wipe text-ink hover:text-accent">
          {copy.work.viewAll}
          <span aria-hidden="true">↗</span>
        </Link>
      }
      flush
      className="min-h-svh pt-[calc(var(--topbar-h)+16px)]"
      bodyClassName="mt-0 pb-8 pt-4 md:mt-0"
      labelledBy="work-heading"
    >
      <h2 id="work-heading" className="sr-only">
        {copy.work.heading.join(" ")}
      </h2>
      <WorkRail projects={selectedProjects} />
    </Section>
  );
}
