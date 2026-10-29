"use client";

import * as React from "react";

type ActiveSection = { index: string; label: string };

const INDEXED_SECTION = "[data-section][data-index]";

/**
 * Scroll + section indicator.
 *
 * A 1px accent rule under the top bar carries overall progress; on desktop a
 * fixed right rail names the numbered section currently being read. Both are
 * decorative (`aria-hidden`) — the content order is already in the DOM.
 *
 * One passive scroll listener with a rAF guard, no ScrollTrigger budget.
 */
export function ScrollMeter() {
  const topRule = React.useRef<HTMLDivElement>(null);
  const railFill = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<ActiveSection | null>(null);
  const [total, setTotal] = React.useState(0);
  const lastActive = React.useRef<string>("");

  React.useEffect(() => {
    let frame = 0;
    let sections: HTMLElement[] = [];

    const collect = () => {
      sections = Array.from(
        document.querySelectorAll<HTMLElement>(INDEXED_SECTION)
      );
      setTotal(sections.length);
    };

    const update = () => {
      frame = 0;
      const documentElement = document.documentElement;
      const max = documentElement.scrollHeight - documentElement.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      if (topRule.current) {
        topRule.current.style.transform = `scaleX(${progress})`;
      }
      if (railFill.current) {
        railFill.current.style.transform = `scaleY(${progress})`;
      }

      const topbarHeight =
        parseFloat(
          getComputedStyle(documentElement).getPropertyValue("--topbar-h")
        ) || 64;
      const probe = window.scrollY + topbarHeight + 96;

      let current: HTMLElement | null = null;
      for (const section of sections) {
        if (section.offsetTop <= probe) current = section;
      }

      if (!current) {
        if (lastActive.current !== "") {
          lastActive.current = "";
          setActive(null);
        }
        return;
      }

      const nextKey = `${current.dataset.index ?? ""}|${current.dataset.label ?? ""}`;
      if (nextKey === lastActive.current) return;
      lastActive.current = nextKey;
      setActive({
        index: current.dataset.index ?? "",
        label: current.dataset.label ?? "",
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    collect();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const counter =
    total > 1
      ? `${active?.index ?? "00"} / ${String(total).padStart(2, "0")}`
      : (active?.index ?? "00");

  return (
    <>
      <div
        ref={topRule}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-[var(--topbar-h)] z-nav h-px w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />

      <aside
        aria-hidden="true"
        className="pointer-events-none fixed right-3 top-1/2 z-nav hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        <span className="u-label text-accent">{counter}</span>
        <span className="u-label text-ink [writing-mode:vertical-rl]">
          {active?.label ?? "Index"}
        </span>
        <span className="mt-2 block h-24 w-px bg-line">
          <span
            ref={railFill}
            className="block h-full w-px origin-top bg-accent"
            style={{ transform: "scaleY(0)" }}
          />
        </span>
      </aside>
    </>
  );
}
