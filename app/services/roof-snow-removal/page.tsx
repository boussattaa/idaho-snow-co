import type { Metadata } from "next";
import { ServiceLandingTemplate } from "@/components/ServiceLandingTemplate";
import { buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";

const DESC =
  "Non-marring roof snow removal for standing seam metal, shingle & cedar shake cabins in McCall, Donnelly, Cascade & Garden Valley. Instant quote.";

export const metadata: Metadata = {
  title: "Roof Snow Removal (McCall to Boise)",
  description: DESC,
  alternates: {
    canonical: "/services/roof-snow-removal",
  },
  openGraph: {
    title: "Roof Snow Removal (McCall to Boise) | Idaho Snow Co.",
    description: DESC,
    url: "/services/roof-snow-removal",
    images: buildOgImages({
      title: "Roof-Safe Mountain Snow Removal",
      subtitle: "Standing Seam Metal, Shingle & Cedar Shake Specialists",
      category: "Roof Snow Removal",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Roof Snow Removal (McCall to Boise) | Idaho Snow Co.",
    description: DESC,
    images: [
      buildOgImageUrl({
        title: "Roof-Safe Mountain Snow Removal",
        subtitle: "Standing Seam Metal, Shingle & Cedar Shake Specialists",
        category: "Roof Snow Removal",
      }),
    ],
  },
};

export default function RoofSnowRemovalPage() {
  const service = getServiceBySlug("roof-snow-removal");
  return <ServiceLandingTemplate service={service} defaultLocationSlug="mccall" />;
}
