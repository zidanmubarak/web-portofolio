"use client";

import { SectionHead } from "@/components/section-head";
import { useCopy } from "@/lib/i18n/provider";

export function CertificationsSection() {
  const copy = useCopy();

  return (
    <section
      id="certifications"
      className="sec"
      aria-labelledby="certifications-heading"
    >
      <SectionHead
        number="+"
        title={copy.certifications.heading}
        meta={copy.certifications.intro}
        titleId="certifications-heading"
        subdued
      />
      <ul className="cgrid-cells">
        {copy.certifications.items.map((item) => (
          <li className="ccell" key={item.id} data-settle>
            <span className="c-year num">{item.year}</span>
            <span className="c-name">{item.name}</span>
            <span className="c-meta">{item.issuer}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
