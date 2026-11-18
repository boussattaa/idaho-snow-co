import type { Metadata } from "next";
import { ServiceLandingTemplate } from "@/components/ServiceLandingTemplate";
import { getServiceBySlug, SITE_CONFIG } from "@/lib/services";

export const metadata: Metadata = {
  title: "Out-of-Town Cabin Snow Monitoring & STR Roof Care | Idaho Snow Co.",
  description:
    "Automated storm-triggered roof snow checks, timestamped before/after photo proof, and online Stripe invoicing for second-home & Airbnb/VRBO owners in McCall, Tamarack & Garden Valley.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/services/cabin-snow-monitoring`,
  },
};

export default function CabinSnowMonitoringPage() {
  const service = getServiceBySlug("cabin-snow-monitoring");
  return <ServiceLandingTemplate service={service} defaultLocationSlug="donnelly" />;
}
