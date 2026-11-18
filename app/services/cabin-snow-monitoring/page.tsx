import type { Metadata } from "next";
import { ServiceLandingTemplate } from "@/components/ServiceLandingTemplate";
import { buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";

const DESC =
  "Automated storm-triggered roof checks, before/after photo proof & Stripe invoicing for second homes in McCall, Tamarack, Cascade & Garden Valley.";

export const metadata: Metadata = {
  title: "Out-of-Town Cabin Snow Monitoring",
  description: DESC,
  alternates: {
    canonical: "/services/cabin-snow-monitoring",
  },
  openGraph: {
    title: "Out-of-Town Cabin Snow Monitoring | Idaho Snow Co.",
    description: DESC,
    url: "/services/cabin-snow-monitoring",
    images: buildOgImages({
      title: "Out-of-Town Cabin Snow Monitoring",
      subtitle: "Automated Storm Checks & Timestamped Photo Proof",
      category: "2nd Homes & STRs",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Out-of-Town Cabin Snow Monitoring | Idaho Snow Co.",
    description: DESC,
    images: [
      buildOgImageUrl({
        title: "Out-of-Town Cabin Snow Monitoring",
        subtitle: "Automated Storm Checks & Timestamped Photo Proof",
        category: "2nd Homes & STRs",
      }),
    ],
  },
};

export default function CabinSnowMonitoringPage() {
  const service = getServiceBySlug("cabin-snow-monitoring");
  return <ServiceLandingTemplate service={service} defaultLocationSlug="donnelly" />;
}
