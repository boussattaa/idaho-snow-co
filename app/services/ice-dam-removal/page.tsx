import type { Metadata } from "next";
import { ServiceLandingTemplate } from "@/components/ServiceLandingTemplate";
import { getServiceBySlug, SITE_CONFIG } from "@/lib/services";

export const metadata: Metadata = {
  title: "Ice Dam Removal & Eave Prevention (Boise to McCall) | Idaho Snow Co.",
  description:
    "Safe ice dam removal, eave snow band clearing, and gutter drainage channel relief across McCall, Donnelly, Garden Valley, Crouch & Idaho City without damaging shingles.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/services/ice-dam-removal`,
  },
};

export default function IceDamRemovalPage() {
  const service = getServiceBySlug("ice-dam-removal");
  return (
    <ServiceLandingTemplate service={service} defaultLocationSlug="garden-valley" />
  );
}
