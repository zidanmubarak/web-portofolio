import type { Config } from "tailwindcss";

/**
 * RUBRIC design system — Tailwind mapping for `app/globals.css`.
 *
 * CSS variable names are the contract (design-direction.md §2). Tailwind
 * aliases below are the ergonomic layer used by components:
 *   surface / surface-elevated / surface-sunken → --bg / --bg-elevated / --bg-sunken
 *   ink / ink-muted                              → --fg / --muted
 *   line / line-strong                           → --line / --line-strong
 *   accent / accent-hover / accent-ink           → --accent / --accent-hover / --accent-ink
 *   paper / paper-ink / paper-muted              → --paper / --paper-ink / --paper-muted
 *
 * Only transforms that exist in the design direction are exposed: no
 * shadow scale, no large radii, no gradient backgrounds.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--bg)",
          elevated: "var(--bg-elevated)",
          sunken: "var(--bg-sunken)",
        },
        ink: {
          DEFAULT: "var(--fg)",
          muted: "var(--muted)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          ink: "var(--accent-ink)",
        },
        paper: {
          DEFAULT: "var(--paper)",
          ink: "var(--paper-ink)",
          muted: "var(--paper-muted)",
        },
        focus: "var(--focus)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Archivo Fallback",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "Martian Mono Fallback",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        mega: [
          "var(--fs-mega)",
          { lineHeight: "var(--lh-mega)", letterSpacing: "var(--tracking-mega)" },
        ],
        display: [
          "var(--fs-display)",
          {
            lineHeight: "var(--lh-display)",
            letterSpacing: "var(--tracking-display)",
          },
        ],
        title: ["var(--fs-title)", { lineHeight: "1" }],
        heading: ["var(--fs-heading)", { lineHeight: "1.15" }],
        lead: ["var(--fs-lead)", { lineHeight: "1.4" }],
        body: ["var(--fs-body)", { lineHeight: "var(--lh-body)" }],
        small: ["var(--fs-small)", { lineHeight: "1.45" }],
        label: [
          "var(--fs-label)",
          { lineHeight: "1.2", letterSpacing: "var(--tracking-label)" },
        ],
      },
      spacing: {
        section: "var(--section-y)",
        page: "var(--margin-page)",
        grid: "var(--gap-grid)",
        topbar: "var(--topbar-h)",
      },
      maxWidth: {
        site: "var(--max-width)",
      },
      height: {
        svh: "100svh",
        dvh: "100dvh",
      },
      minHeight: {
        svh: "100svh",
        dvh: "100dvh",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      borderRadius: {
        none: "var(--radius)",
        xs: "var(--radius-xs)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        none: "none",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
      transitionTimingFunction: {
        expo: "var(--ease-out-expo)",
        quart: "var(--ease-out-quart)",
        inout: "var(--ease-in-out)",
      },
      transitionDuration: {
        micro: "var(--dur-micro)",
        ui: "var(--dur-ui)",
        reveal: "var(--dur-reveal)",
        page: "var(--dur-page)",
      },
      zIndex: {
        nav: "var(--z-nav)",
        menu: "var(--z-menu)",
        loader: "var(--z-loader)",
      },
    },
  },
  plugins: [],
};

export default config;
