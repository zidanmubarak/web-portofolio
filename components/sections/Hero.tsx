"use client";

import * as React from "react";
import {
  SubpixelPortrait,
  type SubpixelPortraitHandle,
} from "@/components/subpixel";
import { LocalClock } from "@/components/shell/local-clock";
import { Odometer } from "@/components/ui/odometer";
import { TextLink } from "@/components/ui/text-link";
import { profile } from "@/content/profile";
import {
  DUR,
  EASE,
  STAGGER,
  ScrollTrigger,
  SplitText,
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/lib/motion";

export type HeroProps = {
  /**
   * T9 integration hook. `"loader"` (default) waits for the T4
   * `rubric:loader-exit` event; `"mount"` starts immediately. While the
   * loader is not mounted yet, the hero starts on its own so the build is
   * never left with an invisible masthead.
   */
  introTrigger?: "loader" | "mount";
};

const heroMetrics = profile.metrics.filter((metric) => metric.hero);

const coordinateLabel = `${profile.location.coordinates.lat
  .toFixed(4)
  .padStart(7, "0")}° N / ${profile.location.coordinates.lng.toFixed(4)}° E`;

/**
 * Hero — the masthead, not an indexed chapter (design-direction.md §4.2).
 *
 * Motion-map #1: masked line reveal for the name, clip reveal for the paper
 * plate, opacity for the metadata. Scroll then hands the portrait a 0–1
 * progress so the RGB grid unravelles as the plate leaves the viewport.
 */
export function Hero({ introTrigger = "loader" }: HeroProps) {
  const root = React.useRef<HTMLElement>(null);
  const portrait = React.useRef<SubpixelPortraitHandle>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const scroller = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        invalidateOnRefresh: true,
        onUpdate: (self) => portrait.current?.setScroll(self.progress),
      });

      if (prefersReducedMotion()) {
        return () => scroller.kill();
      }

      const name = section.querySelector<HTMLElement>("[data-hero-name]");
      const subline = section.querySelector<HTMLElement>("[data-hero-subline]");
      const plate = section.querySelector<HTMLElement>("[data-hero-plate]");
      const metas = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-hero-meta]")
      );

      if (!name || !plate) {
        return () => scroller.kill();
      }

      const nameSplit = SplitText.create(name, {
        type: "lines",
        mask: "lines",
        linesClass: "motion-line",
        // The heading keeps its own text; SplitText must not add aria-label.
        aria: "none",
      });
      const subSplit = subline
        ? SplitText.create(subline, {
            type: "lines",
            mask: "lines",
            linesClass: "motion-line",
            // aria-label is prohibited on a <p>, so leave the text intact.
            aria: "none",
          })
        : null;

      gsap.set(nameSplit.lines, { yPercent: 110 });
      if (subSplit) gsap.set(subSplit.lines, { yPercent: 110 });
      gsap.set(plate, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(metas, { opacity: 0, y: 8 });

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: EASE.expo },
      });

      timeline
        .to(nameSplit.lines, {
          yPercent: 0,
          duration: DUR.lines,
          stagger: STAGGER.lines,
        })
        .to(
          plate,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          0.1
        );

      if (subSplit) {
        timeline.to(
          subSplit.lines,
          { yPercent: 0, duration: 0.8, stagger: 0.06 },
          0.35
        );
      }

      timeline.to(
        metas,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
        0.5
      );

      let started = false;

      const play = () => {
        if (started) return;
        started = true;
        timeline.play(0);
        portrait.current?.playIntro();
      };

      const html = document.documentElement;
      const loaderPending =
        html.dataset.loader === "pending" ||
        Boolean(document.querySelector("[data-loader-root]"));

      const startImmediately =
        introTrigger === "mount" ||
        html.dataset.loader === "done" ||
        !loaderPending;

      const onLoaderExit = () => play();

      let fallback = 0;
      if (startImmediately) {
        play();
      } else {
        window.addEventListener("rubric:loader-exit", onLoaderExit, {
          once: true,
        });
        // The loader owns a 6 s fail-safe; the hero keeps its own so a missing
        // overlay can never leave the page empty.
        fallback = window.setTimeout(play, 4000);
      }

      return () => {
        window.clearTimeout(fallback);
        window.removeEventListener("rubric:loader-exit", onLoaderExit);
        timeline.kill();
        nameSplit.revert();
        subSplit?.revert();
        scroller.kill();
      };
    },
    { scope: root, dependencies: [introTrigger] }
  );

  return (
    <section
      ref={root}
      id="hero"
      data-section="hero"
      data-surface="dark"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col overflow-hidden bg-surface pt-[var(--topbar-h)]"
    >
      <div className="u-container flex flex-1 flex-col pb-4 pt-4 md:pb-8 md:pt-10">
        <div className="u-grid items-start gap-y-6 lg:flex-1">
          {/* Paper plate — first on mobile so the name never covers the face. */}
          <div className="order-1 col-span-4 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:flex lg:h-full lg:justify-end">
            <div className="w-full md:mx-auto md:max-w-[30rem] lg:mx-0 lg:ml-auto lg:mr-8 lg:max-w-none">
              <figure
                data-hero-plate
                className="relative h-[44svh] w-full overflow-hidden bg-paper lg:h-[74svh]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 z-10"
                >
                  <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-paper-muted" />
                  <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-paper-muted" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-paper-muted" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-paper-muted" />
                </span>

                {/* The portrait is cropped 2:3; the plate is the paper field. */}
                <div className="absolute bottom-0 right-[4%] flex aspect-[2/3] h-[92%] max-w-[88%] items-end">
                  <SubpixelPortrait
                    ref={portrait}
                    src="/images/portrait/portrait-halfbody.webp"
                    poster="/images/portrait/portrait-poster.webp"
                    intro="manual"
                    plate={false}
                    label="Portrait of Zidan Mubarak, half body, rendered as an RGB subpixel grid"
                    className=""
                  />
                </div>

                <span className="u-label absolute left-3 top-3 z-10 text-paper-muted">
                  Fig. 01 — ZM
                </span>
              </figure>

              <div
                data-hero-meta
                className="u-label mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-ink-muted"
              >
                <span>{coordinateLabel}</span>
                <LocalClock />
              </div>
            </div>
          </div>

          {/* Name, role, subline, CTA, verified numbers. */}
          <div className="order-2 col-span-4 flex flex-col justify-between lg:order-none lg:col-span-8 lg:row-start-1 lg:h-full lg:pr-12 lg:pt-8">
            <div>
              <p
                data-hero-meta
                className="u-label flex items-center gap-3 text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-[5px] w-[5px] rounded-full bg-accent"
                />
                <span className="md:hidden">
                  AI/ML engineer · Banda Aceh, ID
                </span>
                <span className="hidden md:inline">
                  AI/ML engineer · Computer vision · Web
                </span>
              </p>

              <h1
                id="hero-heading"
                data-hero-name
                className="u-display mt-4 text-mega md:mt-6"
              >
                <span className="block">{profile.headline[0]}</span>
                <span className="block">{profile.headline[1]}</span>
              </h1>

              <p
                data-hero-subline
                className="mt-4 max-w-[34ch] text-lead text-ink-muted md:mt-8"
              >
                I fine-tune vision-language models until they can read Jawi
                handwriting.
              </p>

              <p data-hero-meta className="mt-6 md:mt-8">
                <TextLink
                  href="#work"
                  mark="↓"
                  className="u-label text-ink hover:text-accent"
                >
                  View selected work
                </TextLink>
              </p>
            </div>

            <dl
              data-hero-meta
              className="mt-8 hidden grid-cols-3 gap-4 border-t border-line pt-4 lg:mt-0 lg:grid lg:max-w-[34rem]"
            >
              {heroMetrics.map((metric) => (
                <div key={metric.id} className="flex flex-col gap-2">
                  <dt className="u-label order-2 text-ink-muted">
                    {metric.label}
                  </dt>
                  <dd className="order-1 m-0">
                    <Odometer
                      value={metric.value}
                      decimals={metric.decimals}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      className="text-heading text-ink"
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div
          data-hero-meta
          className="u-label mt-6 flex items-center justify-between border-t border-line pt-4 text-ink-muted lg:pr-14"
        >
          <span>{profile.location.city}, {profile.location.countryCode}</span>
          <span aria-hidden="true">Scroll to read</span>
        </div>
      </div>
    </section>
  );
}
