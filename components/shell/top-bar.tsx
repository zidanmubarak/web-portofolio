"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/provider";
import { useSmoothScroll } from "@/lib/motion/smooth-scroll";
import { LocalClock } from "./local-clock";
import { LanguageSwitch } from "./language-switch";
import { SignatureSlot } from "./signature-slot";

export type TopBarProps = {
  menuOpen: boolean;
  onOpenMenu: () => void;
};

/**
 * Fixed top bar - design-direction.md §4.1.
 *
 * Four zones: signature/name, location, live WIB clock, INDEX. It becomes a
 * solid surface with a hairline after 32 px of scroll; no blur, no shadow.
 */
export function TopBar({ menuOpen, onOpenMenu }: TopBarProps) {
  const { copy, profile } = useI18n();
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 32);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-shell="topbar"
      className={cn(
        "fixed inset-x-0 top-0 z-nav h-[var(--topbar-h)] border-b",
        "transition-colors duration-ui ease-expo",
        scrolled
          ? "border-line bg-surface"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="u-container flex h-full items-center gap-4 md:gap-8">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            scrollTo("#top");
          }}
          className="inline-flex min-h-[44px] shrink-0 items-center text-[0.6875rem] leading-none md:text-[0.8125rem]"
          aria-label={`${profile.name} · ${copy.nav.backToTop}`}
        >
          <SignatureSlot name={profile.name.toUpperCase()} />
        </a>

        <p className="u-label hidden shrink-0 text-ink-muted md:block">
          {profile.location.city.toUpperCase()}, {profile.location.countryCode}
        </p>

        <div className="ml-auto flex items-center gap-3 md:gap-6">
          <LanguageSwitch />
          <LocalClock className="hidden text-ink-muted sm:inline-flex" withDot />

          <button
            type="button"
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "site-menu" : undefined}
            aria-haspopup="dialog"
            className="link-wipe u-label inline-flex min-h-[44px] items-center text-ink"
          >
            <span>{copy.nav.indexLabel}</span>
            <span aria-hidden="true">/</span>
          </button>
        </div>
      </div>
    </header>
  );
}
