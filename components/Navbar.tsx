"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MountainSnow, Phone, ShieldAlert, X, Calculator } from "lucide-react";
import { SITE_CONFIG } from "@/lib/services";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0F172A]/95 text-[#F8FAFC] backdrop-blur-md">
      {/* Top Emergency Storm Dispatch Strip */}
      <div className="border-b border-slate-800 bg-slate-950/90 px-4 py-1.5 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-amber-400 uppercase tracking-wider">
              {SITE_CONFIG.dispatchBadge}
            </span>
            <span className="hidden sm:inline text-slate-400">
              • Serving Hwy 55 &amp; Boise Basin (Boise Foothills to McCall)
            </span>
          </div>
          <a
            href={SITE_CONFIG.phoneHref}
            className="inline-flex items-center gap-1.5 font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Direct Storm Desk: {SITE_CONFIG.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-slate-950 shadow-md shadow-sky-500/20">
            <MountainSnow className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-lg font-extrabold tracking-tight text-white leading-none">
              Idaho Snow Co.
            </span>
            <span className="block text-[11px] font-medium tracking-wider text-sky-400 uppercase mt-0.5">
              Hwy 55 &amp; Alpine Roof Care
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          <Link
            href="/services/roof-snow-removal"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Roof Snow Removal
          </Link>
          <Link
            href="/services/ice-dam-removal"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Ice Dam Removal
          </Link>
          <Link
            href="/services/cabin-snow-monitoring"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Cabin Monitoring
          </Link>
          <Link
            href="/locations"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Service Areas (11 Towns)
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-300 hover:bg-sky-500/25 transition-colors"
          >
            <Calculator className="h-4 w-4" />
            <span>Instant Quote</span>
          </Link>
          <a
            href={SITE_CONFIG.phoneHref}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-colors"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>{SITE_CONFIG.phoneDisplay}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen ? (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl bg-sky-500/15 px-4 py-2.5 text-sm font-semibold text-sky-300"
            >
              Instant Quote Calculator
            </Link>
            <Link
              href="/services/roof-snow-removal"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Roof Snow Removal
            </Link>
            <Link
              href="/services/ice-dam-removal"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Ice Dam Mitigation &amp; Eave Relief
            </Link>
            <Link
              href="/services/cabin-snow-monitoring"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Out-of-Town Cabin Monitoring
            </Link>
            <Link
              href="/locations"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              All 11 Corridor Service Areas
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
