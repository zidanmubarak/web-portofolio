import { copy } from "@/content";
import type { Project } from "@/content";

export type ProjectLinkItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

const LINK_LABELS: Record<keyof Project["links"], string> = {
  live: copy.work.liveLabel,
  repo: copy.work.repoLabel,
  hfModel: copy.work.modelLabel,
  hfSpace: copy.work.demoLabel,
  pypi: copy.work.packageLabel,
  docs: copy.work.docsLabel,
  publication: copy.work.paperLabel,
};

export function projectLinkItems(project: Project): readonly ProjectLinkItem[] {
  const items: ProjectLinkItem[] = [];
  for (const key of Object.keys(LINK_LABELS) as (keyof Project["links"])[]) {
    const href = project.links[key];
    if (!href) continue;
    items.push({ id: key, label: LINK_LABELS[key], href });
  }
  return items;
}

export function heroCaption(project: Project): string {
  if (project.slug === "jawi-ocr") {
    return "The results chart published with the model card: base model against the fine-tuned adapter on the held-out split.";
  }
  if (project.slug === "pacu-pintar") {
    return "The public Pacu Pintar landing page. The signed-in student dashboard is not captured.";
  }
  if (project.slug === "memory-vault") {
    return "The Memory Vault AI documentation site, captured from GitHub Pages.";
  }
  return "Owner-approved abstract typographic visual. It is not a screenshot of the application.";
}

export function heroFigureLabel(project: Project): string {
  if (project.slug === "jawi-ocr") return "Fig. 01 — Results";
  if (project.image.status === "generated") return "Fig. 01 — Generated visual";
  return "Fig. 01 — Live capture";
}
