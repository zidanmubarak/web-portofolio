import type { Service } from "../types";

/**
 * Empat area kerja, diberi nomor seperti label indeks desain (01-04).
 * Masing-masing menunjuk pada pekerjaan yang ada, bukan menu layanan hipotetis.
 */
export const services: readonly Service[] = [
  {
    index: "01",
    id: "ai-ml-engineering",
    title: "Rekayasa AI / ML",
    tagline: "Model yang tetap berguna saat bertemu data nyata.",
    description:
      "Fine-tuning vision-language model, melatih classifier dan recommender, lalu mengevaluasinya dengan jujur. Pekerjaan dimulai dari kurasi dataset dan berakhir pada checkpoint yang bisa dipanggil lewat API atau demo.",
    capabilities: [
      "Fine-tuning vision-language dengan QLoRA",
      "Computer vision dan transfer learning",
      "Sistem rekomendasi",
      "Evaluasi: CER, WER, akurasi",
    ],
    proof: ["jawi-ocr", "pacu-pintar", "nusantarago"],
    sources: ["cv", "hf-model-card", "github-nusantara"],
  },
  {
    index: "02",
    id: "web-development",
    title: "Pengembangan web",
    tagline: "Antarmuka untuk pekerjaan yang tadinya hanya hidup di notebook.",
    description:
      "Next.js dan TypeScript untuk front end, Flask dan FastAPI saat model butuh pintu masuk, serta CodeIgniter ketika deployment PHP yang ada harus tetap berjalan. Data bertipe, markup aksesibel, deployment yang muat di free tier.",
    capabilities: [
      "Next.js, React, dan TypeScript",
      "Layanan Flask dan FastAPI",
      "MySQL dan REST API",
      "Front end aksesibel dan responsif",
    ],
    proof: ["memory-vault", "nusantarago", "guest-book"],
    sources: [
      "github-portfolio",
      "github-memory-vault",
      "github-guest-book",
      "github-nusantara",
    ],
  },
  {
    index: "03",
    id: "design",
    title: "Desain",
    tagline: "Tata letak sebagai cara membuat pekerjaan terbaca.",
    description:
      "Tata letak editorial, dashboard, dan sistem antarmuka, termasuk alur kartu identitas dan check-in di guest book system serta grafik yang membawa argumen pada analisis iklim. Tipografi, spasi, dan hierarki diperlakukan sebagai bagian dari rekayasa, bukan dekorasi di atasnya.",
    capabilities: [
      "Desain antarmuka dan tata letak",
      "Design system dan token",
      "Visualisasi data",
      "Hierarki informasi",
    ],
    proof: ["guest-book", "climate-agriculture"],
    sources: ["owner-brief", "github-guest-book", "github-climate"],
  },
  {
    index: "04",
    id: "teaching",
    title: "Mengajar",
    tagline: "Menjelaskan sesuatu adalah ujian apakah kita benar-benar paham.",
    description:
      "Asisten laboratorium untuk Algoritma dan Pemrograman serta Big Data Analytics di UIN Ar-Raniry. Dasar Java di satu ruang, OpenCV dan transfer learning CNN di ruang lain, ditambah studi kasus dan rubrik yang membuat kedua praktikum bisa dinilai.",
    capabilities: [
      "Dasar pemrograman Java",
      "Praktikum computer vision",
      "Desain studi kasus dan rubrik",
      "Debugging satu per satu",
    ],
    proof: ["lab-algorithms", "lab-big-data"],
    sources: ["cv"],
  },
];
