import type { EducationEntry } from "../types";

/**
 * Urutan terbaru lebih dulu. Pendidikan menengah tidak ditampilkan atas
 * permintaan pemilik (pertanyaan terbuka T5 Q7), jadi hanya gelar yang disimpan.
 */
export const education: readonly EducationEntry[] = [
  {
    index: "01",
    id: "uin-ar-raniry",
    institution: "Universitas Islam Negeri Ar-Raniry Banda Aceh",
    institutionShort: "UIN Ar-Raniry",
    degree: "S1, gelar sarjana",
    field: "Teknologi Informasi",
    location: "Banda Aceh, Indonesia",
    period: {
      start: "2022",
      end: "2026",
      current: false,
      label: "2022 - 2026",
    },
    grade: { label: "IPK", value: "3.77 / 4.00" },
    thesis:
      "Implementasi Multimodal Large Language Model Untuk Ekstraksi dan Transliterasi Printed Jawi Script",
    notes: [
      "Lulus 2026.",
      "Skripsi menghasilkan adapter Jawi publik dan demo Gradio di Hugging Face.",
    ],
    sources: ["cv", "owner-answers"],
    verification: { verified: true, sources: ["cv", "owner-answers"] },
  },
];
