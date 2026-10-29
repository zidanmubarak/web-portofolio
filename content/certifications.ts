import type { Credential } from "./types";

/**
 * Certifications, the award and the journal paper, newest first.
 * All three certificates now have a public credential page that was
 * opened and matched to the holder name during research.
 */
export const certifications: readonly Credential[] = [
  {
    index: "01",
    id: "asah-best-capstone",
    kind: "award",
    title: "Best Capstone Project",
    issuer: "Asah led by Dicoding",
    date: "2026-01",
    displayDate: "Jan 2026",
    summary:
      "Awarded for Pacu Pintar, the AI learning-analytics platform built by a two-person ML team inside a larger web team.",
    sources: ["cv", "owner-answers"],
    verification: {
      verified: true,
      sources: ["owner-answers"],
      note: "Owner confirmed Jan 2026, inside the cohort window. The award has a PDF certificate but no public URL.",
    },
  },
  {
    index: "02",
    id: "dicoding-membangun-sistem-ml",
    kind: "certification",
    title: "Membangun Sistem Machine Learning",
    issuer: "Dicoding Indonesia",
    date: "2025-11-25",
    displayDate: "25 Nov 2025",
    level: "Advanced",
    validUntil: "2028-11-25",
    credentialId: "2VX35EDOJPYQ",
    url: "https://www.dicoding.com/certificates/2VX35EDOJPYQ",
    summary:
      "MLOps foundations: experiment metadata, model serving, monitoring and alerting.",
    skills: ["MLOps", "Model serving", "Monitoring"],
    sources: ["cv", "dicoding-mlops"],
    verification: { verified: true, sources: ["dicoding-mlops"] },
  },
  {
    index: "03",
    id: "ajcsr-hebb-rule",
    kind: "publication",
    title:
      "Penerapan Metode Hebb Rule Menggunakan Python Untuk Pengujian Pengenalan Pola Huruf Hijaiyyah",
    issuer: "Academic Journal of Computer Science Research",
    date: "2025-07",
    displayDate: "Jul 2025 · Vol 7 No 2",
    url: "https://journal.global.ac.id/index.php/AJCSR/article/view/15770",
    summary:
      "Co-author (third of four). A Hebbian network recognises the Hijaiyyah letters waw and ba from 5×5 bipolar matrices, implemented and verified in Python.",
    skills: ["Neural networks", "Pattern recognition", "Python"],
    sources: ["journal-hebb"],
    verification: {
      verified: true,
      sources: ["journal-hebb"],
      note: "Authors: Nazaruddin Ahmad, Fajar, Zidan Mubarak, Muhammad Bilal Akbar. Citation date on the journal page is 2025-07-31, starting at page 76.",
    },
  },
  {
    index: "04",
    id: "dicoding-ml-terapan",
    kind: "certification",
    title: "Machine Learning Terapan",
    issuer: "Dicoding Indonesia",
    date: "2025-05-27",
    displayDate: "27 May 2025",
    level: "Advanced",
    validUntil: "2028-05-27",
    credentialId: "1RXYEGQ3KZVM",
    url: "https://www.dicoding.com/certificates/1RXYEGQ3KZVM",
    summary:
      "Applied machine learning: predictive analytics, sentiment analysis, computer vision and recommender systems.",
    skills: ["Predictive analytics", "Computer vision", "Recommenders"],
    sources: ["cv", "dicoding-mlt"],
    verification: { verified: true, sources: ["dicoding-mlt"] },
  },
  {
    index: "05",
    id: "dicoding-pemrosesan-data",
    kind: "certification",
    title: "Belajar Fundamental Pemrosesan Data",
    issuer: "Dicoding Indonesia",
    date: "2025-05-04",
    displayDate: "4 May 2025",
    level: "Intermediate",
    validUntil: "2028-05-04",
    credentialId: "JLX1964EGP72",
    url: "https://www.dicoding.com/certificates/JLX1964EGP72",
    summary:
      "Preparing quality data for data-driven projects with Python, SQL and PostgreSQL.",
    skills: ["Data processing", "SQL", "PostgreSQL"],
    sources: ["cv", "dicoding-bfpd"],
    verification: { verified: true, sources: ["dicoding-bfpd"] },
  },
];

export const certificationsOnly = certifications.filter(
  (credential) => credential.kind === "certification",
);
