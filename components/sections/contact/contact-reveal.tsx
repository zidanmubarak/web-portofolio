"use client";

import * as React from "react";
import { clipReveal, useGSAP } from "@/lib/motion";

/**
 * Contact reveal — motion-map #8: the paper plate uncovers itself with
 * clip-path as it enters, the one surface change on the page.
 */
export function ContactReveal({ children }: { children: React.ReactNode }) {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      return clipReveal(root.current, {
        direction: "up",
        start: "top 88%",
        duration: 0.8,
        once: true,
      });
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
