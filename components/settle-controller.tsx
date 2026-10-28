"use client";

import { useEffect } from "react";

/**
 * settle-rise (DESIGN.md motion #7): transform only, no opacity. Elements opt
 * in with `data-settle`; the class is added once they enter the viewport.
 *
 * Elements that share a parent are staggered 0/60/120/180ms by their position
 * in that group (`--settle-delay`), so a list reveals in sequence instead of
 * all at once. Under prefers-reduced-motion the offset is removed by CSS and
 * every element is marked "in" immediately.
 */
export function SettleController() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-settle]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Stagger by position among siblings, capped at four steps.
    elements.forEach((element) => {
      const parent = element.parentElement;
      if (!parent) return;
      const siblings = Array.from(
        parent.querySelectorAll<HTMLElement>(":scope > [data-settle]"),
      );
      const index = siblings.indexOf(element);
      if (index < 0) return;
      const delay = Math.min(index, 3) * 60;
      element.style.setProperty("--settle-delay", `${delay}ms`);
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
