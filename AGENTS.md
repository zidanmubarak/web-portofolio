# AGENTS.md

Bilingual (EN/ID) portfolio for Zidan Mubarak, built with Next.js App Router, TypeScript, Tailwind CSS 3.3.3, and a dark-only editorial design (direction C, archive grid): an editorial homepage plus static `/work/<slug>` detail pages. There is no CMS or database: page copy lives in typed modules generated from the reviewed JSON decks in `lib/content/`, and the only server route is `POST /api/contact`.

## Commands

- `npm run dev` — local dev server at http://localhost:3000
- `npm run build` — production build (passes on Next 16; `/` is static, `/api/contact` is dynamic)
- `npm start` — serve the production build
- `npx tsc --noEmit` — typecheck (there is no typecheck script)
- `npx eslint .` — lint (add a path to lint one file)

`npm run lint` is broken: it runs `next lint`, which was removed in Next 16, so Next interprets `lint` as a project directory and exits with an error. Use `npx eslint`. The current tree has no lint errors. The build does not run ESLint, so lint separately.

Node >= 20.9 is required by Next 16. There are no tests or CI workflows in this repo.

## Environment

Local values belong in `.env.local` (gitignored). There is no `.env.example`, and nothing validates the variables at build time.

- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_RECEIVER` — required by the contact form.
- `EMAIL_PORT` defaults to `587`; `EMAIL_SECURE=true` for port 465.

There is no chatbot and no OpenRouter key in this project.

## Content and i18n

- `lib/content/copy-en.json` and `lib/content/copy-id.json` are the source of truth for every visible editorial string. They must keep identical leaf keys (currently 260 each).
- `lib/content/work-details-en.json` and `work-details-id.json` (53 leaves each) own the `/work/<slug>` detail pages through `lib/work-details.ts`.
- `lib/i18n/copy-en.ts` / `copy-id.ts` are generated from those decks. Do not hand-edit: run `node lib/i18n/generate-copy.mjs` after changing a deck.
- `lib/i18n/chrome.ts` holds interface chrome that is not editorial copy (figure caption, portrait alt, GitHub widget states). Keep EN and ID in sync.
- `lib/i18n/provider.tsx` owns the locale: default EN, `localStorage` key `zm-locale`, `?lang=id` deep links, `<html lang>`, `data-lang`, and the document title/description. Components read copy with `useCopy()` and chrome with `useChrome()`.
- Language-neutral chrome (numerals, brackets, arrows, `FIG. 01`, `ZM`, technology names, proper nouns) is deliberately not translated.
- Working material that never ships is gitignored and kept on disk only: `content/` (source and provenance notes, including `*SOURCES.md`), `qa/`, `design/`, `docs/` and `.hermes/`. Agent skills live in `.hermes/skills/` locally and are not part of the repository; no app code imports them.

## Architecture

- `app/layout.tsx` is a server component: metadata plus `LocaleProvider`.
- `app/page.tsx` is a server component that composes the client sections in order: hero (`#top`), about, work, experience, education, certifications, skills, contact.
- `app/work/[slug]/page.tsx` renders the three static detail pages from `lib/work-details.ts`.
- `components/layout/site-rail.tsx` — fixed 00–05 index rail (desktop only, ≥1024).
- `components/layout/site-header.tsx` — sticky bar with the CV link and EN/ID toggle.
- `components/sections/*` — one client component per section. Each content section carries exactly one `<h2>`; the hero carries the only `<h1>`.
- `components/rgb-subpixel-image.tsx` — the only photographic treatment. Props: `src` (base path without extension), `alt`, `aspect`, `objectPosition`, `intensity`, `priority`, plus optional `width`/`height`/`pitch`/`sizes`/`className`. Renders `<picture>` with AVIF → WebP (800w/1333w) → JPEG, fixed 1333×2000 dimensions, the R/G/B stripe grid and a scanline overlay. `prefers-reduced-motion` keeps the grid static.
- `components/github-stats.tsx` — live public GitHub API fetch with loading/ready/error states and a retry. Never hardcode a count; em dashes are the loading state.
- `app/api/contact/route.ts` — unchanged Nodemailer route. The contact form POSTs `{ name, email, subject, message }` and renders the deck's success/error strings.
- `lib/site.ts` — email, GitHub, LinkedIn, CV path, GitHub username. Update here once.
- The CV download points at `public/files/Zidan_Mubarak_CV.pdf` (not Google Docs).
- The only photograph is `public/images/portrait/hero-01.{avif,webp,jpg}` plus `hero-01-800w.webp`. Do not add a second photographic surface.

## Design conventions

- Palette is exactly four tokens in `app/globals.css`: `--ink #0A0A0A`, `--paper #F1EDE4`, `--accent #FF4A1C`, `--mute #8A857C`. Derived tones are mixes of those four.
- Two type families only: Instrument Serif (display) and Geist Mono (body/meta), loaded from Google Fonts via `@import`. No third family, no icon library.
- Zero radius, zero shadow, zero blur, no purple/indigo gradients, no emoji. The RGB stripe panel is a hard-stop pattern, not a decorative gradient.
- Dark-only. Paper bands are inverted sections if they are ever added; they are not a theme. There is no theme toggle.
- Path alias `@/*` maps to the repo root. `cn()` remains in `lib/utils.ts` for utilities.
- `next.config.js` sets `images.unoptimized: true`; the portrait uses a raw `<picture>` because of the AVIF/WebP source chain, not `next/image`.
- React is intentionally pinned to 18.3.1 even though `next` is 16. Don't bump React without checking `next-themes` compatibility.
- Sections use `data-settle` for the transform-only scroll reveal (`components/settle-controller.tsx`). No content is ever hidden behind opacity or JS-gated rendering.

## Verification notes

- There is no CMS, so a copy change means editing both decks, running the generator, then `npm run build` and `npx tsc --noEmit`.
- Responsive checks are page-level `scrollWidth === clientWidth` at 360 / 768 / 1280 / 1920 in both languages, plus a walk for unclipped inner overflows.
- Locale checks: toggle switches every section heading, persists across reload, updates `<html lang>`, and `?lang=id` opens in Indonesian.
