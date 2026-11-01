import type { Project, SiteCopy } from "@/content";

export type ProjectLinkItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

function linkLabels(copy: SiteCopy): Record<keyof Project["links"], string> {
  return {
    live: copy.work.liveLabel,
    repo: copy.work.repoLabel,
    hfModel: copy.work.modelLabel,
    hfSpace: copy.work.demoLabel,
    pypi: copy.work.packageLabel,
    docs: copy.work.docsLabel,
    publication: copy.work.paperLabel,
  };
}

export function projectLinkItems(
  project: Project,
  copy: SiteCopy
): readonly ProjectLinkItem[] {
  const labels = linkLabels(copy);
  const items: ProjectLinkItem[] = [];
  for (const key of Object.keys(labels) as (keyof Project["links"])[]) {
    const href = project.links[key];
    if (!href) continue;
    items.push({ id: key, label: labels[key], href });
  }
  return items;
}

export function heroCaption(project: Project): string {
  return project.figure?.caption ?? project.summary;
}

export function heroFigureLabel(project: Project): string {
  return project.figure?.label ?? "Fig. 01";
}
