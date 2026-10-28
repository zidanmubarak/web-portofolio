"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Copy } from "./copy-en";
import { en } from "./copy-en";
import { id } from "./copy-id";
import { chrome, type Chrome } from "./chrome";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
} from "./types";

const copies: Record<Locale, Copy> = { en, id };

export type DocumentMeta = {
  title: string;
  description: string;
};

type LocaleContextValue = {
  locale: Locale;
  copy: Copy;
  chrome: Chrome;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setDocumentMeta: (meta: DocumentMeta | null) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(fromQuery)) {
      // A deep link is an explicit choice: keep it for the next visit too.
      window.localStorage.setItem(LOCALE_STORAGE_KEY, fromQuery);
      return fromQuery;
    }
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    /* storage can be unavailable (private mode, blocked cookies) */
    return DEFAULT_LOCALE;
  }
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* storage can be unavailable (private mode, blocked cookies) */
  }
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  } catch {
    /* history is unavailable in some embedded contexts */
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // EN is the default and the server render. The effect below applies a
  // persisted choice or a ?lang= deep link after hydration, which keeps the
  // server and client trees identical on first paint.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  // Detail routes carry their own metadata; when a page sets this, it replaces
  // the homepage title/description instead of fighting it after hydration.
  const [documentMeta, setDocumentMetaState] = useState<DocumentMeta | null>(null);

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dataset.lang = locale;

    const pageMeta = documentMeta ?? copies[locale].meta;
    const desiredTitle = pageMeta.title;
    const desiredDescription = pageMeta.description;
    const applyDocumentMeta = () => {
      if (document.title !== desiredTitle) {
        document.title = desiredTitle;
      }
      const description = document.querySelector('meta[name="description"]');
      if (
        description &&
        description.getAttribute("content") !== desiredDescription
      ) {
        description.setAttribute("content", desiredDescription);
      }
    };
    applyDocumentMeta();

    // Next's head manager re-applies the static metadata after hydration;
    // keep the document title and description in sync with the locale.
    const observer = new MutationObserver(applyDocumentMeta);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [locale, documentMeta]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const setDocumentMeta = useCallback((meta: DocumentMeta | null) => {
    setDocumentMetaState(meta);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "id" : "en");
  }, [locale, setLocale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      copy: copies[locale],
      chrome: chrome[locale],
      setLocale,
      toggleLocale,
      setDocumentMeta,
    }),
    [locale, setLocale, toggleLocale, setDocumentMeta],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return value;
}

export function useCopy(): Copy {
  return useLocale().copy;
}

export function useChrome(): Chrome {
  return useLocale().chrome;
}

/**
 * Let one route own the document title and description, in both languages.
 * The detail pages carry their own metadata; without this the provider would
 * restore the homepage strings after hydration. Pass a memoised object: a new
 * object on every render would re-run the effect on every render.
 */
export function useDocumentMeta(meta: DocumentMeta) {
  const { setDocumentMeta } = useLocale();

  useEffect(() => {
    setDocumentMeta(meta);
    return () => setDocumentMeta(null);
  }, [meta, setDocumentMeta]);
}
