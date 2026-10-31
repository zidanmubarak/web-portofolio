"use client";

import * as React from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { TextLink } from "@/components/ui/text-link";
import type {
  Credential,
  EducationEntry,
  ExperienceEntry,
  SiteCopy,
} from "@/content/types";
import { EASE, gsap, useGSAP } from "@/lib/motion";


function MetaList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {items.map((item, index) => (
        <li key={item} className="u-label text-ink-muted">
          {item}
          {index < items.length - 1 ? (
            <span aria-hidden="true" className="ml-3 text-line-strong">
              /
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * Record - the numbered accordion (design-direction.md §4.6, motion-map #5).
 *
 * Group rules draw with scroll (transform scaleX only); the accordion itself
 * uses the shared FLIP disclosure helper so the list shifts instead of jumping.
 */
type RecordListsProps = {
  experience: readonly ExperienceEntry[];
  education: readonly EducationEntry[];
  certifications: readonly Credential[];
  copy: SiteCopy["experience"];
  externalLink: string;
};

export function RecordLists({
  experience,
  education,
  certifications,
  copy,
  externalLink,
}: RecordListsProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const educationIndex = (offset: number) =>
    String(experience.length + offset + 1).padStart(2, "0");
  const certificationIndex = (offset: number) =>
    String(experience.length + education.length + offset + 1).padStart(2, "0");


  useGSAP(
    () => {
      if (!root.current) return;
      const rules = gsap.utils.toArray<HTMLElement>(
        root.current.querySelectorAll("[data-record-rule]")
      );

      const tweens = rules.map((rule) =>
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: EASE.linear,
            scrollTrigger: {
              trigger: rule.closest("[data-record-group]") ?? rule,
              start: "top 92%",
              end: "top 68%",
              scrub: 0.8,
            },
          }
        )
      );

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="flex flex-col gap-10 md:gap-12">
      <div data-record-group>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="u-label text-accent">{copy.groupExperience}</h3>
          <span className="u-label text-ink-muted">
            {String(experience.length).padStart(2, "0")} {copy.entriesLabel}
          </span>
        </div>
        <div
          data-record-rule
          aria-hidden="true"
          className="mt-3 h-px w-full origin-left bg-line"
        />

        <Accordion
          label={copy.groupExperience}
          defaultOpenId={`exp-${experience[0]?.id ?? ""}`}
          className="mt-1"
        >
          {experience.map((entry) => (
            <AccordionItem
              key={entry.id}
              id={`exp-${entry.id}`}
              index={entry.index}
              title={entry.role}
              meta={entry.period.label}
            >
              <p>{entry.summary}</p>
              <ul className="mt-3 space-y-2">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span aria-hidden="true" className="text-line-strong">
                      ·
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <MetaList items={entry.tags} />
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div data-record-group>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="u-label text-accent">{copy.groupEducation}</h3>
          <span className="u-label text-ink-muted">
            {String(education.length).padStart(2, "0")} {copy.entryLabel}
          </span>
        </div>
        <div
          data-record-rule
          aria-hidden="true"
          className="mt-3 h-px w-full origin-left bg-line"
        />

        <Accordion label={copy.groupEducation} className="mt-1">
          {education.map((entry, index) => (
            <AccordionItem
              key={entry.id}
              id={`edu-${entry.id}`}
              index={educationIndex(index)}
              title={`${entry.field} · ${entry.institutionShort}`}
              meta={`${entry.period.label} · ${copy.gpaLabel} ${entry.grade?.value ?? ""}`}
            >
              <p>{entry.degree}</p>
              {entry.thesis ? (
                <p className="mt-3">
                  <span className="u-label mr-2 text-ink">{copy.thesisLabel}</span>
                  {entry.thesis}
                </p>
              ) : null}
              <ul className="mt-3 space-y-2">
                {entry.notes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span aria-hidden="true" className="text-line-strong">
                      ·
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div data-record-group>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="u-label text-accent">
            {copy.groupCredentials}
          </h3>
          <span className="u-label text-ink-muted">
            {String(certifications.length).padStart(2, "0")} {copy.entriesLabel}
          </span>
        </div>
        <div
          data-record-rule
          aria-hidden="true"
          className="mt-3 h-px w-full origin-left bg-line"
        />

        <Accordion label={copy.groupCredentialsLong} className="mt-1">
          {certifications.map((entry, index) => (
            <AccordionItem
              key={entry.id}
              id={`cert-${entry.id}`}
              index={certificationIndex(index)}
              title={entry.title}
              meta={entry.displayDate}
            >
              <p>
                {entry.issuer}
                {entry.level ? ` · ${entry.level}` : ""}
              </p>
              {entry.summary ? <p className="mt-3">{entry.summary}</p> : null}
              {entry.skills?.length ? (
                <MetaList items={entry.skills} />
              ) : null}
              {entry.url ? (
                <p className="mt-4">
                  <TextLink
                    href={entry.url}
                    external
                    externalLabel={externalLink}
                    mark="↗"
                  >
                    {copy.credentialLink}
                  </TextLink>
                </p>
              ) : null}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
