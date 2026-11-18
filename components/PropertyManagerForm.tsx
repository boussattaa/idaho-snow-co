"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Building2, CheckCircle2, Loader2, Phone } from "lucide-react";
import { trackPhoneClick, trackQuoteSubmitted } from "@/lib/analytics";
import { SITE_CONFIG } from "@/lib/services";

const PORTFOLIO_COUNT_OPTIONS = [
  "2 – 5 Cabins / STRs",
  "6 – 15 Vacation Properties",
  "16 – 40 Portfolio Homes",
  "40+ Properties / Full HOA Community",
];

const PRIMARY_MARKETS = [
  { slug: "mccall", label: "McCall & Payette Lake (83638)" },
  { slug: "donnelly", label: "Donnelly & Tamarack Resort (83615)" },
  { slug: "cascade", label: "Cascade & Warm Lake (83611)" },
  { slug: "garden-valley", label: "Garden Valley / Crouch (83622)" },
  { slug: "idaho-city", label: "Idaho City & Lowman (Hwy 21)" },
  { slug: "bogus-basin", label: "Bogus Basin & Boise Foothills" },
];

export function PropertyManagerForm() {
  const [companyOrName, setCompanyOrName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [primaryLocationSlug, setPrimaryLocationSlug] = useState("mccall");
  const [portfolioCount, setPortfolioCount] = useState(
    PORTFOLIO_COUNT_OPTIONS[1]
  );
  const [subdivisionOrAddress, setSubdivisionOrAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [waiverAccepted, setWaiverAccepted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (!waiverAccepted) {
      setErrorMsg(
        "Please accept the Service Terms & Roof-Clearing Liability Waiver before submitting."
      );
      return;
    }

    setIsSubmitting(true);

    const compiledNotes = [
      `B2B Partner Portfolio Size: ${portfolioCount}`,
      notes.trim() ? `Scope / Turnaround Notes: ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationSlug: primaryLocationSlug,
          roofSize: "2500-4000",
          roofMaterial: "standing-seam-metal",
          roofPitch: "moderate",
          snowDepth: "2-4-ft",
          addons: ["seasonal-cabin-monitoring", "priority-24hr-dispatch"],
          flexibleRouteDay: false,
          waiverAccepted: true,
          name: companyOrName,
          phone,
          email,
          propertyAddress: subdivisionOrAddress,
          preferredTiming: "Seasonal Partner Agreement / Multi-Property Dispatch",
          urgency: "property-manager-partner",
          sourceUrl:
            typeof window !== "undefined"
              ? window.location.href
              : `${SITE_CONFIG.domain}/property-managers`,
          notes: compiledNotes,
        }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        referenceId?: string;
        estimate?: { low: number; high: number };
        error?: string;
      };

      if (!res.ok || !data.success || !data.referenceId) {
        setErrorMsg(
          data.error ||
            "Could not submit partner inquiry. Please verify your details or call (208) 965-4285."
        );
        return;
      }

      if (data.estimate) {
        trackQuoteSubmitted({
          referenceId: data.referenceId,
          locationSlug: primaryLocationSlug,
          estimatedLow: data.estimate.low,
          estimatedHigh: data.estimate.high,
          urgency: "property-manager-partner",
          hasPhoto: false,
        });
      }

      setConfirmedRef(data.referenceId);
    } catch {
      setErrorMsg(
        "Network error submitting partner form. Please call (208) 965-4285."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmedRef) {
    return (
      <div className="rounded-3xl border border-emerald-500/40 bg-emerald-950/30 p-7 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Partner Request Logged • Ref #{confirmedRef}
            </p>
            <h3 className="text-xl font-extrabold">
              Portfolio Dispatch Consultation Scheduled
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-200">
          Your multi-property inquiry has been tagged as{" "}
          <strong>property-manager-partner</strong> inside our dispatch CRM.
          Alex will reach out directly to set up priority storm triggers,
          consolidated Stripe billing, and turnaround access codes.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={SITE_CONFIG.phoneHref}
            onClick={() => trackPhoneClick("pm_confirmation")}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-400"
          >
            <Phone className="h-4 w-4" />
            <span>Call Dispatch Desk: {SITE_CONFIG.phoneDisplay}</span>
          </a>
          <button
            type="button"
            onClick={() => setConfirmedRef(null)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-800"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 text-white shadow-2xl sm:p-8"
    >
      <div className="flex items-center gap-2.5 text-sky-400">
        <Building2 className="h-5 w-5" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Priority B2B &amp; STR Onboarding
        </span>
      </div>
      <h2 className="mt-2 text-2xl font-extrabold text-white">
        Request Multi-Property Winter Pricing
      </h2>
      <p className="mt-1 text-sm text-slate-300">
        Lock in discounted per-roof volume rates, guaranteed pre-check-in
        clearing, and unified monthly or per-property Stripe invoicing.
      </p>

      {errorMsg ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-xs text-red-200"
        >
          {errorMsg}
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="pm-name"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Company / Host Name *
            </label>
            <input
              id="pm-name"
              type="text"
              required
              value={companyOrName}
              onChange={(e) => setCompanyOrName(e.target.value)}
              placeholder="Payette Lake Cabin Rentals LLC"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="pm-phone"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Direct Cell / Ops Phone *
            </label>
            <input
              id="pm-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(208) 555-0144"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="pm-email"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Operations / Billing Email *
            </label>
            <input
              id="pm-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ops@cabinportfolio.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="pm-portfolio"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Properties Managed *
            </label>
            <select
              id="pm-portfolio"
              value={portfolioCount}
              onChange={(e) => setPortfolioCount(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              {PORTFOLIO_COUNT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="pm-market"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Primary Snow Corridor Market *
            </label>
            <select
              id="pm-market"
              value={primaryLocationSlug}
              onChange={(e) => setPrimaryLocationSlug(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              {PRIMARY_MARKETS.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="pm-address"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Primary Subdivision / HOA / Office Address *
            </label>
            <input
              id="pm-address"
              type="text"
              required
              value={subdivisionOrAddress}
              onChange={(e) => setSubdivisionOrAddress(e.target.value)}
              placeholder="e.g. Tamarack Village / Aspen Ridge HOA"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="pm-notes"
            className="mb-1 block text-xs font-semibold text-slate-300"
          >
            Portfolio Details (Roof Types, Guest Turnaround Windows, Billing Preference)
          </label>
          <textarea
            id="pm-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us which neighborhoods your cabins sit in, Friday check-in cutoffs, or whether you also need deck & hot tub snow clearing..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-slate-300">
            <input
              type="checkbox"
              checked={waiverAccepted}
              onChange={(e) => setWaiverAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-900 accent-sky-500"
            />
            <span>
              I have read and agree to the Idaho Snow Co.{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky-400 underline hover:text-sky-300"
              >
                Service Terms &amp; Roof-Clearing Liability Waiver
              </Link>
              , including disclosure of hidden roof obstructions and snow
              drop-zones.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !waiverAccepted}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Routing Partner Request to Dispatch CRM...</span>
            </>
          ) : (
            <span>Request Priority Portfolio Rate Sheet</span>
          )}
        </button>
      </div>
    </form>
  );
}
