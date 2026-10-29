---
name: subpixel-effect
description: Cara memakai dan menyetel komponen SubpixelPortrait (foto sebagai matriks RGB subpixel, WebGL2) di portofolio Zidan v2. Gunakan saat menaruh portrait di hero, mengubah parameter visual, mengatur intro/loupe/scroll, menulis fallback statis, atau mendiagnosis performa/visual komponen ini.
---

# Subpixel effect — `components/subpixel/`

Foto tidak pernah ditempel apa adanya. Setiap fragmen digambar sebagai satu sel
matriks LED: tiga strip subpixel vertikal (R, G, B) berujung membulat, black
matrix di antaranya, dan hanya subjek yang menyala (alpha cutout).

Parameter final ada di `components/subpixel/presets.ts` (`FINAL_PRESET`,
`PRESET_LABEL = "rubric-subpixel-v1"`). Bukti dan alasan pemilihan angka ada di
vault `subpixel-notes.md`. Jalur cepat untuk mencoba: `/dev/subpixel`
(non-production, panel tweakpane + slider scroll + replay intro).

## 1. Pakai di halaman

```tsx
import { SubpixelPortrait } from "@/components/subpixel";

<SubpixelPortrait
  src="/images/portrait/portrait-halfbody.png"
  poster="/images/portrait/portrait-poster.webp"
  className="h-full w-full"
  intro="auto"
  lens
  plate                     // plat kertas di dalam canvas (lihat §3)
  onReady={() => setIntroOk(true)}
/>
```

| Prop | Default | Catatan |
|---|---|---|
| `src` | — | RGBA cutout 2:3 dari `scripts/photo/`. Wajib transparan di luar subjek. |
| `poster` | `src` | Poster 360×540. Dipakai sebagai LCP + fallback statis. |
| `className` | — | Elemen root sudah `width:100%` + `aspect-ratio`; atur ukuran dari parent. |
| `intro` | `"auto"` | `auto` = main sekali saat mount; `manual` = tunggu `handle.playIntro()`. |
| `lens` | `true` | Loupe mengikuti pointer; di perangkat sentuh mengikuti jari lalu drift sendiri saat idle. |
| `plate` | `false` | `true` = kanvas mengecat `#E7E1D5` di belakang subjek. Jika plat sudah disediakan CSS luar (T7), biarkan `false`. |
| `onReady` | — | Dipanggil setelah tekstur terunggah + frame pertama. |
| `label` | teks portrait | Nama aksesibel; kanvas memakai `role="img"`. |
| `params` | `FINAL_PRESET` | Override parsial — hanya untuk bench dev. |
| `ratio` | `[2,3]` | Rasio bingkai sebelum gambar decode (anti-CLS). |

Ref (mis. dari hero T7):

```tsx
const portrait = useRef<SubpixelPortraitHandle>(null);
portrait.current?.playIntro();      // Promise<void>, selesai saat intro usai
portrait.current?.setScroll(0..1);  // 0 = tenang, 1 = sel membesar + parallax
```

`setScroll` menerima nilai target dan di-lerp di dalam komponen — aman dipanggil
tiap frame dari ScrollTrigger.

## 2. Parameter (`SubpixelParams`)

| Kunci | Final | Rentang | Efek |
|---|---|---|---|
| `cellSize` | 4.5 | 2–10 | ukuran sel CSS px saat tenang. 4–5 = detail wajah; 6+ = matriks jelas tapi wajah kasar |
| `introCellSize` | 28 | 12–48 | ukuran sel awal (mode makro) |
| `gap` | 0.24 | 0–0.4 | lebar black matrix sebagai fraksi sel |
| `fringe` | 0.6 | 0–1.5 | offset horizontal sampel R/B (±1/3 sel) |
| `glow` | 0.32 | 0–1.5 | bloom di sekitar strip |
| `emit` | 2.1 | 0.5–5 | gain emisi (strip hanya menutup ±1/3 sel) |
| `lift` | 1 | 0–2 | shadow lift: menahan jas hitam agar tidak hilang |
| `rim` | 0.3 | 0–1.5 | rim light dari tepi alpha |
| `sat` | 1.12 | 0.4–2 | saturasi setelah kurva filmik |
| `scan` | 1 | 0–1 | kilau scanline (dibatasi ±2% di shader) |
| `layout` | `"stripe"` | `stripe`/`delta` | `delta` = baris bergeser setengah sel (PenTile) |
| `paper` | `#E7E1D5` | hex | warna plat + rim |

Urutan pipa warna di shader (jangan diacak): sRGB → linear → shadow lift →
strip mask → black matrix leakage → bloom → rim → `emit` → ACES → kontras →
saturasi → scanline → sRGB + dither.

## 3. Perilaku bawaan

- **Hanya subjek menyala.** `cover = smoothstep(0.42, 0.56, alpha)`; di luar itu
  transparan (atau plat kertas bila `plate`). Ambang ketat ini yang membuat
  siluet tidak menjadi cincin abu-abu satu sel.
- **Jas hitam** ditangani tiga lapis: `lift` (luminansi minimum di dalam mask),
  `rim` (cahaya tepi dari gradien alpha), dan plat kertas `#E7E1D5`. Di latar
  gelap tanpa plat, siluet masih terbaca lewat `lift` + `rim`.
- **Intro** 1,7 s: sel 28 px → 4,5 px (`easeInOutCubic`) sambil sapuan diagonal
  menyalakan sel dari kiri-atas.
- **Loupe**: magnifikasi radial `lensMag` (1.9) dengan radius `lensRadius`
  (140 CSS px), di-lerp; tepi lensa halus (`smoothstep` 0.18→1).
- **Scroll**: `cellSize × (1 + 0.85·p)` + geser `uv.y` 4,5 %.
- **Jeda render**: IntersectionObserver + `visibilitychange` (tidak ada rAF saat
  di luar layar/tab tersembunyi).
- **Kualitas otomatis**: rata-rata frame > 24 ms → skala 0.85; > 34 ms → 0.7;
  plus plafon area 1,8 M piksel. DPR ≤ 2 dan ukuran sel dibulatkan ke piksel
  perangkat utuh (anti-moiré).
- **Context loss**: `webglcontextlost` (preventDefault) → `webglcontextrestored`
  membangun ulang program + tekstur.
- **Loader (T4)**: mendaftar `registerReadyTask("hero-portrait", { weight: 2 })`
  dan `markReady` setelah frame pertama benar-benar digambar; task dilepas saat
  unmount atau difallback.
- **Fallback**: `prefers-reduced-motion`, WebGL2 tidak ada, atau inisialisasi
  gagal → poster cutout + overlay `repeating-linear-gradient` tiga warna.
- **A11y**: kanvas `role="img"` + `aria-label`; saat fallback label dipindah ke
  teks `sr-only`, kanvas `aria-hidden`.

## 4. Menyetel (resep)

1. Jalankan `NEXT_DIST_DIR=.next-t3 npx next dev -p 3103`, buka `/dev/subpixel`.
2. Wajah terlalu datar/mushy → turunkan `cellSize` (4–4.5), naikkan `emit` sedikit.
3. Wajah terbakar → turunkan `emit` 0,2; jangan menaikkan `sat` dulu.
4. Garis matriks tidak terlihat → naikkan `gap` 0,02–0,04.
5. Warna terlalu pelangi di layar 1× DPR → turunkan `fringe`; efek paling jujur
   di DPR 2.
6. Siluet bergetar/cincin terang → periksa `rim`, lalu ambang `cover` di shader.
7. Latar gelap → `plate={false}`, lalu naikkan `rim` 0,1–0,2.
8. Setelah puas: salin JSON dari tombol *copy preset* ke `FINAL_PRESET`, lalu
   perbarui tabel di vault `subpixel-notes.md`.

## 5. Aturan yang tidak boleh dilanggar

- Jangan menambah dependensi 3D; shader ini WebGL2 mentah (`components/subpixel/shaders.ts`).
- Jangan memakai efek ini di teks atau komponen UI lain — fringe RGB adalah
  material foto, bukan aksen.
- Jangan menghapus fallback statis atau menaikkan batas DPR di atas 2.
- Foto asli (`assets/source/…`) tidak boleh masuk `public/`.
- Setiap perubahan parameter final harus memperbarui `FINAL_PRESET` **dan**
  `subpixel-notes.md` supaya T9/T10 bisa memverifikasi.
