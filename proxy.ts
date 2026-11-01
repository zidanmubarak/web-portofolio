import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/**
 * Locale routing for the portfolio.
 *
 * - `/` and every unprefixed path is rewritten to `/en/...`, so English stays
 *   the primary language without a visible prefix.
 * - `/id/...` is served directly by the `[lang]` segment.
 * - `/en/...` redirects to the clean URL, so the internal segment never becomes
 *   a second canonical address.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    // Metadata images are addressed by their generated `/en/...` URL; serving
    // them directly avoids a redirect those crawlers do not always follow.
    if (
      pathname.startsWith(`/${defaultLocale}/opengraph-image`) ||
      pathname.startsWith(`/${defaultLocale}/twitter-image`)
    ) {
      return;
    }
    if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
      const url = request.nextUrl.clone();
      url.pathname =
        pathname.slice(`/${defaultLocale}`.length) || "/";
      return NextResponse.redirect(url, 308);
    }
    return;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
