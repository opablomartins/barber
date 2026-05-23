import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import {
  getBarberSlugs,
  getCitySlugs,
  getNeighborhoodSlugs,
  getBlogSlugs,
} from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const [barberSlugs, citySlugs, neighborhoodSlugs, blogSlugs] =
    await Promise.all([
      getBarberSlugs(),
      getCitySlugs(),
      getNeighborhoodSlugs(),
      getBlogSlugs(),
    ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/barbeiros`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const cityRoutes: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/cidade/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoodSlugs.map(
    (slug) => ({
      url: `${baseUrl}/bairro/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }),
  );

  const barberRoutes: MetadataRoute.Sitemap = barberSlugs.map((slug) => ({
    url: `${baseUrl}/barbeiro/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...neighborhoodRoutes,
    ...barberRoutes,
    ...blogRoutes,
  ];
}
