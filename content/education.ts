import type { EducationEntry } from "./types";

/**
 * Reverse chronological. The owner asked for the secondary school to be
 * left off the site (T5 open question Q7), so only the degree is kept.
 */
export const education: readonly EducationEntry[] = [
  {
    index: "01",
    id: "uin-ar-raniry",
    institution: "Universitas Islam Negeri Ar-Raniry Banda Aceh",
    institutionShort: "UIN Ar-Raniry",
    degree: "S1 — Bachelor's degree",
    field: "Information Technology",
    location: "Banda Aceh, Indonesia",
    period: {
      start: "2022",
      end: "2026",
      current: false,
      label: "2022 — 2026",
    },
    grade: { label: "GPA", value: "3.77 / 4.00" },
    thesis:
      "Implementasi Multimodal Large Language Model Untuk Ekstraksi dan Transliterasi Printed Jawi Script",
    notes: [
      "Graduated 2026.",
      "Thesis produced the public Jawi adapter and Gradio demo on Hugging Face.",
    ],
    sources: ["cv", "owner-answers"],
    verification: { verified: true, sources: ["cv", "owner-answers"] },
  },
];
