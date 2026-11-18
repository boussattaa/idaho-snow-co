import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Clock, Scale } from "lucide-react";
import { GUIDES } from "@/lib/guides";
import { SITE_CONFIG } from "@/lib/services";

export const metadata: Metadata = {
  title:
    "Idaho Cabin Winter Roof & Ice Dam Guides | Idaho Snow Co.",
  description:
    "Expert guides for Idaho mountain homeowners on roof snow-load PSF limits, standing seam metal vs. shingle clearing, preventing McCall/Cascade ice dams, and out-of-town STR checklists.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/guides`,
  },
};

export default function GuidesHubPage() {
  return (
    <div className="bg-[#F8FAFC] pb-20">
      <section className="bg-[#0F172A] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Idaho Alpine Roof Knowledge Base</span>
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
            Winter Roof Snow-Load &amp; Ice Dam Guides
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Locally grounded technical guides written for cabin owners, full-time
            mountain residents, and STR hosts along the Boise-to-McCall snow
            corridor.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/snow-load-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-sky-400"
            >
              <Scale className="h-4 w-4" />
              <span>Open Roof PSF Calculator</span>
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-400"
            >
              <Calculator className="h-4 w-4" />
              <span>Get Instant Clearing Quote</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-sky-400 hover:shadow-md"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="rounded-full bg-sky-50 px-3 py-1 font-bold text-sky-700">
                    {guide.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-extrabold text-slate-900 group-hover:text-sky-700 sm:text-2xl">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {guide.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-sm font-bold text-sky-600">
                <span>Read Full Guide</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
