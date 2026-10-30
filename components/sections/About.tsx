"use client";

import * as React from "react";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { profile } from "@/content/profile";
import { sources } from "@/content/sources";
import { scrubWords, useGSAP } from "@/lib/motion";

const facts = [
  { term: "Based", value: `${profile.location.city}, ${profile.location.countryCode}` },
  { term: "Focus", value: "Vision-language · OCR" },
  { term: "Now", value: "Open to AI/ML roles" },
] as const;

/**
 * About — 01 (design-direction.md §4.3).
 *
 * Motion-map #3: the statement's word opacity is scrubbed by scroll, so the
 * reading pace follows the page instead of a one-shot fade. Prose stays still.
 */
export function About() {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const statement = root.current?.querySelector("[data-about-statement]");
      if (!statement) return;
      return scrubWords(statement, {
        start: "top 82%",
        end: "bottom 58%",
      });
    },
    { scope: root }
  );

  return (
    <Section
      id="about"
      index="01"
      label="About"
      meta="Banda Aceh, ID"
      labelledBy="about-heading"
      bodyClassName="lg:pr-14"
    >
      <div ref={root} className="u-grid gap-y-12">
        <div className="col-span-4 lg:col-span-9">
          <h2
            id="about-heading"
            data-about-statement
            className="max-w-[22ch] text-[clamp(2.5rem,5.1vw,5.75rem)] font-medium leading-[0.96] tracking-[-0.03em]"
          >
            I work where language models meet handwriting.
          </h2>

          <div className="mt-10 grid max-w-[62ch] gap-6 text-[1.0625rem] leading-[1.6] md:mt-14 md:grid-cols-2 md:gap-10 md:text-[1.125rem]">
            <p>
              A degree in Information Technology at UIN Ar-Raniry, Banda Aceh,
              ended with a thesis on teaching a vision-language model to read
              Jawi — the Arab-Malay script the base model read at 82.5%
              character error. Getting that down to 17.4% took three data
              scenarios, a failed epoch 4, and one decision to stop at epoch 3.
            </p>
            <p className="text-ink-muted">
              The unglamorous half of machine learning is the part worth
              keeping: data provenance, honest evaluation, and an interface
              someone can use without reading a README. Python for the models,
              TypeScript when the result needs to live in a browser, layouts
              designed by hand.
            </p>
          </div>
        </div>

        <div className="col-span-4 lg:col-span-3 lg:col-start-10 lg:pt-2">
          <dl className="border-t border-line">
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 lg:flex-col lg:items-start lg:gap-1 lg:py-4"
              >
                <dt className="u-label text-ink-muted">{fact.term}</dt>
                <dd className="text-small">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {sources.cv.url ? (
            <p className="mt-6">
              <TextLink
                href={sources.cv.url}
                external
                mark="↗"
                className="u-label text-ink-muted hover:text-ink"
              >
                Curriculum vitae
              </TextLink>
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
