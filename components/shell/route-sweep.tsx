"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { EASE, ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Route transition - motion-map #11.
 *
 * A 2 px accent rule sweeps under the top bar once per client navigation, then
 * clears. It never covers the page and never delays the route: the new content
 * is already painted, so back/forward, refresh and reduced motion are
 * untouched. ScrollTrigger.refresh() runs on the next frame because the new
 * route brings new pins and section heights.
 */
export function RouteSweep() {
  const pathname = usePathname();
  const line = React.useRef<HTMLSpanElement>(null);
  const first = React.useRef(true);

  React.useEffect(() => {
    if (first.current) {
      // The scroll provider already refreshes once fonts + load settle.
      first.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const node = line.current;
    if (!node || prefersReducedMotion()) {
      return () => window.cancelAnimationFrame(frame);
    }

    const timeline = gsap.timeline();
    timeline
      .set(node, { opacity: 1, transformOrigin: "left center", scaleX: 0 })
      .to(node, { scaleX: 1, duration: 0.5, ease: EASE.expo })
      .to(
        node,
        {
          transformOrigin: "right center",
          scaleX: 0,
          duration: 0.42,
          ease: "power2.in",
        },
        0.22
      )
      .set(node, { opacity: 0 });

    return () => {
      timeline.kill();
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <span
      ref={line}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-[var(--topbar-h)] z-nav h-0.5 w-full origin-left bg-accent opacity-0"
    />
  );
}
