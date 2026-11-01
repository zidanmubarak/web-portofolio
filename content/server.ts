import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale } from "@/lib/i18n";
import type { LocaleCode, SiteContent } from "./types";
import { content as contentEn } from "./locales/en";
import { content as contentId } from "./locales/id";

export function contentFor(locale: LocaleCode): SiteContent {
  return locale === "id" ? contentId : contentEn;
}

/** Locale from the `[lang]` root segment, available to every server component. */
export async function getLocale(): Promise<LocaleCode> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getSiteContent(): Promise<SiteContent> {
  return contentFor(await getLocale());
}
