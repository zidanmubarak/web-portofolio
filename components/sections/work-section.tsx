"use client";

import Link from "next/link";
import { useCopy } from "@/lib/i18n/provider";
import { SITE } from "@/lib/site";
import { workDetailSlugs } from "@/lib/work-details";

/** Projects with a /work/[slug] page; the rest link out to their repository. */
const FEATURED = new Set(workDetailSlugs);

export function WorkSection() {
  const copy = useCopy();
  const total = copy.work.items.length;
  const range = `${String(1).padStart(3, "0")}—${String(total).padStart(3, "0")}`;

  return (
    <section id="work" className="sec" aria-labelledby="work-heading">
      <div className="sec-head">
        <span className="secnum num" aria-hidden="true">
          02
        </span>
        <h2 id="work-heading">{copy.work.heading}</h2>
        <p className="meta">
          <span className="num">02</span> / 05
        </p>
      </div>
      <p className="sec-intro">{copy.work.intro}</p>

      <ol className="arch">
        {copy.work.items.map((item, index) => (
          <li className="arow" key={item.id} data-settle>
            <span className="ano num">
              {String(index + 1).padStart(3, "0")}
            </span>
            <span className="acell">
              <h3 className="atitle serif">
                {FEATURED.has(item.id) ? (
                  <Link href={`/work/${item.id}`}>
                    {item.title}
                    <span className="atitle-mark" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ) : (
                  item.title
                )}
              </h3>
              <span className="adesc">{item.description}</span>
            </span>
            <span className="ayear num">{item.year}</span>
            <span className="astack">{item.stack.join(", ")}</span>
            <span className="alink">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </span>
          </li>
        ))}
        <li className="arch-foot">
          <span className="meta">{range}</span>
          <a
            href={SITE.githubRepositories}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.work.viewAll} <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ol>
    </section>
  );
}
