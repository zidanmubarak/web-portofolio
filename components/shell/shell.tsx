"use client";

import * as React from "react";
import { TopBar } from "./top-bar";
import { MenuOverlay } from "./menu-overlay";
import { ScrollMeter } from "./scroll-meter";
import { RouteSweep } from "./route-sweep";
import { copy } from "@/content/copy.en";

/**
 * Client shell: fixed top bar, INDEX overlay, scroll meter, skip link.
 * The page content itself stays a server component.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const openMenu = React.useCallback(() => setMenuOpen(true), []);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <a href="#main" className="skip-link">
        {copy.nav.skipToContent}
      </a>

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
