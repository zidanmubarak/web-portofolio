"use client";

import * as React from "react";
import { siPython, siPytorch } from "simple-icons";
import { useGSAP } from "@/lib/motion/gsap";
import { revealLines } from "@/lib/motion/reveal-lines";
import { scrubWords } from "@/lib/motion/scrub-words";
import { clipReveal } from "@/lib/motion/clip-reveal";
import { pinHorizontal } from "@/lib/motion/pin-horizontal";
import { DUR } from "@/lib/motion/tokens";
import { Button } from "@/components/ui/button";
import { Odometer } from "@/components/ui/odometer";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { services } from "@/content/services";
import { profile } from "@/content/profile";

function LineDemo() {
  const root = React.useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      return revealLines(root.current, { scroll: false });
    },
    { scope: root }
  );

  return (
    <h3
      ref={root}
      className="u-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]"
    >
      Lines read in order.
    </h3>
  );
}

function ClipDemo() {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      return clipReveal(root.current, { scroll: false, duration: 1 });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="flex aspect-[16/10] items-end border border-line bg-surface-elevated p-6"
    >
      <p className="u-label text-ink-muted">
        clip-path · inset 100% → 0 · 1.0 s · expo.out
      </p>
    </div>
  );
}

function ScrubDemo() {
  const root = React.useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      return scrubWords(root.current);
    },
    { scope: root }
  );

  return (
    <p
      ref={root}
      className="max-w-[52ch] text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.15]"
    >
      {profile.about[0]}
    </p>
  );
}

function PinDemo() {
  const section = React.useRef<HTMLDivElement>(null);
  const track = React.useRef<HTMLDivElement>(null);
  const progress = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(1);

  useGSAP(
    () => {
      if (!section.current || !track.current) return;
      const cards = Array.from(
        track.current.querySelectorAll<HTMLElement>("[data-pin-card]")
      );
      const mm = pinHorizontal({
        section: section.current,
        track: track.current,
        cards,
        progress: progress.current,
        onIndex: setIndex,
      });
      return () => mm.revert();
    },
    { scope: section }
  );

  const slides = [
    { title: "Jawi OCR", meta: "Research · 2026" },
    { title: "Pacu Pintar", meta: "ML · 2025" },
    { title: "Memory Vault AI", meta: "Open source · 2026" },
  ];

  return (
    <div
      ref={section}
      className="relative -mx-page flex min-h-svh flex-col justify-center overflow-hidden border-y border-line bg-surface px-page py-10"
    >
      <div className="mb-8 flex items-baseline justify-between">
        <p className="u-label text-ink-muted">Pinned horizontal rail</p>
        <p className="u-label text-ink">
          {String(index).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </p>
      </div>

      <div ref={track} className="flex flex-col gap-6 md:w-max md:flex-row" data-work-track>
        {slides.map((slide, slideIndex) => (
          <article
            key={slide.title}
            data-pin-card
            className="flex h-[48svh] w-full flex-col justify-between border border-line bg-surface-elevated p-6 md:w-[38vw]"
          >
            <span className="u-label text-accent">
              {String(slideIndex + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="u-display text-[clamp(1.5rem,3vw,2.5rem)] leading-none">
                {slide.title}
              </h3>
              <p className="u-label mt-3 text-ink-muted">{slide.meta}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 h-px w-full bg-line">
        <div
          ref={progress}
          className="h-px w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

function IconSwapDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="group flex w-40 flex-col items-start gap-4 border border-line p-4 focus-within:border-accent">
        <span className="relative grid h-14 w-14 place-items-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7 fill-ink-muted"
          >
            <path d={siPython.path} />
          </svg>
          <span className="icon-swap-layer absolute inset-0 grid place-items-center bg-surface-elevated">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-accent"
            >
              <path d={siPytorch.path} />
            </svg>
          </span>
        </span>
        <span className="u-label text-ink-muted group-hover:text-ink">
          Python → PyTorch
        </span>
        <a href="#icon-swap" className="sr-only">
          Focus target for the swap state
        </a>
      </div>

      <div className="flex w-40 flex-col items-start gap-4 border border-accent bg-surface-elevated p-4">
        <span className="relative grid h-14 w-14 place-items-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7 fill-ink-muted"
          >
            <path d={siPython.path} />
          </svg>
          <span className="absolute inset-0 grid place-items-center bg-surface-elevated">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-accent"
            >
              <path d={siPytorch.path} />
            </svg>
          </span>
        </span>
        <span className="u-label text-ink">Hover / focus state</span>
      </div>
    </div>
  );
}

export function MotionLab() {
  const [lineRun, setLineRun] = React.useState(0);
  const [clipRun, setClipRun] = React.useState(0);

  return (
    <div className="space-y-20">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="u-label text-ink-muted">01 / Masked lines</p>
          <p className="mt-3 text-small text-ink-muted">
            SplitText lines · mask · {DUR.lines}s · stagger 0.08 · expo.out
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-5"
            onClick={() => setLineRun((value) => value + 1)}
          >
            Replay
          </Button>
        </div>
        <div className="md:col-span-9">
          <LineDemo key={lineRun} />
        </div>
      </div>

      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="u-label text-ink-muted">02 / Scrubbed words</p>
          <p className="mt-3 text-small text-ink-muted">
            Word opacity 0.18 → 1 · scrub 1 · no y offset
          </p>
        </div>
        <div className="md:col-span-9">
          <ScrubDemo />
        </div>
      </div>

      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="u-label text-ink-muted">03 / Clip reveal</p>
          <p className="mt-3 text-small text-ink-muted">
            clip-path inset · 1.0 s · expo.out
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-5"
            onClick={() => setClipRun((value) => value + 1)}
          >
            Replay
          </Button>
        </div>
        <div className="md:col-span-9">
          <ClipDemo key={clipRun} />
        </div>
      </div>

      <div className="border-t border-line pt-10">
        <p className="u-label text-ink-muted">04 / Pinned rail (≥1024 px)</p>
        <p className="mt-3 max-w-[60ch] text-small text-ink-muted">
          Scroll; desktop pins the rail and moves the track on x. Mobile stacks
          the cards and never pins. `prefers-reduced-motion` skips the pin.
        </p>
      </div>

      <div className="relative">
        <PinDemo />
      </div>

      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="u-label text-ink-muted">05 / Odometer</p>
          <p className="mt-3 text-small text-ink-muted">
            Digit roll · 0.9 s · stagger 0.04 · tabular
          </p>
        </div>
        <div className="md:col-span-9">
          <dl className="grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="u-label text-ink-muted">fewer character errors</dt>
              <dd className="mt-3 text-[clamp(2.25rem,4vw,3.5rem)]">
                <Odometer value={79} suffix="%" label="fewer character errors" />
              </dd>
            </div>
            <div>
              <dt className="u-label text-ink-muted">authentic samples</dt>
              <dd className="mt-3 text-[clamp(2.25rem,4vw,3.5rem)]">
                <Odometer
                  value={7902}
                  prefix="≈"
                  label="authentic Jawi samples"
                />
              </dd>
            </div>
            <div>
              <dt className="u-label text-ink-muted">GPA</dt>
              <dd className="mt-3 text-[clamp(2.25rem,4vw,3.5rem)]">
                <Odometer value={3.77} decimals={2} suffix="/4.00" label="GPA" />
              </dd>
            </div>
            <div>
              <dt className="u-label text-ink-muted">public repositories</dt>
              <dd className="mt-3 text-[clamp(2.25rem,4vw,3.5rem)]">
                <Odometer value={17} label="public repositories" />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="u-label text-ink-muted">06 / Icon swap</p>
          <p className="mt-3 text-small text-ink-muted">
            Two layers · clip-path circle · 0.28 s · power3.out. Hover or tab
            into the demo.
          </p>
        </div>
        <div className="md:col-span-9" id="icon-swap">
          <IconSwapDemo />
        </div>
      </div>

      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="u-label text-ink-muted">07 / Numbered accordion</p>
          <p className="mt-3 text-small text-ink-muted">
            Height snaps once · FLIP transform on siblings · clip-path panel.
            One item open.
          </p>
        </div>
        <div className="md:col-span-9">
          <Accordion defaultOpenId="ai-ml-engineering" label="Accordion demo">
            {services.slice(0, 3).map((service) => (
              <AccordionItem
                key={service.id}
                id={service.id}
                index={service.index}
                title={service.title}
                meta={service.capabilities[0]}
              >
                <p>{service.description}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="u-label text-ink-muted">08 / Underline draw</p>
          <p className="mt-3 text-small text-ink-muted">
            scaleX 0 → 1 from the left · 0.32 s · expo.out
          </p>
        </div>
        <div className="md:col-span-9">
          <a
            href="#contact"
            className="link-wipe text-[clamp(1.25rem,2.5vw,2rem)] font-medium"
          >
            Read the Jawi case study
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-4 max-w-[52ch] text-small text-ink-muted">
            Hover or focus the link. The rule belongs to the link, not to a
            decorative divider.
          </p>
        </div>
      </div>

      <p className="border-t border-line pt-6 text-small text-ink-muted">
        Signature draw and loader live in T4 (<code>lib/loader</code>); route
        transition is T8/T9. Both use the same ease/duration tokens above.
        Marquee is implemented in <code>components/ui/marquee.tsx</code> but is
        deliberately absent from this page: T2 rejected marquees for RUBRIC.
      </p>
    </div>
  );
}
