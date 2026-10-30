import { Section } from "@/components/ui/section";
import { certifications } from "@/content/certifications";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { RecordLists } from "./experience/record-lists";

const total =
  experience.length + education.length + certifications.length;

/**
 * Record — 04 (design-direction.md §4.6).
 *
 * The anchor stays `#record`; the file stays `Experience.tsx` per the ownership
 * map. The rail counts are derived, never hand-written.
 */
export function Experience() {
  return (
    <Section
      id="record"
      index="04"
      label="Record"
      meta={`${String(total).padStart(2, "0")} Entries`}
      labelledBy="record-heading"
      bodyClassName="lg:pr-14"
    >
      <h2 id="record-heading" className="sr-only">
        Record — experience, education and certifications
      </h2>

      <div className="u-grid gap-y-10 md:gap-y-12">
        <div className="col-span-4 lg:col-span-3">
          <dl className="border-t border-line">
            {[
              { term: "Experience", count: experience.length },
              { term: "Education", count: education.length },
              { term: "Credentials", count: certifications.length },
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
            Entries and dates trace back to the CV and the public credential
            pages. Newest first; one open at a time.
          </p>
        </div>

        <div className="col-span-4 lg:col-span-9">
          <RecordLists />
        </div>
      </div>
    </Section>
  );
}
