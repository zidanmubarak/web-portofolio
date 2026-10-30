"use client";

import * as React from "react";

/**
 * Copy the address with a quiet inline confirmation instead of a toast.
 * `aria-live="polite"` announces the change once; the visible label returns
 * to COPY after 1.6 s (design-direction.md §4.8).
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(0);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      // Older Safari and non-secure origins: fall back to a selection copy.
      try {
        const field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        ok = document.execCommand("copy");
        document.body.removeChild(field);
      } catch {
        ok = false;
      }
    }

    if (!ok) return;

    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className="flex items-center gap-3">
      <button
        type="button"
        onClick={copy}
        className="u-label border border-paper-ink px-3 py-2 text-paper-ink transition-colors duration-micro hover:bg-paper-ink hover:text-paper"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to the clipboard." : ""}
      </span>
    </span>
  );
}
