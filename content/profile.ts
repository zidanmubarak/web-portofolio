import type { Profile } from "./types";

/**
 * Identity, positioning, and the only numbers allowed in the hero odometer.
 * Prose is stored in English; a future `content/id/profile.ts` mirrors it.
 */
export const profile: Profile = {
  name: "Zidan Mubarak",
  preferredName: "Zedd",
  handle: "zidanmubarak",

  role: "AI/ML Engineer",
  roleShort: "AI/ML Engineer",

  headline: ["Zidan", "Mubarak"],

  oneLiner:
    "I train vision-language models on Jawi — an Arabic-script Malay writing system that the base model read at 82.5% character error — then build the interface that puts the result in someone's hands.",

  about: [
    "I finished a degree in Information Technology at UIN Ar-Raniry, Banda Aceh, with a thesis on teaching a vision-language model to read Jawi — the Arab-Malay script the base model read at 82.5% character error. Getting that down to 17.4% took three data scenarios, a failed epoch 4, and one decision to stop at epoch 3.",
    "Before that I worked on two scholarship cohorts: a tourism recommender with a four-person team, and Pacu Pintar, an AI learning-analytics platform where a two-person ML team built the models and the FastAPI service that served them. Between projects I assisted the algorithms and programming lab, which is where I learned that explaining a for-loop is harder than writing one.",
    "I care about the unglamorous half of machine learning: data provenance, honest evaluation, and an interface someone can use without reading a README. I work in Python for the models, TypeScript when the result needs to live in a browser, and I design the layouts myself.",
  ],

  location: {
    city: "Banda Aceh",
    region: "Aceh",
    country: "Indonesia",
    countryCode: "ID",
    timezone: "Asia/Jakarta",
    timezoneLabel: "WIB · UTC+7",
    // Banda Aceh city centre. Used only for the coordinate label in the shell.
    coordinates: { lat: 5.5483, lng: 95.3238 },
  },

  availability: {
    open: true,
    label: "Open to AI/ML internships and entry-level roles",
    kinds: ["AI engineering", "Machine learning", "Data"],
  },

  languages: [
    { language: "Indonesian", level: "Native" },
    {
      language: "English",
      level: "Passive",
      note: "Comfortable reading documentation and writing technical text; speaking still improving.",
    },
  ],

  email: "zidanmubarak00@gmail.com",

  /**
   * Every value below appears on the CV or in a verifiable profile.
   * `hero: true` marks the three the design may show in the odometer.
   */
  metrics: [
    {
      id: "cer-reduction",
      value: 79,
      suffix: "%",
      label: "fewer character errors",
      context: "Jawi extraction, base model vs. fine-tuned",
      hero: true,
      sourceIds: ["cv", "hf-model-card"],
      verified: true,
    },
    {
      id: "authentic-samples",
      value: 7902,
      prefix: "≈",
      label: "authentic Jawi samples",
      context: "Scanned printed documents and handwriting",
      hero: true,
      sourceIds: ["owner-answers"],
      verified: true,
    },
    {
      id: "public-repos",
      value: 17,
      label: "public repositories · Oct 2026",
      context: "On GitHub, October 2026",
      hero: true,
      sourceIds: ["github-profile"],
      verified: true,
    },
    {
      id: "gpa",
      value: 3.77,
      decimals: 2,
      suffix: "/4.00",
      label: "GPA",
      context: "S1 Information Technology, UIN Ar-Raniry",
      sourceIds: ["cv"],
      verified: true,
    },
    {
      id: "publications",
      value: 1,
      label: "peer-reviewed paper",
      context: "Academic Journal of Computer Science Research, 2025",
      sourceIds: ["journal-hebb"],
      verified: true,
    },
  ],

  sources: [
    "cv",
    "github-profile",
    "hf-model-card",
    "journal-hebb",
    "owner-brief",
    "owner-answers",
  ],
};
