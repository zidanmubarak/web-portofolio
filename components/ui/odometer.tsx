"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@/lib/motion/gsap";
import { animateOdometer } from "@/lib/motion/odometer";

export type OdometerProps = {
  value: number;
  /** Number of decimal places. `3.77` → `2`. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Spoken after the value, e.g. "fewer character errors". */
  label?: string;
  className?: string;
  /** Apply thousands separators. Default true. */
  grouping?: boolean;
};

function formatValue(value: number, decimals: number, grouping: boolean) {
  const fixed = Math.abs(value).toFixed(decimals);
  if (!grouping) return fixed;
  const [whole, fraction] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fraction ? `${grouped}.${fraction}` : grouped;
}

/**
 * Odometer - motion-map pattern #7.
 *
 * Server output is already the final number (the strip is translated to the
 * target digit), so no-JS and reduced-motion users see the result. With
 * motion enabled each column rolls in once when scrolled into view.
 */
export function Odometer({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  className,
  grouping = true,
}: OdometerProps) {
  const root = React.useRef<HTMLSpanElement>(null);
  const negative = value < 0;
  const formatted = formatValue(value, decimals, grouping);
  const characters = formatted.split("");
  const accessible = `${prefix}${negative ? "-" : ""}${formatted}${suffix}${
    label ? ` ${label}` : ""
  }`;

  useGSAP(
    () => {
      if (!root.current) return;
      animateOdometer(root.current);
    },
    { scope: root }
  );

  return (
    <span
      ref={root}
      className={cn("odometer", className)}
      role="img"
      aria-label={accessible}
    >
      <span aria-hidden="true" className="odometer__affix">
        {prefix}
        {negative ? "-" : ""}
      </span>
      {characters.map((character, characterIndex) => {
        if (!/\d/.test(character)) {
          return (
            <span
              key={`separator-${characterIndex}`}
              aria-hidden="true"
              className="odometer__separator"
            >
              {character}
            </span>
          );
        }

        const digit = Number(character);
        const index = characters
          .slice(0, characterIndex)
          .filter((candidate) => /\d/.test(candidate)).length;

        return (
          <span
            key={`digit-${characterIndex}`}
            className="odometer__digit"
            aria-hidden="true"
            data-odometer-digit
            data-value={digit}
            data-index={index}
          >
            <span
              className="odometer__strip"
              style={{ transform: `translateY(-${digit}em)` }}
            >
              {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                (option) => (
                  <span key={option}>{option}</span>
                )
              )}
            </span>
          </span>
        );
      })}
      <span aria-hidden="true" className="odometer__affix">
        {suffix}
      </span>
    </span>
  );
}
