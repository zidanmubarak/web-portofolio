"use client";

import * as React from "react";
import { SignatureDraw } from "@/components/signature/SignatureDraw";
import { LocalClock } from "@/components/shell/local-clock";
import { copy } from "@/content/copy.en";
import { links } from "@/content/links";
import { profile } from "@/content/profile";
import {
  EASE,
  gsap,
  prefersReducedMotion,
  useGSAP,
  useSmoothScroll,
} from "@/lib/motion";

const footerLinks = links.filter((link) => link.primary);

/**
 * Footer — the closing plate (design-direction.md §4.9).
 *
 * Motion-map #9: the signature draws itself when the footer enters, then the
 * outline name is uncovered from below. Both are one-shot and static-ready.
 */
export function Footer() {
  const root = React.useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const name = root.current.querySelector<HTMLElement>(
        "[data-footer-name]"
      );
      if (!name) return;

      const tween = gsap.fromTo(
        name,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: EASE.expo,
          scrollTrigger: { trigger: name, start: "top 96%", once: true },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root }
  );

  return (
    <footer
      ref={root}
      id="footer"
      className="relative overflow-hidden border-t border-line bg-surface-sunken pb-8 pt-16 md:pt-24"
    >
      <div className="u-container">
        <h2 className="sr-only">Footer</h2>

        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[26rem]">
            <p className="u-label text-ink-muted">{copy.footer.signatureLabel}</p>
            <div data-signature-target="footer" className="mt-4 text-ink">
              <SignatureDraw variant="footer" play="viewport" decorative />
              <span className="sr-only">
                Hand-drawn signature of Zidan Mubarak.
              </span>
            </div>
            <p className="mt-8 max-w-[30ch] text-[1.0625rem] leading-relaxed">
              {copy.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <p className="u-label text-ink-muted">{copy.contact.socialHeading}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="link-wipe text-small text-ink"
                    {...(link.id === "email"
                      ? undefined
                      : { target: "_blank", rel: "noreferrer noopener" })}
                  >
                    {link.label}
                    {link.id === "email" ? null : (
                      <>
                        <span aria-hidden="true">↗</span>
                        <span className="sr-only">
                          {" "}
                          (opens in a new tab)
                        </span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <p className="u-label mt-2 flex items-center gap-2 text-ink-muted">
              <span>
                {profile.location.city}, {profile.location.countryCode}
              </span>
              <span aria-hidden="true">·</span>
              <LocalClock />
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 md:mt-20">
          <p
            data-footer-name
            aria-hidden="true"
            className="u-display whitespace-nowrap text-[clamp(2.75rem,10.2vw,9.5rem)] leading-[0.8] tracking-[-0.05em] text-transparent"
            style={{ WebkitTextStroke: "1px var(--line-strong)" }}
          >
            Zidan Mubarak
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
          <p className="u-label text-ink-muted">
            © 2026 {profile.name}
          </p>
          <p className="u-label text-ink-muted">
            {copy.footer.colophon}
          </p>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("#top");
            }}
            className="link-wipe u-label text-ink"
          >
            {copy.footer.backToTop} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
