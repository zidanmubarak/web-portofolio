export type Locale = "en" | "id";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_STORAGE_KEY = "zm-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "id";
}
