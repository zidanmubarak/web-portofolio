// Typed access to the work detail decks. The JSON files in `lib/content/` are
// the only source of detail copy and numbers (the provenance notes stay in the
// gitignored `content/` folder); nothing on a detail page is written here.

import enDeck from "@/lib/content/work-details-en.json";
import idDeck from "@/lib/content/work-details-id.json";
import type { Locale } from "./i18n/types";

export type WorkDetailLink = {
  label: string;
  href: string;
};

export type WorkDetail = {
  slug: string;
  kicker: string;
  summary: string;
  context: string;
  approach: string[];
  result: string[];
  links: WorkDetailLink[];
  sources: string[];
};

/** Title, year, role and stack for one project, taken from a copy deck. */
export type WorkItemSummary = {
  title: string;
  year: string;
  role: string;
  stack: string[];
};

const decks: Record<Locale, Record<string, WorkDetail>> = {
  en: enDeck as Record<string, WorkDetail>,
  id: idDeck as Record<string, WorkDetail>,
};

export const workDetails = decks;

/** Featured projects that own a detail page, in deck order: jawi, pacu-pintar, memory-vault. */
export const workDetailSlugs: string[] = Object.values(decks.en).map(
  (detail) => detail.slug,
);
