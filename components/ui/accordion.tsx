"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  animateRowShift,
  revealPanel,
  snapshotRows,
  type RowSnapshot,
} from "@/lib/motion/disclosure";

type AccordionContextValue = {
  openId: string | null;
  toggle: (id: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

export type AccordionProps = {
  children: React.ReactNode;
  className?: string;
  /** One entry may start open; the rest stay closed. */
  defaultOpenId?: string | null;
  /** Accessible name for the disclosure group. */
  label?: string;
};

/**
 * Numbered accordion - motion-map pattern #5.
 *
 * Height snaps once per toggle; sibling rows and the panel are animated with
 * transform/clip-path only (no height tween, no layout thrash). One item open
 * at a time. `aria-expanded` / `aria-controls` live on the trigger.
 */
export function Accordion({
  children,
  className,
  defaultOpenId = null,
  label,
}: AccordionProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId);
  const snapshot = React.useRef<RowSnapshot | null>(null);
  const previouslyOpen = React.useRef<string | null>(defaultOpenId);

  const toggle = React.useCallback((id: string) => {
    const rows = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[data-accordion-row]") ?? []
    );
    snapshot.current = snapshotRows(rows);
    setOpenId((current) => (current === id ? null : id));
  }, []);

  React.useLayoutEffect(() => {
    const rows = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[data-accordion-row]") ?? []
    );

    if (snapshot.current) {
      animateRowShift(rows, snapshot.current);
      snapshot.current = null;
    }

    if (openId && openId !== previouslyOpen.current) {
      const panel = root.current?.querySelector<HTMLElement>(
        `[data-accordion-panel="${openId}"]`
      );
      if (panel) revealPanel(panel);
    }

    previouslyOpen.current = openId;
  }, [openId]);

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div
        ref={root}
        className={cn("", className)}
        data-accordion=""
        role="group"
        aria-label={label}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = {
  /** Stable id, also used for aria-controls. */
  id: string;
  index?: string;
  title: React.ReactNode;
  /** Dates, counts, or a short status; rendered mono on the right. */
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({
  id,
  index,
  title,
  meta,
  children,
  className,
}: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  const generated = React.useId();
  if (!context) {
    throw new Error("AccordionItem must be used inside <Accordion>.");
  }

  const open = context.openId === id;
  const triggerId = `accordion-trigger-${id}-${generated}`;
  const panelId = `accordion-panel-${id}-${generated}`;

  return (
    <div
      data-accordion-row
      data-state={open ? "open" : "closed"}
      className={cn("accordion-row", className)}
    >
      <h3 className="text-inherit">
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => context.toggle(id)}
          className={cn(
            "accordion-trigger gap-x-4 gap-y-2 py-6 md:py-7",
            "grid-cols-[1.75rem_minmax(0,1fr)_1.25rem] md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,17rem)_1.5rem]"
          )}
        >
          {index ? (
            <span
              aria-hidden="true"
              className={cn(
                "u-label col-start-1 row-start-1 self-center",
                open ? "text-accent" : "text-ink-muted"
              )}
            >
              {index}
            </span>
          ) : null}

          <span className="col-start-2 row-start-1 self-center text-[clamp(1.125rem,2vw,1.5rem)] font-medium leading-tight">
            {title}
          </span>

          {meta ? (
            <span className="u-label col-start-2 row-start-2 self-center text-ink-muted md:col-start-3 md:row-start-1 md:text-right">
              {meta}
            </span>          ) : null}

          <span
            aria-hidden="true"
            className={cn(
              "accordion-sign col-start-3 row-start-1 self-center justify-self-end text-xl leading-none md:col-start-4",
              open ? "text-accent" : "text-ink-muted"
            )}
          >
            +
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!open}
        data-accordion-panel={id}
        className="accordion-panel"
      >
        <div className="pb-7 pr-8 text-[0.9375rem] leading-relaxed text-ink-muted md:ml-16 md:max-w-[70ch] md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}
