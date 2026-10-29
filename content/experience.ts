import type { ExperienceEntry } from "./types";

/**
 * Reverse chronological. Dates and responsibilities come from the CV;
 * the English is a rewrite, not a translation of the bullet points.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    index: "01",
    id: "lab-big-data",
    role: "Laboratory Assistant — Big Data Analytics",
    organisation: "Information Technology Study Program, UIN Ar-Raniry",
    organisationNote: "Banda Aceh, Indonesia",
    type: "part-time",
    typeLabel: "Part-time",
    location: "Banda Aceh, Indonesia",
    arrangement: "on-site",
    period: {
      start: "2026-05",
      end: "2026-07",
      current: false,
      label: "May 2026 — Jul 2026",
    },
    summary:
      "Practicum support for the computer-vision half of the Big Data Analytics lab.",
    highlights: [
      "Assisted practicum sessions on image processing with Python and OpenCV, image classification with CNNs, and transfer learning with fine-tuning.",
      "Unblocked students on the material and on the technical failures that come with it — environment, tensors, training runs.",
    ],
    tags: ["OpenCV", "CNN", "Transfer learning", "Python"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "CV states part-time in Banda Aceh; on-site is implied by the campus practicum.",
    },
  },
  {
    index: "02",
    id: "lab-algorithms",
    role: "Laboratory Assistant — Algorithms and Programming",
    organisation: "Information Technology Study Program, UIN Ar-Raniry",
    organisationNote: "Banda Aceh, Indonesia",
    type: "part-time",
    typeLabel: "Part-time",
    location: "Banda Aceh, Indonesia",
    arrangement: "on-site",
    period: {
      start: "2026-05",
      end: "2026-07",
      current: false,
      label: "May 2026 — Jul 2026",
    },
    summary:
      "Java fundamentals practicum, plus the case studies and rubrics used to grade it.",
    highlights: [
      "Guided students through Java basics: variables, data types, input, arithmetic operators, branching.",
      "Wrote practicum case studies at matched difficulty, each with its own grading rubric.",
    ],
    tags: ["Java", "Programming fundamentals", "Rubrics"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "The owner brief calls this a teaching role; the CV specifies laboratory assistant. The CV wording is used. On-site is implied by the campus practicum.",
    },
  },
  {
    index: "03",
    id: "asah",
    role: "Machine Learning Cohort — Best Capstone Project",
    organisation: "Asah led by Dicoding",
    organisationNote: "Bandung, Indonesia · remote",
    type: "scholarship",
    typeLabel: "Scholarship",
    location: "Bandung, Indonesia",
    arrangement: "remote",
    period: {
      start: "2025-08",
      end: "2026-01",
      current: false,
      label: "Aug 2025 — Jan 2026",
    },
    summary:
      "Two-person ML team on Pacu Pintar, an AI learning-analytics platform. The capstone took Best Capstone Project.",
    highlights: [
      "Built the machine learning component for Pacu Pintar, integrated with the team's Next.js and Hapi.js application.",
      "Trained a Random Forest classifier for three study-pace categories at ≈90% accuracy.",
      "Built the FastAPI ML API that served the classifier and LLM-based personal study suggestions.",
      "Completed the cohort's soft-skills track for work readiness.",
    ],
    tags: ["scikit-learn", "FastAPI", "LLM", "Teamwork"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "Award date confirmed as Jan 2026 (owner answer), inside the cohort window.",
    },
  },
  {
    index: "04",
    id: "coding-camp",
    role: "Machine Learning Engineer Cohort",
    organisation: "Coding Camp powered by DBS Foundation",
    organisationNote: "Bandung, Indonesia · remote",
    type: "scholarship",
    typeLabel: "Scholarship",
    location: "Bandung, Indonesia",
    arrangement: "remote",
    period: {
      start: "2025-02",
      end: "2025-07",
      current: false,
      label: "Feb 2025 — Jul 2025",
    },
    summary:
      "Six months of certification-based machine learning, ending in the NusantaraGo-ML capstone.",
    highlights: [
      "Completed every class and certification project in the machine learning track, including the soft-skills and financial-literacy modules.",
      "Built an image classifier with a CNN and transfer learning.",
      "Top contributor on NusantaraGo-ML: a tourism recommender with content-based and collaborative filtering, served through Flask.",
    ],
    tags: ["CNN", "Transfer learning", "Recommender systems", "Flask"],
    sources: ["cv", "github-nusantara"],
    verification: { verified: true, sources: ["cv"] },
  },
  {
    index: "05",
    id: "bpka",
    role: "Data Management and Analysis Intern",
    organisation: "Badan Pengelolaan Keuangan Aceh (BPKA)",
    organisationNote: "Banda Aceh, Indonesia",
    type: "internship",
    typeLabel: "Internship",
    location: "Banda Aceh, Indonesia",
    arrangement: "on-site",
    period: {
      start: "2025-02",
      end: "2025-03",
      current: false,
      label: "Feb 2025 — Mar 2025",
    },
    summary:
      "Two months digitising and reporting financial data for a provincial finance agency.",
    highlights: [
      "Digitised and processed financial data with spreadsheets and analysis tools.",
      "Wrote internal documentation and daily operational reports, and supported the financial reporting workflow.",
    ],
    tags: ["Spreadsheets", "Data entry", "Documentation"],
    sources: ["cv"],
    verification: {
      verified: true,
      sources: ["cv"],
      note: "The previous site said January 2025; the CV says February 2025 and wins.",
    },
  },
];

export function getExperience(id: string): ExperienceEntry | undefined {
  return experience.find((entry) => entry.id === id);
}
