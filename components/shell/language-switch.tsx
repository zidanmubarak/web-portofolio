"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { switchLocaleHref, type LocaleCode } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/provider";

/**
 * Two-state language switch. Indonesian is the primary language and owns the
 * clean URL; English lives under `/en`. The hash is preserved on click so a
 * reader switching language mid-page stays at the same section.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, copy } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const onClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: LocaleCode
  ) => {
    if (!window.location.hash) return;
    event.preventDefault();
    router.push(`${switchLocaleHref(pathname, target)}${window.location.hash}`);
  };

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label={copy.language.label}
      role="group"
    >
      {copy.language.options.map((option, index) => {
        const active = option.code === locale;
        return (
          <React.Fragment key={option.code}>
            {index > 0 ? (
              <span aria-hidden="true" className="u-label text-line-strong">
                /
              </span>
            ) : null}
            <Link
              href={switchLocaleHref(pathname, option.code)}
              hrefLang={option.code}
              lang={option.code}
              aria-label={option.ariaLabel}
              aria-current={active ? "true" : undefined}
              onClick={(event) => onClick(event, option.code)}
              className={cn(
                "u-label inline-flex min-h-[44px] items-center border-b transition-colors duration-micro",
                active
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-muted hover:text-ink focus-visible:text-ink"
              )}
            >
              {option.label}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
