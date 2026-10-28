"use client";

import { RgbSubpixelImage } from "@/components/rgb-subpixel-image";
import { useChrome, useCopy } from "@/lib/i18n/provider";
import { SITE } from "@/lib/site";

export function HeroSection() {
  const copy = useCopy();
  const chrome = useChrome();
  const [firstName, ...restOfName] = copy.hero.name.split(/\s+/);
  const surname = restOfName.join(" ");

  return (
    <section id="top" className="sheet hero" aria-label={chrome.heroLabel}>
      <div className="cell hero-num">
        <p className="cell-label">
          <span className="num">00</span>
          <span className="accent">ZM</span>
        </p>
        <span className="bignum num" aria-hidden="true">
          00
        </span>
        <p className="meta">
          <span className="num">00</span> / 05
        </p>
      </div>

      <div className="cell hero-name">
        <p className="meta">{copy.hero.roleLine}</p>
        <h1 className="serif">
          {firstName}
          <br />
          <em>{surname}</em>
        </h1>
        <p className="role">{copy.hero.location}</p>
        <p className="lead">{copy.hero.intro}</p>
        <p className="hero-status">
          <span className="hero-status__mark" aria-hidden="true" />
          {copy.hero.availability}
        </p>
      </div>

      <figure className="cell hero-photo">
        <RgbSubpixelImage
          src="/images/portrait/hero-01"
          alt={chrome.portraitAlt}
          aspect="2 / 3"
          objectPosition="50% 8%"
          intensity={0.36}
          priority
        />
        <figcaption className="meta">
          <span>{chrome.figCaption}</span>
          <span className="num">{chrome.imageSize}</span>
        </figcaption>
      </figure>

      <dl className="cell hero-meta metagrid">
        <div>
          <dt>{copy.contact.info.locationLabel}</dt>
          <dd>{copy.hero.location}</dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              zidanmubarak <span aria-hidden="true">↗</span>
            </a>
          </dd>
        </div>
        <div>
          <dt>{copy.nav.cv}</dt>
          <dd>
            <a href={SITE.cv}>PDF ↓</a>
          </dd>
        </div>
        <div>
          <dt>{copy.contact.info.emailLabel}</dt>
          <dd>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
