"use client";

/**
 * Shared-figure handoff between a card and a case-study hero.
 *
 * The source card writes the image and its viewport rect to `sessionStorage`
 * just before the route changes; the destination measures its own figure and
 * animates a fixed copy between the two rects with GSAP Flip. This keeps the
 * provider out of the route tree (T8 does not own `app/layout.tsx`) and works
 * for homepage → case study, index → case study, and next/previous links.
 *
 * It deliberately does not use the View Transitions API: Next's router commits
 * asynchronously, so `document.startViewTransition()` needs a promise hack to
 * know when the new tree is painted, and Firefox/Safari support is still
 * uneven. A destination-side FLIP with a feature check is stable everywhere.
 */
const KEY = "rubric:work-transition";
const MAX_AGE_MS = 10_000;

export type WorkTransitionPayload = {
  readonly slug: string;
  readonly src: string;
  readonly alt: string;
  readonly rect: {
    readonly left: number;
    readonly top: number;
    readonly width: number;
    readonly height: number;
  };
  readonly at: number;
};

export function stageWorkTransition(
  payload: Omit<WorkTransitionPayload, "at">
): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      KEY,
      JSON.stringify({ ...payload, at: Date.now() })
    );
  } catch {
    // Private mode or a full quota: navigation still works without the effect.
  }
}

/**
 * Read the staged payload without consuming it. React Strict Mode mounts the
 * destination twice in development; consuming on the first mount would make the
 * second mount skip the animation. The figure clears the key when it finishes.
 */
export function peekWorkTransition(slug: string): WorkTransitionPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WorkTransitionPayload;
    if (parsed.slug !== slug) return null;
    if (!parsed.src || !parsed.rect) return null;
    if (Date.now() - parsed.at > MAX_AGE_MS) {
      clearWorkTransition();
      return null;
    }
    const { width, height } = parsed.rect;
    if (width < 24 || height < 24) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearWorkTransition(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // Ignore storage failures.
  }
}
