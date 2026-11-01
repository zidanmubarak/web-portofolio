import { jawiOcrCaseStudy } from "./jawi-ocr";
import type { CaseStudy } from "../types";

/** Case studies that have their own page under `/work/[slug]`. */
export const caseStudies: readonly CaseStudy[] = [jawiOcrCaseStudy];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export { jawiOcrCaseStudy };
