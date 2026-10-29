"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EASE, gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { signatureData } from "./signature-data";
import { drawTotal, liftSeconds } from "./timing";

type Timeline = ReturnType<typeof gsap.timeline>;

export type SignatureVariant = "loader" | "logo" | "footer" | "plain";

export type SignatureDrawHandle = {
  play: () => void;
  pause: () => void;
  /** Jump to 0-1 of the draw (also pauses). */
  seek: (progress: number) => void;
  timeline: () => Timeline | null;
};

export type SignatureDrawProps = {
  variant?: SignatureVariant;
  /**
   * When to start: on mount, when scrolled into view (footer), or never
   * (manual — call `play()` through the ref, used by the dev scrubber).
   */
  play?: "mount" | "viewport" | "manual";
  /** Playback rate relative to the measured 1x timing. */
  speed?: number;
  /** Fit the whole draw into this many seconds instead of using `speed`. */
  duration?: number;
  delay?: number;
  /** CSS colour. Defaults to currentColor so the parent theme decides. */
  color?: string;
  /** Accessible name; omit for decorative instances. */
  title?: string;
  decorative?: boolean;
  className?: string;
  onComplete?: () => void;
  onTimeline?: (timeline: Timeline | null) => void;
};

const VARIANT_CLASS: Record<SignatureVariant, string> = {
  loader: "w-[min(78vw,520px)]",
  logo: "w-[112px]",
  footer: "w-[200px]",
  plain: "w-full",
};

/**
 * SignatureDraw — the filled silhouette is revealed through a mask made of the
 * pen's centre lines (one per stroke, normalised with pathLength=1). This keeps
 * the calligraphic width variation while the draw itself is a simple
 * stroke-dashoffset animation on the mask.
 *
 * Timing comes from the generated data: each stroke has a measured duration
 * (length / relative speed) and a 60-120 ms pen lift. Total at 1x ≈ 2.8 s.
 * Reduced motion renders the final signature without animating.
 */
export const SignatureDraw = React.forwardRef<
  SignatureDrawHandle,
  SignatureDrawProps
>(function SignatureDraw(
  {
    variant = "plain",
    play = "mount",
    speed = 1,
    duration,
    delay = 0,
    color,
    title = "Signature of Zidan Mubarak",
    decorative = false,
    className,
    onComplete,
    onTimeline,
  },
  forwardedRef
) {
  const root = React.useRef<HTMLSpanElement>(null);
  const paths = React.useRef<Array<SVGPathElement | null>>([]);
  const timelineRef = React.useRef<Timeline | null>(null);
  const onCompleteRef = React.useRef(onComplete);
  const onTimelineRef = React.useRef(onTimeline);

  React.useEffect(() => {
    onCompleteRef.current = onComplete;
    onTimelineRef.current = onTimeline;
  }, [onComplete, onTimeline]);

  const rate = React.useMemo(() => {
    if (duration && duration > 0) {
      return Math.max(drawTotal(signatureData.strokes) / duration, 0.1);
    }
    return Math.max(speed, 0.1);
  }, [duration, speed]);

  const maskId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const mask = `sig-mask-${maskId}`;

  React.useImperativeHandle(
    forwardedRef,
    () => ({
      play: () => timelineRef.current?.play(),
      pause: () => timelineRef.current?.pause(),
      seek: (progress: number) => {
        const timeline = timelineRef.current;
        if (!timeline) return;
        timeline.pause();
        timeline.progress(Math.min(1, Math.max(0, progress)));
      },
      timeline: () => timelineRef.current,
    }),
    []
  );

  useGSAP(
    () => {
      const elements = paths.current.filter(
        (el): el is SVGPathElement => Boolean(el)
      );
      if (!elements.length) return;

      if (prefersReducedMotion()) {
        gsap.set(elements, { strokeDashoffset: 0 });
        onCompleteRef.current?.();
        return;
      }

      gsap.set(elements, { strokeDashoffset: 1 });
      let cursor = 0;
      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => onCompleteRef.current?.(),
      });

      signatureData.strokes.forEach((stroke, index) => {
        if (index > 0) cursor += liftSeconds(stroke) / rate;
        const draw = stroke.duration / rate;
        timeline.to(
          elements[index],
          { strokeDashoffset: 0, duration: draw, ease: EASE.draw },
          cursor
        );
        cursor += draw;
      });

      timelineRef.current = timeline;
      onTimelineRef.current?.(timeline);

      if (play === "mount") {
        timeline.play(delay);
      } else if (play === "viewport") {
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top 82%",
          once: true,
          onEnter: () => timeline.play(),
        });
        return () => {
          trigger.kill();
          timeline.kill();
          timelineRef.current = null;
          onTimelineRef.current?.(null);
        };
      }

      return () => {
        timeline.kill();
        timelineRef.current = null;
        onTimelineRef.current?.(null);
      };
    },
    { scope: root, dependencies: [play, rate, delay] }
  );

  return (
    <span
      ref={root}
      className={cn("signature-draw inline-block", VARIANT_CLASS[variant], className)}
      style={color ? { color } : undefined}
    >
      <style>{`
        .signature-draw .sig-stroke { stroke-dasharray: 1; }
        @media (prefers-reduced-motion: reduce) {
          .signature-draw .sig-stroke { stroke-dashoffset: 0 !important; }
        }
      `}</style>
      <svg
        viewBox={`0 0 ${signatureData.viewBox[0]} ${signatureData.viewBox[1]}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full overflow-visible"
        role={decorative ? undefined : "img"}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : title}
        focusable="false"
      >
        <mask
          id={mask}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={signatureData.viewBox[0]}
          height={signatureData.viewBox[1]}
        >
          <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
            {signatureData.strokes.map((stroke, index) => (
              <path
                key={stroke.id}
                ref={(el) => {
                  paths.current[index] = el;
                }}
                className="sig-stroke"
                d={stroke.d}
                strokeWidth={stroke.width}
                pathLength={1}
                style={{ strokeDashoffset: 1 }}
              />
            ))}
          </g>
        </mask>
        <path
          d={signatureData.silhouette}
          fill="currentColor"
          fillRule="evenodd"
          mask={`url(#${mask})`}
        />
      </svg>
    </span>
  );
});
