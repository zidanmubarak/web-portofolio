"use client";

import { useCopy } from "@/lib/i18n/provider";

export function Footer() {
  const copy = useCopy();
  const year = new Date().getFullYear();

  return (
    <footer className="site-foot">
      <span>{copy.footer.rights.replace("{year}", String(year))}</span>
      <span>{copy.footer.builtWith}</span>
      <a href="#top">
        {copy.footer.backToTop} <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
