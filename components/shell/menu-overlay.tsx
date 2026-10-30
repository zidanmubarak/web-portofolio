"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/motion/gsap";
import { useSmoothScroll } from "@/lib/motion/smooth-scroll";
import { DUR, EASE, STAGGER, prefersReducedMotion } from "@/lib/motion/tokens";
import { profile } from "@/content/profile";
import { links } from "@/content/links";
import { cn } from "@/lib/utils";
import { MENU_ITEMS } from "./navigation";
import { LocalClock } from "./local-clock";

const MENU_LINKS = links.filter((link) =>
  ["linkedin", "github", "huggingface"].includes(link.id)
);

function focusableElements(root: HTMLElement | null) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => element.offsetParent !== null);
}

/**
 * Full-screen INDEX overlay — design-direction.md §4.10 / motion-map #10.
 *
 * Clip-path wipe, item stagger, focus trap, Escape, backdrop click. Lenis is
 * stopped while open; the body overflow rule is a fallback for reduced motion
 * where Lenis is never created. Focus returns to the INDEX button on close.
 */
export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scroll = useSmoothScroll();
  const scrollRef = React.useRef(scroll);

  React.useEffect(() => {
    scrollRef.current = scroll;
  }, [scroll]);

  React.useEffect(() => {
    if (open) {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      // The overlay must exist in the DOM before the clip-path wipe starts.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mounting is the animation prerequisite.
      setMounted(true);
    }
  }, [open]);

  React.useEffect(() => {
    if (!mounted) return;
    const panel = panelRef.current;
    if (!panel) return;

    const reduced = prefersReducedMotion();
    const items = Array.from(
      panel.querySelectorAll<HTMLElement>("[data-menu-item]")
    );
    const meta = Array.from(
      panel.querySelectorAll<HTMLElement>("[data-menu-meta]")
    );

    if (open) {
      document.documentElement.setAttribute("data-menu", "open");
      document.body.style.overflow = "hidden";
      scrollRef.current.stop();

      let timeline: gsap.core.Timeline | null = null;

      if (reduced) {
        gsap.set(panel, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set([...items, ...meta], { clearProps: "all" });
      } else {
        timeline = gsap.timeline();
        timeline.fromTo(
          panel,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: DUR.menu,
            ease: EASE.expo,
          }
        );
        timeline.fromTo(
          items,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: STAGGER.menu,
            ease: EASE.expo,
          },
          0.08
        );
        timeline.fromTo(
          meta,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          0.3
        );
      }

      (closeRef.current ?? items[0])?.focus();

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
          return;
        }

        if (event.key !== "Tab") return;
        const focusables = focusableElements(panel);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", onKeyDown);

      return () => {
        timeline?.kill();
        document.removeEventListener("keydown", onKeyDown);
      };
    }

    // Closing
    document.documentElement.removeAttribute("data-menu");
    document.body.style.overflow = "";
    scrollRef.current.start();
    returnFocusRef.current?.focus();

    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- closing is immediate when motion is reduced.
      setMounted(false);
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => setMounted(false),
    });
    timeline.to(items, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      stagger: 0.02,
      ease: EASE.ui,
    });
    timeline.to(
      panel,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: DUR.menuClose,
        ease: EASE.expo,
      },
      0.1
    );

    return () => {
      timeline.kill();
    };
  }, [open, mounted, onClose]);

  React.useEffect(() => {
    return () => {
      document.documentElement.removeAttribute("data-menu");
      document.body.style.overflow = "";
      scrollRef.current.start();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-menu-title"
      className="fixed inset-0 z-menu overflow-y-auto bg-surface-sunken"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      onClick={(event) => {
        const target = event.target as Element;
        if (!target.closest("[data-menu-interactive]")) onClose();
      }}
    >
      <div className="u-container flex min-h-svh flex-col pb-8 pt-[calc(var(--topbar-h)+1rem)]">
        <div
          data-menu-interactive
          className="flex items-center justify-between border-b border-line pb-4"
        >
          <p id="site-menu-title" className="u-label text-ink-muted">
            Index
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="link-wipe u-label text-ink"
          >
            <span>CLOSE</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav
          aria-label="Index"
          data-menu-interactive
          className="flex flex-1 flex-col justify-center py-6 md:py-8"
        >
          <ul>
            {MENU_ITEMS.map((item) => (
              <li key={item.href} className="border-t border-line last:border-b">
                <Link
                  data-menu-item
                  href={isHome ? item.href : `/${item.href}`}
                  onClick={(event) => {
                    // From another route the Link navigates home and the
                    // browser/Next resolves the hash; the overlay only closes.
                    if (!isHome) {
                      onClose();
                      return;
                    }
                    event.preventDefault();
                    onClose();
                    const target = document.querySelector(item.href);
                    if (!target) return;
                    const offset =
                      -1 *
                      (parseFloat(
                        getComputedStyle(document.documentElement).getPropertyValue(
                          "--topbar-h"
                        )
                      ) || 64);
                    // The overlay locks scroll until its close effect runs; wait
                    // two frames, unlock, then scroll with force.
                    window.requestAnimationFrame(() => {
                      window.requestAnimationFrame(() => {
                        scrollRef.current.start();
                        scrollRef.current.scrollTo(item.href, {
                          offset,
                          force: true,
                        });
                      });
                    });
                  }}
                  className={cn(
                    "group flex items-baseline gap-4 py-2 md:gap-8 md:py-3",
                    "transition-transform duration-ui ease-expo hover:translate-x-3 focus-visible:translate-x-3"
                  )}
                >
                  <span className="u-label w-8 shrink-0 text-accent">
                    {item.index}
                  </span>
                  <span className="u-display menu-title">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          data-menu-interactive
          data-menu-meta
          className="grid gap-6 border-t border-line pt-6 md:grid-cols-12"
        >
          <div className="md:col-span-6">
            <a
              href={`mailto:${profile.email}`}
              className="link-wipe text-[0.9375rem] text-ink"
            >
              {profile.email}
            </a>
            <p className="u-label mt-3 text-ink-muted">
              {profile.location.city.toUpperCase()}, {profile.location.countryCode}
              <span aria-hidden="true"> · </span>
              <LocalClock className="text-ink-muted" />
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-x-8 gap-y-2 md:col-span-6 md:justify-end">
            {MENU_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-wipe u-label text-ink-muted hover:text-ink"
              >
                {link.label.toUpperCase()}
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
