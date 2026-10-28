import type { CSSProperties } from "react";

export type RgbSubpixelImageProps = {
  /** Base path without extension: `/images/portrait/hero-02`. */
  src: string;
  alt: string;
  /** CSS aspect-ratio for the panel, e.g. `"2 / 3"`. */
  aspect?: string;
  objectPosition?: string;
  /** 0 = plain photo, 1 = full LCD. */
  intensity?: number;
  priority?: boolean;
  width?: number;
  height?: number;
  /** Stripe pitch in px; 3 desktop, tightens to 2.4 on hover/focus. */
  pitch?: number;
  sizes?: string;
  className?: string;
  /**
   * Subject matte (SVG or PNG, white = keep). When set, the stripe grid and
   * the scanlines are clipped to the figure and the background stays a plain
   * photograph.
   */
  maskSrc?: string;
};

/**
 * The single photographic treatment in the design: a `<picture>` element with
 * AVIF → WebP (800w/1333w) → JPEG sources.
 *
 * With a matte, the figure is re-rendered *inside the matte* as a monochrome
 * copy under a hard-stop R/G/B stripe grid: monochrome makes the three
 * channels carry equal luminance, so the stripes read as an LCD subpixel
 * screen instead of a green wash, and the surround stays an untouched colour
 * photograph. The copy reuses the URL the LCP image already fetched.
 *
 * Photo and overlay share one "plate", so the parallax transform can never
 * detach the stripes from the silhouette. Nothing animates at first paint.
 */
export function RgbSubpixelImage({
  src,
  alt,
  aspect = "2 / 3",
  objectPosition = "50% 50%",
  intensity = 0.5,
  priority = false,
  width = 1333,
  height = 2000,
  pitch = 3,
  sizes = "(max-width: 1023px) 100vw, 34vw",
  className,
  maskSrc,
}: RgbSubpixelImageProps) {
  const style = {
    "--rgb-intensity": intensity,
    "--rgb-pitch": `${pitch}px`,
    "--rgb-mask": maskSrc ? `url("${maskSrc}")` : "none",
    aspectRatio: aspect,
  } as CSSProperties;

  return (
    <div
      className={`rgb-panel rgb-host${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div className="rgb-plate">
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
            // React 18.3 passes the camelCase prop through; the lowercase
            // attribute was dropped with a warning (REVISIONS-v2 R6).
            fetchPriority={priority ? "high" : "auto"}
            style={{ objectPosition }}
          />
        </picture>
        <span className="rgb-fx" aria-hidden="true">
          {maskSrc ? (
            <picture className="rgb-picture rgb-mono">
              <source type="image/avif" srcSet={`${src}.avif`} />
              <source
                type="image/webp"
                srcSet={`${src}-800w.webp 800w, ${src}.webp 1333w`}
                sizes={sizes}
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- same cached URL as the photo above; this is the screen's luminance layer */}
              <img
                src={`${src}.jpg`}
                alt=""
                width={width}
                height={height}
                loading="eager"
                decoding="async"
                fetchPriority="low"
                style={{ objectPosition }}
              />
            </picture>
          ) : null}
          <span className="rgb-grid" />
          <span className="rgb-scan" />
        </span>
      </div>
    </div>
  );
}
