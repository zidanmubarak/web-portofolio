import { sources as base } from "../sources";
import type { SourceRef } from "../types";

/**
 * Source registry, Indonesian labels.
 *
 * URLs, IDs and dates are identical to the canonical registry; only the
 * human-readable label is translated. The note fields stay in English because
 * they are working notes, not rendered in the interface.
 */
export const sources = {
  ...base,
  cv: {
    ...base.cv,
    label: "CV - Zidan Mubarak (ekspor Google Docs, diperbarui 29 Okt 2026)",
  },
  linkedin: {
    ...base.linkedin,
    label: "LinkedIn - linkedin.com/in/zidan-mubarak",
  },
  // ownerBrief: {
  //   ...base.ownerBrief,
  //   label: "Brief pemilik - 00-aturan-bersama.md, bagian 1",
  // },
  // ownerAnswers: {
  //   ...base.ownerAnswers,
  //   label: "Jawaban pemilik atas open-questions T5",
  // },
  githubProfile: {
    ...base.githubProfile,
    label: "Profil GitHub - github.com/zidanmubarak",
  },
  githubRepos: {
    ...base.githubRepos,
    label: "GitHub REST API - /users/zidanmubarak/repos",
  },
  githubMemoryVault: {
    ...base.githubMemoryVault,
    label: "Memory Vault AI - README repositori",
  },
  githubNusantara: {
    ...base.githubNusantara,
    label: "NusantaraGo-ML - repositori organisasi dan kontributor",
  },
  githubGuestBook: {
    ...base.githubGuestBook,
    label: "Guest Book System - README repositori",
  },
  githubClimate: {
    ...base.githubClimate,
    label: "climate-agriculture-ml-analysis - README repositori",
  },
  githubPortfolio: {
    ...base.githubPortfolio,
    label: "web-portofolio - repositori (situs ini)",
  },
  githubEksperimen: {
    ...base.githubEksperimen,
    label: "Eksperimen_SML_Zidan-Mubarak - repositori preprocessing dan CI",
  },
  githubCapstone: {
    ...base.githubCapstone,
    label: "Capstone Project Team DC-08 - organisasi Pacu Pintar",
  },
  pypiMemoryVault: {
    ...base.pypiMemoryVault,
    label: "PyPI - memory-vault",
  },
  hfModelCard: {
    ...base.hfModelCard,
    label: "Model card Hugging Face - zidanmubarak/jawi-qwen25-vl-qlora",
  },
  hfModelFiles: {
    ...base.hfModelFiles,
    label: "Berkas model Hugging Face - adapter dan grafik showcase",
  },
  hfSpace: {
    ...base.hfSpace,
    label: "Hugging Face Space - jawi-transliterasi-demo (Gradio)",
  },
  journalHebb: {
    ...base.journalHebb,
    label:
      "Academic Journal of Computer Science Research - Vol 7 No 2 (2025)",
  },
  dicodingMlops: {
    ...base.dicodingMlops,
    label:
      "Kredensial Dicoding 2VX35EDOJPYQ - Membangun Sistem Machine Learning",
  },
  dicodingMlt: {
    ...base.dicodingMlt,
    label: "Kredensial Dicoding 1RXYEGQ3KZVM - Machine Learning Terapan",
  },
  dicodingBfpd: {
    ...base.dicodingBfpd,
    label:
      "Kredensial Dicoding JLX1964EGP72 - Belajar Fundamental Pemrosesan Data",
  },
  oldSite: {
    ...base.oldSite,
    label: "Portofolio sebelumnya - situs live dan sumber di repositori ini",
  },
} as const satisfies Record<string, SourceRef>;

export type SourceKey = keyof typeof sources;

export const sourceList: readonly SourceRef[] = Object.values(sources);
