"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./tokens";

type SmoothScrollValue = {
  lenis: Lenis | null;
  /** Anchor navigation that keeps Lenis and ScrollTrigger in agreement. */
  scrollTo: (
    hash: string,
    options?: { offset?: number; force?: boolean }
  ) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/**
 * Lenis + GSAP ticker + ScrollTrigger, exactly as motion-map.md §3.13.
 *
 * - One RAF loop (GSAP's ticker), one ScrollTrigger update per scroll.
 * - `smoothTouch: false`: mobile keeps native scrolling.
 * - Reduced motion: Lenis is never created; anchors jump.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.1,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Lenis can only exist after hydration; consumers need the live instance.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    // Fonts and images change trigger positions; refresh once they settle.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      instance.off("scroll", onScroll);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const value = useMemo<SmoothScrollValue>(() => {
    const scrollTo: SmoothScrollValue["scrollTo"] = (hash, options) => {
      const target =
        hash === "#top" ? 0 : (document.querySelector(hash) as HTMLElement | null);
      if (target === null) return;

      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: 1.1,
          force: options?.force ?? false,
        });
        return;
      }

      if (target === 0) {
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        target.scrollIntoView({ block: "start" });
      }
    };

    return {
      lenis,
      scrollTo,
      stop: () => lenis?.stop(),
      start: () => lenis?.start(),
    };
  }, [lenis]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
