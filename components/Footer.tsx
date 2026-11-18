import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { LOCATIONS } from "@/lib/locations";
import { SERVICES, SITE_CONFIG } from "@/lib/services";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0F172A] text-slate-300 pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <BrandLogo className="h-10 w-10 shrink-0 rounded-xl shadow-md shadow-sky-500/20" />
              <div>
                <span className="block text-lg font-extrabold text-white">
                  Idaho Snow Co.
                </span>
                <span className="block text-xs text-sky-400">
                  Roof Snow &amp; Ice Dam Specialists
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Rugged, roof-safe snow unloading and ice dam mitigation across the
              Highway 55 corridor, Payette River Basin, and Boise Foothills.
            </p>
            <div className="space-y-2 pt-1 text-sm">
              <a
                href={SITE_CONFIG.phoneHref}
                className="flex items-center gap-2 font-semibold text-amber-400 hover:text-amber-300"
              >
                <Phone className="h-4 w-4" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-sky-400"
              >
                <Mail className="h-4 w-4" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <p className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 shrink-0 text-sky-400" />
                <span>Boise Foothills to McCall, Idaho</span>
              </p>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Core Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Instant Roof Quote Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/snow-load-calculator"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Roof Snow-Load (PSF) Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/property-managers"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  STR Hosts, HOAs &amp; Property Managers
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  Winter Roof &amp; Ice Dam Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  Corridor Service Area Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  Service Terms &amp; Liability Waiver
                </Link>
              </li>
            </ul>
          </div>

          {/* North Valley Corridor */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Payette Valley &amp; North
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {LOCATIONS.slice(0, 6).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {loc.name} ({loc.zipCodes.join(", ")})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Canyon & Boise Basin */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Canyon &amp; Boise Basin
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {LOCATIONS.slice(6).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {loc.name} ({loc.zipCodes.join(", ")})
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/70 p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Out-of-Town Cabin Verified</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Before &amp; after photo reports plus instant Stripe invoicing for
                Boise and out-of-state cabin owners.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName} All rights
            reserved.
          </p>
          <p>
            Fully insured mountain roof snow removal • Non-marring polymer blades •{" "}
            <Link href="/terms" className="underline hover:text-slate-300">
              Service Terms &amp; Waiver
            </Link>{" "}
            • {SITE_CONFIG.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
