import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MapPin,
  MountainSnow,
  Phone,
  ShieldCheck,
  Snowflake,
} from "lucide-react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { GUIDES } from "@/lib/guides";
import {
  getLocationBySlug,
  getNeighborLocations,
  LOCATIONS,
} from "@/lib/locations";
import {
  buildBreadcrumbSchema,
  buildOgImageUrl,
  buildOgImages,
} from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/services";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const pageTitle = `Roof Snow Removal in ${location.shortName}, ID`;
  const fullTitle = `${pageTitle} | Idaho Snow Co.`;
  const description = `Roof-safe snow removal & ice dam clearing in ${location.shortName}, ID (${location.zipCodes[0]}). Instant online quotes, photo proof & fast Hwy 55 corridor crew dispatch.`;
  const canonicalPath = `/locations/${location.slug}`;
  const ogTitle = `Roof Snow Removal in ${location.name}, ID`;
  const ogSubtitle =
    "Roof-Safe Snow Clearing & Ice Dam Removal • Instant Quote";

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: fullTitle,
      description,
      images: buildOgImages({
        title: ogTitle,
        subtitle: ogSubtitle,
        category: `${location.county} • ${location.zipCodes[0]}`,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        buildOgImageUrl({
          title: ogTitle,
          subtitle: ogSubtitle,
          category: `${location.county} • ${location.zipCodes[0]}`,
        }),
      ],
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const neighbors = getNeighborLocations(location.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Roof Snow Removal & Ice Dam Mitigation in ${location.name}, ID`,
    serviceType: "Roof Snow Removal and Ice Dam Prevention",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE_CONFIG.businessName,
      telephone: "+1-208-965-4285",
      url: SITE_CONFIG.domain,
    },
    areaServed: {
      "@type": "City",
      name: `${location.name}, ID`,
      postalCode: location.zipCodes.join(", "),
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "425",
      highPrice: "1850",
    },
    url: `${SITE_CONFIG.domain}/locations/${location.slug}`,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/locations" },
    { name: `${location.name}, ID`, path: `/locations/${location.slug}` },
  ]);

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <JsonLd data={[serviceSchema, faqSchema, breadcrumbSchema]} />

      {/* Local SEO Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] px-4 pt-16 pb-14 text-white sm:px-6 sm:pt-20 sm:pb-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.2),transparent_50%)]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-sky-400">
              Home
            </Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-sky-400">
              Service Areas
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">{location.name}</span>
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {location.county} • ZIP {location.zipCodes.join(" & ")}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
                Roof Snow Removal in{" "}
                <span className="text-sky-400">{location.name}, Idaho</span>
              </h1>
              <p className="mt-2 text-sm font-semibold text-amber-300 sm:text-base">
                {location.tagline}
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
                {location.heroSummary}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#local-quote-calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-sky-400 transition-colors"
                >
                  <span>Get {location.name} Instant Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-amber-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call {SITE_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Local Snow Load Spec Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-xl">
                <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                  <MountainSnow className="h-5 w-5 text-sky-400" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
                    {location.name} Winter Profile
                  </h2>
                </div>

                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Elevation Range</dt>
                    <dd className="font-bold text-white">
                      {location.elevationFt}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Avg Annual Snowfall</dt>
                    <dd className="font-bold text-sky-400">
                      {location.annualSnowfall}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Typical Snow Load Spec</dt>
                    <dd className="font-bold text-amber-300">
                      {location.designSnowLoad}
                    </dd>
                  </div>
                  <div className="border-t border-slate-800 pt-3">
                    <dt className="text-xs text-slate-400">Corridor Route</dt>
                    <dd className="mt-0.5 text-xs font-semibold text-slate-200">
                      {location.highwayAccess}
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/snow-load-calculator"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-2.5 text-xs font-bold text-sky-300 hover:bg-sky-500/20 transition-colors"
                >
                  <span>Check {location.name} Roof Snow Weight (PSF)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Selected Local Instant Quote Calculator */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <QuoteCalculator
          defaultLocationSlug={location.slug}
          lockedLocationName={location.name}
          id="local-quote-calculator"
        />
      </section>

      {/* Hyper-Local Snow Dynamics & Challenges */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sky-600">
                <Snowflake className="h-4 w-4" />
                <span>Microclimate &amp; Freeze-Thaw Analysis</span>
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Why {location.name} Roofs Need Specialized Snow &amp; Ice Care
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {location.snowPatternSummary}
              </p>
            </div>

            <div className="space-y-4">
              {location.localRoofChallenges.map((challenge) => (
                <div
                  key={challenge.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {challenge.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {challenge.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Neighborhoods / ZIPs / Dispatch Coverage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900">
                Neighborhoods &amp; Areas Served in {location.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Coverage across ZIP code{" "}
                <strong>{location.zipCodes.join(" & ")}</strong> and adjacent{" "}
                {location.county} cabin roads:
              </p>

              <ul className="mt-4 space-y-2.5">
                {location.subdivisionsAndLandmarks.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-2.5 text-sm font-medium text-slate-800"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50/70 p-4 text-xs leading-relaxed text-slate-700">
                <div className="flex items-center gap-2 font-bold text-sky-900">
                  <ShieldCheck className="h-4 w-4 text-sky-600" />
                  <span>Out-of-Town Cabin Owner Protocol</span>
                </div>
                <p className="mt-1">
                  {location.recommendedTimingNote} Timestamped before &amp;
                  after photos plus online Stripe invoicing sent on every visit.
                </p>
              </div>
            </div>

            {/* Neighboring Towns Links */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">
                Also Serving Nearby Areas
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Adjacent towns along the Highway 55 &amp; Boise Basin corridor:
              </p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {neighbors.map((neighbor) => (
                  <Link
                    key={neighbor.slug}
                    href={`/locations/${neighbor.slug}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 hover:border-sky-400 hover:bg-white hover:text-sky-700 transition-colors"
                  >
                    <span>{neighbor.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-sky-600" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Local Winter Guides Block */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2 text-sky-700">
                <BookOpen className="h-4 w-4" />
                <h2 className="text-lg font-extrabold text-slate-900">
                  Winter Roof Guides for {location.shortName}
                </h2>
              </div>
              <div className="mt-3 space-y-2">
                {GUIDES.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:border-sky-300 hover:bg-white hover:text-sky-700 transition-colors"
                  >
                    <span>{g.shortTitle}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-sky-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City-Specific FAQs */}
      <section className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8">
        <FaqAccordion
          items={location.faqs}
          heading={`${location.name} Roof Snow Removal FAQs`}
        />
      </section>
    </div>
  );
}
