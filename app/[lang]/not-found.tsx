import Link from "next/link";
import { LocalClock } from "@/components/shell/local-clock";
import { getSiteContent } from "@/content/server";
import { localizedHref } from "@/lib/i18n";

/**
 * 404 with the same paper/ink rubric as the rest of the site.
 *
 * Next's default white page reads as a different product; this keeps the
 * masthead, the mono rail and the coordinates so a mistyped URL still belongs
 * to RUBRIC. The large 404 is decorative; the h1 carries the message.
 */
export default async function NotFound() {
  const { locale, copy, profile } = await getSiteContent();

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-svh flex-col bg-surface pt-[var(--topbar-h)]"
    >
      <div className="u-container flex flex-1 flex-col justify-between py-8 md:py-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
          <p className="u-label whitespace-nowrap text-ink-muted">
            <span className="text-accent">{copy.common.notFoundTitle}</span>
            <span aria-hidden="true"> / </span>
            {copy.common.notFoundLabel}
          </p>
          <p className="u-label hidden items-baseline gap-3 whitespace-nowrap text-ink-muted sm:flex">
            <span>
              {profile.location.city.toUpperCase()}, {profile.location.countryCode}
            </span>
            <span aria-hidden="true">·</span>
            <LocalClock />
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 md:py-20">
          <h1
            id="not-found-heading"
            className="max-w-[18ch] text-title leading-[0.94] tracking-[-0.035em] text-ink"
          >
            <span
              aria-hidden="true"
              className="u-display block select-none text-[clamp(7rem,26vw,22rem)] leading-[0.78] tracking-[-0.07em] text-transparent"
              style={{ WebkitTextStroke: "1px var(--line-strong)" }}
            >
              {copy.common.notFoundTitle}
            </span>
            <span className="u-display mt-4 block">{copy.common.notFoundBody}</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4">
          <Link
            href={localizedHref(locale, "/work")}
            className="link-wipe u-label text-ink hover:text-accent"
          >
            {copy.common.notFoundCta}
            <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href={localizedHref(locale, "/")}
            className="link-wipe u-label text-ink-muted hover:text-ink"
          >
            {copy.common.notFoundIndex}
          </Link>
        </div>
      </div>
    </section>
  );
}
