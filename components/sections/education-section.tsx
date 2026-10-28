"use client";

import { SectionHead } from "@/components/section-head";
import { useCopy } from "@/lib/i18n/provider";

export function EducationSection() {
  const copy = useCopy();

  return (
    <section id="education" className="sec" aria-labelledby="education-heading">
      <SectionHead
        number="+"
        title={copy.education.heading}
        meta={copy.education.intro}
        titleId="education-heading"
        subdued
      />
      <div className="sec-body">
        {copy.education.items.map((item) => (
          <dl className="metagrid edgrid" key={item.id}>
            <div>
              <dt>{copy.education.labels.degree}</dt>
              <dd>{item.degree}</dd>
            </div>
            <div>
              <dt>{copy.education.labels.institution}</dt>
              <dd>{item.institution}</dd>
            </div>
            <div>
              <dt>{copy.education.labels.period}</dt>
              <dd className="num">{item.period}</dd>
            </div>
            <div>
              <dt>{copy.education.labels.gpa}</dt>
              <dd className="num">{item.gpa}</dd>
            </div>
          </dl>
        ))}
      </div>
    </section>
  );
}
