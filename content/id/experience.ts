import type { ExperienceEntry } from "../types";

/**
 * Urutan terbaru lebih dulu. Tanggal dan tanggung jawab berasal dari CV;
 * bahasa Indonesia di sini adalah penulisan ulang, bukan terjemahan kaku.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    index: "01",
    id: "lab-big-data",
    role: "Asisten Laboratorium, Big Data Analytics",
    organisation: "Program Studi Teknologi Informasi, UIN Ar-Raniry",
    organisationNote: "Banda Aceh, Indonesia",
    type: "part-time",
    typeLabel: "Paruh waktu",
    location: "Banda Aceh, Indonesia",
    arrangement: "on-site",
    period: {
      start: "2026-05",
      end: "2026-07",
      current: false,
      label: "Mei 2026 - Jul 2026",
    },
    summary:
      "Dukungan praktikum untuk bagian computer vision di laboratorium Big Data Analytics.",
    highlights: [
      "Mendampingi sesi praktikum pemrosesan citra dengan Python dan OpenCV, klasifikasi citra dengan CNN, serta transfer learning melalui fine-tuning.",
      "Membantu mahasiswa memahami materi dan masalah teknis yang menyertainya: environment, tensor, dan proses training.",
    ],
    tags: ["OpenCV", "CNN", "Transfer learning", "Python"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "CV menyebut paruh waktu di Banda Aceh; kerja di lokasi tersirat dari praktikum kampus.",
    },
  },
  {
    index: "02",
    id: "lab-algorithms",
    role: "Asisten Laboratorium, Algoritma dan Pemrograman",
    organisation: "Program Studi Teknologi Informasi, UIN Ar-Raniry",
    organisationNote: "Banda Aceh, Indonesia",
    type: "part-time",
    typeLabel: "Paruh waktu",
    location: "Banda Aceh, Indonesia",
    arrangement: "on-site",
    period: {
      start: "2026-05",
      end: "2026-07",
      current: false,
      label: "Mei 2026 - Jul 2026",
    },
    summary:
      "Praktikum dasar Java, termasuk studi kasus dan rubrik yang dipakai untuk menilainya.",
    highlights: [
      "Membimbing mahasiswa melalui dasar Java: variabel, tipe data, input, operator aritmetika, dan percabangan.",
      "Menulis studi kasus praktikum dengan tingkat kesulitan seimbang, masing-masing dengan rubrik penilaiannya.",
    ],
    tags: ["Java", "Dasar pemrograman", "Rubrik"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "Brief pemilik menyebut peran mengajar; CV menyebut asisten laboratorium. Kata dari CV yang dipakai. Kerja di lokasi tersirat dari praktikum kampus.",
    },
  },
  {
    index: "03",
    id: "asah",
    role: "Machine Learning Engineer, Best Capstone Project",
    organisation: "Asah led by Dicoding",
    organisationNote: "Bandung, Indonesia · jarak jauh",
    type: "scholarship",
    typeLabel: "Beasiswa",
    location: "Bandung, Indonesia",
    arrangement: "remote",
    period: {
      start: "2025-08",
      end: "2026-01",
      current: false,
      label: "Agu 2025 - Jan 2026",
    },
    summary:
      "Tim ML dua orang untuk Pacu Pintar, platform learning analytics berbasis AI. Capstone ini meraih Best Capstone Project.",
    highlights: [
      "Membangun komponen machine learning untuk Pacu Pintar, terintegrasi dengan aplikasi Next.js dan Hapi.js tim.",
      "Melatih classifier Random Forest untuk tiga kategori kecepatan belajar dengan akurasi ≈90%.",
      "Membangun API ML FastAPI yang menyajikan classifier dan saran belajar personal berbasis LLM.",
      "Menyelesaikan jalur soft skill kohort untuk kesiapan kerja.",
    ],
    tags: ["scikit-learn", "FastAPI", "LLM", "Kerja tim"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "Tanggal penghargaan dikonfirmasi Jan 2026 (jawaban pemilik), di dalam rentang kohort.",
    },
  },
  {
    index: "04",
    id: "coding-camp",
    role: "Machine Learning Engineer",
    organisation: "Coding Camp powered by DBS Foundation",
    organisationNote: "Bandung, Indonesia · jarak jauh",
    type: "scholarship",
    typeLabel: "Beasiswa",
    location: "Bandung, Indonesia",
    arrangement: "remote",
    period: {
      start: "2025-02",
      end: "2025-07",
      current: false,
      label: "Feb 2025 - Jul 2025",
    },
    summary:
      "Enam bulan machine learning berbasis sertifikasi, berakhir dengan capstone NusantaraGo-ML.",
    highlights: [
      "Menyelesaikan seluruh kelas dan proyek sertifikasi di jalur machine learning, termasuk modul soft skill dan literasi finansial.",
      "Membangun classifier citra dengan CNN dan transfer learning.",
      "Kontributor teratas NusantaraGo-ML: recommender pariwisata dengan content-based dan collaborative filtering, disajikan melalui Flask.",
    ],
    tags: ["CNN", "Transfer learning", "Sistem rekomendasi", "Flask"],
    sources: ["cv", "github-nusantara"],
    verification: { verified: true, sources: ["cv"] },
  },
  {
    index: "05",
    id: "bpka",
    role: "Magang Manajemen dan Analisis Data",
    organisation: "Badan Pengelolaan Keuangan Aceh (BPKA)",
    organisationNote: "Banda Aceh, Indonesia",
    type: "internship",
    typeLabel: "Magang",
    location: "Banda Aceh, Indonesia",
    arrangement: "on-site",
    period: {
      start: "2025-02",
      end: "2025-03",
      current: false,
      label: "Feb 2025 - Mar 2025",
    },
    summary:
      "Dua bulan mendigitalkan dan melaporkan data keuangan untuk badan keuangan provinsi.",
    highlights: [
      "Mendigitalkan dan mengolah data keuangan dengan spreadsheet dan alat analisis.",
      "Menulis dokumentasi internal dan laporan operasional harian, serta mendukung alur pelaporan keuangan.",
    ],
    tags: ["Spreadsheet", "Entri data", "Dokumentasi"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "Situs sebelumnya menyebut Januari 2025; CV menyebut Februari 2025 dan itu yang dipakai.",
    },
  },
];
