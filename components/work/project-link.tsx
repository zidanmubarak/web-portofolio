"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion/tokens";
import { stageWorkTransition } from "./transition";

type ProjectLinkProps = {
  href: string;
  slug: string;
  image: { src: string; alt: string } | null;
  className?: string;
  children: React.ReactNode;
  /** Marks the media frame that is measured for the hero handoff. */
  mediaRef?: React.RefObject<HTMLDivElement | null>;
  onFocus?: () => void;
  onBlur?: () => void;
  "data-work-card"?: string;
};

/**
 * A `next/link` that stages the shared-figure handoff before the route change.
 * Modified clicks, keyboard activation of a new tab, and reduced motion all keep
 * the browser's normal behaviour.
 */
export function ProjectLink({
  href,
  slug,
  image,
  className,
  children,
  mediaRef,
  onFocus,
  onBlur,
  ...rest
}: ProjectLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!image || !mediaRef?.current) return;
    if (prefersReducedMotion()) return;

    const style = window.getComputedStyle(mediaRef.current);
    if (Number(style.opacity) < 0.2) return;

    const rect = mediaRef.current.getBoundingClientRect();
    if (rect.width < 24 || rect.height < 24) return;
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    stageWorkTransition({
      slug,
      src: image.src,
      alt: image.alt,
      rect: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn("group/project block focus-visible:outline-offset-4", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
