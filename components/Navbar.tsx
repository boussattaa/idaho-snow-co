"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ChevronDown,
  Menu,
  ShieldAlert,
  X,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { trackPhoneClick } from "@/lib/analytics";
import { SERVICES, SITE_CONFIG } from "@/lib/services";
import { STORM_BANNER_CONFIG } from "@/lib/site-config";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0F172A]/95 text-[#F8FAFC] backdrop-blur-md">
      {/* Configurable Dismissible Storm Alert Banner */}
      {STORM_BANNER_CONFIG.enabled && !bannerDismissed ? (
        <div className="border-b border-amber-500/30 bg-gradient-to-r from-amber-500/20 via-slate-900 to-sky-500/20 px-4 py-2 text-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 font-medium text-amber-100">
              <span>{STORM_BANNER_CONFIG.text}</span>
              <Link
                href={STORM_BANNER_CONFIG.ctaHref}
                className="inline-flex items-center whitespace-nowrap rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-extrabold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                {STORM_BANNER_CONFIG.ctaLabel} &rarr;
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss storm alert banner"
              className="rounded-lg p-1 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Main Nav Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 group whitespace-nowrap">
          <BrandLogo className="h-10 w-10 shrink-0 rounded-xl shadow-md shadow-sky-500/20 transition-transform group-hover:scale-105" />
          <div>
            <span className="block whitespace-nowrap text-lg font-extrabold tracking-tight text-white leading-none">
              Idaho Snow Co.
            </span>
            <span className="block whitespace-nowrap text-[11px] font-medium tracking-wider text-sky-400 uppercase mt-0.5">
              Hwy 55 &amp; Alpine Roof Care
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Main navigation">
          <div
            ref={servicesMenuRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="inline-flex items-center gap-1 whitespace-nowrap py-1.5 text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${
                  servicesOpen ? "rotate-180 text-sky-400" : ""
                }`}
              />
            </button>

            {servicesOpen ? (
              <div className="absolute left-0 top-full z-50 w-72 pt-2">
                <div
                  role="menu"
                  className="rounded-2xl border border-slate-700/80 bg-slate-950/95 p-2 shadow-2xl shadow-slate-950/70 backdrop-blur-md"
                >
                  {SERVICES.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={svc.href}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-slate-800/80"
                    >
                      <span className="block whitespace-nowrap text-sm font-semibold text-white">
                        {svc.shortTitle}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-slate-400">
                        {svc.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Link
            href="/locations"
            className="whitespace-nowrap text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Service Areas
          </Link>
          <Link
            href="/snow-load-calculator"
            className="whitespace-nowrap text-sm font-medium text-sky-300 hover:text-sky-200 transition-colors"
          >
            PSF Weight Tool
          </Link>
          <Link
            href="/guides"
            className="whitespace-nowrap text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/property-managers"
            className="whitespace-nowrap text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            STR &amp; HOAs
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link
            href="/quote"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-sky-400/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-300 hover:bg-sky-500/25 transition-colors"
          >
            <Calculator className="h-4 w-4 shrink-0" />
            <span>Instant Quote</span>
          </Link>
          <a
            href={SITE_CONFIG.phoneHref}
            onClick={() => trackPhoneClick("navbar_cta")}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-colors"
          >
            <ShieldAlert className="h-4 w-4 shrink-0" />
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
              href="/snow-load-calculator"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-300"
            >
              Roof Snow-Load (PSF) Weight Calculator
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
              href="/property-managers"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Property Managers, HOAs &amp; STR Hosts
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              Winter Roof &amp; Ice Dam Guides
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
