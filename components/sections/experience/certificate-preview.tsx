"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import type { Credential } from "@/content/types";

type CertificatePreviewProps = {
  image: NonNullable<Credential["image"]>;
  /** Short caption: issuer and date, small enough to never wrap. */
  caption: string;
  children: React.ReactNode;
};

/**
 * Hover preview for a credential row.
 *
 * A fine-pointer loupe: the certificate scan follows the cursor in a paper
 * card, offset so it never sits under the pointer. Keyboard focus anchors it
 * to the row instead. Touch devices get nothing extra — the credential link
 * inside the row remains the accessible path.
 */
export function CertificatePreview({
  image,
  caption,
  children,
}: CertificatePreviewProps) {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const finePointer = React.useRef(false);
  const card = React.useRef<HTMLDivElement>(null);
  const anchor = React.useRef({ x: 0, y: 0 });
  const frame = React.useRef(0);

  React.useEffect(() => {
    finePointer.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    // The portal needs `document`; mount after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target only exists in the browser.
    setMounted(true);
  }, []);

  const place = React.useCallback(() => {
    const element = card.current;
    if (!element) return;
    const pad = 16;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    let x = anchor.current.x + 28;
    let y = anchor.current.y - height / 2;

    if (x + width > window.innerWidth - pad) {
      x = anchor.current.x - width - 28;
    }
    x = Math.max(pad, Math.min(x, window.innerWidth - width - pad));
    y = Math.max(pad, Math.min(y, window.innerHeight - height - pad));

    element.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(
      y
    )}px, 0)`;
  }, []);

  React.useLayoutEffect(() => {
    if (visible) place();
  }, [visible, place]);

  const schedule = React.useCallback(() => {
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      place();
    });
  }, [place]);

  React.useEffect(
    () => () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
    },
    []
  );

  const showAtPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !finePointer.current) return;
    anchor.current = { x: event.clientX, y: event.clientY };
    setVisible(true);
    schedule();
  };

  const follow = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!visible || event.pointerType !== "mouse") return;
    anchor.current = { x: event.clientX, y: event.clientY };
    schedule();
  };

  const hide = () => setVisible(false);

  const showAtRow = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!finePointer.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    anchor.current = { x: rect.right - 40, y: rect.top + 32 };
    setVisible(true);
    schedule();
  };

  const hideOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setVisible(false);
  };

  return (
    <>
      <div
        onPointerEnter={showAtPointer}
        onPointerMove={follow}
        onPointerLeave={hide}
        onPointerCancel={hide}
        onFocusCapture={showAtRow}
        onBlurCapture={hideOnBlur}
      >
        {children}
      </div>

      {mounted
        ? createPortal(
            <div
              ref={card}
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-[85] w-[min(21rem,34vw)] will-change-transform"
            >
              <div
                data-visible={visible ? "true" : "false"}
                className="origin-top-left border border-line-strong bg-paper p-2 opacity-0 transition-[opacity,transform] duration-200 ease-expo data-[visible=true]:scale-100 data-[visible=true]:opacity-100 scale-[0.97] motion-reduce:transition-none"
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 0px, 336px"
                    className="object-cover"
                  />
                </div>
                <p className="u-label mt-2 flex items-baseline justify-between gap-3 px-1 text-paper-muted">
                  <span className="truncate">{caption}</span>
                  <span aria-hidden="true">↗</span>
                </p>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
