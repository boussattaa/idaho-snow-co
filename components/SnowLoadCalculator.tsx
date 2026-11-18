"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Gauge,
  Info,
  Phone,
  ShieldAlert,
  Snowflake,
} from "lucide-react";
import { trackPhoneClick, trackPsfCalculated } from "@/lib/analytics";
import type { SnowDepthId } from "@/lib/pricing";
import { SITE_CONFIG } from "@/lib/services";

interface SnowTypeOption {
  id: string;
  label: string;
  densityLbFt3: number;
  description: string;
}

const SNOW_TYPES: SnowTypeOption[] = [
  {
    id: "powder",
    label: "Light Powder (~7 lb/ft³)",
    densityLbFt3: 7,
    description: "Fresh dry cold-weather mountain storm snow before wind settling.",
  },
  {
    id: "settled",
    label: "Settled Winter Snow (~15 lb/ft³)",
    densityLbFt3: 15,
    description: "Compacted multi-week snowpack common in McCall & Donnelly.",
  },
  {
    id: "wet",
    label: "Heavy Wet Cascade/McCall Snow (~22 lb/ft³)",
    densityLbFt3: 22,
    description: "Dense Pacific moisture storm snow with high water weight.",
  },
  {
    id: "ice",
    label: "Ice / Rain-on-Snow Crust (~32 lb/ft³)",
    densityLbFt3: 32,
    description: "Saturated snowpack after warm rain or basal freeze-thaw crust.",
  },
];

interface StructureBenchmark {
  id: string;
  label: string;
  safeLimitPsf: number;
  criticalLimitPsf: number;
  note: string;
}

const STRUCTURE_BENCHMARKS: StructureBenchmark[] = [
  {
    id: "modern-mountain",
    label: "Modern Mountain Cabin (90–120 PSF)",
    safeLimitPsf: 65,
    criticalLimitPsf: 95,
    note: "Newer engineered Valley County cabins (typical 95–130 psf ground/roof spec).",
  },
  {
    id: "foothill-canyon",
    label: "Standard Foothill / Canyon Home (65–85 PSF)",
    safeLimitPsf: 45,
    criticalLimitPsf: 70,
    note: "Typical Garden Valley, Crouch, Idaho City & Boise Foothills residences.",
  },
  {
    id: "older-garage",
    label: "Older Cabin / Detached Garage / Carport (45–60 PSF)",
    safeLimitPsf: 30,
    criticalLimitPsf: 50,
    note: "Pre-1990 cabins, boathouses, RV covers & low-pitch outbuildings.",
  },
];

export function SnowLoadCalculator() {
  const [depthInches, setDepthInches] = useState<number>(32);
  const [snowTypeId, setSnowTypeId] = useState<string>("settled");
  const [roofSqFt, setRoofSqFt] = useState<number>(2200);
  const [benchmarkId, setBenchmarkId] = useState<string>("foothill-canyon");

  const snowType = useMemo(
    () => SNOW_TYPES.find((s) => s.id === snowTypeId) ?? SNOW_TYPES[1],
    [snowTypeId]
  );

  const benchmark = useMemo(
    () =>
      STRUCTURE_BENCHMARKS.find((b) => b.id === benchmarkId) ??
      STRUCTURE_BENCHMARKS[1],
    [benchmarkId]
  );

  const result = useMemo(() => {
    const depthFeet = depthInches / 12;
    const psf = Number((depthFeet * snowType.densityLbFt3).toFixed(1));
    const totalPounds = Math.round(psf * roofSqFt);
    const totalTons = Number((totalPounds / 2000).toFixed(1));

    let riskLevel:
      | "Safe"
      | "Monitor"
      | "High Load — Schedule Clearing"
      | "Critical Structural Risk" = "Safe";
    let riskBadgeColor = "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
    let gaugeColor = "bg-emerald-400";
    let recommendation =
      "Current roof load is within normal winter tolerances. Keep valleys and eaves clear of pine needles.";

    if (psf >= benchmark.criticalLimitPsf) {
      riskLevel = "Critical Structural Risk";
      riskBadgeColor = "bg-red-500/20 text-red-300 border-red-500/50";
      gaugeColor = "bg-red-500";
      recommendation =
        "Roof load is at or above safe structural guidelines for this building class. Watch for sticking interior doors or drywall cracks and schedule Priority Dispatch immediately.";
    } else if (psf >= benchmark.safeLimitPsf) {
      riskLevel = "High Load — Schedule Clearing";
      riskBadgeColor = "bg-amber-500/20 text-amber-300 border-amber-500/50";
      gaugeColor = "bg-amber-400";
      recommendation =
        "Weight is approaching structural warning thresholds. One additional wet storm or rain-on-snow surge can double roof pressure overnight—schedule balanced unloading.";
    } else if (psf >= benchmark.safeLimitPsf * 0.65) {
      riskLevel = "Monitor";
      riskBadgeColor = "bg-sky-500/20 text-sky-300 border-sky-500/40";
      gaugeColor = "bg-sky-400";
      recommendation =
        "Moderate snowpack present. Monitor north-facing eaves and valleys for ice dam buildup during daytime freeze-thaw cycles.";
    }

    const gaugePercent = Math.min(
      100,
      Math.max(6, Math.round((psf / (benchmark.criticalLimitPsf * 1.15)) * 100))
    );

    const mappedDepthTier: SnowDepthId =
      depthInches < 24 ? "1-2-ft" : depthInches < 48 ? "2-4-ft" : "4-plus-ft";

    return {
      depthFeet: Number(depthFeet.toFixed(1)),
      psf,
      totalPounds,
      totalTons,
      riskLevel,
      riskBadgeColor,
      gaugeColor,
      recommendation,
      gaugePercent,
      mappedDepthTier,
    };
  }, [depthInches, snowType, roofSqFt, benchmark]);

  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    trackPsfCalculated({
      depthInches,
      snowType: snowType.id,
      psf: result.psf,
      riskLevel: result.riskLevel,
    });
  }, [depthInches, snowType.id, result.psf, result.riskLevel]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-[#0F172A] p-5 text-white shadow-2xl sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Controls */}
        <div className="space-y-6 lg:col-span-7">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
              <Gauge className="h-3.5 w-3.5" />
              <span>Interactive Structural Estimator</span>
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              Calculate Your Roof&apos;s Snow Weight (PSF)
            </h2>
            <p className="mt-1.5 text-sm text-slate-300">
              Adjust depth, snow moisture type, and building age to compare
              against typical Valley County &amp; Boise Basin roof thresholds.
            </p>
          </div>

          {/* 1. Snow Depth Slider */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="psf-depth-slider"
                className="text-sm font-bold text-white"
              >
                1. Measured Snow Depth on Roof
              </label>
              <span className="rounded-xl bg-sky-500/15 px-3 py-1 text-sm font-extrabold text-sky-300">
                {depthInches}&Prime; ({result.depthFeet} ft)
              </span>
            </div>
            <input
              id="psf-depth-slider"
              type="range"
              min={6}
              max={84}
              step={2}
              value={depthInches}
              onChange={(e) => setDepthInches(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-400"
            />
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>6&Prime; (0.5 ft)</span>
              <span>24&Prime; (2 ft)</span>
              <span>48&Prime; (4 ft)</span>
              <span>72&Prime;+ (6 ft+)</span>
            </div>
          </div>

          {/* 2. Snow Type */}
          <div>
            <p className="mb-2.5 text-sm font-bold text-white">
              2. Snow Density &amp; Moisture Type
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {SNOW_TYPES.map((opt) => {
                const active = opt.id === snowTypeId;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSnowTypeId(opt.id)}
                    className={`rounded-xl border p-3.5 text-left transition-all ${
                      active
                        ? "border-sky-400 bg-sky-500/15 ring-1 ring-sky-400"
                        : "border-slate-800 bg-slate-900/70 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white">
                        {opt.label}
                      </span>
                      <Snowflake
                        className={`h-4 w-4 shrink-0 ${
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

          {/* 3. Building Benchmark & Roof Area */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="psf-benchmark"
                className="mb-2 block text-sm font-bold text-white"
              >
                3. Roof Framing Benchmark
              </label>
              <select
                id="psf-benchmark"
                value={benchmarkId}
                onChange={(e) => setBenchmarkId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 text-sm text-white focus:border-sky-400 focus:outline-none"
              >
                {STRUCTURE_BENCHMARKS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-400">{benchmark.note}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="psf-area"
                  className="text-sm font-bold text-white"
                >
                  4. Estimated Roof Area
                </label>
                <span className="text-xs font-bold text-sky-300">
                  {roofSqFt.toLocaleString()} sq ft
                </span>
              </div>
              <input
                id="psf-area"
                type="range"
                min={1000}
                max={5000}
                step={200}
                value={roofSqFt}
                onChange={(e) => setRoofSqFt(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-400"
              />
              <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                <span>1,000 sq ft</span>
                <span>3,000 sq ft</span>
                <span>5,000 sq ft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Risk Gauge & CTA */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-slate-700 bg-slate-900/95 p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Estimated Roof Pressure
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold ${result.riskBadgeColor}`}
              >
                {result.riskLevel === "Safe" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : result.riskLevel === "Monitor" ? (
                  <Info className="h-3.5 w-3.5" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
                <span>{result.riskLevel}</span>
              </span>
            </div>

            <motion.div
              key={result.psf}
              initial={{ opacity: 0.7, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="mt-4 flex items-baseline gap-2"
            >
              <span className="text-4xl font-black text-white sm:text-5xl">
                {result.psf}
              </span>
              <span className="text-base font-bold text-sky-400">
                lbs / sq ft (PSF)
              </span>
            </motion.div>

            <p className="mt-2 text-sm text-slate-300">
              Total weight across your {roofSqFt.toLocaleString()} sq ft roof:{" "}
              <strong className="text-white">
                {result.totalPounds.toLocaleString()} lbs ({result.totalTons}{" "}
                tons)
              </strong>
            </p>

            {/* Visual Risk Gauge Bar */}
            <div className="mt-6">
              <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-slate-400">
                <span>Safe</span>
                <span>Monitor</span>
                <span>High ({benchmark.safeLimitPsf}+ PSF)</span>
                <span>Critical ({benchmark.criticalLimitPsf}+)</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${result.gaugeColor}`}
                  style={{ width: `${result.gaugePercent}%` }}
                />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs leading-relaxed text-slate-300">
              {result.recommendation}
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href={`/quote?depth=${result.mappedDepthTier}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-colors"
              >
                <Calculator className="h-4 w-4" />
                <span>Get Instant Clearing Quote for This Depth</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={SITE_CONFIG.phoneHref}
                onClick={() => trackPhoneClick("psf_calculator_card")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                <span>Emergency Load? Call {SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            <p className="mt-4 flex items-start gap-2 text-[11px] text-slate-400">
              <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
              <span>
                PSF estimator provides general educational guidance based on NOAA
                &amp; ASCE snow-density averages and does not replace a structural
                engineer inspection.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
