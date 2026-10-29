---
name: vault-notes
description: Format dan aturan penulisan vault OpenCode Brain untuk proyek web-portofolio v2. Gunakan sebelum menulis atau memperbarui file apa pun di VAULT_DIR (status, decisions, open-questions, reference, prompts, catatan topik).
---

# Vault notes — cara menulis di vault

`VAULT_DIR = D:\github\hermes-workspace\opencode-brain\web-portofolio-v2\`
Akar vault Obsidian: `D:\github\hermes-workspace\opencode-brain`. Folder ini **di luar repo** proyek.

## 1. Kepemilikan file (jangan menulis file terminal lain)

| File | Pemilik |
|---|---|
| `00-index.md` | T1 (dibuat), T9 (diperbarui) |
| `contracts.md` | T6 |
| `status\T<n>.md`, `decisions\T<n>.md`, `open-questions\T<n>.md` | terminal `n` saja |
| `reference-analysis.md`, `design-direction.md`, `motion-map.md`, `reference\` | T2 |
| `content-source.md` | T5 |
| `subpixel-notes.md` | T3 |
| `signature-pipeline.md` | T4 |
| `qa-report.md` | T10 |
| `prompts\` | T1 menyalin; jangan ubah isi prompt |

Jangan mengubah atau menghapus catatan milik terminal lain.

## 2. Format

- Markdown ramah Obsidian, **satu topik per file**.
- Frontmatter YAML wajib di setiap catatan:
  ```yaml
  ---
  title: "Judul singkat"
  date: 2026-10-29
  tags: [topik, terminal]
  ---
  ```
- Tautan antar catatan memakai `[[wikilink]]` (mis. `[[design-direction]]`, `[[contracts]]`).
- **Tanpa path absolut di dalam isi catatan.** Tulis path relatif repo (`app/page.tsx`) atau nama file vault.
- Tabel untuk data terstruktur (token, kontrak, hasil uji). Angka, bukan adjektiva.

## 3. Isi wajib untuk catatan kerja

- Keputusan + alasan + alternatif yang ditolak (`decisions\T<n>.md`).
- Apa yang dicoba dan gagal, beserta galatnya.
- Perintah final + parameter (mis. `NEXT_DIST_DIR=".next-t7" npx next dev -p 3107`).
- Path bukti (screenshot/rekaman) di `reference\` atau folder bukti lain.
- Hal yang belum bisa diverifikasi: tulis `[[VERIFY: hal yang perlu dicek]]`. Jangan mengarang untuk menutupinya.

## 4. Status terminal

`status\T<n>.md` memakai frontmatter:

```yaml
---
title: "T<n> — Nama"
date: 2026-10-29
tags: [status, T<n>]
status: RUNNING   # RUNNING | DONE | BLOCKED
updated: 2026-10-29
---
```

Isi minimal: ringkasan hasil, daftar output (path), kontrak yang diterbitkan, permintaan dependensi, pertanyaan terbuka. Set `DONE` hanya bila definition-of-done terminal terpenuhi (build/tsc hijau untuk bagian yang diubah).

## 5. Rahasia

Jangan pernah menyalin isi `.env*`, API key, token, atau kredensial ke vault, chat, commit, atau log. Jika menemukan key yang ter-commit, catat **lokasi** dan **jenis** key saja di `open-questions\T<n>.md`.
