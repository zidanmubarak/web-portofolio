<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Portofolio Zidan Mubarak v2

## Proyek

Rebuild total situs portofolio **Zidan Mubarak** (Zedd): Next.js App Router + TypeScript + Tailwind 3 + GSAP/Lenis. Target kualitas Awwwards, bukan template. Referensi karakter: **alejandroha.com** (terang, editorial, hero foto + headline besar) dan **curtisdesignr.me** (gelap, mono/teknis, odometer, menu overlay).

- **Branch kerja:** `feat/portfolio-redesign-v2` — jangan membuat branch/worktree baru.
- **Repo:** github.com/zidanmubarak/web-portofolio · **live:** zidanmubarak.vercel.app (Vercel free tier).
- **Stack:** Next 16.4 (App Router, Turbopack), React 19.3, TypeScript 5.2, Tailwind 3.3, shadcn (`components.json`), GSAP + `@gsap/react`, Lenis, ogl, simple-icons, framer-motion (legacy, dibersihkan T9), nodemailer 10 (form kontak), next-themes, sonner.
- **Fitur chatbot lama sudah dihapus (T1).** Jangan menambahkan chatbot/playground AI.
- **Aset sumber:** `assets/source/foto-profil.jpg`, `assets/source/ttd-asli.jpg` — hanya turunannya yang boleh masuk `public/` dan build.

## Vault (wajib baca/tulis)

- `VAULT_DIR = D:\github\hermes-workspace\opencode-brain\web-portofolio-v2\`
- Aturan bersama: `D:\github\hermes-workspace\opencode-brain\web-portofolio-v2\prompts\00-aturan-bersama.md`
- Prompt terminal: `...\prompts\T<n>-*.md` · Peta & status: `...\00-index.md`
- Status tiap terminal: `...\status\T<n>.md` (frontmatter `status: RUNNING|DONE|BLOCKED`)
- Baca `status\T<n>.md` prasyaratmu sebelum mulai; jika belum `DONE`, berhenti dan lapor.
- Tulis hanya file milikmu (tabel di bawah). Format: skill `vault-notes`.

## Perintah per terminal

Setiap terminal wajib memakai `distDir` sendiri (Next mengunci folder build) dan port sendiri. **Jangan pernah** menjalankan `next dev`/`next build` tanpa `NEXT_DIST_DIR`.

```bash
# Terminal N (N = 1..10)
NEXT_DIST_DIR=".next-tN" npx next dev -p 310N
NEXT_DIST_DIR=".next-tN" npx next build
NEXT_DIST_DIR=".next-tN" npx next start -p 310N   # setelah build
npx tsc --noEmit                                   # typecheck
npx eslint .                                       # lint (flat config)
```

Contoh T7: `NEXT_DIST_DIR=".next-t7" npx next dev -p 3107` → http://localhost:3107
Tutup server setelah selesai. Jangan mematikan proses terminal lain.

Catatan lint: `next lint` sudah tidak ada di Next 16; `npm run lint` = `eslint .` (flat config `eslint.config.mjs`). Temuan lint yang tersisa saat ini hanya di kode lama (`components/sections/*`, `components/ui/input|textarea`, `tailwind.config.ts`) yang akan diganti T6/T7/T9 — jangan menambah temuan baru; perbaiki milikmu.

## Kepemilikan file (anti-tabrakan)

Hanya ubah file milikmu. File terminal lain hanya dibaca.

| Terminal | Memiliki |
|---|---|
| T1 | `package.json`, lockfile, `next.config.js`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, `AGENTS.md`, `.opencode/**`, `.claude/skills/**` (kecuali milik T3), penghapusan chatbot |
| T2 | vault `reference-analysis.md`, `design-direction.md`, `motion-map.md`, `reference/**`; `scripts/ref/**` |
| T3 | `scripts/photo/**`, `public/images/portrait/**`, `components/subpixel/**`, `app/dev/subpixel/**`, `.claude/skills/subpixel-effect/**`, vault `subpixel-notes.md` |
| T4 | `scripts/signature/**`, `public/signature/**`, `components/signature/**`, `components/loader/**`, `lib/loader/**`, `app/dev/signature/**`, vault `signature-pipeline.md` |
| T5 | `content/**`, vault `content-source.md` |
| T6 | `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`, `styles/**`, `components/shell/**`, `components/ui/**`, `lib/motion/**`, stub `components/sections/*.tsx`, `app/page.tsx`, `app/dev/style/**`, vault `contracts.md` |
| T7 | `components/sections/{Hero,About,Services,Tools,Experience,Contact,Footer}.tsx` + subfolder, `app/api/contact/**` |
| T8 | `components/sections/Work.tsx`, `components/work/**`, `app/work/**`, `public/projects/**` |
| T9 | Semua file saat integrasi (T3–T8 `DONE`), `app/sitemap.ts`, `robots.ts`, `opengraph-image`, README |
| T10 | `tests/**`, `playwright.config.*`, vault `qa-report.md`; tidak mengubah kode aplikasi |

Rute `/dev/*` wajib memanggil `notFound()` bila `process.env.NODE_ENV === "production"`.

## Aturan dependensi

- Hanya T1 (awal), T9 (pembersihan), T10 (tooling tes) yang menyentuh `package.json`/lockfile.
- Butuh paket baru? Tulis di bagian **Permintaan dependensi** pada `status\T<n>.md` dan beri tahu user. Jangan `npm install` paket baru.
- Alat offline hidup di `scripts/<nama>/` dengan manifest sendiri (`package.json` lokal / `requirements.txt`) + venv/node_modules yang di-gitignore.
- Sudah tersedia: `gsap`, `@gsap/react`, `lenis`, `ogl`, `simple-icons`, `tweakpane` (dev).
- Script harus lintas-platform (Windows + POSIX), tanpa path absolut.

## Kontrak & gerak

- Kontrak bersama diterbitkan T6 di vault `contracts.md` (token CSS, props `components/ui/**`, utilitas `lib/motion/**`, atribut `data-*`, urutan seksi). Baca sebelum menulis UI.
- Registri loader T4: `lib/loader/ready.ts` — didokumentasikan di `status\T4.md`.
- Wajib: satu bahasa gerak (bukan satu efek untuk semua), tiap seksi punya animasi scroll bermakna, hanya `transform`/`opacity`/`clip-path`, easing kustom tanpa bounce/elastic, hormati `prefers-reduced-motion`, bersihkan GSAP via `useGSAP`/`gsap.context` + `matchMedia`.
- Baca skill `portfolio-design-rules` sebelum menulis UI; patuhi `impeccable` + `frontend-design`.

## Konten

- Bahasa Indonesia adalah bahasa utama di `/`; Inggris tersedia di `/en`. Semua copy berpasangan di `content/` (Inggris) dan `content/id/` (Indonesia), dengan tombol ganti bahasa di top bar dan overlay INDEX.
- Jangan mengarang angka/jabatan/tanggal/proyek/sertifikasi. Tidak terverifikasi → `[[VERIFY: …]]` di `open-questions\T<n>.md`.
- Foto & tanda tangan asli tidak boleh masuk `public/` atau build; hapus EXIF/GPS dari gambar publik.

## Git

```bash
git add -- <path milikmu...>
git commit -m "<type>(<scope>): <pesan>" -- <path milikmu...>
```

Dilarang: `git add -A`, `git add .`, `stash`, `reset`, `checkout .`, `clean`, `rebase`, `merge`, `push`, branch/worktree baru, serta formatter/`lint --fix` pada file terminal lain. Jangan pernah mencetak atau meng-commit isi `.env*`.

## Keamanan

- Rahasia hanya di env (`.env*` di-gitignore, contoh aman di `.env.example`). Jangan cetak nilai env.
- Form kontak: validasi server, rate limit, honeypot, pesan galat tanpa membocorkan konfigurasi.

## Skill & subagent

- Skill: `.claude/skills/` — `frontend-design`, `impeccable`, `gsap-core`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-react`, `portfolio-design-rules`, `vault-notes`.
- Subagent: `.opencode/agents/` — `recon`, `art-director`, `frontend-engineer`, `motion-engineer`, `gfx-engineer`, `asset-pipeline`, `content-researcher`, `qa`. Semua terminal boleh memakainya untuk subtugas independen; verifikasi sebaiknya dilakukan agent yang bukan penulis kodenya.
