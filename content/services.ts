import type { Service } from "./types";

/**
 * Four work areas, numbered as the design's index labels (01–04).
 * Each one points at work that exists, never at a hypothetical service menu.
 */
export const services: readonly Service[] = [
  {
    index: "01",
    id: "ai-ml-engineering",
    title: "AI / ML engineering",
    tagline: "Models that survive contact with real data.",
    description:
      "Fine-tuning vision-language models, training classifiers and recommenders, and evaluating them honestly. The work starts at dataset curation and ends with a checkpoint someone can call through an API or a demo.",
    capabilities: [
      "Vision-language fine-tuning with QLoRA",
      "Computer vision and transfer learning",
      "Recommendation systems",
      "Evaluation: CER, WER, accuracy",
    ],
    proof: ["jawi-ocr", "pacu-pintar", "nusantarago"],
    sources: ["cv", "hf-model-card", "github-nusantara"],
  },
  {
    index: "02",
    id: "web-development",
    title: "Web development",
    tagline: "Interfaces for work that used to live in a notebook.",
    description:
      "Next.js and TypeScript for the front end, Flask and FastAPI when a model needs a door, and CodeIgniter where an existing PHP deployment still has to keep running. Typed data, accessible markup, deployments that fit on a free tier.",
    capabilities: [
      "Next.js, React and TypeScript",
      "Flask and FastAPI services",
      "MySQL and REST APIs",
      "Accessible, responsive front ends",
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
    title: "Design",
    tagline: "Layout as a way of making the work legible.",
    description:
      "Editorial layouts, dashboards and interface systems — including the ID-card and check-in flows in the guest book system and the charts that carry the argument in the climate analysis. Type, spacing and hierarchy treated as part of the engineering, not decoration on top.",
    capabilities: [
      "Interface and layout design",
      "Design systems and tokens",
      "Data visualisation",
      "Information hierarchy",
    ],
    proof: ["guest-book", "climate-agriculture"],
    sources: ["owner-brief", "github-guest-book", "github-climate"],
  },
  {
    index: "04",
    id: "teaching",
    title: "Teaching",
    tagline: "Explaining the thing is the test of knowing it.",
    description:
      "Laboratory assistant for Algorithms and Programming and for Big Data Analytics at UIN Ar-Raniry. Java fundamentals in one room, OpenCV and CNN transfer learning in the other, plus the case studies and rubrics that made both practicums gradeable.",
    capabilities: [
      "Java programming fundamentals",
      "Computer vision practicum",
      "Case study and rubric design",
      "One-to-one debugging",
    ],
    proof: ["lab-algorithms", "lab-big-data"],
    sources: ["cv"],
  },
];
