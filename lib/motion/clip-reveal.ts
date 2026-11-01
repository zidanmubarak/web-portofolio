import { gsap } from "./gsap";
import { EASE, prefersReducedMotion } from "./tokens";

type ClipDirection = "up" | "left";

const CLIP_FROM: Record<ClipDirection, string> = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
};

const CLIP_TO = "inset(0% 0% 0% 0%)";

export type ClipRevealOptions = {
  direction?: ClipDirection;
  start?: string;
  duration?: number;
  delay?: number;
  /** Play immediately instead of on scroll (plate enter, contact enter). */
  scroll?: boolean;
  trigger?: Element | null;
  once?: boolean;
};

/**
 * clip-path reveal - motion-map patterns #1 (plate), #4 (mobile cards),
 * #8 (contact paper). Never animate width/height to fake this.
 */
export function clipReveal(
  target: Element | string,
  options: ClipRevealOptions = {}
): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  const {
    direction = "up",
    start = "top 88%",
    duration = 1,
    delay = 0,
    scroll = true,
    trigger,
    once = true,
  } = options;

  const element =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return () => {};

  const tween = gsap.fromTo(
    element,
    { clipPath: CLIP_FROM[direction] },
    {
      clipPath: CLIP_TO,
      duration,
      delay,
      ease: EASE.expo,
      scrollTrigger: scroll
        ? { trigger: trigger ?? element, start, once }
        : undefined,
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export type ImageParallaxOptions = {
  /** Movement in percent of the image's own height. Design uses -6 → 6. */
  amount?: number;
  trigger?: Element | null;
  start?: string;
  end?: string;
  scrub?: number;
};

/**
 * Inner-image parallax for cards. Only runs when the card is inside a pinned
 * horizontal rail or otherwise already in the viewport - callers decide.
 */
export function imageParallax(
  image: Element,
  options: ImageParallaxOptions = {}
): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  const {
    amount = 6,
    trigger,
    start = "top bottom",
    end = "bottom top",
    scrub = 0.8,
  } = options;

  const tween = gsap.fromTo(
    image,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: EASE.linear,
      scrollTrigger: {
        trigger: trigger ?? image,
        start,
        end,
        scrub,
      },
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
