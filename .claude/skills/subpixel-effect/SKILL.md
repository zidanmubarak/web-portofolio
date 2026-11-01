---
name: subpixel-effect
description: Cara memakai dan menyetel komponen SubpixelPortrait (foto sebagai matriks RGB subpixel, WebGL2) di portofolio Zidan v2. Gunakan saat menaruh portrait di hero, mengubah parameter visual, mengatur intro/loupe/scroll, menulis fallback statis, atau mendiagnosis performa/visual komponen ini.
---

# Subpixel effect — `components/subpixel/`

**v2 — foto dulu, layar kedua.** Wajah harus langsung terbaca sebagai wajah.
Foto cutout penuh resolusi adalah gambarnya; matriks RGB halus diletakkan di
atasnya sebagai material (terlihat saat dilihat dekat, bukan mosaik yang
menutupi wajah). Warna RGB yang keras hanya hidup di tepi siluet, seperti
registrasi meleset pada cetak tiga-pass ([[design-direction]] §1.1).

Parameter final ada di `components/subpixel/presets.ts` (`FINAL_PRESET`,
`PRESET_LABEL = "rubric-subpixel-v2"`). Bukti dan alasan angka ada di vault
`subpixel-notes.md`. Jalur cepat mencoba: `/dev/subpixel` (non-production,
panel tweakpane + slider scroll + replay intro + override URL).

## 1. Pakai di halaman

```tsx
import { SubpixelPortrait } from "@/components/subpixel";

<SubpixelPortrait
  src="/images/portrait/portrait-halfbody.webp"
  poster="/images/portrait/portrait-poster.webp"
  className=""
  intro="auto"
  lens
  plate={false}             // plat kertas CSS dari hero (lihat §3)
  onReady={() => void}
/>
```

| Prop | Default | Catatan |
|---|---|---|
| `src` | — | RGBA cutout 2:3 dari `scripts/photo/`. Wajib transparan di luar subjek. |
| `poster` | `src` | Poster 360×540. Dipakai sebagai LCP + fallback statis. |
| `className` | — | Elemen root sudah `width:100%` + `aspect-ratio`; atur ukuran dari parent. |
| `intro` | `"auto"` | `auto` = main sekali saat mount; `manual` = tunggu `handle.playIntro()`. |
| `lens` | `true` | Loupe mengikuti pointer; di perangkat sentuh mengikuti jari lalu drift sendiri saat idle. |
| `plate` | `false` | `true` = kanvas mengecat `#E7E1D5` di belakang subjek. Jika plat sudah CSS luar (T7), biarkan `false`. |
| `onReady` | — | Dipanggil setelah tekstur terunggah + frame pertama. |
| `label` | teks portrait | Nama aksesibel; kanvas memakai `role="img"`. |
| `params` | `FINAL_PRESET` | Override parsial — hanya untuk bench dev. |
| `ratio` | `[2,3]` | Rasio bingkai sebelum gambar decode (anti-CLS). |

Ref (mis. dari hero T7):

```tsx
const portrait = useRef<SubpixelPortraitHandle>(null);
portrait.current?.playIntro();      // Promise<void>, selesai saat intro usai
portrait.current?.setScroll(0..1);  // 0 = tenang, 1 = sel melonggar + drift
```

`setScroll` menerima nilai target dan di-lerp di dalam komponen — aman dipanggil
tiap frame dari ScrollTrigger.

## 2. Parameter (`SubpixelParams`)

| Kunci | Final | Rentang | Efek |
|---|---|---|---|
| `cellSize` | 2.6 | 1.5–8 | ukuran sel CSS px saat tenang. ≤3 = wajah tajam + tekstur halus; ≥5 = layar jelas tapi wajah kasar |
| `introCellSize` | 16 | 10–40 | ukuran sel awal (mosaik makro) |
| `gap` | 0.16 | 0–0.4 | lebar black matrix sebagai fraksi sel |
| `matrix` | 0.30 | 0–1 | kekuatan tekstur strip RGB di atas foto (0 = foto bersih) |
| `fringe` | 0.9 | 0–3 | offset misregistrasi R/B di tepi siluet, CSS px (sekaligus kekuatannya) |
| `glow` | 0.18 | 0–1 | bloom highlight saja |
| `lift` | 0.7 | 0–2 | angkat bayangan dalam agar jas hitam tidak hilang |
| `rim` | 0.24 | 0–1.5 | paper bounce di tepi siluet |
| `sat` | 1.04 | 0.4–2 | saturasi |
| `lensRadius` | 96 | 40–200 | radius loupe, CSS px |
| `lensMag` | 1.24 | 1–2.5 | pembesaran loupe (kecil dengan sengaja: loupe, bukan crop) |
| `scan` | 0.4 | 0–1 | scanline (dibatasi ±1,5 % di shader) |
| `layout` | `"stripe"` | `stripe`/`delta` | `delta` = baris bergeser setengah sel (PenTile) |
| `paper` | `#E7E1D5` | hex | warna plat + rim |

Urutan pipa di shader (jangan diacak): sampel foto penuh resolusi → mosaik
rata-rata sel (hanya saat intro) → tekstur strip RGB + black matrix → bloom
highlight → paper rim → hairline misregistrasi → shadow lift → saturasi →
scanline → sRGB + dither.

## 3. Perilaku bawaan

- **Foto dulu.** `base` = sampel foto 1 px layar (`textureGrad` dengan derivatif
  1 piksel); mosaik sel hanya dipakai saat `uPhoto < 1` (intro) atau di dalam
  loupe. Wajah tidak pernah direduksi jadi blok 4–5 px.
- **Matriks halus.** Tiga strip subpixel per sel hanya *menggeser warna*
  (`chan * matrixAmt * 0.55`), tidak memakan luminansi. Model 1/3-area lama
  memaksa `emit` 2,1 yang membakar highlight dan membuat kulit pucat.
- **Kroma hanya di tepi.** `passR`/`passB` digeser `fringe` px; selisih alpha
  terhadap sampel tengah menghasilkan hairline hangat di satu sisi dan dingin di
  sisi lain. Di dalam wajah efek ini nol.
- **Loupe = resolusi, bukan zoom piksel.** `lensMag` 1,24; di dalam lensa
  `matrixAmt` turun 85 % dan detail naik, jadi hover membuat wajah *lebih*
  jelas. Radius tepi `smoothstep(0.55, 1)` supaya tidak terlihat sebagai lingkaran.
- **Intro 1,7 s.** Sel 16 px (mosaik rata-rata sel) → 2,6 px sambil sapuan
  diagonal; foto menyusup masuk di paruh kedua (`smoothstep(0.42, 1, ease)`).
- **Scroll.** `cellSize × (1 + 0,5·p)`, drift `uv.y` 3,2 %, dan foto mundur ke
  mosaik (`photo × (1 − 0,55·p)`) — "mengurai" saat plat keluar layar.
- **Jeda render**: IntersectionObserver + `visibilitychange` (tidak ada rAF saat
  di luar layar/tab tersembunyi).
- **Kualitas otomatis**: rata-rata frame > 24 ms → skala 0.85; > 34 ms → 0.7;
  plus plafon area 1,8 M piksel. DPR ≤ 2 dan ukuran sel dibulatkan ke piksel
  perangkat utuh (anti-moiré), minimum 3 px perangkat.
- **Context loss**: `webglcontextlost` (preventDefault) → `webglcontextrestored`
  membangun ulang program + tekstur.
- **Loader (T4)**: `registerReadyTask("hero-portrait", { weight: 2 })` lalu
  `markReady` setelah frame pertama benar-benar digambar; task dilepas saat
  unmount atau fallback.
- **Fallback**: `prefers-reduced-motion`, WebGL2 tidak ada, atau inisialisasi
  gagal → poster cutout + overlay `repeating-linear-gradient` tiga warna tipis.
- **A11y**: kanvas `role="img"` + `aria-label`; saat fallback label dipindah ke
  teks `sr-only`, kanvas `aria-hidden`.

## 4. Menyetel (resep)

1. Jalankan `NEXT_DIST_DIR=".next-t3" npx next dev -p 3113`, buka `/dev/subpixel`.
2. Wajah kurang jelas → turunkan `matrix` (0,2) dan/atau `cellSize` (2,2);
   jangan menaikkan `cellSize` untuk "membuat efek lebih terlihat".
3. Tekstur terlalu ramai di DPR 2 → turunkan `matrix` 0,05–0,1, lalu `gap` 0,02.
4. Layar terlalu bersih (efek hilang) → naikkan `matrix` 0,05 dan lihat di DPR 2.
5. Tepi tidak berwarna → naikkan `fringe` 0,2; terlalu seperti anaglyph → turunkan.
6. Kulit pucat/terbakar → jangan sentuh `emit` (sudah tidak ada); turunkan
   `sat`/`lift`, `uPhoto` mengikuti intro.
7. Latar gelap tanpa plat → `plate={false}`, naikkan `rim` 0,1–0,2.
8. Setelah puas: salin JSON dari tombol *copy preset* ke `FINAL_PRESET`, lalu
   perbarui tabel di vault `subpixel-notes.md`.

## 5. Aturan yang tidak boleh dilanggar

- Jangan mengembalikan foto menjadi mosaik penuh saat tenang. Wajah harus
  terbaca tanpa hover (keputusan owner, rev. 2026-10-30).
- Jangan menaikkan `lensMag` di atas ~1,4: di atas itu loupe kembali menjadi
  "piksel raksasa" yang justru dikeluhkan.
- Jangan menambah dependensi 3D; shader ini WebGL2 mentah (`components/subpixel/shaders.ts`).
- Jangan memakai efek ini di teks atau komponen UI lain — fringe RGB adalah
  material foto, bukan aksen.
- Jangan menghapus fallback statis atau menaikkan batas DPR di atas 2.
- Foto asli (`assets/source/…`) tidak boleh masuk `public/`.
- Setiap perubahan parameter final harus memperbarui `FINAL_PRESET` **dan**
  `subpixel-notes.md` supaya T9/T10 bisa memverifikasi.
