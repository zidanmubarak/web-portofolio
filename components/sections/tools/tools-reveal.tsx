"use client";

import * as React from "react";
import { clipReveal, gsap, useGSAP } from "@/lib/motion";

/**
 * Tools reveal — motion-map #6 / design-direction §4.7.
 *
 * Each category is wiped in from the left as it enters the viewport. The
 * inventory rows are not faded up; the wipe reads like a page being uncovered.
 */
export function ToolsReveal({ children }: { children: React.ReactNode }) {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const groups = gsap.utils.toArray<HTMLElement>(
        root.current.querySelectorAll("[data-tools-group]")
      );

      const cleanups = groups.map((group) =>
        clipReveal(group, {
          direction: "left",
          start: "top 90%",
          duration: 0.9,
          once: true,
        })
      );

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
