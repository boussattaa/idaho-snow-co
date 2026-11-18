"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarCheck,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Home,
  Layers,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import {
  trackPhoneClick,
  trackQuoteCalculated,
  trackQuoteSubmitted,
} from "@/lib/analytics";
import {
  calculateSnowQuote,
  formatCurrency,
  QUOTE_ADDONS,
  ROOF_MATERIALS,
  ROOF_PITCHES,
  ROOF_SIZES,
  SNOW_DEPTHS,
  type QuoteAddonId,
  type RoofMaterialId,
  type RoofPitchId,
  type RoofSizeId,
  type SnowDepthId,
} from "@/lib/pricing";
import { getLocationBySlug, getLocationsByCorridorZone } from "@/lib/locations";
import { SITE_CONFIG } from "@/lib/services";

interface QuoteCalculatorProps {
  defaultLocationSlug?: string;
  lockedLocationName?: string;
  initialSnowDepth?: SnowDepthId;
  id?: string;
}

interface SubmissionSuccess {
  referenceId: string;
  locationName: string;
  estimateLow: number;
  estimateHigh: number;
  message: string;
}

const TIMING_OPTIONS = [
  "ASAP — Next Available Corridor Crew",
  "Priority 24-Hour Emergency Dispatch",
  "Within 2–3 Days (Before Next Storm)",
  "This Weekend / Before Guest Check-In",
  "Seasonal Monitoring Enrollment",
];

export function QuoteCalculator({
  defaultLocationSlug = "mccall",
  lockedLocationName,
  initialSnowDepth,
  id = "quote-calculator",
}: QuoteCalculatorProps) {
  const corridorGroups = useMemo(() => getLocationsByCorridorZone(), []);

  const [locationSlug, setLocationSlug] = useState<string>(defaultLocationSlug);
  const [roofSize, setRoofSize] = useState<RoofSizeId>("1500-2500");
  const [roofMaterial, setRoofMaterial] =
    useState<RoofMaterialId>("standing-seam-metal");
  const [roofPitch, setRoofPitch] = useState<RoofPitchId>("moderate");
  const [snowDepth, setSnowDepth] = useState<SnowDepthId>(
    initialSnowDepth ?? "2-4-ft"
  );
  const [addons, setAddons] = useState<QuoteAddonId[]>([]);
  const [flexibleRouteDay, setFlexibleRouteDay] = useState<boolean>(false);
  const [exclusivityNote, setExclusivityNote] = useState<string | null>(null);

  // Lead Capture Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [preferredTiming, setPreferredTiming] = useState(TIMING_OPTIONS[0]);
  const [notes, setNotes] = useState("");
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [waiverAccepted, setWaiverAccepted] = useState<boolean>(false);
  const [waiverError, setWaiverError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<SubmissionSuccess | null>(null);

  const quote = useMemo(
    () =>
      calculateSnowQuote({
        locationSlug,
        roofSize,
        roofMaterial,
        roofPitch,
        snowDepth,
        addons,
        flexibleRouteDay,
      }),
    [
      locationSlug,
      roofSize,
      roofMaterial,
      roofPitch,
      snowDepth,
      addons,
      flexibleRouteDay,
    ]
  );

  const selectedLocation = useMemo(
    () => getLocationBySlug(locationSlug),
    [locationSlug]
  );

  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    trackQuoteCalculated({
      locationSlug,
      roofSize,
      roofMaterial,
      roofPitch,
      snowDepth,
      estimatedLow: quote.low,
      estimatedHigh: quote.high,
    });
  }, [
    locationSlug,
    roofSize,
    roofMaterial,
    roofPitch,
    snowDepth,
    quote.low,
    quote.high,
  ]);

  function toggleAddon(addonId: QuoteAddonId) {
    const isCurrentlyChecked = addons.includes(addonId);

    if (addonId === "priority-24hr-dispatch" && !isCurrentlyChecked) {
      if (flexibleRouteDay) {
        setFlexibleRouteDay(false);
        setExclusivityNote(
          "Switched to Priority 24-Hour Emergency Dispatch (10% Flexible Route-Day Discount removed because priority emergency trips cannot combine with corridor route pricing)."
        );
      } else {
        setExclusivityNote(null);
      }
    } else if (addonId === "priority-24hr-dispatch" && isCurrentlyChecked) {
      setExclusivityNote(null);
    }

    setAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((item) => item !== addonId)
        : [...prev, addonId]
    );
  }

  function handleToggleFlexibleRouteDay() {
    const nextValue = !flexibleRouteDay;
    if (nextValue && addons.includes("priority-24hr-dispatch")) {
      setAddons((prev) =>
        prev.filter((item) => item !== "priority-24hr-dispatch")
      );
      setExclusivityNote(
        "Applied -10% Flexible Route-Day Discount (Priority 24-Hour Emergency Dispatch unselected automatically)."
      );
    } else {
      setExclusivityNote(null);
    }
    setFlexibleRouteDay(nextValue);
  }

  function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    setPhotoError(null);
    const file = event.target.files?.[0];
    if (!file) {
      setPhotoName(null);
      setPhotoDataUrl(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select an image file (JPG, PNG, or HEIC/WEBP).");
      return;
    }

    if (file.size > 2_500_000) {
      setPhotoError("Photo must be under 2.5 MB for instant upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoName(file.name);
        setPhotoDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    setWaiverError(null);

    if (!waiverAccepted) {
      setWaiverError(
        "Please accept the Service Terms & Roof-Clearing Liability Waiver before scheduling."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationSlug,
          roofSize,
          roofMaterial,
          roofPitch,
          snowDepth,
          addons,
          flexibleRouteDay: quote.flexibleRouteDayApplied,
          waiverAccepted: true,
          name,
          phone,
          email,
          propertyAddress,
          preferredTiming,
          urgency: preferredTiming,
          sourceUrl:
            typeof window !== "undefined" ? window.location.href : undefined,
          notes: notes.trim() ? notes.trim() : null,
          photoName,
          photoDataUrl,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        referenceId?: string;
        locationName?: string;
        estimate?: { low: number; high: number };
        message?: string;
      };

      if (!response.ok || !data.success || !data.referenceId || !data.estimate) {
        setSubmitError(
          data.error ||
            "Please double-check your contact details and try locking in your quote again."
        );
        return;
      }

      trackQuoteSubmitted({
        referenceId: data.referenceId,
        locationSlug,
        estimatedLow: data.estimate.low,
        estimatedHigh: data.estimate.high,
        urgency: preferredTiming,
        hasPhoto: Boolean(photoName),
      });

      setSuccessData({
        referenceId: data.referenceId,
        locationName:
          data.locationName || selectedLocation?.name || lockedLocationName || "Idaho",
        estimateLow: data.estimate.low,
        estimateHigh: data.estimate.high,
        message: data.message || "Your quote has been locked in.",
      });
    } catch {
      setSubmitError(
        "Network hiccup while sending your quote. Please call (208) 965-4285 or try submitting again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0F172A] p-4 shadow-2xl sm:p-8 lg:p-10"
    >
      {/* Subtle Alpine Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="relative z-10 mb-8 flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Zero-Gatekeeping Transparent Pricing</span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Instant Roof Snow Removal Quote Calculator
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-300 sm:text-base">
            Select your town, roof specs, and current snow depth to see your
            estimated price range immediately—then lock in your dispatch window
            below.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-2.5 text-xs text-slate-300">
          <MapPin className="h-4 w-4 text-amber-400" />
          <span>
            Active Corridor:{" "}
            <strong className="text-white">
              {selectedLocation?.name || lockedLocationName || "Highway 55"}
            </strong>
          </span>
        </div>
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: Interactive Calculator Inputs */}
        <div className="space-y-7 lg:col-span-7">
          {/* 1. Location / Town */}
          <div>
            <label
              htmlFor={`${id}-location`}
              className="mb-2 flex items-center gap-2 text-sm font-bold text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-extrabold text-sky-300">
                1
              </span>
              <span>Location / Corridor Town</span>
            </label>
            <select
              id={`${id}-location`}
              value={locationSlug}
              onChange={(e) => setLocationSlug(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3.5 text-sm font-medium text-white shadow-inner focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
            >
              {corridorGroups.map((group) => (
                <optgroup key={group.zoneId} label={group.zoneTitle}>
                  {group.locations.map((loc) => (
                    <option key={loc.slug} value={loc.slug}>
                      {loc.name} ({loc.zipCodes.join("/")}) — {loc.tagline}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {selectedLocation ? (
              <p className="mt-2 text-xs text-slate-400">
                <strong className="text-sky-300">{selectedLocation.corridorLabel}</strong>{" "}
                • Design Snow Load: {selectedLocation.designSnowLoad} •{" "}
                {selectedLocation.recommendedTimingNote}
              </p>
            ) : null}
          </div>

          {/* 2. Home Footprint / Roof Size */}
          <div>
            <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-extrabold text-sky-300">
                2
              </span>
              <span>Home Footprint / Roof Size</span>
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {ROOF_SIZES.map((opt) => {
                const active = roofSize === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRoofSize(opt.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all ${
                      active
                        ? "border-sky-400 bg-sky-500/15 ring-1 ring-sky-400"
                        : "border-slate-700/80 bg-slate-900/70 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        {opt.label}
                      </span>
                      <Home
                        className={`h-4 w-4 ${
                          active ? "text-sky-400" : "text-slate-500"
                        }`}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{opt.sublabel}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Roof Material */}
          <div>
            <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-extrabold text-sky-300">
                3
              </span>
              <span>Roof Material</span>
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {ROOF_MATERIALS.map((opt) => {
                const active = roofMaterial === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRoofMaterial(opt.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all ${
                      active
                        ? "border-sky-400 bg-sky-500/15 ring-1 ring-sky-400"
                        : "border-slate-700/80 bg-slate-900/70 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">
                        {opt.label}
                      </span>
                      <Layers
                        className={`h-4 w-4 ${
                          active ? "text-sky-400" : "text-slate-500"
                        }`}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Roof Pitch & 5. Snow Depth */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-extrabold text-sky-300">
                  4
                </span>
                <span>Roof Pitch</span>
              </p>
              <div className="space-y-2">
                {ROOF_PITCHES.map((opt) => {
                  const active = roofPitch === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRoofPitch(opt.id)}
                      className={`w-full rounded-xl border p-3 text-left transition-all ${
                        active
                          ? "border-sky-400 bg-sky-500/15 ring-1 ring-sky-400"
                          : "border-slate-700/80 bg-slate-900/70 hover:border-slate-500"
                      }`}
                    >
                      <span className="block text-sm font-bold text-white">
                        {opt.label}
                      </span>
                      <span className="block text-xs text-slate-400">
                        {opt.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-extrabold text-sky-300">
                  5
                </span>
                <span>Estimated Snow Depth</span>
              </p>
              <div className="space-y-2">
                {SNOW_DEPTHS.map((opt) => {
                  const active = snowDepth === opt.id;
                  const heavy = opt.id === "4-plus-ft";
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSnowDepth(opt.id)}
                      className={`w-full rounded-xl border p-3 text-left transition-all ${
                        active
                          ? heavy
                            ? "border-amber-400 bg-amber-500/15 ring-1 ring-amber-400"
                            : "border-sky-400 bg-sky-500/15 ring-1 ring-sky-400"
                          : "border-slate-700/80 bg-slate-900/70 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-white">
                          {opt.label}
                        </span>
                        {heavy ? (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
                        ) : (
                          <Snowflake
                            className={`h-4 w-4 shrink-0 ${
                              active ? "text-sky-400" : "text-slate-500"
                            }`}
                          />
                        )}
                      </div>
                      <span className="block text-xs text-slate-400">
                        {opt.weightEstimate}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 6. Optional Add-Ons */}
          <div>
            <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-extrabold text-sky-300">
                6
              </span>
              <span>Optional Protection &amp; Clearing Add-Ons</span>
            </p>
            <div className="space-y-2.5">
              {QUOTE_ADDONS.map((addon) => {
                const checked = addons.includes(addon.id);
                const disabledByRouteDiscount =
                  addon.id === "priority-24hr-dispatch" && flexibleRouteDay;
                return (
                  <label
                    key={addon.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
                      checked
                        ? "border-sky-400 bg-sky-500/15"
                        : disabledByRouteDiscount
                        ? "border-slate-800 bg-slate-900/40 opacity-75 hover:border-slate-600"
                        : "border-slate-700/80 bg-slate-900/70 hover:border-slate-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(addon.id)}
                      className="sr-only"
                    />
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        checked
                          ? "border-sky-400 bg-sky-400 text-slate-950"
                          : "border-slate-600 bg-slate-950"
                      }`}
                    >
                      {checked ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-white">
                          {addon.label}
                        </span>
                        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-sky-300">
                          +{formatCurrency(addon.priceLow)}–
                          {formatCurrency(addon.priceHigh)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {addon.description}
                      </p>
                      {disabledByRouteDiscount ? (
                        <p className="mt-1 text-[11px] font-medium text-emerald-300">
                          Selecting Priority Dispatch will automatically replace the
                          10% Route-Day Discount.
                        </p>
                      ) : null}
                    </div>
                  </label>
                );
              })}

              {/* Highlighted Flexible Route-Day Scheduling Discount Option */}
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                  quote.flexibleRouteDayApplied
                    ? "border-emerald-400 bg-emerald-500/15 ring-1 ring-emerald-400/60"
                    : "border-emerald-500/35 bg-emerald-950/20 hover:border-emerald-400/70"
                }`}
              >
                <input
                  type="checkbox"
                  checked={quote.flexibleRouteDayApplied}
                  onChange={handleToggleFlexibleRouteDay}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    quote.flexibleRouteDayApplied
                      ? "border-emerald-400 bg-emerald-400 text-slate-950"
                      : "border-emerald-500/60 bg-slate-950"
                  }`}
                >
                  {quote.flexibleRouteDayApplied ? (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  ) : null}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
                      <CalendarCheck className="h-4 w-4 text-emerald-400" />
                      <span>Flexible Route-Day Scheduling — Save 10%</span>
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-extrabold text-emerald-300">
                      Save 10%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    Join our scheduled Friday–Sunday Highway 55 corridor crew
                    runs instead of booking a standalone trip.
                  </p>
                  {addons.includes("priority-24hr-dispatch") ? (
                    <p className="mt-1 text-[11px] font-medium text-amber-300">
                      Not combinable with Priority 24-Hour Emergency Dispatch—checking
                      this switches off priority dispatch.
                    </p>
                  ) : null}
                </div>
              </label>

              {exclusivityNote ? (
                <p className="rounded-xl border border-amber-500/30 bg-amber-950/25 px-3.5 py-2 text-xs text-amber-200">
                  {exclusivityNote}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Estimate + Lock-In Lead Form */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-xl sm:p-6">
            {/* Live Price Range */}
            <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-slate-950 to-slate-900 p-5">
              <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                <span>Instant Estimated Price Range</span>
                <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 text-[11px] text-sky-300">
                  {quote.travelZone.shortLabel}
                </span>
              </div>

              <motion.div
                key={`${quote.low}-${quote.high}`}
                initial={{ opacity: 0.65, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 flex items-baseline gap-2"
              >
                <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {formatCurrency(quote.low)} – {formatCurrency(quote.high)}
                </span>
              </motion.div>

              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Includes {quote.crewSize}-person harness-certified crew (~
                {quote.estimatedHours} hrs on roof), corridor travel (
                {formatCurrency(quote.travelFee)}), and before/after storm photo
                proof.
              </p>

              {/* Itemized Micro-Breakdown */}
              <div className="mt-4 space-y-1.5 border-t border-slate-800 pt-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Base Roof Footprint</span>
                  <span>{formatCurrency(quote.baseAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Material / Pitch / Depth Factors
                  </span>
                  <span>
                    +
                    {formatCurrency(
                      quote.materialAdjustment +
                        quote.pitchAdjustment +
                        quote.depthAdjustment
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Corridor Dispatch Fee</span>
                  <span>+{formatCurrency(quote.travelFee)}</span>
                </div>
                {quote.addonItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sky-300"
                  >
                    <span>+ {item.label}</span>
                    <span>
                      {formatCurrency(item.priceLow)}–
                      {formatCurrency(item.priceHigh)}
                    </span>
                  </div>
                ))}
                {quote.flexibleRouteDayApplied ? (
                  <div className="flex justify-between font-bold text-emerald-400">
                    <span>{quote.routeDayDiscountLabel}</span>
                    <span>
                      -{formatCurrency(quote.routeDayDiscountLow)} to -
                      {formatCurrency(quote.routeDayDiscountHigh)}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-300">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span>
                  <strong className="text-white">Safety Protocol:</strong>{" "}
                  {quote.safetyMethod}
                </span>
              </div>
            </div>

            {/* Lead Capture Form OR Confirmation Card */}
            {successData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-5 text-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Quote Locked • Ref #{successData.referenceId}
                    </p>
                    <h3 className="text-lg font-extrabold text-white">
                      Dispatch Request Confirmed
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-200">
                  {successData.message} Our Highway 55 dispatch coordinator has
                  received your estimated range of{" "}
                  <strong className="text-white">
                    {formatCurrency(successData.estimateLow)} –{" "}
                    {formatCurrency(successData.estimateHigh)}
                  </strong>{" "}
                  for <strong>{successData.locationName}</strong>.
                </p>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={SITE_CONFIG.phoneHref}
                    onClick={() => trackPhoneClick("quote_confirmation_card")}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Need Urgent Aid? Call Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessData(null);
                      setSubmitError(null);
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800"
                  >
                    Edit Estimate
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    Lock In This Quote &amp; Schedule
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{quote.travelZone.dispatchWindow}</span>
                  </span>
                </div>

                {submitError ? (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/40 bg-red-950/40 px-3.5 py-2.5 text-xs text-red-200"
                  >
                    {submitError}
                  </div>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${id}-name`}
                      className="mb-1 block text-xs font-semibold text-slate-300"
                    >
                      Your Name *
                    </label>
                    <input
                      id={`${id}-name`}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${id}-phone`}
                      className="mb-1 block text-xs font-semibold text-slate-300"
                    >
                      Mobile Phone *
                    </label>
                    <input
                      id={`${id}-phone`}
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(208) 555-0192"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${id}-email`}
                    className="mb-1 block text-xs font-semibold text-slate-300"
                  >
                    Email (For Photo Proof &amp; Stripe Invoice) *
                  </label>
                  <input
                    id={`${id}-email`}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@cabinemail.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${id}-address`}
                    className="mb-1 block text-xs font-semibold text-slate-300"
                  >
                    Cabin / Property Street Address *
                  </label>
                  <input
                    id={`${id}-address`}
                    type="text"
                    required
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    placeholder={`e.g. 412 Pine Ridge Rd, ${
                      selectedLocation?.name || "McCall"
                    }, ID`}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${id}-timing`}
                    className="mb-1 block text-xs font-semibold text-slate-300"
                  >
                    Preferred Timing *
                  </label>
                  <select
                    id={`${id}-timing`}
                    value={preferredTiming}
                    onChange={(e) => setPreferredTiming(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
                  >
                    {TIMING_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Roof Photo Upload */}
                <div>
                  <label className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>Optional Roof Photo (Speeds Exact Confirmation)</span>
                    <Camera className="h-3.5 w-3.5 text-sky-400" />
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-950/70 px-3 py-2.5 text-xs font-medium text-slate-300 hover:border-sky-400 hover:text-white transition-colors">
                      <UploadCloud className="h-4 w-4 text-sky-400" />
                      <span className="truncate">
                        {photoName ? photoName : "Upload roof or eave photo (optional)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="sr-only"
                      />
                    </label>
                    {photoName ? (
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoName(null);
                          setPhotoDataUrl(null);
                          setPhotoError(null);
                        }}
                        aria-label="Remove uploaded photo"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                  {photoError ? (
                    <p className="mt-1 text-xs text-amber-400">{photoError}</p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor={`${id}-notes`}
                    className="mb-1 block text-xs font-semibold text-slate-300"
                  >
                    Gate Code / Driveway / Leak Notes (Optional)
                  </label>
                  <textarea
                    id={`${id}-notes`}
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any gate codes, driveway plow status, or spots where snow is drifting..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                </div>

                {/* Required Roof-Clearing Liability Waiver Consent */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-slate-300">
                    <input
                      type="checkbox"
                      checked={waiverAccepted}
                      onChange={(e) => {
                        setWaiverAccepted(e.target.checked);
                        if (e.target.checked) setWaiverError(null);
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-900 text-sky-500 accent-sky-500"
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
                      , including disclosure of hidden roof obstructions and
                      snow drop-zones.
                    </span>
                  </label>
                  {waiverError ? (
                    <p
                      role="alert"
                      className="mt-1.5 text-xs font-semibold text-amber-400"
                    >
                      {waiverError}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !waiverAccepted}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Locking In Quote &amp; Alerting Dispatch...</span>
                    </>
                  ) : (
                    <span>Lock In This Quote &amp; Schedule</span>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  No upfront payment required. Final invoice sent via Stripe with
                  before &amp; after photos.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
