import { Section } from "@/components/ui/section";

/**
 * T7 stub — 06 Contact on the paper plate.
 * `surface="paper"` switches the focus colour and the text tokens; do not
 * hard-code paper colours inside the section.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      label="Contact"
      meta="Banda Aceh, ID"
      surface="paper"
      bodyClassName="min-h-[60svh]"
    >
      <div aria-hidden="true" />
    </Section>
  );
}
