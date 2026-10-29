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

  const tweens = digits
    .map((digit) => {
      const strip = digit.querySelector<HTMLElement>(".odometer__strip");
      if (!strip) return null;
      const value = Number(digit.dataset.value ?? "0");
      return gsap.fromTo(
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
          delay: Number(digit.dataset.index ?? "0") * stagger,
          scrollTrigger: { trigger: root, start, once },
        }
      );
    })
    .filter((tween): tween is gsap.core.Tween => tween !== null);

  return () => {
    tweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  };
}
