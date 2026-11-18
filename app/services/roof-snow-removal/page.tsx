import type { Metadata } from "next";
import { ServiceLandingTemplate } from "@/components/ServiceLandingTemplate";
import { getServiceBySlug, SITE_CONFIG } from "@/lib/services";

export const metadata: Metadata = {
  title: "Roof Snow Removal in McCall, Cascade & Boise Foothills | Idaho Snow Co.",
  description:
    "Non-marring roof snow shoveling, cushioned raking, and heavy structural load relief for standing seam metal, shingles & cedar shake along Hwy 55. Instant online pricing.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/services/roof-snow-removal`,
  },
};

export default function RoofSnowRemovalPage() {
  const service = getServiceBySlug("roof-snow-removal");
  return <ServiceLandingTemplate service={service} defaultLocationSlug="mccall" />;
}
