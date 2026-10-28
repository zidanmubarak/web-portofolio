"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import {
  useChrome,
  useCopy,
  useDocumentMeta,
  useLocale,
} from "@/lib/i18n/provider";
import type { Locale } from "@/lib/i18n/types";
import type { WorkDetail, WorkItemSummary } from "@/lib/work-details";

type WorkDetailBodyProps = {
  /** 0-based position of this project among the featured ones. */
  index: number;
  /** Number of featured projects that own a detail page. */
  total: number;
  /** The same project read from both detail decks, so a locale switch is instant. */
  details: Record<Locale, WorkDetail>;
  /** Title, year, role and stack from both copy decks. */
  items: Record<Locale, WorkItemSummary>;
};

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="wd-sec" aria-labelledby={id} data-settle>
      <h2 id={id} className="wd-label">
        {label}
      </h2>
      <div className="wd-sec-body">{children}</div>
    </section>
  );
}

/**
 * Locale-aware body of a /work/[slug] page. Every visible string comes from the
 * detail deck or the copy deck for the active locale; the only strings written
 * in code are interface labels from `lib/i18n/chrome.ts`.
 */
export function WorkDetailBody({
  index,
  total,
  details,
  items,
}: WorkDetailBodyProps) {
  const copy = useCopy();
  const chrome = useChrome();
  const { locale } = useLocale();

  const detail = details[locale];
  const item = items[locale];

  const ordinal = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  const documentMeta = useMemo(
    () => ({
      title: `${item.title} — ${detail.kicker}`,
      description: detail.summary,
    }),
    [item.title, detail.kicker, detail.summary],
  );
  useDocumentMeta(documentMeta);

  return (
    <article className="wd" aria-labelledby="wd-title">
      <header className="wd-head">
        <span className="wd-num num" aria-hidden="true">
          {ordinal}
        </span>

        <div className="wd-head-main">
          <p className="meta wd-eyebrow">
            <span>{copy.work.heading}</span>
            <span aria-hidden="true">·</span>
            <span className="num">
              {ordinal} / {count}
            </span>
          </p>
          <h1 id="wd-title" className="wd-title serif">
            {item.title}
          </h1>
          <p className="wd-kicker">{detail.kicker}</p>
        </div>

        <dl className="wd-facts">
          <div>
            <dt>{chrome.workDetail.year}</dt>
            <dd className="num">{item.year}</dd>
          </div>
          <div>
            <dt>{chrome.workDetail.role}</dt>
            <dd>{item.role}</dd>
          </div>
        </dl>
      </header>

      <Section id="wd-summary" label={chrome.workDetail.summary}>
        <p className="wd-lead">{detail.summary}</p>
      </Section>

      <Section id="wd-context" label={chrome.workDetail.context}>
        <p className="wd-body">{detail.context}</p>
      </Section>

      <Section id="wd-approach" label={chrome.workDetail.approach}>
        <ol className="wd-steps">
          {detail.approach.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>

      <Section id="wd-result" label={chrome.workDetail.result}>
        <ul className="wd-results">
          {detail.result.map((line) => (
            <li key={line}>
              <span className="wd-mark" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="wd-stack" label={chrome.workDetail.stack}>
        <ul className="wd-tags">
          {item.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </Section>

      <Section id="wd-links" label={chrome.workDetail.links}>
        <ul className="wd-links">
          {detail.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <footer className="wd-foot">
        <Link href="/#work" className="wd-back">
          <span className="wd-back-label">
            <span aria-hidden="true">←</span> {chrome.workDetail.backToIndex}
          </span>
        </Link>
      </footer>
    </article>
  );
}
