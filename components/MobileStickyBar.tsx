"use client";

import Link from "next/link";
import { Calculator, Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";
import { SITE_CONFIG } from "@/lib/services";

export function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-[#0F172A]/95 px-3 py-2.5 backdrop-blur-md md:hidden"
      role="region"
      aria-label="Mobile quick actions"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5">
        <Link
          href="/quote"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-3 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 active:scale-[0.99]"
        >
          <Calculator className="h-4 w-4 shrink-0" />
          <span>Get Instant Quote</span>
        </Link>
        <a
          href={SITE_CONFIG.phoneHref}
          onClick={() => trackPhoneClick("mobile_sticky_bar")}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 active:scale-[0.99]"
        >
          <Phone className="h-4 w-4 shrink-0" />
          <span>Call {SITE_CONFIG.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
