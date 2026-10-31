/**
 * Content types and pure helpers.
 *
 * Locale-aware data lives in `content/locales/*`; server components read the
 * active locale through `content/server.ts`. Keeping the dictionaries out of
 * this module means a client component can import a type without pulling both
 * languages into its bundle.
 */
export * from "./types";

import type { CaseStudy, ExperienceEntry, Project } from "./types";

export function selectedProjects(projects: readonly Project[]): readonly Project[] {
  return projects.filter((project) => project.selected);
}

export function featuredProjects(projects: readonly Project[]): readonly Project[] {
  return projects.filter((project) => project.featured);
}

export function findProject(
  projects: readonly Project[],
  slug: string
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function findCaseStudy(
  caseStudies: readonly CaseStudy[],
  slug: string
): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function findExperience(
  experience: readonly ExperienceEntry[],
  id: string
): ExperienceEntry | undefined {
  return experience.find((entry) => entry.id === id);
}
