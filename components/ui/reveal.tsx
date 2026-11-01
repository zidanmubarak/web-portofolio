"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { clipReveal } from "@/lib/motion/clip-reveal";
import { revealLines } from "@/lib/motion/reveal-lines";
import { DUR, EASE, prefersReducedMotion } from "@/lib/motion/tokens";

export type RevealVariant = "lines" | "clip" | "rise";

export type RevealProps = {
  children: React.ReactNode;
  /**
   * - `lines` - masked line reveal for headings and statements.
   * - `clip` - clip-path reveal for figures, plates, cards.
   * - `rise` - 12px + opacity for metadata only; never for section bodies.
   */
  variant?: RevealVariant;
  as?: "div" | "p" | "figure" | "span" | "li";
  className?: string;
  delay?: number;
  start?: string;
  direction?: "up" | "left";
};

/**
 * Declarative wrapper around the motion utilities. It exists so a section can
 * opt into one pattern without hand-rolling a ScrollTrigger. Prefer calling
 * `revealLines` / `clipReveal` directly when the animation coordinates with
 * siblings (hero, pinned rail).
 */
export function Reveal({
  children,
  variant = "lines",
  as: Tag = "div",
  className,
  delay = 0,
  start = "top 85%",
  direction = "up",
}: RevealProps) {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;

      if (variant === "lines") {
        return revealLines(root.current, { start, delay });
      }

      if (variant === "clip") {
        return clipReveal(root.current, { start, delay, direction });
      }

      const tween = gsap.fromTo(
        root.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.reveal,
          delay,
          ease: EASE.expo,
          scrollTrigger: { trigger: root.current, start, once: true },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root as React.RefObject<HTMLElement> }
  );

  return (
    <Tag
      ref={root as React.Ref<never>}
      data-reveal={variant}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
