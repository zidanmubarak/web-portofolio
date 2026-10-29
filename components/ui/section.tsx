import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionProps = {
  /** Anchor id used by the shell menu and T7/T8 links. */
  id: string;
  /** Editorial index without padding, e.g. `"01"`. Hero has none. */
  index?: string;
  /** Short label shown in the section rail, e.g. `"About"`. */
  label: string;
  /** Right-hand metadata: counts, coordinates, a countdown, a CTA. */
  meta?: ReactNode;
  /** Optional heading rendered under the rail (T7 usually supplies its own). */
  title?: ReactNode;
  /** `paper` switches the surface and the focus colour. */
  surface?: "dark" | "paper";
  /** Hide the 1px top rule (hero and full-bleed sections). */
  rule?: boolean;
  /** Remove vertical padding (full-bleed pinned sections). */
  flush?: boolean;
  className?: string;
  /** Body padding class override, e.g. `pt-16`. */
  bodyClassName?: string;
  /** Pass when a heading inside the section names it. */
  labelledBy?: string;
  children?: ReactNode;
};

/**
 * Section shell — the editorial rail plus the page container.
 *
 * Owns: anchor id, `data-section` for the scroll indicator, the mono index
 * rail, the top hairline, and the paper surface switch. T7/T8 own everything
 * below the rail.
 */
export function Section({
  id,
  index,
  label,
  meta,
  title,
  surface = "dark",
  rule = true,
  flush = false,
  className,
  bodyClassName,
  labelledBy,
  children,
}: SectionProps) {
  const isPaper = surface === "paper";

  return (
    <section
      id={id}
      data-section={id}
      data-index={index}
      data-label={label}
      data-surface={surface}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={cn(
        "u-section relative",
        flush && "u-section--flush",
        !rule && "u-section--no-rule",
        isPaper ? "u-paper" : "bg-surface",
        className
      )}
    >
      <div className="u-container">
        <div
          className={cn(
            "flex items-baseline justify-between gap-4",
            isPaper ? "text-paper-ink" : "text-ink-muted"
          )}
        >
          <p className="u-label">
            {index ? (
              <>
                <span className={isPaper ? "text-paper-ink" : "text-accent"}>
                  {index}
                </span>
                <span aria-hidden="true"> / </span>
              </>
            ) : null}
            {label}
          </p>
          {meta ? (
            <div className="u-label text-right">{meta}</div>
          ) : null}
        </div>

        {title ? <div className="mt-8 md:mt-12">{title}</div> : null}

        <div className={cn("mt-12 md:mt-16", bodyClassName)}>{children}</div>
      </div>
    </section>
  );
}
