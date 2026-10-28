# web-portofolio

Bilingual (EN/ID) portfolio for Zidan Mubarak: an editorial homepage plus static
detail pages for three featured projects (`/work/jawi`, `/work/pacu-pintar`,
`/work/memory-vault`). Built with Next.js (App Router), TypeScript and Tailwind
CSS; there is no CMS or database, and the only server route is `POST /api/contact`.

## Commands

- `npm run dev` — local dev server at http://localhost:3000
- `npm run build` — production build
- `npx tsc --noEmit` — typecheck (the build does not run it)

## Content

Editorial copy lives in `lib/content/*.json`: `copy-*.json` for the homepage and
`work-details-*.json` for the detail pages. `lib/i18n/copy-*.ts` is generated from
those decks, so edit the JSON and run `node lib/i18n/generate-copy.mjs`. The
language is toggled in the header (`?lang=id` deep-links). The contact form needs
`EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` and `EMAIL_RECEIVER` in `.env.local`.
