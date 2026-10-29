import { Section } from "@/components/ui/section";

/**
 * T7 stub — 04 Record (experience, education, certifications).
 * The anchor is `#record`; the file stays `Experience.tsx` per the ownership map.
 */
export function Experience() {
  return (
    <Section
      id="record"
      index="04"
      label="Record"
      meta="11 Entries"
      bodyClassName="min-h-[60svh]"
    >
      <div aria-hidden="true" />
    </Section>
  );
}
