"use client";

import { useChrome } from "@/lib/i18n/provider";

export function SkipLink() {
  const chrome = useChrome();
  return (
    <a className="skip" href="#main">
      {chrome.skipToContent}
    </a>
  );
}
