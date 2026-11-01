import type { LocaleCode } from "@/content/types";

export type { LocaleCode };

/**
 * Routing contract for the two locales.
 *
 * English is the primary language and lives at the root (`/`, `/work`), so the
 * default URL never needs a prefix. Indonesian lives under `/id`. `proxy.ts`
 * rewrites unprefixed requests to the `[lang]` segment with `en`; the browser
 * URL stays clean.
 */
export const locales: readonly LocaleCode[] = ["en", "id"] as const;

export const defaultLocale: LocaleCode = "en";

export function isLocale(value: string | undefined): value is LocaleCode {
  return value === "en" || value === "id";
}

/** Prefix used by visible URLs: empty for English, `/id` for Indonesian. */
export function localePrefix(locale: LocaleCode): "" | "/id" {
  return locale === "en" ? "" : "/id";
}

/** Turn an app-relative path (`/work`, `/#about`) into a locale-aware href. */
export function localizedHref(locale: LocaleCode, href: string): string {
  if (!href.startsWith("/")) return href;
  const prefix = localePrefix(locale);
  if (!prefix) return href;
  if (href === "/") return prefix;
  return `${prefix}${href}`;
}

/** Home path with a hash, e.g. `/#contact` or `/id#contact`. */
export function localizedHash(locale: LocaleCode, hash: string): string {
  return `${localePrefix(locale) || "/"}${hash}`;
}

/** Normalize `/`, `/en`, `/en/...`, `/id` and `/id/...` to the public path. */
export function stripLocale(pathname: string): string {
  const withoutDefault = pathname.replace(/^\/en(?=\/|$)/, "");
  const withoutId = withoutDefault.replace(/^\/id(?=\/|$)/, "");
  return withoutId || "/";
}

export function isHomePath(pathname: string): boolean {
  return stripLocale(pathname) === "/";
}

/**
 * Href for the same page in the other language. Works with the public `/id`
 * prefix and with the internal `/en` path that a rewrite may expose.
 */
export function switchLocaleHref(
  pathname: string,
  target: LocaleCode
): string {
  const path = stripLocale(pathname);
  if (target === "en") return path;
  return path === "/" ? "/id" : `/id${path}`;
}
