import { Section } from "@/components/ui/section";

/**
 * T8 stub — 03 Selected Work.
 *
 * T8 replaces the body with the pinned horizontal rail. Keep the section id,
 * `data-section`, and the `data-work` / `data-work-track` hooks documented in
 * `contracts.md`; `pinHorizontal()` requires them.
 */
export function Work() {
  return (
    <Section
      id="work"
      index="03"
      label="Selected Work"
      meta="01 / 06"
      bodyClassName="min-h-[70svh]"
    >
      <div aria-hidden="true" />
    </Section>
  );
}
