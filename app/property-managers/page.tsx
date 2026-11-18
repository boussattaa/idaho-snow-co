import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  CalendarCheck,
  Camera,
  CheckCircle2,
  CreditCard,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { PropertyManagerForm } from "@/components/PropertyManagerForm";
import { JsonLd } from "@/components/JsonLd";
import { LOCATIONS } from "@/lib/locations";
import { buildBreadcrumbSchema, buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/services";

const PM_DESCRIPTION =
  "Priority roof snow removal, storm checks, timestamped photo proof & Stripe billing for McCall, Tamarack, Cascade & Garden Valley STR hosts and HOAs.";

export const metadata: Metadata = {
  title: "Cabin & STR Winter Roof Monitoring",
  description: PM_DESCRIPTION,
  alternates: {
    canonical: "/property-managers",
  },
  openGraph: {
    title: "Cabin & STR Winter Roof Monitoring | Idaho Snow Co.",
    description: PM_DESCRIPTION,
    url: "/property-managers",
    images: buildOgImages({
      title: "Cabin & STR Winter Roof Monitoring",
      subtitle: "Storm Checks, Photo Proof & Priority Clearing for Idaho Hosts",
      category: "STR Hosts & HOAs",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabin & STR Winter Roof Monitoring | Idaho Snow Co.",
    description: PM_DESCRIPTION,
    images: [
      buildOgImageUrl({
        title: "Cabin & STR Winter Roof Monitoring",
        subtitle: "Storm Checks, Photo Proof & Priority Clearing for Idaho Hosts",
        category: "STR Hosts & HOAs",
      }),
    ],
  },
};

export default function PropertyManagersPage() {
  const b2bSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Property Manager, HOA & STR Roof Snow Removal Program",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE_CONFIG.businessName,
      telephone: "+1-208-965-4285",
      url: SITE_CONFIG.domain,
    },
    areaServed: LOCATIONS.map((loc) => `${loc.name}, ID`),
    url: `${SITE_CONFIG.domain}/property-managers`,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Property Managers & STRs", path: "/property-managers" },
  ]);

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <JsonLd data={[b2bSchema, breadcrumbSchema]} />

      {/* B2B Hero */}
      <section className="bg-[#0F172A] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Building2 className="h-3.5 w-3.5" />
            <span>For STR Hosts, Vacation Rental Managers &amp; HOAs</span>
          </span>

          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            Zero-Headache Winter Roof &amp; Ice Care for{" "}
            <span className="text-sky-400">Multi-Property Portfolios</span>
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Built for McCall, Tamarack, Cascade, and Garden Valley property
            management teams, Airbnb/VRBO Superhosts, and mountain HOAs. Keep
            guests safe, protect owner roofs, and receive timestamped
            before/after proof before Friday check-in.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#partner-form"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-sky-400"
            >
              <span>Request Portfolio Rate Sheet</span>
            </a>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-amber-400"
            >
              <Phone className="h-4 w-4" />
              <span>Direct Partner Line: {SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Four Partner Pillars */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <CalendarCheck className="h-7 w-7 text-sky-600" />
            <h2 className="mt-4 text-lg font-extrabold text-slate-900">
              Pre-Check-In Priority Dispatch
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Crews prioritize Thursday/Friday guest turnover windows so roof
              shed blocks never trap hot tub covers or entry steps.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Camera className="h-7 w-7 text-sky-600" />
            <h2 className="mt-4 text-lg font-extrabold text-slate-900">
              Owner-Ready Photo Proof
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Every completed cabin receives timestamped before &amp; after
              photos you can forward straight to property owners or HOAs.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <CreditCard className="h-7 w-7 text-amber-600" />
            <h2 className="mt-4 text-lg font-extrabold text-slate-900">
              Consolidated Stripe Billing
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Bill per-property with itemized addresses for clean owner pass-through
              accounting, or consolidate monthly across your HOA.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-7 w-7 text-sky-600" />
            <h2 className="mt-4 text-lg font-extrabold text-slate-900">
              Non-Marring Tool Standard
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Zero steel blades on painted standing seam metal or shingles—full
              OSHA fall-arrest rigging and winter liability coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Territory List */}
      <section
        id="partner-form"
        className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <PropertyManagerForm />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900">
                What Multi-Property Partners Bundle Most
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    Automated storm-depth triggers (24&Prime; or 30&Prime; roof
                    checks across all portfolio cabins)
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    Eave ice dam channel cutting &amp; dormer valley clearing
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    Rear deck, hot tub path &amp; propane tank excavation
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    Direct SMS dispatch escalation for guest-reported leaks
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">
                Corridor Coverage Across 11 Communities
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
                  >
                    <MapPin className="h-3 w-3 text-sky-600" />
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
