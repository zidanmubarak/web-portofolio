"use client";

import * as React from "react";
import type {
  ExternalLink,
  LocaleCode,
  Profile,
  SiteCopy,
  SourceRef,
} from "@/content/types";

export type I18nValue = {
  readonly locale: LocaleCode;
  readonly copy: SiteCopy;
  readonly profile: Profile;
  readonly links: readonly ExternalLink[];
  readonly sources: Readonly<Record<string, SourceRef>>;
};

const I18nContext = React.createContext<I18nValue | null>(null);

export function I18nProvider({
  value,
  children,
}: {
  value: I18nValue;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const value = React.useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside <I18nProvider>");
  }
  return value;
}
