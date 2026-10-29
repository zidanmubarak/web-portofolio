"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion/tokens";

const buttonVariants = cva(
  [
    "btn-magnet inline-flex select-none items-center justify-center gap-2",
    "whitespace-nowrap border font-mono text-[0.6875rem] uppercase leading-[1.2] tracking-[0.12em]",
    "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        solid: "border-accent bg-accent text-accent-ink hover:bg-accent-hover hover:border-accent-hover",
        outline:
          "border-line-strong bg-transparent text-ink hover:border-accent hover:text-accent",
        quiet:
          "border-transparent bg-transparent text-ink-muted hover:text-ink",
        paper:
          "border-paper-muted bg-transparent text-paper-ink hover:border-paper-ink",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  }
);

type VariantPropsType = VariantProps<typeof buttonVariants>;

type SharedProps = VariantPropsType & {
  className?: string;
  /** Magnetic pull on fine pointers. Turn off for full-width form buttons. */
  magnet?: boolean;
};

type ButtonAsButton = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button — square, mono, one accent.
 *
 * The magnetic pull is 4 px maximum on `(hover: hover) and (pointer: fine)`;
 * touch devices and reduced-motion users get a still button. No pills, no
 * shadow, no gradient.
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { className, variant, size, magnet = true, ...props },
  forwardedRef
) {
  const localRef = React.useRef<HTMLElement | null>(null);
  const enabled = React.useRef(false);

  React.useEffect(() => {
    enabled.current =
      magnet &&
      window.matchMedia("(pointer: fine)").matches &&
      !prefersReducedMotion();
  }, [magnet]);

  const setRef = (node: HTMLElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node as never);
    else if (forwardedRef) forwardedRef.current = node as never;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!enabled.current) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    element.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
    element.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
  };

  const onPointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    const element = event.currentTarget;
    element.style.setProperty("--magnet-x", "0px");
    element.style.setProperty("--magnet-y", "0px");
  };

  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a
        {...anchorProps}
        href={href}
        ref={setRef as React.Ref<HTMLAnchorElement>}
        className={classes}
        data-magnet={magnet ? "true" : undefined}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      />
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonProps}
      ref={setRef as React.Ref<HTMLButtonElement>}
      className={classes}
      data-magnet={magnet ? "true" : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    />
  );
});

export { buttonVariants };
