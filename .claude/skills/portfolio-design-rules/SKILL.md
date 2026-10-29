---
name: portfolio-design-rules
description: Aturan desain anti-AI-slop dan prinsip gerak untuk portofolio Zidan (v2). Gunakan setiap kali menulis atau menilai UI, tipografi, layout, copy, atau animasi di proyek ini — sebelum menulis kode dan sebagai checklist sebelum menandai pekerjaan selesai.
---

# Portfolio design rules — Zidan Mubarak v2

Sumber asli: `00-aturan-bersama.md` §8 dan §9 (vault). Skill ini adalah ringkasan operasional; jika bertentangan, dokumen vault menang. Token visual konkret (warna, font, skala) ditambahkan oleh T6 setelah `design-direction.md` disetujui — baca vault untuk nilai final.

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
- Setiap seksi minimal satu animasi scroll yang bermakna dan relevan dengan isi.
- Hanya animasikan `transform`, `opacity`, `clip-path`. Durasi 0,5–1,1 detik. Easing kustom (`expo.out`, dsb.), tanpa bounce/elastic.
- GSAP + ScrollTrigger + Lenis disinkronkan lewat ticker GSAP. Gunakan `gsap.matchMedia()` dan `useGSAP`/`gsap.context` untuk cleanup aman (App Router, Strict Mode).
- Hormati `prefers-reduced-motion`. Back/forward, refresh, anchor, dan navigasi keyboard tetap berfungsi. Jangan membajak scroll di mobile tanpa alasan kuat.

## 5. Checklist sebelum selesai

1. Tidak ada item pada daftar larangan.
2. Setiap seksi punya pola gerak yang berbeda dan beralasan.
3. Kontras teks ≥ AA (diukur, bukan dikira); fokus keyboard terlihat.
4. Tidak ada angka/jabatan/proyek yang tidak ada di `content/` atau sumber resmi.
5. Uji 390 / 768 / 1440 px, reduced-motion, dan navigasi keyboard.
6. Rute `/dev/*` memanggil `notFound()` di production.
