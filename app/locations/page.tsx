import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, MountainSnow, Phone } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getLocationsByCorridorZone } from "@/lib/locations";
import { buildBreadcrumbSchema, buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/services";

const LOCATIONS_DESCRIPTION =
  "Serving 11 Idaho mountain towns from Boise Foothills & Idaho City to Garden Valley, Cascade, Donnelly, Tamarack & McCall. Get an instant roof quote.";

export const metadata: Metadata = {
  title: "Highway 55 Roof Snow Service Areas",
  description: LOCATIONS_DESCRIPTION,
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Highway 55 Roof Snow Service Areas | Idaho Snow Co.",
    description: LOCATIONS_DESCRIPTION,
    url: "/locations",
    images: buildOgImages({
      title: "Highway 55 & Boise Basin Service Areas",
      subtitle: "McCall • Donnelly • Cascade • Garden Valley • Boise Foothills",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Highway 55 Roof Snow Service Areas | Idaho Snow Co.",
    description: LOCATIONS_DESCRIPTION,
    images: [
      buildOgImageUrl({
        title: "Highway 55 & Boise Basin Service Areas",
        subtitle:
          "McCall • Donnelly • Cascade • Garden Valley • Boise Foothills",
      }),
    ],
  },
};

export default function LocationsHubPage() {
  const groups = getLocationsByCorridorZone();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/locations" },
  ]);

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-[#0F172A] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
            <MountainSnow className="h-3.5 w-3.5" />
            <span>Highway 55 &amp; Boise Basin Corridor</span>
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Communities We Protect From Heavy Snow &amp; Ice Dams
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            Our winter roof crews operate continuously along the Boise-to-McCall
            corridor, Highway 17 (Banks-Lowman), and Highway 21 (Boise Basin).
            Choose your community below for localized snow-load specs and an
            instant quote pre-set to your town.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-sky-400"
            >
              <span>Get Instant Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-400"
            >
              <Phone className="h-4 w-4" />
              <span>Call {SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 pt-12 sm:px-6 lg:px-8">
        {groups.map((group) => (
          <section key={group.zoneId}>
            <div className="mb-5 border-b border-slate-200 pb-3">
              <h2 className="text-2xl font-extrabold text-slate-900">
                {group.zoneTitle}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-sky-400 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-sky-600" />
                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-700">
                          {loc.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {loc.zipCodes.join(", ")}
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-semibold text-sky-700">
                      {loc.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {loc.heroSummary}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-3 text-xs">
                      <div>
                        <span className="block text-slate-500">Elevation</span>
                        <strong className="text-slate-900">
                          {loc.elevationFt}
                        </strong>
                      </div>
                      <div>
                        <span className="block text-slate-500">
                          Annual Snowfall
                        </span>
                        <strong className="text-slate-900">
                          {loc.annualSnowfall}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-sky-600">
                    <span>Roof Snow Removal in {loc.name}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
