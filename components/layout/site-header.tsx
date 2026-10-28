"use client";

import { useCopy, useLocale } from "@/lib/i18n/provider";

const CV_URL = "/files/Zidan_Mubarak_CV.pdf";

export function SiteHeader() {
  const copy = useCopy();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="bar">
      <p className="who">
        <b>{copy.hero.name}</b> <span>· {copy.hero.roleLine}</span>
      </p>
      <div className="bar-right">
        <a className="cv" href={CV_URL}>
          {copy.nav.cv} <span aria-hidden="true">↓</span>
        </a>
        <button
          type="button"
          className="lang"
          onClick={toggleLocale}
          aria-pressed={locale === "id"}
          aria-label={copy.nav.switchLanguage}
        >
          <span className={locale === "en" ? "on" : "off"} lang="en">
            EN
          </span>
          <span aria-hidden="true">/</span>
          <span className={locale === "id" ? "on" : "off"} lang="id">
            ID
          </span>
        </button>
      </div>
    </header>
  );
}
