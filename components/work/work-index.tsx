"use client";

import * as React from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import type { Project } from "@/content";
import { useI18n } from "@/components/i18n/provider";
import { localizedHref } from "@/lib/i18n";
import { ProjectLink } from "./project-link";
import { getResultLine, getWorkImage } from "./work-data";

type WorkIndexProps = {
  projects: readonly Project[];
};

/**
 * `/work` index - numbered rows with a cursor-following preview on hover.
 *
 * The preview is decorative (`aria-hidden`) and only appears on fine pointers;
 * touch layouts get an inline thumbnail inside each row instead. The row link
 * stages the same shared-figure handoff as the homepage rail.
 */
export function WorkIndex({ projects }: WorkIndexProps) {
  const { locale } = useI18n();
  const root = React.useRef<HTMLDivElement>(null);
  const preview = React.useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
  const activeProject = projects.find((project) => project.slug === activeSlug);
  const activeImage = activeProject ? getWorkImage(activeProject) : null;
  const xTo = React.useRef<((value: number) => void) | null>(null);
  const yTo = React.useRef<((value: number) => void) | null>(null);
  const hoverable = React.useRef(false);

  useGSAP(
    () => {
      if (!preview.current) return;
      hoverable.current =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !prefersReducedMotion();
      xTo.current = gsap.quickTo(preview.current, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(preview.current, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.set(preview.current, { opacity: 0, scale: 0.98 });
    },
    { scope: root }
  );

  const placePreview = (
    clientX: number,
    clientY: number,
    immediate: boolean
  ) => {
    if (!preview.current || !hoverable.current) return;
    const width = preview.current.offsetWidth;
    const height = preview.current.offsetHeight;
    let x = clientX + 28;
    let y = clientY + 28;
    if (x + width > window.innerWidth - 16) x = clientX - width - 28;
    if (y + height > window.innerHeight - 16) y = clientY - height - 28;
    if (immediate) gsap.set(preview.current, { x, y });
    else {
      xTo.current?.(x);
      yTo.current?.(y);
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    placePreview(event.clientX, event.clientY, false);
  };

  const showPreview = (slug: string, event?: React.PointerEvent) => {
    setActiveSlug(slug);
    if (!hoverable.current || !preview.current) return;
    if (event) placePreview(event.clientX, event.clientY, true);
    gsap.to(preview.current, {
      opacity: 1,
      scale: 1,
      duration: 0.28,
      ease: "power3.out",
    });
  };

  const hidePreview = () => {
    setActiveSlug(null);
    if (!preview.current) return;
    gsap.to(preview.current, { opacity: 0, scale: 0.98, duration: 0.2 });
  };

  return (
    <div ref={root} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[clamp(260px,26vw,420px)] [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          ref={preview}
          className="relative aspect-[16/10] overflow-hidden border border-line bg-surface-elevated"
        >
          {activeImage ? (
            <Image
              src={activeImage.src}
              alt=""
              width={activeImage.width}
              height={activeImage.height}
              sizes="26vw"
              className="h-full w-full object-cover"
            />
          ) : null}
          <span className="u-label absolute bottom-0 left-0 bg-surface px-2 py-1 text-ink-muted">
            {activeProject?.index} / {activeProject?.categoryLabel}
          </span>
        </div>
      </div>

      <div
        className="border-t border-line"
        onPointerMove={onPointerMove}
        onPointerLeave={hidePreview}
      >
        {projects.map((project) => {
          const image = getWorkImage(project);
          const result = getResultLine(project);

          return (
            <div
              key={project.slug}
              className="border-b border-line"
              onPointerEnter={(event) => showPreview(project.slug, event)}
            >
              <ProjectLink
                href={localizedHref(locale, `/work/${project.slug}`)}
                slug={project.slug}
                image={activeSlug === project.slug ? image : null}
                mediaRef={preview}
                onFocus={() => setActiveSlug(project.slug)}
                onBlur={hidePreview}
                className="group/row relative block py-6 lg:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-expo group-hover/row:scale-y-100 group-focus-visible/row:scale-y-100"
                />

                <div className="grid grid-cols-12 items-start gap-x-4 gap-y-3 lg:pr-12">
                  <span className="u-label col-span-2 text-ink-muted transition-colors duration-200 group-hover/row:text-accent group-focus-visible/row:text-accent lg:col-span-1">
                    {project.index}
                  </span>

                  <div className="col-span-10 lg:col-span-4">
                    <h2 className="u-display text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[0.94] tracking-[-0.03em] text-ink transition-transform duration-500 ease-expo group-hover/row:translate-x-2 group-focus-visible/row:translate-x-2">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-small text-ink-muted lg:hidden">
                      {project.summary}
                    </p>
                  </div>

                  <p className="col-span-12 hidden max-w-[44ch] pr-6 text-small text-ink-muted lg:col-span-4 lg:block">
                    {project.summary}
                  </p>

                  <span className="u-label col-span-6 text-ink-muted lg:col-span-1">
                    {project.year}
                  </span>
                  <span className="u-label col-span-5 text-right text-ink-muted lg:col-span-1 lg:text-left">
                    {project.categoryLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden text-right text-body text-ink-muted transition-transform duration-500 ease-expo group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-accent lg:col-span-1 lg:block"
                  >
                    ↗
                  </span>

                  <p className="u-label col-span-12 mt-1 hidden text-ink-muted group-hover/row:text-ink-muted lg:col-span-12 lg:block">
                    {result}
                  </p>

                  {image ? (
                    <div className="relative col-span-12 mt-3 aspect-[16/10] overflow-hidden border border-line bg-surface-elevated lg:hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </ProjectLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
