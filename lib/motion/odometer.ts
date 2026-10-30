import { gsap } from "./gsap";
import { DUR, EASE, prefersReducedMotion } from "./tokens";

export type OdometerOptions = {
  start?: string;
  once?: boolean;
  /** Delay between digit columns. */
  stagger?: number;
};

/**
 * Digit roll — motion-map pattern #7.
 *
 * The markup renders the final digit position server-side (no-JS safe). GSAP
 * rolls each column in from 0 when the odometer enters the viewport. The
 * component also carries an `aria-label` with the final value, so assistive
 * technology never hears a stream of digits.
 *
 * One timeline and therefore one ScrollTrigger per odometer root, not one per
 * digit: the hero strip alone would otherwise spend eight triggers of the
 * twelve-trigger budget in motion-map.md §5.
 */
export function animateOdometer(
  root: HTMLElement,
  options: OdometerOptions = {}
): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  const { start = "top 88%", once = true, stagger = 0.04 } = options;

  const digits = Array.from(
    root.querySelectorAll<HTMLElement>("[data-odometer-digit]")
  );

  const strips = digits
    .map((digit, position) => {
      const strip = digit.querySelector<HTMLElement>(".odometer__strip");
      if (!strip) return null;
      return {
        strip,
        value: Number(digit.dataset.value ?? "0"),
        index: Number(digit.dataset.index ?? position),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  if (strips.length === 0) return () => {};

  const timeline = gsap.timeline({
    scrollTrigger: { trigger: root, start, once },
  });

  strips.forEach(({ strip, value, index }) => {
    timeline.fromTo(
      strip,
      // The server renders the final digit as an inline translateY so no-JS
      // users see the number. Zero the parsed y before rolling, otherwise
      // GSAP keeps that offset and adds yPercent on top of it.
      { yPercent: 0, y: 0 },
      {
        yPercent: -10 * value,
        y: 0,
        duration: DUR.odometer,
        ease: EASE.expo,
      },
      index * stagger
    );
  });

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}
