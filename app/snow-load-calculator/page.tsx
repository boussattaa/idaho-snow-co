import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, MountainSnow, Scale } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SnowLoadCalculator } from "@/components/SnowLoadCalculator";
import { LOCATIONS } from "@/lib/locations";
import { buildBreadcrumbSchema, buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/services";

const PSF_DESCRIPTION =
  "Calculate how many lbs/sq ft (PSF) and tons of snow sit on your cabin roof in McCall, Donnelly, Cascade & Garden Valley—plus get an instant quote.";

export const metadata: Metadata = {
  title: "Idaho Roof Snow-Load (PSF) Calculator",
  description: PSF_DESCRIPTION,
  alternates: {
    canonical: "/snow-load-calculator",
  },
  openGraph: {
    title: "Idaho Roof Snow-Load (PSF) Calculator | Idaho Snow Co.",
    description: PSF_DESCRIPTION,
    url: "/snow-load-calculator",
    images: buildOgImages({
      title: "Idaho Roof Snow-Load Calculator",
      subtitle: "Check How Many lbs/sq ft Are Sitting on Your Cabin Roof",
      category: "Structural PSF Tool",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Idaho Roof Snow-Load (PSF) Calculator | Idaho Snow Co.",
    description: PSF_DESCRIPTION,
    images: [
      buildOgImageUrl({
        title: "Idaho Roof Snow-Load Calculator",
        subtitle: "Check How Many lbs/sq ft Are Sitting on Your Cabin Roof",
        category: "Structural PSF Tool",
      }),
    ],
  },
};

export default function SnowLoadCalculatorPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Idaho Roof Snow-Load (PSF) Calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    url: `${SITE_CONFIG.domain}/snow-load-calculator`,
    description:
      "Calculate estimated roof snow weight in pounds per square foot (PSF) and total tonnage for Idaho mountain cabins and residences.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE_CONFIG.businessName,
      telephone: "+1-208-965-4285",
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Snow-Load Calculator", path: "/snow-load-calculator" },
  ]);

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <JsonLd data={[webAppSchema, breadcrumbSchema]} />

      <section className="bg-[#0F172A] px-4 pt-16 pb-14 text-white sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
            <Scale className="h-3.5 w-3.5" />
            <span>Valley County &amp; Boise Basin Engineering Tool</span>
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
            Idaho Roof Snow-Load (PSF) Weight Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            Depth alone hides structural risk—3 feet of dry January powder
            weighs around 21 PSF, while 3 feet of wet McCall or Garden Valley
            snowpack topped by rain exceeds 70 PSF. Check your cabin&apos;s load
            right now.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <SnowLoadCalculator />

        {/* Regional Snow Load Guidelines */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex items-center gap-2.5 text-sky-700">
            <MountainSnow className="h-5 w-5" />
            <h2 className="text-2xl font-extrabold text-slate-900">
              Corridor Design Snow Load Reference by Town
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Select your community below for microclimate freeze-thaw insights and
            a quote calculator pre-set to your town.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition-colors hover:border-sky-400 hover:bg-white"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-sky-700">
                    <MapPin className="h-3.5 w-3.5 text-sky-600" />
                    <span>{loc.name}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {loc.elevationFt} • {loc.designSnowLoad}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
