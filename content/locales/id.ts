import type { SiteContent } from "../types";
import { certifications } from "../id/certifications";
import { caseStudies } from "../id/case-studies";
import { copy } from "../copy.id";
import { education } from "../id/education";
import { experience } from "../id/experience";
import { links } from "../id/links";
import { profile } from "../id/profile";
import { projects } from "../id/projects";
import { services } from "../id/services";
import { sources, sourceList } from "../id/sources";
import { stack, stackCategories } from "../id/stack";

export const content: SiteContent = {
  locale: "id",
  copy,
  profile,
  links,
  services,
  projects,
  experience,
  education,
  certifications,
  stack,
  stackCategories,
  caseStudies,
  sources,
  sourceList,
};
