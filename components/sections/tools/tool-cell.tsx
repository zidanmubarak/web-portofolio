"use client";

import * as React from "react";

export type ToolCellProps = {
  name: string;
  /** simple-icons path data; the cell never loads an image. */
  path: string;
};

/**
 * Tools inventory cell (design-direction.md §4.7).
 *
 * Two stacked layers of the same path: the muted default and the accent swap.
 * `.icon-swap-layer` wipes from the pointer position recorded here; keyboard
 * and reduced-motion users see the default layer, which carries the label.
 */
export function ToolCell({ name, path }: ToolCellProps) {
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--swap-x", `${(event.clientX - rect.left).toFixed(1)}px`);
    element.style.setProperty("--swap-y", `${(event.clientY - rect.top).toFixed(1)}px`);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      className="group relative flex h-full w-full flex-col items-center justify-center gap-2 px-2 py-3 text-ink-muted transition-colors duration-micro hover:bg-surface-elevated hover:text-ink"
    >
      <span aria-hidden="true" className="relative block h-7 w-7 shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-7 w-7"
          fill="currentColor"
        >
          <path d={path} />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="icon-swap-layer absolute inset-0 h-7 w-7 text-accent"
          fill="currentColor"
        >
          <path d={path} />
        </svg>
      </span>
      <span className="u-label min-h-[2.3em] text-center leading-[1.15]">
        {name}
      </span>
    </div>
  );
}
