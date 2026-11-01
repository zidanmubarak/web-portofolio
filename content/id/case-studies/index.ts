import type { CaseStudy } from "../../types";
import { jawiOcrCaseStudy } from "./jawi-ocr";

/** Studi kasus yang punya halaman sendiri di `/work/[slug]`. */
export const caseStudies: readonly CaseStudy[] = [jawiOcrCaseStudy];

export { jawiOcrCaseStudy };
