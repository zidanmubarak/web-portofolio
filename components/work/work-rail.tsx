"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  clipReveal,
  gsap,
  pinHorizontal,
  ScrollTrigger,
  useGSAP,
  useSmoothScroll,
} from "@/lib/motion";
import type { Project } from "@/content";
import { copy } from "@/content";
import { ProjectLink } from "./project-link";
import { getResultLine, getWorkImage } from "./work-data";

type WorkRailProps = {
  projects: readonly Project[];
};

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Pinned horizontal rail (motion-map pattern #4).
 *
 * Desktop ≥1024 px pins the section and moves the track on x. Below that — and
 * under prefers-reduced-motion — `pinHorizontal` sets `data-pin-state="static"`
 * and the global stylesheet turns the rail into a normal vertical stack. The
 * counter follows scroll in both modes: ScrollTrigger while pinned, an
 * IntersectionObserver at the viewport centre while stacked.
 */
export function WorkRail({ projects }: WorkRailProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const track = React.useRef<HTMLDivElement>(null);
  const progress = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(1);
  const { lenis } = useSmoothScroll();
  const total = projects.length;

  useGSAP(
    () => {
      if (!root.current || !track.current) return;
      const section = root.current.closest("[data-section]") as HTMLElement | null;
      if (!section) return;

      section.dataset.work = "";
      const cards = Array.from(
        track.current.querySelectorAll<HTMLElement>("[data-work-card]")
      );

      const mm = pinHorizontal({
        section,
        track: track.current,
        cards,
        progress: progress.current,
        onIndex: (next) => setIndex(next),
      });

      // T6's pinHorizontal only runs its callback when a condition matches, so
      // at <1024 px without reduced motion it never sets the static marker.
      // Keep the contract attribute here until T6/T9 fixes the utility.
      const staticState = gsap.matchMedia();
      staticState.add("(max-width: 1023px)", () => {
        if (!section.dataset.pinState) section.dataset.pinState = "static";
        return () => {
          if (section.dataset.pinState === "static") {
            delete section.dataset.pinState;
          }
        };
      });

      const stacked = gsap_matchMediaStack(track.current);

      return () => {
        stacked.revert();
        staticState.revert();
        mm.revert();
        delete section.dataset.work;
      };
    },
    { scope: root }
  );

  // Stacked layouts have no pin, so a centre-line observer drives the counter.
  React.useEffect(() => {
    const node = root.current;
    if (!node) return;
    const section = node.closest("[data-section]") as HTMLElement | null;
    const cards = Array.from(
      node.querySelectorAll<HTMLElement>("[data-work-card]")
    );
    if (!section || cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (section.dataset.pinState === "pinned") return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const next = cards.indexOf(entry.target as HTMLElement) + 1;
          if (next > 0) setIndex(next);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  /**
   * Tabbing through the pinned rail must not park focus on an off-screen card.
   * Keyboard focus jumps the page to the scroll position that shows that card;
   * pointer focus is untouched.
   */
  const onFocusCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    const node = root.current;
    const section = node?.closest("[data-section]") as HTMLElement | null;
    if (!section || section.dataset.pinState !== "pinned") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-work-card]"
    );
    if (!card || !card.matches(":focus-visible")) return;

    const cards = Array.from(
      node?.querySelectorAll<HTMLElement>("[data-work-card]") ?? []
    );
    const position = cards.indexOf(card);
    if (position < 0) return;

    const trigger = ScrollTrigger.getAll().find(
      (instance) => instance.trigger === section
    );
    if (!trigger) return;

    const top =
      trigger.start +
      (total > 1 ? position / (total - 1) : 0) *
        (trigger.end - trigger.start);

    if (lenis) lenis.scrollTo(top, { duration: 0.6 });
    else window.scrollTo({ top, behavior: "auto" });
  };

  return (
    <div ref={root} className="work-rail">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-[42ch] text-small text-ink-muted">
          {copy.work.intro}
        </p>

        <div className="flex items-center gap-6">
          <p className="u-label" aria-hidden="true">
            <span className="text-ink">{pad(index)}</span>
            <span className="text-ink-muted"> / {pad(total)}</span>
          </p>
          <span className="u-label hidden text-ink-muted lg:inline">
            Scroll →
          </span>
        </div>
      </div>

      <div
        ref={track}
        data-work-track
        onFocusCapture={onFocusCapture}
        className={cn(
          "mt-6 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-8",
          "lg:w-max lg:will-change-transform"
        )}
      >
        {projects.map((project, position) => {
          const image = getWorkImage(project);
          const result = getResultLine(project);
          const href = `/work/${project.slug}`;
          const isLead = position === 0;

          return (
            <WorkCard
              key={project.slug}
              project={project}
              image={image}
              result={result}
              href={href}
              isLead={isLead}
            />
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="mt-6 hidden h-px w-full overflow-hidden bg-line lg:absolute lg:bottom-8 lg:left-0 lg:right-0 lg:mx-auto lg:mt-0 lg:block lg:max-w-site lg:px-page"
      >
        <div
          ref={progress}
          className="h-px w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

/** Mobile-only clip reveal for each card; the pinned rail is its own motion. */
function gsap_matchMediaStack(track: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add("(max-width: 1023px)", () => {
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-work-card]")
    );
    const cleanups = cards
      .map((card) => card.querySelector<HTMLElement>("[data-work-media]"))
      .filter((media): media is HTMLElement => Boolean(media))
      .map((media) => clipReveal(media, { start: "top 90%" }));
    return () => cleanups.forEach((cleanup) => cleanup());
  });
  return mm;
}

type WorkCardProps = {
  project: Project;
  image: ReturnType<typeof getWorkImage>;
  result: string;
  href: string;
  isLead: boolean;
};

function WorkCard({ project, image, result, href, isLead }: WorkCardProps) {
  const media = React.useRef<HTMLDivElement>(null);

  return (
    <ProjectLink
      href={href}
      slug={project.slug}
      image={image}
      mediaRef={media}
      data-work-card=""
      className={cn(
        "shrink-0 border-t border-line pt-4 lg:pt-5",
        isLead
          ? "lg:w-[56vw] lg:max-w-[880px] xl:w-[52vw]"
          : "lg:w-[34vw] lg:max-w-[560px] xl:w-[31vw]"
      )}
    >
      <div
        ref={media}
        data-work-media
        data-case-source
        className="relative aspect-[16/10] max-h-[50vh] w-full overflow-hidden border border-line bg-surface-elevated"
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={
              isLead
                ? "(min-width: 1280px) 52vw, (min-width: 1024px) 56vw, 100vw"
                : "(min-width: 1280px) 31vw, (min-width: 1024px) 34vw, 100vw"
            }
            className={cn(
              "h-full w-full transition-transform duration-700 ease-expo group-hover/project:scale-[1.03] group-focus-visible/project:scale-[1.03]",
              project.slug === "jawi-ocr" ? "object-contain" : "object-cover"
            )}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="u-label text-ink-muted">Image pending</span>
          </div>
        )}

        <span className="u-label absolute left-0 top-0 bg-surface px-3 py-2 text-ink-muted">
          {project.categoryLabel}
          {image?.generated ? " · Generated visual" : ""}
        </span>
        <span className="u-label absolute right-0 top-0 bg-surface px-3 py-2 text-ink">
          {project.index}
        </span>

        {/* Hover/focus preview: the summary and the first stack items, not a
            second invented screenshot. Hidden on touch because there is no
            hover state to close it. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full",
            "border-t border-line bg-surface p-4 transition-transform duration-500 ease-expo",
            "group-hover/project:translate-y-0 group-focus-visible/project:translate-y-0",
            "[@media(hover:hover)]:block"
          )}
        >
          <p className="text-small text-ink">{project.summary}</p>
          <p className="u-label mt-3 text-ink-muted">
            {project.stack.slice(0, 4).join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="u-display text-[clamp(1.5rem,2.4vw,2rem)] leading-none tracking-[-0.02em] text-ink transition-transform duration-500 ease-expo group-hover/project:translate-x-1 group-focus-visible/project:translate-x-1">
          {project.title}
        </h3>
        <span className="u-label shrink-0 text-ink-muted">
          {project.year} · {project.categoryLabel}
        </span>
      </div>

      <p className="u-label mt-3 text-ink-muted">{result}</p>

      <span className="link-wipe u-label mt-4 inline-flex text-ink group-hover/project:text-accent group-focus-visible/project:text-accent">
        {project.caseStudy ? copy.work.caseStudyCta : "View project"}
        <span aria-hidden="true">↗</span>
      </span>
    </ProjectLink>
  );
}
