"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  clipReveal,
  EASE,
  Flip,
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/lib/motion";
import { clearWorkTransition, peekWorkTransition } from "./transition";

type CaseFigureProps = {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  label?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Case-study figure. On first paint it can take over the image rect staged by
 * the card and fly it into place with GSAP Flip; on a direct visit or refresh it
 * uses the standard clip-path reveal from `lib/motion`.
 */
export function CaseFigure({
  slug,
  src,
  width,
  height,
  alt,
  caption,
  label,
  priority = false,
  className,
}: CaseFigureProps) {
  const figure = React.useRef<HTMLElement>(null);
  const frame = React.useRef<HTMLDivElement>(null);
  const landed = React.useRef(false);

  React.useLayoutEffect(() => {
    const node = frame.current;
    if (!node) return;

    const pending = peekWorkTransition(slug);
    if (!pending || pending.src !== src || prefersReducedMotion()) return;

    landed.current = true;
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      left: `${pending.rect.left}px`,
      top: `${pending.rect.top}px`,
      width: `${pending.rect.width}px`,
      height: `${pending.rect.height}px`,
      overflow: "hidden",
      zIndex: "70",
      pointerEvents: "none",
      backgroundColor: "var(--bg-elevated)",
      transformOrigin: "top left",
    });

    const image = document.createElement("img");
    image.src = pending.src;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    Object.assign(image.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    });
    overlay.appendChild(image);
    document.body.appendChild(overlay);
    node.style.opacity = "0";
    const header = document.querySelector<HTMLElement>("[data-case-header]");
    if (header) header.style.opacity = "0";

    let finished = false;
    let disposed = false;
    let fit: gsap.core.Tween | undefined;
    let fade: gsap.core.Tween | undefined;

    const finish = () => {
      if (finished || disposed) return;
      finished = true;
      fit = Flip.fit(overlay, node, {
        scale: true,
        duration: 0.86,
        ease: EASE.expo,
        onComplete: () => {
          if (disposed) return;
          fade = gsap.to(overlay, {
            opacity: 0,
            duration: 0.18,
            ease: "none",
            onComplete: () => {
              overlay.remove();
              node.style.opacity = "1";
              if (header) header.style.opacity = "1";
              clearWorkTransition();
            },
          });
        },
      }) as gsap.core.Tween;
    };

    const frameRequest = image.complete
      ? requestAnimationFrame(finish)
      : null;
    if (!image.complete) image.addEventListener("load", finish, { once: true });

    const abort = () => {
      disposed = true;
      overlay.remove();
      node.style.opacity = "1";
      if (header) header.style.opacity = "1";
    };
    image.addEventListener("error", abort, { once: true });

    return () => {
      disposed = true;
      if (frameRequest !== null) cancelAnimationFrame(frameRequest);
      image.removeEventListener("load", finish);
      image.removeEventListener("error", abort);
      fit?.kill();
      fade?.kill();
      overlay.remove();
      node.style.opacity = "1";
      if (header) header.style.opacity = "1";
    };
  }, [slug, src]);

  useGSAP(
    () => {
      if (!frame.current || landed.current) return;
      return clipReveal(frame.current, { duration: 1, start: "top 88%" });
    },
    { scope: figure }
  );

  return (
    <figure ref={figure} data-case-figure className={cn("min-w-0", className)}>
      <div
        ref={frame}
        className="relative aspect-[16/10] overflow-hidden border border-line bg-surface-elevated"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-ink-muted sm:flex-row sm:justify-between sm:gap-8">
          {label ? <span className="u-label text-ink">{label}</span> : null}
          <span className="u-label max-w-[80ch] sm:text-right">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
