/**
 * Motion tokens — mirrors `design-direction.md` §2.5 and motion-map.md §1.
 * Never inline a duration or ease in a section; import from here.
 */

export const EASE = {
  /** Reveals, wipes, menu. */
  expo: "expo.out",
  /** UI micro-interactions. */
  ui: "power3.out",
  /** Scrub and horizontal rails — scroll position is the timing function. */
  linear: "none",
  /** Line drawing (signature, rules). */
  draw: "power1.inOut",
} as const;

export const DUR = {
  micro: 0.18,
  ui: 0.32,
  reveal: 0.76,
  page: 1.1,
  /** Masked line reveal, per motion-map §3.2. */
  lines: 0.9,
  /** Panel / accordion open. */
  panel: 0.5,
  /** Menu overlay open / close. */
  menu: 0.55,
  menuClose: 0.35,
  /** Odometer roll. */
  odometer: 0.9,
} as const;

export const STAGGER = {
  lines: 0.08,
  menu: 0.04,
  words: 0.02,
} as const;

export type EaseName = (typeof EASE)[keyof typeof EASE];

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** True when CSS would also collapse transitions. Used by JS-only paths. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
