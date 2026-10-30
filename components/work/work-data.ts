import type { Project } from "@/content";

/**
 * Real asset registry for the work section, index and case-study pages.
 *
 * `content/projects.ts` owns the facts (title, year, summary, image status);
 * this file owns the *files* T8 prepared plus the alt text that describes what
 * is actually inside each file. Alt text is deliberately not copied from
 * `project.image.alt` when the capture differs from the planned shot (Pacu
 * Pintar's dashboard needs a login; the public landing page is what exists).
 */
export type WorkImage = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Mirrors `Project["image"]["status"]` so pages can label generated art. */
  readonly status: Project["image"]["status"];
  readonly generated?: boolean;
};

const IMAGE_WIDTH = 2000;
const IMAGE_HEIGHT = 1250;

const IMAGES: Record<string, WorkImage> = {
  "jawi-ocr": {
    src: "/projects/jawi-ocr/results-chart.webp",
    width: 2400,
    height: 1500,
    alt: "Bar chart comparing the base Qwen2.5-VL model with the fine-tuned adapter: CER Jawi 82.5% to 17.4%, CER Rumi 90.6% to 16.5%, WER Rumi 107.1% to 39.4%.",
    status: "available",
  },
  "pacu-pintar": {
    src: "/projects/pacu-pintar/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alt: "The public Pacu Pintar landing page with the Indonesian headline for its structured coding learning paths.",
    status: "needs-capture",
  },
  "memory-vault": {
    src: "/projects/memory-vault/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alt: "Memory Vault AI documentation home, with quick links for the Python SDK, configuration, deployment and MCP integration.",
    status: "needs-capture",
  },
  nusantarago: {
    src: "/projects/nusantarago/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alt: "Abstract typographic composition for NusantaraGo: 107 commits, TF-IDF and cosine similarity, and hybrid ranking.",
    status: "generated",
    generated: true,
  },
  "guest-book": {
    src: "/projects/guest-book/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alt: "Abstract typographic composition for the Guest Book System: QR check-in, generated ID cards and Excel exports.",
    status: "generated",
    generated: true,
  },
  "climate-agriculture": {
    src: "/projects/climate-agriculture/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alt: "Abstract typographic composition for the climate and agriculture study: 10,002 rows by 15 columns, K-Means, Random Forest and Gradient Boosting.",
    status: "generated",
    generated: true,
  },
};

export function getWorkImage(project: Project): WorkImage | null {
  return IMAGES[project.slug] ?? null;
}

/**
 * One measured result per card. Every fragment is copied from a highlight or
 * field already verified in `content/projects.ts`; this only shortens it for
 * the 11 px line under the title.
 */
const RESULT_LINES: Record<string, string> = {
  "jawi-ocr": "CER 82.51% → 17.35% on 790 unseen images",
  "pacu-pintar": "Random Forest · ≈90% accuracy",
  "memory-vault": "Four memory types · local-first · on PyPI",
  nusantarago: "TF-IDF + collaborative filtering · 107 commits",
  "guest-book": "QR check-in · generated ID cards · Excel export",
  "climate-agriculture": "10,002 rows × 15 columns · four metrics",
};

export function getResultLine(project: Project): string {
  return RESULT_LINES[project.slug] ?? project.summary;
}

export type WorkFigure = {
  readonly id: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly status: "available" | "needs-capture" | "generated" | "missing";
};

/**
 * Case-study figures that exist as files. Missing captures stay as clean slots
 * in the page and are listed in `open-questions/T8.md`.
 */
const FIGURES: Record<string, WorkFigure[]> = {
  "jawi-ocr": [
    {
      id: "results-chart",
      src: "/projects/jawi-ocr/results-chart.webp",
      width: 2400,
      height: 1500,
      alt: "Grouped bar chart: CER Jawi 82.5% to 17.4%, CER Rumi 90.6% to 16.5%, WER Rumi 107.1% to 39.4%.",
      caption:
        "The results chart published with the model card: base model against the fine-tuned adapter on the held-out split.",
      status: "available",
    },
    {
      id: "demo",
      src: "/projects/jawi-ocr/demo.webp",
      width: 2000,
      height: 1250,
      alt: "The Jawi transliteration Gradio Space with an image upload area, extraction and Rumi panels, and two example crops.",
      caption:
        "The Gradio demo that ships with the adapter. The two example crops are the ones in the Space repository.",
      status: "available",
    },
  ],
};

export function getWorkFigures(project: Project): readonly WorkFigure[] {
  return FIGURES[project.slug] ?? [];
}

export function getFigure(project: Project, id: string): WorkFigure | undefined {
  return getWorkFigures(project).find((figure) => figure.id === id);
}
