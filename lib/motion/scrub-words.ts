import { gsap, SplitText } from "./gsap";
import { EASE, prefersReducedMotion } from "./tokens";

export type ScrubWordsOptions = {
  start?: string;
  end?: string;
  /** Resting opacity before a word is read. Must stay AA-readable for body copy. */
  from?: number;
  scrub?: number;
};

/**
 * Scrubbed word opacity - motion-map pattern #3.
 *
 * Used for the About statement and Work intro only. Words keep their position;
 * no `y` offset, so the paragraph stays calm while the reading pace follows the
 * scroll.
 */
export function scrubWords(
  target: Element | string,
  options: ScrubWordsOptions = {}
): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  const {
    start = "top 80%",
    end = "bottom 55%",
    from = 0.18,
    scrub = 1,
  } = options;

  const split = SplitText.create(target, {
    type: "words",
    wordsClass: "motion-word",
    // The paragraph has no ARIA role; SplitText's default aria-label would be
    // invalid there. The words stay in the DOM and are read normally.
    aria: "none",
  });

  const trigger =
    typeof target === "string" ? document.querySelector(target) : target;

  const tween = gsap.fromTo(
    split.words,
    { opacity: from },
    {
      opacity: 1,
      stagger: 0.02,
      ease: EASE.linear,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    split.revert();
  };
}
