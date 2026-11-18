import type { Metadata } from "next";
import { ServiceLandingTemplate } from "@/components/ServiceLandingTemplate";
import { buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";

const DESC =
  "Safe ice dam removal & eave drainage channeling for McCall, Donnelly, Cascade & Garden Valley cabins. Zero shingle damage—get an instant quote.";

export const metadata: Metadata = {
  title: "Ice Dam Removal & Eave Relief",
  description: DESC,
  alternates: {
    canonical: "/services/ice-dam-removal",
  },
  openGraph: {
    title: "Ice Dam Removal & Eave Relief | Idaho Snow Co.",
    description: DESC,
    url: "/services/ice-dam-removal",
    images: buildOgImages({
      title: "Ice Dam Removal & Eave Prevention",
      subtitle:
        "Safe Drainage Channeling Across McCall, Cascade & Garden Valley",
      category: "Ice Dam Mitigation",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Ice Dam Removal & Eave Relief | Idaho Snow Co.",
    description: DESC,
    images: [
      buildOgImageUrl({
        title: "Ice Dam Removal & Eave Prevention",
        subtitle:
          "Safe Drainage Channeling Across McCall, Cascade & Garden Valley",
        category: "Ice Dam Mitigation",
      }),
    ],
  },
};

export default function IceDamRemovalPage() {
  const service = getServiceBySlug("ice-dam-removal");
  return (
    <ServiceLandingTemplate service={service} defaultLocationSlug="garden-valley" />
  );
}
