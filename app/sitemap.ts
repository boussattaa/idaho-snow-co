import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { SERVICES, SITE_CONFIG } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.domain,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.domain}/quote`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_CONFIG.domain}/locations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE_CONFIG.domain}${service.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${SITE_CONFIG.domain}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...locationRoutes];
}
