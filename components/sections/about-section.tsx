"use client";

import { useCopy } from "@/lib/i18n/provider";

export function AboutSection() {
  const copy = useCopy();

  return (
    <section id="about" className="sec" aria-labelledby="about-heading">
      <div className="sec-head" data-settle>
        <span className="secnum num" aria-hidden="true">
          01
        </span>
        <h2 id="about-heading">{copy.about.heading}</h2>
        <p className="meta">
          <span className="num">01</span> / 05
        </p>
      </div>
      <div className="sec-body">
        <div className="profile">
          <div>
            <h3 className="profile-statement serif" data-settle>
              {copy.footer.tagline}
            </h3>
          </div>
          <div className="profile-copy" data-settle>
            {copy.about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
