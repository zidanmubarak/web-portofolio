import { Section } from "@/components/ui/section";
import { getSiteContent } from "@/content/server";
import { RecordLists } from "./experience/record-lists";

/**
 * Record - 04 (design-direction.md §4.6).
 *
 * The anchor stays `#record`; the file stays `Experience.tsx` per the ownership
 * map. The rail counts are derived, never hand-written.
 */
export async function Experience() {
  const { copy, experience, education, certifications } = await getSiteContent();
  const total = experience.length + education.length + certifications.length;

  return (
    <Section
      id="record"
      index="04"
      label={copy.experience.label}
      meta={`${String(total).padStart(2, "0")} ${copy.experience.metaEntries}`}
      labelledBy="record-heading"
      bodyClassName="lg:pr-14"
    >
      <h2 id="record-heading" className="sr-only">
        {copy.experience.recordHeading}
      </h2>

      <div className="u-grid gap-y-10 md:gap-y-12">
        <div className="col-span-4 lg:col-span-3">
          <dl className="border-t border-line">
            {[
              {
                term: copy.experience.groupExperience,
                count: experience.length,
              },
              {
                term: copy.experience.groupEducation,
                count: education.length,
              },
              {
                term: copy.experience.groupCredentials,
                count: certifications.length,
              },
            ].map((group) => (
              <div
                key={group.term}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 lg:py-4"
              >
                <dt className="u-label text-ink-muted">{group.term}</dt>
                <dd className="u-mono text-small">
                  {String(group.count).padStart(2, "0")}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-[26ch] text-small leading-relaxed text-ink-muted">
            {copy.experience.groupNote}
          </p>
        </div>

        <div className="col-span-4 lg:col-span-9">
          <RecordLists
            experience={experience}
            education={education}
            certifications={certifications}
            copy={copy.experience}
            externalLink={copy.nav.externalLink}
          />
        </div>
      </div>
    </Section>
  );
}
