import type { Metadata } from "next";
import { Suspense } from "react";
import { AlertTriangle, Clock, Phone, ShieldCheck, Weight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { QuotePageCalculator } from "@/components/QuotePageCalculator";
import { buildBreadcrumbSchema, buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/services";

const QUOTE_DESCRIPTION =
  "Get an instant roof snow & ice dam removal quote in 60 seconds. Transparent corridor pricing for McCall, Donnelly, Cascade, Tamarack & Garden Valley.";

export const metadata: Metadata = {
  title: "Instant Roof Snow Removal Quote",
  description: QUOTE_DESCRIPTION,
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Instant Roof Snow Removal Quote | Idaho Snow Co.",
    description: QUOTE_DESCRIPTION,
    url: "/quote",
    images: buildOgImages({
      title: "Instant Roof Snow Removal Quote",
      subtitle: "60-Second Online Estimate • Highway 55 Snow Corridor",
      category: "Instant Online Quote",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Instant Roof Snow Removal Quote | Idaho Snow Co.",
    description: QUOTE_DESCRIPTION,
    images: [
      buildOgImageUrl({
        title: "Instant Roof Snow Removal Quote",
        subtitle: "60-Second Online Estimate • Highway 55 Snow Corridor",
        category: "Instant Online Quote",
      }),
    ],
  },
};

export default function QuotePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Instant Quote", path: "/quote" },
  ]);

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-[#0F172A] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
              <Clock className="h-3.5 w-3.5" />
              <span>30-Second Instant Pricing</span>
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Lock In Your Roof Snow Removal Quote
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Transparent range pricing for every Highway 55 and Boise Basin
              community—no hidden gatekeeping before seeing what your job costs.
            </p>
          </div>

          <a
            href={SITE_CONFIG.phoneHref}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-base font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>Urgent Leak? Call {SITE_CONFIG.phoneDisplay}</span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <QuoteCalculator
              defaultLocationSlug="mccall"
              id="dedicated-quote-calculator"
            />
          }
        >
          <QuotePageCalculator />
        </Suspense>

        {/* Snow Load Weight Reference & Safety Guarantee */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2.5 text-amber-600">
              <Weight className="h-5 w-5" />
              <h2 className="text-lg font-extrabold text-slate-900">
                Idaho Mountain Snow Weight Reference
              </h2>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5">
                <span className="font-semibold text-slate-800">
                  Fresh Dry Powder (per foot)
                </span>
                <span className="font-bold text-sky-700">~6–9 lbs / sq ft</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5">
                <span className="font-semibold text-slate-800">
                  Packed Mid-Winter Snowpack (per foot)
                </span>
                <span className="font-bold text-sky-700">~15–22 lbs / sq ft</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-3.5">
                <span className="font-semibold text-slate-900">
                  Wet / Rain-Soaked Snow or Ice (per foot)
                </span>
                <span className="font-bold text-amber-700">25–57+ lbs / sq ft</span>
              </div>
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-600">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>
                If interior doors rub frames, ceiling drywall hairlines widen, or
                icicles pull gutters down, choose{" "}
                <strong>Priority 24-Hour Emergency Dispatch</strong> above.
              </span>
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2.5 text-sky-600">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="text-lg font-extrabold text-slate-900">
                What Happens After You Lock Your Quote
              </h2>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="rounded-xl bg-slate-50 p-3.5">
                <strong>1. Instant Dispatch Alert:</strong> Your quote details
                and optional photo notify our Highway 55 coordinator by SMS &amp;
                email immediately.
              </li>
              <li className="rounded-xl bg-slate-50 p-3.5">
                <strong>2. Route Confirmation:</strong> We text your exact
                arrival day and time window along with driveway access notes.
              </li>
              <li className="rounded-xl bg-slate-50 p-3.5">
                <strong>3. Proof &amp; Easy Payment:</strong> After balanced
                clearing, we send timestamped before/after roof photos and a
                clean online Stripe invoice.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
