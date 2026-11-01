import { gsap, SplitText } from "./gsap";
import { DUR, EASE, STAGGER, prefersReducedMotion } from "./tokens";

export type RevealLinesOptions = {
  /** ScrollTrigger trigger; defaults to the first target. */
  trigger?: Element | null;
  /** `false` plays immediately (hero after the loader). Default `true`. */
  scroll?: boolean;
  start?: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Start offset in percent; 110 reads as a true mask reveal. */
  yPercent?: number;
};

/**
 * Masked line reveal - motion-map pattern #2.
 *
 * Each visual line sits inside an overflow-hidden mask and travels up from
 * below. Never use this on metadata, buttons, or every paragraph: it belongs
 * to headings and the hero name.
 */
export function revealLines(
  target: Element | Element[] | string,
  options: RevealLinesOptions = {}
): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  const {
    trigger,
    scroll = true,
    start = "top 85%",
    once = true,
    delay = 0,
    stagger = STAGGER.lines,
    duration = DUR.lines,
    yPercent = 110,
  } = options;

  const split = SplitText.create(target, {
    type: "lines",
    mask: "lines",
    linesClass: "motion-line",
    // Auto-aria would put `aria-label` on the wrapper; when the wrapper is a
    // <div> that attribute is prohibited. The text stays in the lines.
    aria: "none",
  });

  const triggerElement =
    trigger ??
    (typeof target === "string"
      ? document.querySelector(target)
      : Array.isArray(target)
        ? target[0]
        : target);

  const tween = gsap.fromTo(
    split.lines,
    { yPercent },
    {
      yPercent: 0,
      duration,
      stagger,
      delay,
      ease: EASE.expo,
      scrollTrigger: scroll
        ? {
            trigger: triggerElement,
            start,
            once,
          }
        : undefined,
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    split.revert();
  };
}
