import type { Project } from "@/content";

/**
 * Real asset registry for the work section, index and case-study pages.
 *
 * `content/projects.ts` owns the facts and the localized alt text; this file
 * only maps a slug to the file T8 prepared. The public capture for Pacu Pintar
 * is the landing page, not the signed-in dashboard, so the alt text in the
 * content record describes that file.
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

const IMAGES: Record<string, Omit<WorkImage, "alt" | "status">> = {
  "jawi-ocr": {
    src: "/projects/jawi-ocr/results-chart.webp",
    width: 2400,
    height: 1500,
  },
  "pacu-pintar": {
    src: "/projects/pacu-pintar/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  "memory-vault": {
    src: "/projects/memory-vault/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  nusantarago: {
    src: "/projects/nusantarago/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  "guest-book": {
    src: "/projects/guest-book/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  "climate-agriculture": {
    src: "/projects/climate-agriculture/card.webp",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
};

export function getWorkImage(project: Project): WorkImage | null {
  const image = IMAGES[project.slug];
  if (!image) return null;
  return {
    ...image,
    alt: project.image.alt,
    status: project.image.status,
    ...(project.image.status === "generated" ? { generated: true } : {}),
  };
}

/**
 * One measured result per card. The string lives on the project record so both
 * languages stay in sync with the verified highlight it was shortened from.
 */
export function getResultLine(project: Project): string {
  return project.resultLine;
}
