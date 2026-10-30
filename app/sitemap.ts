import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

/** Canonical origin; env wins for previews. */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://zidanmubarak.vercel.app"
).replace(/\/+$/, "");

/** Content revision, not build time: a rebuild should not imply a new page. */
const updated = new Date("2026-10-30");

export default function sitemap(): MetadataRoute.Sitemap {
  const work = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: updated,
    changeFrequency: "yearly" as const,
    priority: project.featured ? 0.8 : 0.6,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...work,
  ];
}
