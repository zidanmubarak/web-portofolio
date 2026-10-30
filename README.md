# Zidan Mubarak — portfolio v2

Personal portfolio of **Zidan Mubarak** (AI/ML engineer, Banda Aceh). Rebuilt from
scratch as an editorial, dark-first site: a signature loader, a portrait rendered
as an RGB subpixel grid on paper, a pinned horizontal work rail, and six project
pages. Next.js App Router, TypeScript, Tailwind 3, GSAP + Lenis.

- **Live:** https://zidanmubarak.vercel.app
- **Design language:** “RUBRIC” — `#0B0B0A` ground, `#E7E1D5` paper plate, one
  rubric-red accent (`#FF4A2E`), Archivo + Martian Mono.
- **Content language:** English. All editorial copy lives in `content/`.

## Quick start

```bash
npm ci
npm run dev            # http://localhost:3000
npm run build && npm start
npm run typecheck      # tsc --noEmit
npm run lint           # eslint . (flat config)
```

Node 20.9+ is required.

### Running more than one checkout at a time

Next.js locks its build directory, so each parallel checkout can pick its own:

```bash
# POSIX
NEXT_DIST_DIR=".next-a" npx next dev -p 3101
# PowerShell
$env:NEXT_DIST_DIR=".next-a"; npx next dev -p 3101
```

`NEXT_DIST_DIR` is read by `next.config.js`; without it the default `.next` is used.

## Structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD, loader gate, shell
  page.tsx              Hero → About → Services → Work → Record → Tools → Contact → Footer
  globals.css           RUBRIC tokens + utilities (Tailwind layer)
  opengraph-image.tsx   share card rendered with next/og (Archivo + Martian Mono)
  twitter-image.tsx     re-export of the same card
  icon.svg, apple-icon.png
  sitemap.ts, robots.ts
  work/                 /work index and /work/[slug] case study (6 static slugs)
  api/contact/route.ts  contact form endpoint (validation, rate limit, honeypot)
  dev/                  component benches; every route calls notFound() in production
components/
  loader/               signature loader + pre-paint gate
  signature/            vector signature and draw timeline
  subpixel/             WebGL2 RGB-subpixel portrait with poster fallback
  shell/                top bar, INDEX overlay, scroll meter, route sweep
  sections/             one file per homepage section (+ subfolders)
  work/                 rail, index, case-study blocks, route transition
  ui/                   Section, Button, TextLink, Odometer, Accordion, Field, Reveal
  ../lib/motion/        GSAP registration, Lenis provider, reveal utilities, tokens
content/                typed, verified copy and data (English)
public/                 optimized WebP images, signature.svg, icons
assets/fonts/           static TTF instances used only to render the OG card
scripts/                offline pipelines (photo cutout, signature vectorization, QA)
```

## Content and facts

`content/` is the single source of truth: profile, links, projects, experience,
education, certifications, stack and case studies. Copy is typed by
`content/types.ts`. Numbers on the page come only from `profile.metrics` or a
case study; anything unverified is recorded in the vault instead of invented.

## Motion

- GSAP + ScrollTrigger driven by one Lenis ticker (`lib/motion/smooth-scroll.tsx`).
- Only `transform`, `opacity` and `clip-path` are animated (plus `stroke-dashoffset`
  for the signature and a one-frame height snap in the accordion).
- Every section has its own scroll pattern; see the vault `motion-map.md`.
- `prefers-reduced-motion: reduce` skips the loader, Lenis, pinning, scrubbing and
  odometers; all content is rendered in its final state.
- Loader budget: signature 1.45 s, exit ~0.7 s; it proceeds after a short grace
  period if a heavy readiness task (shader compile) is slow. Repeat visits within
  a session skip it via `sessionStorage`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the SMTP values for the contact
form. Nothing else is required; missing SMTP configuration makes the endpoint
return a generic 503 instead of leaking setup details.

| Variable | Purpose |
|---|---|
| `EMAIL_HOST` `EMAIL_PORT` `EMAIL_SECURE` `EMAIL_USER` `EMAIL_PASS` `EMAIL_RECEIVER` | contact form SMTP |
| `NEXT_PUBLIC_SITE_URL` | canonical origin for metadata, sitemap, robots, OG URLs |

## Deploy (Vercel)

1. Import the repo, framework preset **Next.js** (no custom build command needed).
2. Set the environment variables above in the project settings.
3. Builds are static-first: the six case studies use `generateStaticParams`.
4. Images are pre-optimized WebP and served with `images.unoptimized: true`, so
   the deploy stays inside the Vercel free tier (no image transformation quota).
5. `NEXT_PUBLIC_SITE_URL` must point at the production domain; previews may set
   their own origin.

## Component benches (development only)

| Route | What it shows |
|---|---|
| `/dev/style` | tokens, type scale, grid, UI primitives, motion patterns |
| `/dev/subpixel` | portrait parameters and the intro scrubber |
| `/dev/signature` | stroke table, loader scrubber, source overlay |

All three call `notFound()` when `NODE_ENV === "production"`; verified to return
404 under `next start`.

## Offline pipelines

Each folder under `scripts/` owns its manifest and ignores its own
`venv`/`node_modules`:

- `scripts/photo/` — cutout and half-body crop (rembg) for the subpixel portrait.
- `scripts/signature/` — skeletonisation and Bézier fitting for the signature.
- `scripts/og/` — how the static TTF instances in `assets/fonts/` were generated.
- `scripts/ref/` — reference-site capture used during design research.

Source photographs and the original signature are **not** in `public/` or the
build; only derived, EXIF-free assets are published.
