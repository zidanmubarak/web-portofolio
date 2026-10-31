import type { LocaleCode } from "@/content/types";

export type { LocaleCode };

/**
 * Routing contract for the two locales.
 *
 * Indonesian is the primary language and lives at the root (`/`, `/work`), so
 * the default URL never needs a prefix. English lives under `/en`. `proxy.ts`
 * rewrites unprefixed requests to the `[lang]` segment with `id`; the browser
 * URL stays clean.
 */
export const locales: readonly LocaleCode[] = ["id", "en"] as const;

export const defaultLocale: LocaleCode = "id";

export function isLocale(value: string | undefined): value is LocaleCode {
  return value === "id" || value === "en";
}

/** Prefix used by visible URLs: empty for Indonesian, `/en` for English. */
export function localePrefix(locale: LocaleCode): "" | "/en" {
  return locale === "id" ? "" : "/en";
}

/** Turn an app-relative path (`/work`, `/#about`) into a locale-aware href. */
export function localizedHref(locale: LocaleCode, href: string): string {
  if (!href.startsWith("/")) return href;
  const prefix = localePrefix(locale);
  if (!prefix) return href;
  if (href === "/") return prefix;
  return `${prefix}${href}`;
}

/** Home path with a hash, e.g. `/#contact` or `/en#contact`. */
export function localizedHash(locale: LocaleCode, hash: string): string {
  return `${localePrefix(locale) || "/"}${hash}`;
}

/** Normalize `/`, `/id`, `/id/...` and `/en/...` to the public pathname. */
export function stripLocale(pathname: string): string {
  const withoutEn = pathname.replace(/^\/en(?=\/|$)/, "");
  const withoutId = withoutEn.replace(/^\/id(?=\/|$)/, "");
  return withoutId || "/";
}

export function isHomePath(pathname: string): boolean {
  return stripLocale(pathname) === "/";
}

/**
 * Href for the same page in the other language. Works with the public `/en`
 * prefix and with the internal `/id` path that a rewrite may expose.
 */
export function switchLocaleHref(
  pathname: string,
  target: LocaleCode
): string {
  const path = stripLocale(pathname);
  return target === "id"
    ? path
    : path === "/"
      ? "/en"
      : `/en${path}`;
}
