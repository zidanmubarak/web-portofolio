"use client";

import { useEffect, useState } from "react";
import { useChrome, useCopy } from "@/lib/i18n/provider";

const SECTIONS = [
  { id: "top", number: "00", navKey: "home" },
  { id: "about", number: "01", navKey: "about" },
  { id: "work", number: "02", navKey: "work" },
  { id: "experience", number: "03", navKey: "experience" },
  { id: "skills", number: "04", navKey: "skills" },
  { id: "contact", number: "05", navKey: "contact" },
] as const;

export function SiteRail({
  base = "",
  current,
}: {
  /** Prefix for the section anchors: `"/"` points the rail back at the homepage. */
  base?: string;
  /** Section id to mark as current on a page that has no sections of its own. */
  current?: string;
}) {
  const copy = useCopy();
  const chrome = useChrome();
  const [active, setActive] = useState<string>("top");
  const activeId = current ?? active;

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="rail" aria-label={chrome.railLabel}>
      <span className="rail-name">{copy.hero.name}</span>
      <nav className="rail-nav">
        {SECTIONS.map((section) => {
          const isCurrent = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`${base}#${section.id}`}
              className={isCurrent ? "on" : undefined}
              aria-current={isCurrent ? "location" : undefined}
              aria-label={`${section.number} ${copy.nav[section.navKey]}`}
            >
              {section.number}
            </a>
          );
        })}
      </nav>
      <span className="rail-foot" aria-hidden="true">
        ZM
      </span>
    </aside>
  );
}
