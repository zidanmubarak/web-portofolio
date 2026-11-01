/**
 * Public motion API for sections (T7) and work (T8).
 *
 * Always call these inside `useGSAP(() => { ... }, { scope })` so tweens and
 * ScrollTriggers are reverted with the component. `pinHorizontal` returns a
 * `matchMedia` instance - return `() => mm.revert()` from the same effect.
 */
export { gsap, ScrollTrigger, SplitText, Flip, DrawSVGPlugin, useGSAP } from "./gsap";

export { EASE, DUR, STAGGER, prefersReducedMotion } from "./tokens";

export {
  SmoothScrollProvider,
  useSmoothScroll,
} from "./smooth-scroll";

export { revealLines, type RevealLinesOptions } from "./reveal-lines";
export { scrubWords, type ScrubWordsOptions } from "./scrub-words";
export {
  clipReveal,
  imageParallax,
  type ClipRevealOptions,
  type ImageParallaxOptions,
} from "./clip-reveal";
export {
  pinHorizontal,
  type PinHorizontalConfig,
} from "./pin-horizontal";
export { animateOdometer, type OdometerOptions } from "./odometer";
export {
  snapshotRows,
  animateRowShift,
  revealPanel,
  hidePanel,
  type RowSnapshot,
} from "./disclosure";
