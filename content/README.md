# `content/` — typed, verified portfolio content

Owned by T5. Read `content-source.md` in the vault for provenance and
`open-questions/T5.md` for the facts still waiting on the owner.

## Files

| File | What it holds |
|---|---|
| `types.ts` | Every interface. Read this before writing UI. |
| `sources.ts` | Provenance registry. Every `sources` array points here. |
| `profile.ts` | Identity, location, availability, and the only numbers allowed in the hero. |
| `links.ts` | Contact points and public profiles. |
| `services.ts` | The four numbered work areas, each with proof. |
| `projects.ts` | Six selected projects with links, images and verification state. |
| `case-studies/jawi-htr.ts` | The Jawi case study as renderable blocks. |
| `experience.ts` | Roles, reverse chronological. |
| `education.ts` | Degrees, reverse chronological. |
| `certifications.ts` | Certificates, award, and the journal paper. |
| `stack.ts` | Tools with `simple-icons` slugs and evidence. |
| `copy.en.ts` | UI copy, marked `draft` until T7 sets the final tone. |
| `index.ts` | Barrel export. |

## Rules

1. **No invented facts.** Every value is traceable to a source in
   `sources.ts`. Unverified entries carry `verification.verified: false`
   and must not be published without an answer to the open question.
2. **Numbers are numbers.** Odometer values live in `profile.metrics`
   with `hero: true` on the two or three that may appear in the hero.
3. **Images are real.** `projects[].image.status` says whether an asset
   exists. `available` means a real file is at `image.source`;
   `needs-capture` means T8 must take it; `missing` means the owner has
   to supply it. Stock photos and AI mockups are never acceptable.
4. **English first.** Translatable prose lives here; a future `content/id/`
   folder re-declares the same shapes. Nothing in this folder imports
   from `app/`, `components/`, `lib/` or `next/*`.
