"use client";

import * as React from "react";
import { TopBar } from "./top-bar";
import { MenuOverlay } from "./menu-overlay";
import { ScrollMeter } from "./scroll-meter";
import { RouteSweep } from "./route-sweep";
import { useI18n } from "@/components/i18n/provider";
import { localizedHash } from "@/lib/i18n";

/**
 * Client shell: fixed top bar, INDEX overlay, scroll meter, skip link.
 * The page content itself stays a server component.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const { locale, copy } = useI18n();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const openMenu = React.useCallback(() => setMenuOpen(true), []);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <a href="#main" className="skip-link">
        {copy.nav.skipToContent}
      </a>

      <noscript>
        <nav
          aria-label={copy.nav.sectionsLabel}
          className="u-container border-b border-line bg-surface pb-3 pt-[calc(var(--topbar-h)+12px)]"
        >
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {copy.nav.items.map((item) => (
              <li key={item.id}>
                <a
                  href={localizedHash(locale, item.href)}
                  className="link-wipe u-label text-ink"
                >
                  <span className="text-accent">{item.index}</span>{" "}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>

      <TopBar menuOpen={menuOpen} onOpenMenu={openMenu} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      <ScrollMeter />
      <RouteSweep />

      <main id="main" tabIndex={-1} className="relative focus:outline-none">
        {children}
      </main>
    </>
  );
}
