"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const STORAGE_KEY = "zm-intro-v1";
/** draw 1200ms + hold 180ms, then the 240ms fade — 1620ms, hard cap 1800ms. */
const OUT_AT = 1380;
const REMOVE_AT = 1620;
const CAP_AT = 1800;

type Stage = "idle" | "draw" | "out" | "gone";

/**
 * First-visit-only signature intro.
 *
 * - renders nothing on the server and nothing before the effect runs, so
 *   without JavaScript there is no overlay at all;
 * - the page underneath is already painted: the overlay is a fixed layer that
 *   never gates content, and the portrait (the LCP element) is requested and
 *   painted before this mounts;
 * - skipped entirely under `prefers-reduced-motion: reduce`;
 * - remembered in `sessionStorage`, so a reload in the same session is clean.
 */
export function SignatureIntro({
  viewBox,
  pathMarkup,
  length,
}: {
  viewBox: string;
  pathMarkup: string;
  length: number;
}) {
  const [stage, setStage] = useState<Stage>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("gone");
      return;
    }

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
      if (!seen) window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be unavailable (private mode, blocked cookies): show it once.
    }
    if (seen) {
      setStage("gone");
      return;
    }

    setStage("draw");
    timers.current = [
      window.setTimeout(() => setStage("out"), OUT_AT),
      window.setTimeout(() => setStage("gone"), REMOVE_AT),
      window.setTimeout(() => setStage("gone"), CAP_AT),
    ];

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  if (stage === "idle" || stage === "gone") return null;

  return (
    <div
      className={`intro${stage === "out" ? " is-out" : ""}`}
      aria-hidden="true"
      data-intro={stage}
    >
      <svg
        className="intro-svg"
        viewBox={viewBox}
        style={{ "--intro-len": length } as CSSProperties}
        focusable="false"
      >
        <g dangerouslySetInnerHTML={{ __html: pathMarkup }} />
      </svg>
    </div>
  );
}
