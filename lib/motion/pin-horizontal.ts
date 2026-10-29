import { gsap } from "./gsap";
import { EASE } from "./tokens";

export type PinHorizontalConfig = {
  /** Full-viewport section that gets pinned. */
  section: HTMLElement;
  /** Inner element that moves on the x axis. */
  track: HTMLElement;
  /** Cards inside the track, used for the counter and distance. */
  cards: HTMLElement[];
  /** Optional 1px progress rule; scaleX is driven by scroll progress. */
  progress?: HTMLElement | null;
  /** 1-based card index for the counter. */
  onIndex?: (index: number, total: number) => void;
};

/**
 * Pinned horizontal rail — motion-map pattern #4, desktop only (≥1024 px).
 *
 * Returns the `gsap.matchMedia()` instance. The caller must call `.revert()`
 * in its `useGSAP` cleanup so media changes and unmount both tear down.
 *
 * Mobile and reduced motion never pin: cards stack and all content is final.
 */
export function pinHorizontal(config: PinHorizontalConfig): gsap.MatchMedia {
  const { section, track, cards, progress, onIndex } = config;

  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: "(min-width: 1024px)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { desktop, reduce } = context.conditions as {
        desktop: boolean;
        reduce: boolean;
      };

      const total = cards.length;
      let lastIndex = -1;
      const emitIndex = (index: number) => {
        if (index === lastIndex) return;
        lastIndex = index;
        onIndex?.(index, total);
      };

      if (!desktop || reduce) {
        section.dataset.pinState = "static";
        gsap.set(track, { clearProps: "transform" });
        if (progress) gsap.set(progress, { scaleX: 1 });
        emitIndex(1);
        return () => {
          delete section.dataset.pinState;
        };
      }

      section.dataset.pinState = "pinned";

      const distance = () => {
        const style = window.getComputedStyle(section);
        const padding =
          parseFloat(style.paddingLeft || "0") +
          parseFloat(style.paddingRight || "0");
        return Math.max(0, track.scrollWidth + padding - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: EASE.linear,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + Math.max(1, total - 1) * window.innerHeight * 0.65,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              total,
              Math.max(1, Math.round(self.progress * (total - 1)) + 1)
            );
            emitIndex(index);
            if (progress) gsap.set(progress, { scaleX: self.progress });
          },
          onRefresh: (self) => {
            emitIndex(
              Math.min(
                total,
                Math.max(1, Math.round(self.progress * (total - 1)) + 1)
              )
            );
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
        delete section.dataset.pinState;
      };
    }
  );

  return mm;
}
