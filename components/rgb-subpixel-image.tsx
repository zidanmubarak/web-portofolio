import type { CSSProperties } from "react";

export type RgbSubpixelImageProps = {
  /** Base path without extension: `/images/portrait/hero-01`. */
  src: string;
  alt: string;
  /** CSS aspect-ratio for the panel, e.g. `"2 / 3"`. */
  aspect?: string;
  objectPosition?: string;
  /** 0 = plain photo, 1 = full LCD. DESIGN.md ships C at .36. */
  intensity?: number;
  priority?: boolean;
  width?: number;
  height?: number;
  /** Stripe pitch in px; 3 desktop, tightens to 2.4 on hover/focus. */
  pitch?: number;
  sizes?: string;
  className?: string;
};

/**
 * The single photographic treatment in the design: a `<picture>` element with
 * AVIF → WebP (800w/1333w) → JPEG sources under a hard-stop R/G/B stripe grid
 * and a scanline overlay. Both overlays are decorative and static when the
 * visitor prefers reduced motion.
 */
export function RgbSubpixelImage({
  src,
  alt,
  aspect = "2 / 3",
  objectPosition = "50% 30%",
  intensity = 0.5,
  priority = false,
  width = 1333,
  height = 2000,
  pitch = 3,
  sizes = "(max-width: 1023px) 100vw, 34vw",
  className,
}: RgbSubpixelImageProps) {
  const style = {
    "--rgb-intensity": intensity,
    "--rgb-pitch": `${pitch}px`,
    aspectRatio: aspect,
  } as CSSProperties;

  const priorityAttributes = priority
    ? ({ fetchpriority: "high" } as Record<string, string>)
    : {};

  return (
    <div
      className={`rgb-panel rgb-host${className ? ` ${className}` : ""}`}
      style={style}
    >
      <picture className="rgb-picture">
        <source type="image/avif" srcSet={`${src}.avif`} />
        <source
          type="image/webp"
          srcSet={`${src}-800w.webp 800w, ${src}.webp 1333w`}
          sizes={sizes}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- <picture> sources need a raw img */}
        <img
          src={`${src}.jpg`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition }}
          {...priorityAttributes}
        />
      </picture>
      <span className="rgb-grid" aria-hidden="true" />
      <span className="rgb-scan" aria-hidden="true" />
    </div>
  );
}
