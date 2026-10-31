import type { MetadataRoute } from "next";
import { content as contentId } from "@/content/locales/id";
import { content as contentEn } from "@/content/locales/en";

/** Canonical origin; env wins for previews. */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://zidanmubarak.vercel.app"
).replace(/\/+$/, "");

/** Content revision, not build time: a rebuild should not imply a new page. */
const updated = new Date("2026-10-30");

function projectEntries(
  projects: typeof contentId.projects,
  prefix: string
) {
  return projects.map((project) => ({
    url: `${siteUrl}${prefix}/work/${project.slug}`,
    lastModified: updated,
    changeFrequency: "yearly" as const,
    priority: project.featured ? 0.8 : 0.6,
    alternates: {
      languages: {
        id: `${siteUrl}/work/${project.slug}`,
        en: `${siteUrl}/en/work/${project.slug}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { id: `${siteUrl}/`, en: `${siteUrl}/en` },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { id: `${siteUrl}/`, en: `${siteUrl}/en` },
      },
    },
    {
      url: `${siteUrl}/work`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          id: `${siteUrl}/work`,
          en: `${siteUrl}/en/work`,
        },
      },
    },
    {
      url: `${siteUrl}/en/work`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          id: `${siteUrl}/work`,
          en: `${siteUrl}/en/work`,
        },
      },
    },
    ...projectEntries(contentId.projects, ""),
    ...projectEntries(contentEn.projects, "/en"),
  ];
}
