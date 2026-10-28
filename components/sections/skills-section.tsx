"use client";

import type { CSSProperties } from "react";
import { GitHubStats } from "@/components/github-stats";
import { useCopy } from "@/lib/i18n/provider";
import { skillIcon } from "@/lib/skill-icons";

export function SkillsSection() {
  const copy = useCopy();

  // Split the deck's 32 entries into the icon strip (brand mark available) and
  // the labelled spec sheet (everything else, still grouped by deck group).
  const icons: { name: string; src: string }[] = [];
  const groups = copy.skills.groups.map((group) => {
    const labels = group.items.filter((name) => {
      const mark = skillIcon(name);
      if (!mark) return true;
      icons.push({ name, src: mark.src });
      return false;
    });
    return { ...group, labels };
  });

  return (
    <section id="skills" className="sec" aria-labelledby="skills-heading">
      <div className="sec-head" data-settle>
        <span className="secnum num" aria-hidden="true">
          04
        </span>
        <h2 id="skills-heading">{copy.skills.heading}</h2>
        <p className="meta">
          <span className="num">04</span> / 05
        </p>
      </div>
      <p className="sec-intro" data-settle>
        {copy.skills.intro}
      </p>

      <ul className="toolstrip">
        {icons.map((icon) => (
          <li className="tcell" key={icon.name} data-settle>
            <span
              className="ticon"
              aria-hidden="true"
              style={{ "--icon": `url(${icon.src})` } as CSSProperties}
            />
            <span className="sr-only">{icon.name}</span>
          </li>
        ))}
        {/* Three reserved slots: the strip is a fixed 12-column tool rail, and
            the icons that have no deck entry (R1) stay unrendered. */}
        {Array.from({ length: Math.max(0, 12 - icons.length) }).map(
          (_, index) => (
            <li
              className="tcell tcell--reserved"
              key={`reserved-${index}`}
              aria-hidden="true"
            />
          ),
        )}
      </ul>

      <div className="skillgroups">
        {groups.map((group) => (
          <div className="skillcol" key={group.id} data-settle>
            <p className="skillcol-title meta">{group.title}</p>
            <ul>
              {group.labels.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <GitHubStats />
    </section>
  );
}
