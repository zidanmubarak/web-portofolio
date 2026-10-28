"use client";

import { GitHubStats } from "@/components/github-stats";
import { useCopy } from "@/lib/i18n/provider";

export function SkillsSection() {
  const copy = useCopy();
  const skills = copy.skills.groups.flatMap((group) =>
    group.items.map((name) => ({ name, group: group.title })),
  );

  return (
    <section id="skills" className="sec" aria-labelledby="skills-heading">
      <div className="sec-head">
        <span className="secnum num" aria-hidden="true">
          04
        </span>
        <h2 id="skills-heading">{copy.skills.heading}</h2>
        <p className="meta">
          <span className="num">04</span> / 05
        </p>
      </div>
      <p className="sec-intro">{copy.skills.intro}</p>

      <ul className="stackgrid">
        {skills.map((skill, index) => (
          <li className="scell" key={`${skill.group}-${skill.name}`} data-settle>
            <span className="idx num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="name">{skill.name}</span>
            <span className="kind">{skill.group}</span>
          </li>
        ))}
      </ul>

      <GitHubStats />
    </section>
  );
}
