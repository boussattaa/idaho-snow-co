import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Phone, ShieldAlert, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/services";

export const metadata: Metadata = {
  title: "Service Terms & Roof-Clearing Liability Waiver | Idaho Snow Co.",
  description:
    "Service terms, pre-existing roof condition disclosures, snow drop-zone responsibilities, safe-depth margin policy, and liability waiver for Idaho Snow Co. roof snow and ice dam clearing.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/terms`,
  },
};

const WAIVER_CLAUSES = [
  {
    number: "01",
    title: "Pre-Existing Conditions & Concealed Roof Damage",
    body: "Deep mountain snowpack and bonded eave ice frequently conceal pre-existing structural or roofing wear. Idaho Snow Co. is not liable for pre-existing roof, architectural shingle, standing seam metal-panel, cedar shake, flashing, skylight seal, fascia, heat-cable, or gutter damage that existed prior to dispatch or is exposed once heavy snow or ice is relieved.",
  },
  {
    number: "02",
    title: "Hidden Roof Obstructions & Owner Disclosure Duty",
    body: "Prior to crew arrival, the property owner or authorized manager must disclose all roof-mounted or snow-buried items—including skylights, solar arrays, heat tape/cables, low plumbing vents, attic fan caps, chimneys, satellite dishes, and snow-retention brackets—via the booking notes or direct phone dispatch.",
  },
  {
    number: "03",
    title: "Ice Dams & Interior Water Intrusion",
    body: "Professional roof snow unloading and ice-dam relief channeling reduce active structural load and open drainage paths to help stop ongoing backup. However, snow and ice removal cannot reverse, dry, or cover pre-existing roof leaks, interior ceiling/drywall staining, wet insulation, or mold resulting from prior freeze-thaw intrusion or structural ice-dam backup.",
  },
  {
    number: "04",
    title: "Snow Drop-Zone & Ground Clearance Responsibilities",
    body: "Clearing heavy roof snow and cornice slabs inevitably displaces dense snow onto driveways, decks, walkways, hot tub covers, propane lines, landscaping, and exterior structures below eaves. Owners are responsible for moving vehicles, patio furniture, grills, and fragile items out of perimeter drop-zones before dispatch and clearly flagging buried propane regulators, risers, stairs, or decorative fixtures.",
  },
  {
    number: "05",
    title: "Safe-Depth Margin (Protective Roof Buffer Layer)",
    body: "To avoid metal-blade contact, torn shingles, granule stripping, or voided roof manufacturer warranties, Idaho Snow Co. crews strictly use non-marring polymer tools and intentionally leave a protective snow buffer layer of approximately 1 to 2 inches over architectural shingles, cedar shake, and sensitive roof surfaces (unless clearing targeted eave channels for ice-dam mitigation).",
  },
  {
    number: "06",
    title: "Property Access, Photo Proof & Payment Terms",
    body: "Driveways and safe foot access paths must be reasonably plowed or reachable upon crew arrival; steep unplowed approaches may require rescheduling or walk-in staging. For remote and out-of-town owners, completion is verified via timestamped before-and-after roof photos sent by text or email, paired with a Stripe invoice due upon receipt.",
  },
];

export default function TermsAndWaiverPage() {
  return (
    <div className="bg-[#F8FAFC] pb-20">
      <section className="bg-[#0F172A] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Customer Protection &amp; Service Disclosures</span>
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Service Terms &amp; Roof-Clearing Liability Waiver
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Applies to all roof snow removal, ice dam mitigation, deck/walkway
            clearing, and cabin storm monitoring dispatches performed by{" "}
            <strong className="text-white">{SITE_CONFIG.businessName}</strong>{" "}
            ({SITE_CONFIG.domain} • {SITE_CONFIG.phoneDisplay}).
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-6 px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="leading-relaxed">
              By submitting a quote booking or authorizing dispatch for any
              Idaho Snow Co. crew, you confirm that you are the property owner
              or authorized agent and agree to the six safety, disclosure, and
              liability provisions below.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {WAIVER_CLAUSES.map((clause) => (
            <section
              key={clause.number}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-xs font-black text-sky-700">
                  {clause.number}
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  {clause.title}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {clause.body}
              </p>
            </section>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-7 text-white shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Questions Before Booking?</span>
              </div>
              <h2 className="mt-1.5 text-xl font-extrabold">
                Need to Disclose Solar Panels, Skylights, or Access Notes?
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Include notes directly in the Instant Quote Calculator or call
                our Highway 55 dispatch desk anytime.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-sky-400"
              >
                <span>Back to Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-400"
              >
                <Phone className="h-4 w-4" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
