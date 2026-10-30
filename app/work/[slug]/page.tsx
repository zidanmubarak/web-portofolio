import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseFigure } from "@/components/work/case-figure";
import { CaseBlock, blockAnchor, blockRailLabel } from "@/components/work/case-blocks";
import { TextLink } from "@/components/ui/text-link";
import { Odometer } from "@/components/ui/odometer";
import {
  copy,
  getCaseStudy,
  getProject,
  projects,
  sourceList,
} from "@/content";
import { getWorkImage } from "@/components/work/work-data";
import {
  heroCaption,
  heroFigureLabel,
  projectLinkItems,
} from "@/components/work/project-links";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const study = project.caseStudy ? getCaseStudy(project.caseStudy) : undefined;
  const image = getWorkImage(project);
  const title = project.title;
  const fullTitle = copy.meta.titleTemplate.replace("%s", project.title);
  const description = study?.summary ?? project.summary;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: fullTitle,
      description,
      type: "article",
      url: `/work/${project.slug}`,
      ...(image
        ? {
            images: [
              {
                url: image.src,
                width: image.width,
                height: image.height,
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = project.caseStudy ? getCaseStudy(project.caseStudy) : undefined;
  const image = getWorkImage(project);
  const position = projects.findIndex((entry) => entry.slug === project.slug);
  const previous = projects[(position - 1 + projects.length) % projects.length];
  const next = projects[(position + 1) % projects.length];
  const links = projectLinkItems(project);
  const references = (study?.sources ?? project.sources)
    .map((id) => sourceList.find((source) => source.id === id))
    .filter((source): source is (typeof sourceList)[number] => Boolean(source));

  return (
    <article className="pb-24 md:pb-32">
      <header
        data-case-header
        className="u-container pt-[calc(var(--topbar-h)+32px)] md:pt-[calc(var(--topbar-h)+56px)]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-3">
          <Link
            href="/work"
            className="link-wipe u-label text-ink hover:text-accent"
          >
            <span aria-hidden="true">←</span> {copy.caseStudy.backLabel}
          </Link>
          <p className="u-label text-ink-muted">
            {project.index} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-grid">
          <div className="min-w-0 lg:col-span-8">
            <p className="u-label text-accent">
              {study ? copy.work.caseStudyLabel : project.categoryLabel}
            </p>
            <h1 className="u-display mt-4 text-display text-ink">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[54ch] text-lead text-ink-muted">
              {study?.subtitle ?? project.summary}
            </p>

            {links.length > 0 ? (
              <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-3">
                {links.map((link) => (
                  <TextLink
                    key={link.id}
                    href={link.href}
                    external
                    mark="↗"
                    className="u-label inline-flex min-h-[44px] items-center py-2 text-ink"
                  >
                    {link.label}
                  </TextLink>
                ))}
              </div>
            ) : null}
          </div>

          <dl className="border-t border-line lg:col-span-4 lg:mt-2 lg:pr-8">
            <MetaRow term={copy.caseStudy.metaRole} value={project.role} />
            <MetaRow term={copy.caseStudy.metaYear} value={project.year} />
            <MetaRow term={copy.work.stackLabel} value={project.stack.join(" · ")} />
            <MetaRow
              term={copy.caseStudy.metaReadingTime}
              value={study?.readingTime ?? copy.caseStudy.projectNote}
            />
            {project.team ? (
              <MetaRow term={copy.caseStudy.teamLabel} value={project.team} />
            ) : null}
          </dl>
        </div>
      </header>

      {image ? (
        <div className="u-container mt-10 md:mt-14">
          <CaseFigure
            slug={project.slug}
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            caption={heroCaption(project)}
            label={heroFigureLabel(project)}
            priority
          />
        </div>
      ) : null}

      {study ? (
        <section
          aria-labelledby="headline-metric"
          className="u-container mt-14 border-y border-line py-8 md:mt-20 md:py-10"
        >
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="u-label text-ink-muted" id="headline-metric">
                {copy.caseStudy.headlineLabel}
              </p>
              <p className="u-display mt-2 text-[clamp(4rem,10vw,9rem)] leading-[0.82] text-ink">
                <Odometer
                  value={study.headlineMetric.value}
                  decimals={study.headlineMetric.decimals}
                  suffix={study.headlineMetric.suffix}
                  label={study.headlineMetric.label}
                />
              </p>
              <p className="u-label mt-3 text-ink-muted">
                {study.headlineMetric.label}
              </p>
            </div>
            <p className="max-w-[46ch] text-small text-ink-muted lg:col-span-5">
              {study.headlineMetric.context}
            </p>
          </div>
        </section>
      ) : null}

      <div className="u-container mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-grid">
        {study ? (
          <aside className="min-w-0 lg:col-span-3">
            <nav
              aria-label="Case study sections"
              className="min-w-0 lg:sticky lg:top-[calc(var(--topbar-h)+32px)]"
            >
              <p className="u-label text-ink-muted">
                {copy.caseStudy.contentsLabel}
              </p>
              <ol className="mt-4 flex gap-4 overflow-x-auto border-y border-line py-3 lg:block lg:overflow-visible lg:border-y-0 lg:py-0">
                {study.blocks.map((block) => {
                  const { index, label } = blockRailLabel(block);
                  return (
                    <li
                      key={block.id}
                      className="shrink-0 border-0 lg:border-b lg:border-line"
                    >
                      <a
                        href={`#${blockAnchor(block)}`}
                        className="group flex items-baseline gap-2 whitespace-nowrap py-1 text-small text-ink-muted transition-colors hover:text-ink focus-visible:text-ink lg:gap-3 lg:py-3"
                      >
                        <span className="u-label text-accent">{index}</span>
                        <span>{label}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
              {links.length > 0 ? (
                <div className="mt-6 flex flex-col gap-2">
                  {links.map((link) => (
                    <TextLink
                      key={link.id}
                      href={link.href}
                      external
                      mark="↗"
                      className="u-label inline-flex min-h-[44px] items-center py-2 text-ink"
                    >
                      {link.label}
                    </TextLink>
                  ))}
                </div>
              ) : null}
            </nav>
          </aside>
        ) : (
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--topbar-h)+32px)]">
              <p className="u-label text-ink-muted">{copy.work.linksLabel}</p>
              <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
                {links.map((link) => (
                  <TextLink
                    key={link.id}
                    href={link.href}
                    external
                    mark="↗"
                    className="u-label text-ink"
                  >
                    {link.label}
                  </TextLink>
                ))}
              </div>
            </div>
          </aside>
        )}

        <div className="min-w-0 space-y-14 lg:col-span-9">
          {study ? (
            study.blocks.map((block) => (
              <CaseBlock key={block.id} block={block} />
            ))
          ) : (
            <CompactProject project={project} />
          )}
        </div>
      </div>

      {study ? (
        <div className="u-container mt-16 space-y-14 md:mt-24">
          <DemoFigure project={project} />
          <SourceCrops />
        </div>
      ) : null}

      {study ? (
        <section className="u-container mt-16 grid gap-10 md:mt-24 lg:grid-cols-2 lg:gap-grid">
          <div>
            <p className="u-label text-accent">{copy.caseStudy.lessonsLabel}</p>
            <ol className="mt-4 border-t border-line">
              {study.lessons.map((lesson, index) => (
                <li
                  key={lesson.slice(0, 32)}
                  className="grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-4"
                >
                  <span className="u-label text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body text-ink">{lesson}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="u-label text-accent">
              {copy.caseStudy.limitationsLabel}
            </p>
            <ul className="mt-4 border-t border-line">
              {study.limitations.map((limitation) => (
                <li
                  key={limitation.slice(0, 32)}
                  className="border-b border-line py-4 text-body text-ink-muted"
                >
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {references.length > 0 ? (
        <section className="u-container mt-14 md:mt-20">
          <p className="u-label text-ink-muted">
            {copy.caseStudy.sourcesLabel}
          </p>
          <ul className="mt-4 border-t border-line">
            {references.map((source) => (
              <li
                key={source.id}
                className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-3"
              >
                <span className="max-w-[70ch] text-small text-ink-muted">
                  {source.label}
                </span>
                {source.url ? (
                  <TextLink
                    href={source.url}
                    external
                    mark="↗"
                    className="u-label inline-flex min-h-[44px] items-center py-2 text-ink"
                  >
                    {copy.caseStudy.openLabel}
                  </TextLink>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav
        aria-label={copy.caseStudy.otherProjectsLabel}
        className="u-container mt-16 grid border-t border-line md:mt-24 sm:grid-cols-2"
      >
        <Link
          href={`/work/${previous.slug}`}
          className="group border-b border-line py-6 sm:border-b-0 sm:border-r sm:pr-8"
        >
          <span className="u-label text-ink-muted">
            <span aria-hidden="true">←</span> {copy.work.prevProject}
          </span>
          <span className="u-display mt-2 block text-heading text-ink transition-colors group-hover:text-accent">
            {previous.title}
          </span>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="group py-6 text-left sm:pl-8 sm:text-right"
        >
          <span className="u-label text-ink-muted">
            {copy.work.nextProject} <span aria-hidden="true">→</span>
          </span>
          <span className="u-display mt-2 block text-heading text-ink transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}

function MetaRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-line py-3 sm:grid-cols-[96px_1fr] sm:gap-4">
      <dt className="u-label text-ink-muted">{term}</dt>
      <dd className="text-small text-ink">{value}</dd>
    </div>
  );
}

function CompactProject({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  return (
    <div className="space-y-14">
      <section aria-labelledby="overview-heading">
        <p className="u-label text-accent">01 — Overview</p>
        <h2
          id="overview-heading"
          className="u-display mt-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[0.94] text-ink"
        >
          What it is
        </h2>
        <div className="mt-6 max-w-[64ch] space-y-5">
          <p className="text-lead text-ink">{project.summary}</p>
          {project.description ? (
            <p className="text-body text-ink-muted">{project.description}</p>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="highlights-heading" className="border-t border-line pt-8">
        <p className="u-label text-accent">02 — Highlights</p>
        <h2 id="highlights-heading" className="sr-only">
          Highlights
        </h2>
        <ol className="mt-6 border-t border-line">
          {project.highlights.map((highlight, index) => (
            <li
              key={highlight.slice(0, 32)}
              className="grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-4"
            >
              <span className="u-label text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[68ch] text-body text-ink">
                {highlight}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="stack-heading" className="border-t border-line pt-8">
        <p className="u-label text-accent">03 — Stack</p>
        <h2 id="stack-heading" className="sr-only">
          Stack
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tool) => (
            <li
              key={tool}
              className="u-label border border-line px-2 py-1 text-ink-muted"
            >
              {tool}
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}

function DemoFigure({
  project,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
}) {
  if (project.slug !== "jawi-ocr") return null;

  return (
    <CaseFigure
      slug={`${project.slug}-demo`}
      src="/projects/jawi-ocr/demo.webp"
      width={2000}
      height={1250}
      alt="The Jawi transliteration Gradio Space with an image upload area, extraction and Rumi panels, and two example crops."
      caption="The Gradio demo that ships with the adapter. The two example crops are the ones in the Space repository."
      label="Fig. 02 — Demo"
    />
  );
}

function SourceCrops() {
  return (
    <figure>
      <div className="grid gap-3 sm:grid-cols-[1fr_1.45fr]">
        <div className="flex items-center justify-center border border-line bg-paper p-3">
          <Image
            src="/projects/jawi-ocr/crop-01.webp"
            alt="A one-line printed Jawi crop used as an example in the demo."
            width={520}
            height={81}
            sizes="(min-width: 640px) 40vw, 100vw"
            className="h-auto w-full"
          />
        </div>
        <div className="flex items-center justify-center border border-line bg-paper p-3">
          <Image
            src="/projects/jawi-ocr/crop-02.webp"
            alt="A two-line printed Jawi crop used as an example in the demo."
            width={959}
            height={203}
            sizes="(min-width: 640px) 55vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-ink-muted sm:flex-row sm:justify-between sm:gap-8">
        <span className="u-label text-ink">Fig. 03 — Demo inputs</span>
        <span className="u-label max-w-[80ch] sm:text-right">
          The two example crops shipped with the Space, one line and two lines.
        </span>
      </figcaption>
    </figure>
  );
}
