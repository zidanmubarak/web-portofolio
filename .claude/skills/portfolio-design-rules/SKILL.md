---
name: portfolio-design-rules
description: Aturan desain anti-AI-slop dan prinsip gerak untuk portofolio Zidan (v2). Gunakan setiap kali menulis atau menilai UI, tipografi, layout, copy, atau animasi di proyek ini — sebelum menulis kode dan sebagai checklist sebelum menandai pekerjaan selesai.
---

# Portfolio design rules — Zidan Mubarak v2

Sumber asli: `00-aturan-bersama.md` §8 dan §9 (vault). Skill ini adalah ringkasan operasional; jika bertentangan, dokumen vault menang. Token dan API konkret di bawah berasal dari implementasi T6 dan diterbitkan lengkap di `contracts.md` (vault).

## 0. Token final RUBRIC (2026-10-29)

| Peran | Token | Nilai | Tailwind |
|---|---|---|---|
| Latar utama | `--bg` | `#0B0B0A` | `bg-surface` |
| Baris/panel | `--bg-elevated` | `#141412` | `bg-surface-elevated` |
| Footer/menu | `--bg-sunken` | `#070706` | `bg-surface-sunken` |
| Teks utama | `--fg` | `#F2EDE4` | `text-ink` |
| Metadata | `--muted` | `#9A968C` | `text-ink-muted` |
| Hairline | `--line` | `#2B2A26` | `border-line` |
| Garis aktif | `--line-strong` | `#3D3B35` | `border-line-strong` |
| Aksen tunggal | `--accent` | `#FF4A2E` | `text-accent` |
| Hover aksen | `--accent-hover` | `#FF6A4D` | `text-accent-hover` |
| Teks di aksen | `--accent-ink` | `#111110` | `text-accent-ink` |
| Plat kertas | `--paper` | `#E7E1D5` | `bg-paper` |
| Teks di kertas | `--paper-ink` | `#111110` | `text-paper-ink` |
| Metadata kertas | `--paper-muted` | `#5F5B52` | `text-paper-muted` |

- Font: **Archivo** (`--font-display`) + **Martian Mono** (`--font-mono`). Tidak ada font lain.
- Skala: `text-mega/display/title/heading/lead/body/small/label`; utility `.u-display` (wdth 78, uppercase), `.u-label` (mono 11 px, 0.12em, uppercase), `.u-mono`, `.u-container`, `.u-grid`, `.u-section`, `.u-paper`.
- Hanya `rounded-none|xs|full`; **tidak ada** `shadow-*` atau gradient. Accent tidak boleh jadi teks di atas paper (2,57:1) — di paper aksen hanya border/bidang.
- Grid: 4 kolom <1024, 12 kolom ≥1024; margin `clamp(16px,3.33vw,48px)`; max 1680; section Y `clamp(96px,12vh,200px)` (72 px <768).
- Fokus: outline 2 px `--focus` offset 3 px; di `[data-surface="paper"]` otomatis `--paper-ink`. Seleksi, caret, scrollbar memakai palet.

## 0.1 Primitif dan gerak (jangan bikin ulang)

- UI: `@/components/ui/{section,text-link,button,odometer,accordion,reveal,field,marquee}`.
- Gerak: `@/lib/motion` → `revealLines`, `scrubWords`, `clipReveal`, `imageParallax`, `pinHorizontal`, `animateOdometer`, `EASE`, `DUR`, `STAGGER`, `useGSAP`, `useSmoothScroll`.
- Shell: `components/shell/**` sudah terpasang di layout. Jangan menambah top bar/menu/Lenis sendiri.
- Seksi: `Section` menangani anchor, rail `01 / LABEL`, hairline, `data-section`, dan surface paper. T7/T8 mengisi isi.
- Dilarang menambah warna hex literal, `rounded-lg`, `shadow-lg`, `bg-gradient-*`, atau animasi `height` pada disclosure. Lihat [[contracts]] untuk signature lengkap.

## 0.2 Checklist cepat khusus RUBRIC

1. Hanya aksen `#FF4A2E`; tidak ada lime/ungu/biru kedua.
2. Display uppercase, tracking −0.035…−0.055em, line-height 0.82–0.95; label mono 11 px.
3. Paper plate hanya untuk portrait dan Contact; teks di paper memakai `text-paper-ink`, bukan accent.
4. Setiap seksi memakai pola gerak berbeda dari [[motion-map]]; tidak ada fade-up global.
5. Angka di layar harus ada di `content/` (CER, sampel, GPA, repo); odometer memakai `aria-label` final.
6. Jam `Asia/Jakarta` hidup; koordinat Banda Aceh benar.
7. `/dev/*` → `notFound()` di production. Halaman penilaian: `/dev/style`.


## 1. Dilarang (langsung tolak)

- Gradien ungu-biru/"aurora", glassmorphism massal, blob/orb dekoratif.
- Grid kartu tiga kolom berisi ikon dalam lingkaran; `rounded-2xl` + `shadow-lg` seragam di semua kartu; tampilan shadcn default tanpa penyesuaian.
- Emoji sebagai ikon. Sapaan klise ("Hi, I'm … 👋"). Headline generik ("Passionate developer crafting…", "Turning ideas into reality").
- Lorem/placeholder, statistik/testimoni/klien palsu, foto stok, badge "Open to work" berkedip.
- Font utama Inter, Roboto, Arial, Space Grotesk, Poppins.
- Bounce/elastic easing. Satu animasi yang sama dipakai untuk semua elemen (semua "fade-up").

## 2. Wajib

- **Tipografi berkarakter**: satu font display + satu mono/utilitas, skala modular, tracking rapat untuk display, angka tabular.
- **Grid editorial eksplisit**, margin besar, ruang kosong berani, hierarki ekstrem (judul raksasa vs metadata kecil).
- **Detail khas**: penomoran gaya indeks (01, 02…), label mono, koordinat/jam, satu warna aksen maksimal, kontras minimal WCAG AA.
- **Copy**: pendek, bersuara pribadi, ditulis ulang (bukan menyalin referensi). Hanya fakta terverifikasi; yang belum pasti → `[[VERIFY: …]]` di `open-questions\T<n>.md`.
- Aset nyata: screenshot proyek asli, grafik hasil model asli. Foto/tanda tangan asli hanya boleh hidup di `assets/source/` dan tidak boleh masuk `public/` atau build.

## 3. Uji AI-slop

Tutup nama dan logo. Jika halaman bisa dikira template mana pun, ulangi. Bandingkan dengan referensi (alejandroha.com, curtisdesignr.me) pada level *karakter*: ritme, kontras, tipografi, detail — bukan menyalin aset/copy/kode.

## 4. Gerak

- **Satu bahasa gerak, bukan satu efek di mana-mana.** Pola ditentukan di `design-direction.md` (T2), diimplementasikan sebagai utilitas di `lib/motion/` (T6).
- Setiap seksi minimal satu animasi scroll yang bermakna dan relevan dengan isi. Pola yang tersedia: masked line reveal, scrubbed word opacity, clip reveal, pinned horizontal rail, numbered accordion (FLIP), odometer, icon swap, signature draw, menu wipe.
- Hanya animasikan `transform`, `opacity`, `clip-path`. Durasi 0,5–1,1 detik. Easing kustom (`expo.out`, dsb.), tanpa bounce/elastic. Jangan animasikan `height/width/top/left`; accordion memakai FLIP pada `y` saudara.
- GSAP + ScrollTrigger + Lenis disinkronkan lewat ticker GSAP. Gunakan `gsap.matchMedia()` dan `useGSAP`/`gsap.context` untuk cleanup aman (App Router, Strict Mode). `pinHorizontal()` mengembalikan `matchMedia`; cleanup wajib `mm.revert()`.
- Hormati `prefers-reduced-motion`. Back/forward, refresh, anchor, dan navigasi keyboard tetap berfungsi. Jangan membajak scroll di mobile tanpa alasan kuat.
- Animasi teks via SplitText: pakai `aria: "none"` untuk target tanpa role (mis. `<p>`), karena `aria-label` tidak sah di sana.

## 5. Checklist sebelum selesai

1. Tidak ada item pada daftar larangan.
2. Setiap seksi punya pola gerak yang berbeda dan beralasan.
3. Kontras teks ≥ AA (diukur, bukan dikira); fokus keyboard terlihat.
4. Tidak ada angka/jabatan/proyek yang tidak ada di `content/` atau sumber resmi.
5. Uji 390 / 768 / 1440 px, reduced-motion, dan navigasi keyboard.
6. Rute `/dev/*` memanggil `notFound()` di production.
