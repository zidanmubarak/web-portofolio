"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/provider";

/**
 * Banda Aceh local time, updated every 30 s.
 *
 * The server and the first client render both show an em dash so hydration
 * never disagrees; the real time arrives in an effect. `aria-live="off"`
 * because a ticking clock must not interrupt a screen reader.
 */
export function LocalClock({
  className,
  withDot = false,
  label = "WIB",
}: {
  className?: string;
  withDot?: boolean;
  label?: string;
}) {
  const { locale, profile } = useI18n();
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
      timeZone: profile.location.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);

    return () => window.clearInterval(interval);
  }, [locale, profile.location.timezone]);

  return (
    <span
      className={cn("u-label inline-flex items-center gap-2", className)}
      aria-live="off"
    >
      {withDot ? (
        <span
          aria-hidden="true"
          className="inline-block h-[5px] w-[5px] rounded-full bg-accent"
        />
      ) : null}
      <time dateTime={time ?? undefined} suppressHydrationWarning>
        {time ?? "--:--"} {label}
      </time>
    </span>
  );
}
