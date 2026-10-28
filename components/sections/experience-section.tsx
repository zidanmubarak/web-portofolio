"use client";

import { useCopy } from "@/lib/i18n/provider";

export function ExperienceSection() {
  const copy = useCopy();

  return (
    <section
      id="experience"
      className="sec"
      aria-labelledby="experience-heading"
    >
      <div className="sec-head" data-settle>
        <span className="secnum num" aria-hidden="true">
          03
        </span>
        <h2 id="experience-heading">{copy.experience.heading}</h2>
        <p className="meta">
          <span className="num">03</span> / 05
        </p>
      </div>
      <p className="sec-intro" data-settle>
        {copy.experience.intro}
      </p>

      {copy.experience.items.map((item, index) => (
        <article className="xrow" key={item.id} data-settle>
          <span className="xnum num">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="xbody">
            <h3>{item.role}</h3>
            <p className="org">{item.org}</p>
            <ul className="bullets">
              {item.bullets.map((bullet) => (
                <li key={bullet.slice(0, 40)}>{bullet}</li>
              ))}
            </ul>
          </div>
          <div className="when num">
            <span>{item.period}</span>
            <p className="where">{item.place}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
