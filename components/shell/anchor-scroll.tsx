"use client";

import * as React from "react";
import { useSmoothScroll } from "@/lib/motion/smooth-scroll";

function topbarOffset() {
  const raw = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--topbar-h")
  );
  return Number.isFinite(raw) ? -raw : -64;
}

/**
 * In-page anchor clicks scroll without writing a hash into the URL.
 *
 * Deep links keep working (opening `/#work` directly still lands there), but a
 * click on "View selected work" no longer adds `#work` to history, so returning
 * from `/work` with Back cannot restore a stale `/#work` address. Links that
 * already handled the click themselves (`defaultPrevented`), the skip link, and
 * modifier clicks are left alone.
 */
export function AnchorScroll() {
  const { scrollTo } = useSmoothScroll();
  const scrollRef = React.useRef(scrollTo);

  React.useEffect(() => {
    scrollRef.current = scrollTo;
  }, [scrollTo]);

  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#" || hash === "#main") return;
      if (!document.getElementById(hash.slice(1))) return;

      event.preventDefault();
      scrollRef.current(hash, { offset: topbarOffset(), force: true });

      // A hash left over from a deep link or an older session is cleared the
      // moment the reader scrolls somewhere else on the page.
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`
        );
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
