import { gsap } from "./gsap";
import { DUR, EASE, prefersReducedMotion } from "./tokens";

export type RowSnapshot = Map<HTMLElement, DOMRect>;

/** Measure rows before a disclosure changes the document height. */
export function snapshotRows(rows: HTMLElement[]): RowSnapshot {
  const snapshot: RowSnapshot = new Map();
  if (typeof window === "undefined") return snapshot;
  rows.forEach((row) => snapshot.set(row, row.getBoundingClientRect()));
  return snapshot;
}

/**
 * FLIP for disclosure siblings — motion-map §3.5.
 *
 * Layout is allowed to snap once; only each row's `transform` is animated so
 * the list appears to slide up/down instead of jumping.
 */
export function animateRowShift(
  rows: HTMLElement[],
  snapshot: RowSnapshot,
  duration = DUR.panel
): void {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  rows.forEach((row) => {
    const before = snapshot.get(row);
    if (!before) return;
    const delta = before.top - row.getBoundingClientRect().top;
    if (Math.abs(delta) < 0.5) return;

    gsap.fromTo(
      row,
      { y: delta },
      {
        y: 0,
        duration,
        ease: EASE.expo,
        clearProps: "transform",
        overwrite: "auto",
      }
    );
  });
}

/** Reveal an opened panel without animating its height. */
export function revealPanel(panel: HTMLElement, delay = 0): void {
  if (prefersReducedMotion()) return;

  const inner = panel.firstElementChild;

  gsap.fromTo(
    panel,
    { clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.45,
      delay,
      ease: EASE.expo,
    }
  );

  if (inner) {
    gsap.fromTo(
      inner,
      { y: -8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, delay: delay + 0.04, ease: EASE.expo }
    );
  }
}

/** Collapse without animating height (the row shift carries the motion). */
export function hidePanel(panel: HTMLElement): void {
  gsap.set(panel, { clearProps: "clipPath" });
}
