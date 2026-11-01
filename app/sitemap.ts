import type { MetadataRoute } from "next";
import { content as contentEn } from "@/content/locales/en";
import { content as contentId } from "@/content/locales/id";

/** Canonical origin; env wins for previews. */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://zidanmubarak.vercel.app"
).replace(/\/+$/, "");

/** Content revision, not build time: a rebuild should not imply a new page. */
const updated = new Date("2026-10-30");

function projectEntries(
  projects: typeof contentEn.projects,
  prefix: string
) {
  return projects.map((project) => ({
    url: `${siteUrl}${prefix}/work/${project.slug}`,
    lastModified: updated,
    changeFrequency: "yearly" as const,
    priority: project.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        en: `${siteUrl}/work/${project.slug}`,
        id: `${siteUrl}/id/work/${project.slug}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${siteUrl}/`,
    id: `${siteUrl}/id`,
  };

  return [
    {
      url: `${siteUrl}/`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/id`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/work`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/work`,
          id: `${siteUrl}/id/work`,
        },
      },
    },
    {
      url: `${siteUrl}/id/work`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/work`,
          id: `${siteUrl}/id/work`,
        },
      },
    },
    ...projectEntries(contentEn.projects, ""),
    ...projectEntries(contentId.projects, "/id"),
  ];
}
