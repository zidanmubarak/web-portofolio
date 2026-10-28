"use client";

import { useEffect } from "react";

/**
 * Scroll + pointer motion, all of it transform-only.
 *
 * 1. Portrait parallax: maps the panel's progress through the viewport to
 *    ±14px on `--rgb-parallax`, which `.rgb-plate` turns into a translate3d.
 *    One getBoundingClientRect per animation frame, written as a custom
 *    property — no layout reads from the style writes, no scroll-jacking.
 * 2. Magnetic work links: on a fine pointer, an `.alink a` leans up to 6px
 *    toward the cursor via `--mx` / `--my`.
 *
 * Both are skipped entirely under `prefers-reduced-motion: reduce`, and the
 * parallax leaves the plate at 0px when the panel is off-screen.
 */
export function MotionController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const plate = document.querySelector<HTMLElement>(".hero-photo .rgb-plate");
    let frame = 0;
    let visible = false;

    const onScroll = () => {
      if (!plate || frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = plate.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        // 0 when the panel enters from below, 1 when it leaves at the top.
        const progress = (viewport - rect.top) / (viewport + rect.height);
        const clamped = Math.min(1, Math.max(0, progress));
        const offset = (clamped - 0.5) * 28; // −14px … +14px
        plate.style.setProperty("--rgb-parallax", `${offset.toFixed(2)}px`);
        visible = rect.bottom > 0 && rect.top < viewport;
        plate.style.willChange = visible ? "transform" : "auto";
      });
    };

    if (plate) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) onScroll();
            else plate.style.setProperty("--rgb-parallax", "0px");
          });
        },
        { rootMargin: "10% 0px" },
      );
      observer.observe(plate);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".arow .alink a"),
    );
    const cleanups = links.map((link) => {
      const move = (event: PointerEvent) => {
        const rect = link.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const limit = 6;
        const x = Math.max(-limit, Math.min(limit, dx * 0.18));
        const y = Math.max(-limit, Math.min(limit, dy * 0.18));
        link.style.setProperty("--mx", `${x.toFixed(2)}px`);
        link.style.setProperty("--my", `${y.toFixed(2)}px`);
        link.classList.add("magnetic");
      };
      const leave = () => {
        link.style.setProperty("--mx", "0px");
        link.style.setProperty("--my", "0px");
        link.classList.remove("magnetic");
      };
      link.addEventListener("pointermove", move);
      link.addEventListener("pointerleave", leave);
      return () => {
        link.removeEventListener("pointermove", move);
        link.removeEventListener("pointerleave", leave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
