import { SITE_CONFIG } from "./services";

interface OgImageParams {
  title: string;
  subtitle: string;
  category?: string;
  alt?: string;
}

/**
 * Generates a `/api/og` image URL (rewritten via next.config.ts to
 * `https://agent-factory-smoky.vercel.app/api/og`). Passes both `subtitle`
 * and `headline` + `brand` so custom text renders crisply across share previews.
 */
export function buildOgImageUrl({
  title,
  subtitle,
  category = "Highway 55 Snow Corridor",
}: Omit<OgImageParams, "alt">): string {
  const params = new URLSearchParams({
    title,
    subtitle,
    headline: subtitle,
    brand: SITE_CONFIG.businessName,
    category,
  });
  return `/api/og?${params.toString()}`;
}

export function buildOgImages({
  title,
  subtitle,
  category,
  alt,
}: OgImageParams) {
  return [
    {
      url: buildOgImageUrl({ title, subtitle, category }),
      width: 1200,
      height: 630,
      alt: alt || `${title} | ${SITE_CONFIG.businessName}`,
    },
  ];
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.path === "/" ? SITE_CONFIG.domain : `${SITE_CONFIG.domain}${item.path}`,
    })),
  };
}
