/**
 * Single entry point for the content layer.
 *
 * `import { profile, projects, copy } from "@/content"` works, or import
 * the module directly when a page only needs one slice. A future
 * `content/id/` folder mirrors the same named exports.
 */
export * from "./types";
export { sources, sourceList } from "./sources";
export type { SourceKey } from "./sources";
export { profile } from "./profile";
export { links, primaryLinks } from "./links";
export { services } from "./services";
export {
  projects,
  selectedProjects,
  featuredProjects,
  getProject,
} from "./projects";
export { experience, getExperience } from "./experience";
export { education } from "./education";
export { certifications, certificationsOnly } from "./certifications";
export { stack, primaryStack, stackCategories, stackByCategory } from "./stack";
export { caseStudies, getCaseStudy } from "./case-studies";
export { copy } from "./copy.en";
