import type { SiteContent } from "../types";
import { certifications } from "../certifications";
import { caseStudies } from "../case-studies";
import { copy } from "../copy.en";
import { education } from "../education";
import { experience } from "../experience";
import { links } from "../links";
import { profile } from "../profile";
import { projects } from "../projects";
import { services } from "../services";
import { sources, sourceList } from "../sources";
import { stack, stackCategories } from "../stack";

export const content: SiteContent = {
  locale: "en",
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
