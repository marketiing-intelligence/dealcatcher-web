import type { MetadataRoute } from "next";
import { getAllReportSlugs } from "@/lib/reports";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dealcatcher.io";

  // Define all routes
  const routes = [
    "",
    "/no-website",
    "/wcag",
  ];

  // Define all locales
  const locales = ["en", "no"];

  // Generate sitemap entries for all routes and locales
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  // Report pages
  const reportSlugs = getAllReportSlugs();
  for (const slug of reportSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/reports/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
