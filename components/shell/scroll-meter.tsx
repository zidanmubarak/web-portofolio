"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/provider";

type ActiveSection = {
  index: string;
  label: string;
  paper: boolean;
  hidden: boolean;
  key: string;
};

const INDEXED_SECTION = "[data-section][data-index]";

/**
 * Scroll + section indicator.
 *
 * A 1px accent rule under the top bar carries overall progress; on desktop a
 * fixed right rail names the numbered section currently being read. Both are
 * decorative (`aria-hidden`) - the content order is already in the DOM.
 *
 * The active section is found with a one-pixel IntersectionObserver line, not
 * with `offsetTop`: once Selected Work is pinned its section becomes
 * `position: fixed` and every offset-based read reports 0. The observer also
 * resets on navigation, so `/work` never inherits "06 / Contact".
 */
export function ScrollMeter() {
  const { copy } = useI18n();
  const pathname = usePathname();
  const topRule = React.useRef<HTMLDivElement>(null);
  const railFill = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<ActiveSection | null>(null);
  const [total, setTotal] = React.useState(0);
  const [inFooter, setInFooter] = React.useState(false);
  const lastKey = React.useRef("");

  React.useEffect(() => {
    let frame = 0;
    let observer: IntersectionObserver | null = null;
    let watched: HTMLElement[] = [];
    const visible = new Map<Element, boolean>();
    let footerHidden = false;

    // A new route invalidates the previous section list immediately.
    lastKey.current = "";

    const probeOffset = () => {
      const topbar =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--topbar-h"
          )
        ) || 64;
      return Math.round(topbar + 96);
    };

    const commit = () => {
      if (watched.length === 0) return;
      let current: HTMLElement | null = null;
      for (const section of watched) {
        if (visible.get(section)) current = section;
      }
      if (!current) {
        if (lastKey.current !== "") {
          lastKey.current = "";
          setActive(null);
        }
        return;
      }
      const key = `${current.dataset.index ?? ""}|${current.dataset.label ?? ""}|${
        current.dataset.surface === "paper" ? "paper" : "dark"
      }`;
      if (key === lastKey.current) return;
      lastKey.current = key;
      setActive({
        index: current.dataset.index ?? "",
        label: current.dataset.label ?? "",
        paper: current.dataset.surface === "paper",
        // The Work rail is full-bleed and carries its own 01/06 counter; a
        // fixed label would sit on top of a card image.
        hidden: current.dataset.section === "work",
        key: pathname,
      });
    };

    const updateProgress = () => {
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

      // The footer is a colophon, not section 07. Hide the rail once it takes
      // over the lower half of the viewport; a 1 px probe at the top bar still
      // reads "Contact" while the signature is already on screen.
      const footer = document.getElementById("footer");
      const hideFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight * 0.55
        : false;
      if (hideFooter !== footerHidden) {
        footerHidden = hideFooter;
        setInFooter(hideFooter);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    const connect = () => {
      observer?.disconnect();
      visible.clear();
      watched = Array.from(
        document.querySelectorAll<HTMLElement>(INDEXED_SECTION)
      );
      setTotal(watched.length);
      if (watched.length === 0) {
        commit();
        return;
      }
      const line = probeOffset();
      const bottom = Math.max(0, window.innerHeight - line - 1);
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible.set(entry.target, entry.isIntersecting);
          });
          commit();
        },
        { rootMargin: `-${line}px 0px -${bottom}px 0px`, threshold: 0 }
      );
      watched.forEach((section) => observer?.observe(section));
    };

    connect();
    updateProgress();

    let resizeFrame = 0;
    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        connect();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      if (frame) window.cancelAnimationFrame(frame);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      observer?.disconnect();
    };
  }, [pathname]);

  const section = active && active.key === pathname ? active : null;
  const showRail = Boolean(section && !section.hidden && !inFooter);
  const index = section?.index ?? "00";
  const label = section?.label ?? copy.common.indexFallback;

  return (
    <>
      <div
        ref={topRule}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-[var(--topbar-h)] z-nav h-px w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />

      {showRail ? (
        <aside
          aria-hidden="true"
          data-meter-surface={section?.paper ? "paper" : "dark"}
          className="meter-rail pointer-events-none fixed right-1 top-1/2 z-nav hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        >
          <span className="flex flex-col items-center gap-0.5 text-center">
            <span className="u-label text-accent">{index}</span>
            <span className="u-label text-ink-muted">
              / {String(total).padStart(2, "0")}
            </span>
          </span>
          <span className="u-label text-ink [writing-mode:vertical-rl]">
            {label}
          </span>
          <span className="mt-1 block h-20 w-px bg-line">
            <span
              ref={railFill}
              className="block h-full w-px origin-top bg-accent"
              style={{ transform: "scaleY(0)" }}
            />
          </span>
        </aside>
      ) : null}
    </>
  );
}
