import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TextLinkProps = {
  href: string;
  children: ReactNode;
  /** Adds target/rel and an accessible "opens in a new tab" suffix. */
  external?: boolean;
  className?: string;
  /** Visible trailing mark, e.g. "↗" or "↓". Decorative. */
  mark?: string;
};

/**
 * Inline link whose 1px underline wipes in from the left.
 * The underline is `currentColor`, so it works on dark and paper surfaces.
 */
export function TextLink({
  href,
  children,
  external = false,
  className,
  mark,
}: TextLinkProps) {
  return (
    <a
      href={href}
      className={cn("link-wipe", className)}
      {...(external
        ? { target: "_blank", rel: "noreferrer noopener" }
        : undefined)}
    >
      <span>{children}</span>
      {mark ? <span aria-hidden="true">{mark}</span> : null}
      {external ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}
