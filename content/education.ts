import type { EducationEntry } from "./types";

/** Reverse chronological. */
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
      "Fine-tuning a vision-language model for Jawi recognition and transliteration to Rumi.",
    notes: [
      "Graduated 2026.",
      "Thesis produced the public Jawi adapter and Gradio demo on Hugging Face.",
    ],
    sources: ["cv"],
    verification: { verified: true, sources: ["cv"] },
  },
  {
    index: "02",
    id: "mas-oemar-diyan",
    institution: "MAS Tgk. Chiek Oemar Diyan",
    institutionShort: "MAS Oemar Diyan",
    degree: "Senior secondary",
    field: "Natural Sciences",
    location: "Aceh Besar, Indonesia",
    period: {
      start: "2019",
      end: "2022",
      current: false,
      label: "2019 — 2022",
    },
    notes: [],
    sources: ["old-site"],
    verification: {
      verified: false,
      sources: ["old-site"],
      note: "Only appears on the previous site; the CV starts at university. Confirm before publishing.",
    },
  },
];
