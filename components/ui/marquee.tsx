"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { EASE, prefersReducedMotion } from "@/lib/motion/tokens";

export type MarqueeProps = {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  /** Accessible name; the animated copy is hidden from AT. */
  label?: string;
};

/**
 * Marquee — implemented for completeness, **not used on the v2 homepage**.
 * T2 rejected marquees for this direction (design-direction.md, Gerbang A).
 * Use it only for a future surface with an explicit design decision.
 *
 * The second copy is aria-hidden so screen readers hear the row once.
 */
export function Marquee({
  children,
  speed = 28,
  reverse = false,
  className,
  label,
}: MarqueeProps) {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const track = root.current.querySelector("[data-marquee-track]");
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        duration: speed,
        ease: EASE.linear,
        repeat: -1,
      });

      const pause = () => tween.pause();
      const resume = () => tween.play();
      root.current.addEventListener("pointerenter", pause);
      root.current.addEventListener("pointerleave", resume);

      return () => {
        root.current?.removeEventListener("pointerenter", pause);
        root.current?.removeEventListener("pointerleave", resume);
      };
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={cn("w-full min-w-0 overflow-hidden", className)}
      role="group"
      aria-label={label}
    >
      <div data-marquee-track className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
