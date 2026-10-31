"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";
import { SignatureDraw } from "@/components/signature/SignatureDraw";
import { getAppProgress, markReady, registerReadyTask } from "@/lib/loader/ready";
import { useI18n } from "@/components/i18n/provider";
import { LOADER_STORAGE_KEY } from "./loader-gate";

export type LoaderExitDetail = {
  /** True when the overlay never ran (repeat visit or reduced motion). */
  skipped: boolean;
  /** Why it ended: "ready" | "timeout" | "skip". */
  reason: "ready" | "timeout" | "skip";
};

export type LoaderProps = {
  /** Draw duration at 1x, seconds. Design target: 2.2-3.0 s. */
  drawDuration?: number;
  /** Minimum on-screen time before the exit may start, seconds. */
  minDuration?: number;
  /** Hard cap: exit even if readiness never reaches 100, seconds. */
  maxDuration?: number;
  /** Dev only: run even when sessionStorage says it was already seen. */
  force?: boolean;
  /** Write the "seen" flag when done. Default true. */
  persist?: boolean;
  /** Called after the overlay is gone (the hero intro starts then). */
  onExit?: (detail: LoaderExitDetail) => void;
  className?: string;
};

const EVENT = "rubric:loader-exit";
/** Fired when the exit wipe starts; the hero reveals underneath it. */
const EVENT_START = "rubric:loader-exit-start";

function pad2(value: number): string {
  return Math.max(0, Math.min(999, Math.round(value)))
    .toString()
    .padStart(3, "0");
}

/**
 * Signature loader.
 *
 * Sequence (first visit, motion allowed):
 *   t=0.00  signature starts drawing (2.2 s at 1x)
 *   t=0.00  counter follows the readiness registry (fonts + document + any
 *           task other terminals registered) combined with the draw itself;
 *           it is monotonic and holds at 92 until the draw completes, then
 *           eases to 100
 *   t≈2.2   exit: signature shrinks into [data-signature-target="topbar"]
 *           while the overlay wipes up and the page is revealed (0.7 s)
 *   t≈2.9   overlay unmounts, `rubric:loader-exit` fires, page aria-busy=false
 *
 * Guards: minDuration, maxDuration (hard cap ~4 s), sessionStorage
 * `rubric:loaded`, prefers-reduced-motion. Repeat visits are hidden by the
 * boot script before paint; the effect only dispatches the exit event.
 */
export function Loader({
  drawDuration = 2.2,
  minDuration = 1.8,
  maxDuration = 4,
  force = false,
  persist = true,
  onExit,
  className,
}: LoaderProps) {
  const { copy, profile } = useI18n();
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const signatureRef = React.useRef<HTMLDivElement>(null);
  const counterRef = React.useRef<HTMLSpanElement>(null);
  const barRef = React.useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = React.useState(true);
  const onExitRef = React.useRef(onExit);
  const finishedRef = React.useRef(false);
  const finishRef = React.useRef<(reason: LoaderExitDetail["reason"]) => void>(
    () => {}
  );

  React.useEffect(() => {
    onExitRef.current = onExit;
  }, [onExit]);

  React.useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let timeline: ReturnType<typeof gsap.timeline> | null = null;
    let exitTimeline: ReturnType<typeof gsap.timeline> | null = null;
    let loadHandler: (() => void) | null = null;
    const unregister: Array<() => void> = [];
    const root = document.documentElement;
    const startedAt = performance.now();
    let shown = 0;
    let drawDone = false;
    let exiting = false;

    let reduce = false;
    let seen = false;
    try {
      reduce = prefersReducedMotion();
      seen = window.sessionStorage.getItem(LOADER_STORAGE_KEY) === "1";
    } catch {
      /* storage can be blocked; treat as first visit */
    }

    const finish = (reason: LoaderExitDetail["reason"]) => {
      if (cancelled || finishedRef.current) return;
      finishedRef.current = true;
      const skipped = reason === "skip";
      try {
        if (persist && !skipped) {
          window.sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
        }
      } catch {
        /* ignore */
      }
      root.dataset.loader = "done";
      root.dataset.loaded = "true";
      const main = document.getElementById("main");
      main?.removeAttribute("aria-busy");
      const detail: LoaderExitDetail = { skipped, reason };
      // Defer by a task so sibling effects (the hero listener) are mounted
      // even on a skipped repeat visit, where this runs on the first commit.
      queueMicrotask(() => {
        window.dispatchEvent(
          new CustomEvent<LoaderExitDetail>(EVENT, { detail })
        );
      });
      onExitRef.current?.(detail);
      setMounted(false);
    };
    finishRef.current = finish;

    // Repeat visit or reduced motion: never show the overlay. The boot script
    // already hid it before paint.
    if (reduce || (!force && seen)) {
      finish("skip");
      return () => {
        cancelled = true;
      };
    }

    root.dataset.loader = "pending";
    root.dataset.loaded = "false";
    const main = document.getElementById("main");
    main?.setAttribute("aria-busy", "true");

    // Built-in readiness tasks: fonts + document. Other terminals add theirs.
    unregister.push(registerReadyTask("fonts", { weight: 2 }));
    unregister.push(registerReadyTask("document"));
    if (document.readyState === "complete") {
      markReady("document");
    } else {
      loadHandler = () => markReady("document");
      window.addEventListener("load", loadHandler, { once: true });
    }
    if (document.fonts) {
      document.fonts.ready.then(() => markReady("fonts")).catch(() => {
        markReady("fonts");
      });
    } else {
      markReady("fonts");
    }

    // ---- counter -------------------------------------------------------- //
    const writeCounter = (value: number) => {
      shown = value;
      if (counterRef.current) counterRef.current.textContent = pad2(value);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, value / 100)})`;
      }
    };
    writeCounter(0);

    const tick = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      const actual = getAppProgress();
      const drawProgress = Math.min(
        1,
        Math.max(0, (elapsed - 0.05) / Math.max(drawDuration, 0.1))
      );
      // Readiness is real: registered tasks, plus the signature draw itself.
      // When the registry finishes early the counter still moves with the
      // draw and holds below 92 until the pen is done, like a progress meter
      // that trusts both signals.
      const cap = drawDone ? 100 : 92;
      const readiness = Math.min(actual, 92);
      const drawShare = drawProgress * 92;
      const target = drawDone
        ? 100
        : Math.min(cap, Math.max(drawShare, (readiness + drawShare) / 2));
      // exponential approach: follows readiness, never jumps backwards
      const next = shown + (Math.max(target, shown) - shown) * 0.14;
      const capped = Math.min(next, target);
      if (capped > shown) writeCounter(capped);

      if (!exiting) {
        // Soft deadline: heavy readiness tasks (shader compile on a software
        // GPU, a slow texture) may not finish inside the design budget. The
        // poster is already painted, so the exit proceeds after a short grace
        // period instead of holding the whole page for the hard cap.
        const softDeadline = Math.max(
          minDuration,
          drawDuration + 0.45
        );
        const ready =
          drawDone && (actual >= 100 || elapsed >= softDeadline);
        if (ready && elapsed >= minDuration) {
          writeCounter(100);
          startExit("ready");
        } else if (elapsed >= maxDuration) {
          writeCounter(100);
          startExit("timeout");
        }
      }
      if (!cancelled) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const startExit = (reason: LoaderExitDetail["reason"]) => {
      if (exiting) return;
      exiting = true;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      root.dataset.loader = "exiting";
      // The page is already visible behind the wipe (the gate only hides it
      // while `pending`), so the hero can start its reveal under the curtain
      // instead of waiting for the overlay to unmount.
      window.dispatchEvent(new CustomEvent<LoaderExitDetail>(EVENT_START, {
        detail: { skipped: false, reason },
      }));

      const overlay = overlayRef.current;
      const surface = surfaceRef.current;
      const signature = signatureRef.current;
      const target = document.querySelector<HTMLElement>(
        '[data-signature-target="topbar"]'
      );

      exitTimeline = gsap.timeline({
        onComplete: () => finish(reason),
      });

      if (signature && target) {
        const from = signature.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const scale = Math.max(
          0.04,
          Math.min(to.width / from.width, to.height / from.height)
        );
        const x = to.left + to.width / 2 - (from.left + from.width / 2);
        const y = to.top + to.height / 2 - (from.top + from.height / 2);
        exitTimeline.to(
          signature,
          { x, y, scale, duration: 0.5, ease: EASE.expo },
          0
        );
        exitTimeline.to(
          signature,
          { opacity: 0, duration: 0.2, ease: "power1.out" },
          0.36
        );
      } else if (signature) {
        exitTimeline.to(
          signature,
          { opacity: 0, y: -28, duration: 0.32, ease: "power2.in" },
          0
        );
      }

      if (surface) {
        exitTimeline.to(
          surface,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 0.55,
            ease: EASE.expo,
          },
          0.06
        );
      }
      if (overlay) {
        const chrome = overlay.querySelectorAll<HTMLElement>("[data-loader-chrome]");
        if (chrome.length) {
          exitTimeline.to(
            chrome,
            { opacity: 0, duration: 0.15, ease: "power1.out" },
            0
          );
        }
        exitTimeline.to(overlay, { opacity: 0, duration: 0.22 }, 0.48);
      }
    };

    // ---- signature draw ------------------------------------------------- //
    const drawSeconds = Math.max(1.2, drawDuration);
    timeline = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        drawDone = true;
      },
    });
    // The signature component owns its own timeline; this one is the loader's
    // clock so the counter and the exit stay in sync even if the component is
    // re-mounted by React Strict Mode.
    timeline.to(
      { value: 0 },
      { value: 1, duration: drawSeconds, ease: "none" },
      0
    );

    return () => {
      cancelled = true;
      if (raf) window.cancelAnimationFrame(raf);
      if (loadHandler) window.removeEventListener("load", loadHandler);
      timeline?.kill();
      exitTimeline?.kill();
      unregister.forEach((fn) => fn());
      const el = document.getElementById("main");
      el?.removeAttribute("aria-busy");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        data-loader-root
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-[calc(var(--z-loader)+1)] flex flex-col justify-between p-page text-ink",
          className
        )}
      >
        <div
          ref={surfaceRef}
          className="pointer-events-none absolute inset-0 z-0 bg-surface"
          aria-hidden="true"
        />
        <div data-loader-chrome className="relative z-10 flex items-start justify-between">
          <span className="u-label text-ink">{profile.name.toUpperCase()}</span>
          <span className="u-label text-ink-muted">
            {profile.location.city.toUpperCase()}, {profile.location.countryCode}
          </span>
        </div>
        <div data-loader-chrome className="relative z-10 flex flex-1 items-center justify-center">
          <span className="sr-only" role="status">
            {copy.common.loadingPortfolio}
          </span>
        </div>
        <div data-loader-chrome className="relative z-10 flex items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="u-label text-ink-muted">
              {copy.common.loading}
            </span>
            <span
              ref={counterRef}
              aria-hidden="true"
              className="signature-counter u-mono text-[clamp(2.5rem,7vw,4.5rem)] leading-none tracking-[-0.02em] text-ink"
            >
              000
            </span>
          </div>
          <span className="hidden h-px w-40 overflow-hidden bg-line md:block">
            <span
              ref={barRef}
              className="block h-px w-full origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>
      </div>

      {/* Signature lives above the wipe so it can land in the top bar while
          the overlay is still clipping away. */}
      <div
        data-loader-root
        className="pointer-events-none fixed inset-0 z-[calc(var(--z-loader)+2)] flex items-center justify-center"
      >
        <div ref={signatureRef} className="will-change-transform">
          <SignatureDraw variant="loader" play="mount" duration={drawDuration} />
        </div>
      </div>
    </>
  );
}
