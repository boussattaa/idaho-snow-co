import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Camera,
  CheckCircle2,
  CreditCard,
  MapPin,
  MountainSnow,
  Phone,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Truck,
  Wrench,
} from "lucide-react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { getLocationsByCorridorZone } from "@/lib/locations";
import { HOMEPAGE_FAQS, SERVICES, SITE_CONFIG } from "@/lib/services";

export default function HomePage() {
  const corridorGroups = getLocationsByCorridorZone();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0F172A] text-[#F8FAFC]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_45%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Highway 55 &amp; Boise Basin Storm Load Dispatch</span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.06]">
                Protect Your Mountain Roof Before Heavy Snow{" "}
                <span className="text-sky-400">Turns Into Damage.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Trusted by McCall, Tamarack, Cascade, and Garden Valley cabin
                owners, second-home families, and short-term rental hosts.
                Roof-safe polymer clearing, ice dam relief, and timestamped photo
                proof—with transparent instant quotes in 30 seconds.
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href="#quote-calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-4 text-base font-extrabold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 transition-colors"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-base font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call {SITE_CONFIG.phoneDisplay}</span>
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sky-400" />
                  Standing Seam, Shingle &amp; Cedar Shake Safe
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sky-400" />
                  Before &amp; After Photo Proof Sent to Your Phone
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sky-400" />
                  11 Mountain Towns Covered
                </span>
              </div>
            </div>

            {/* Hero Right Panel — Alpine Risk Snapshot */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
                      <Snowflake className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-sky-400">
                        Snow Load Reality Check
                      </p>
                      <p className="text-sm font-bold text-white">
                        Boise to McCall Corridor
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-300">
                    Active Season
                  </span>
                </div>

                <div className="mt-5 space-y-3.5 text-sm">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>3 ft Dry Powder</span>
                      <span className="text-sky-400">~22–28 lbs / sq ft</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      Manageable early season, but rapid drifting around dormers
                      concentrates double loads.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>3–4 ft Wet / Rain-On-Snow</span>
                      <span className="text-amber-400">60–90+ lbs / sq ft</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300">
                      On a 2,200 sq ft roof, that equals{" "}
                      <strong className="text-white">65+ tons</strong> pressing
                      down on rafters &amp; trusses—triggering doors sticking and
                      ice dams.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-xs">
                  <Link
                    href="/snow-load-calculator"
                    className="inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:text-amber-200"
                  >
                    <Scale className="h-3.5 w-3.5" />
                    <span>Calculate Roof PSF Load</span>
                  </Link>
                  <Link
                    href="/quote"
                    className="font-bold text-sky-400 hover:text-sky-300"
                  >
                    Price Clearing &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Roof-Safe Polymer Tools
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Zero metal blades on painted metal or shingles—protects granules
                and warranties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <Camera className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Out-of-Town Photo Proof
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Timestamped before &amp; after photos sent straight to your
                phone upon finish.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Fast Hwy 55 Corridor Dispatch
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Dedicated crews traveling weekly from Boise Foothills up to
                McCall &amp; Tamarack.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Insured &amp; Harness-Rigged
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                OSHA fall-arrest rigging built for steep A-frames, multi-story
                chalets &amp; ice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
            Mountain Roof Protection
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Complete Winter Roof &amp; Ice Care
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Whether you need emergency load reduction during a McCall storm or
            hands-off storm monitoring for a Garden Valley rental, we cover every
            step.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
            >
              <div>
                <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                  {service.badge}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs font-medium text-slate-700 sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-2">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700"
                >
                  <span>Explore {service.shortTitle}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMBEDDED INTERACTIVE INSTANT QUOTE CALCULATOR */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <QuoteCalculator defaultLocationSlug="mccall" id="quote-calculator" />
      </section>

      {/* INTERACTIVE SERVICE AREA CORRIDOR GRID */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                Boise to McCall Snow Corridor
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                11 Mountain Towns &amp; Canyon Communities Served
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Click your community for local snow-load stats, neighborhood
                coverage, and a quote calculator pre-set to your town.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              <span>View Corridor Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 space-y-10">
            {corridorGroups.map((group) => (
              <div key={group.zoneId}>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-700">
                  <MountainSnow className="h-4 w-4 text-sky-600" />
                  <span>{group.zoneTitle}</span>
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.locations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:border-sky-400 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-sky-600" />
                            <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-sky-700">
                              {loc.name}
                            </h4>
                          </div>
                          <p className="mt-1 text-xs font-medium text-slate-500">
                            ZIP {loc.zipCodes.join(" / ")} • {loc.elevationFt}
                          </p>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
                          {loc.designSnowLoad}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        {loc.tagline}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-sky-600">
                        <span>{loc.name} Roof Snow Quote</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
            Simple Dispatch Workflow
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How It Works — Zero Guesswork
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-base font-black text-sky-700">
              01
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              Instant Online Estimate
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Pick your mountain town, roof material, pitch, and snow depth to
              see transparent range pricing immediately—then lock your slot in
              30 seconds.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-base font-black text-amber-700">
              02
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              Roof-Safe Balanced Clearing
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Harness-rigged technicians unload both gable sides evenly with
              non-marring polymer tools—leaving protective snow cushions over
              shingles and relieving eave ice.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-base font-black text-emerald-700">
              03
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              Timestamped Photo Proof &amp; Stripe Pay
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Even if you&apos;re in Boise or out of state, you receive clear
              before-and-after roof photos via text/email plus a one-click
              online Stripe invoice.
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER VISUAL SHOWCASE + ROOF-SAFE EQUIPMENT GUARANTEE */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                Proof of Precision
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Before &amp; After Roof Clearing Showcase
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Every visit concludes with timestamped before-and-after roof,
                eave, and deck photo proof—protecting luxury cabins, standing
                seam panels, and architectural shingles across the corridor.
              </p>
            </div>
            <Link
              href="/snow-load-calculator"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-xs font-extrabold text-sky-800 hover:bg-sky-100 transition-colors"
            >
              <Scale className="h-4 w-4" />
              <span>Check Your Roof PSF Weight &rarr;</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Case 1: McCall A-Frame */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>McCall / Payette Lake (83638) • Shingle A-Frame</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-800">
                  1.5&Prime; Cushion Preserved
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Image
                  src="/images/before-after/mccall-aframe-before.svg"
                  alt="Before clearing: 46-inch heavy snow load and icicles on McCall A-frame"
                  width={800}
                  height={500}
                  className="aspect-[16/10] w-full rounded-xl border border-slate-200 object-cover"
                />
                <Image
                  src="/images/before-after/mccall-aframe-after.svg"
                  alt="After clearing: Balanced roof snow removal and open eave channels in McCall"
                  width={800}
                  height={500}
                  className="aspect-[16/10] w-full rounded-xl border border-slate-200 object-cover"
                />
              </div>
            </div>

            {/* Case 2: Tamarack / Donnelly Standing Seam */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Donnelly / Tamarack (83615) • Standing Seam Metal</span>
                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-sky-800">
                  Zero Metal Blades Used
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Image
                  src="/images/before-after/tamarack-metal-before.svg"
                  alt="Before clearing: Drifted asymmetric snow load and eave ice dam in Donnelly"
                  width={800}
                  height={500}
                  className="aspect-[16/10] w-full rounded-xl border border-slate-200 object-cover"
                />
                <Image
                  src="/images/before-after/tamarack-metal-after.svg"
                  alt="After clearing: Polymer-blade cleared standing seam roof and dry eaves"
                  width={800}
                  height={500}
                  className="aspect-[16/10] w-full rounded-xl border border-slate-200 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Roof-Safe Equipment Guarantee Strip */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-sky-200 bg-sky-50/70 p-5 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Poly-Blade Shovels Only
                </h3>
                <p className="mt-0.5 text-xs text-slate-600">
                  100% HDPE polymer edges—never steel blades touching Kynar
                  metal or shingle surfaces.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Snowflake className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Non-Marring Roof Rakes
                </h3>
                <p className="mt-0.5 text-xs text-slate-600">
                  Cushioned rollers &amp; cushioned blades leave a safe buffer
                  to protect roof warranties.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Full Winter Liability Protection
                </h3>
                <p className="mt-0.5 text-xs text-slate-600">
                  OSHA fall-arrest rigging &amp; commercial winter roof coverage
                  for multi-story lodges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIC RESOURCES & B2B PARTNER BAR */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/guides"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-sky-400 hover:shadow-md"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600">
                <BookOpen className="h-4 w-4" />
                <span>Homeowner Knowledge Base</span>
              </span>
              <h3 className="mt-2 text-xl font-extrabold text-slate-900 group-hover:text-sky-700">
                Idaho Cabin Roof &amp; Ice Dam Guides
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                PSF limits, standing seam vs. shingle safety, and McCall ice
                prevention checklists.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-sky-600 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/property-managers"
            className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-amber-400 hover:shadow-md"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600">
                <Building2 className="h-4 w-4" />
                <span>B2B &amp; Vacation Rentals</span>
              </span>
              <h3 className="mt-2 text-xl font-extrabold text-slate-900 group-hover:text-amber-700">
                For Property Managers, HOAs &amp; STR Hosts
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Multi-cabin volume pricing, Friday check-in priority dispatch,
                and consolidated Stripe billing.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-amber-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* OUT-OF-TOWN CABIN OWNER & STR SECTION */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#0F172A] text-white shadow-xl">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
                <Camera className="h-3.5 w-3.5" />
                <span>Built for 2nd-Home Owners &amp; Airbnb / VRBO Hosts</span>
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Own a Cabin in McCall, Tamarack, or Garden Valley From Afar?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Don&apos;t drive up slick Highway 55 in a blizzard just to check
                your roof load or argue over cash checks. Our remote owner
                workflow handles everything cleanly from inspection to payment.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <Camera className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Before &amp; After Photo Proof
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Timestamped photos of gables, valleys, eaves, and cleared
                      entryways sent right when we finish.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Online Stripe Invoicing
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Pay cleanly online by card or ACH—easy PDF receipts for
                      STR bookkeeping and HOA/insurance records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
                <h3 className="text-lg font-extrabold text-white">
                  Popular Cabin Add-Ons
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
                    <span>Storm-threshold automated snow checks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
                    <span>Rear deck, hot tub &amp; guest stairs clearing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
                    <span>Propane tank &amp; exhaust vent snow excavation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
                    <span>Ice dam eave channel relief before guest arrivals</span>
                  </li>
                </ul>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <Link
                    href="/services/cabin-snow-monitoring"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400"
                  >
                    See Monitoring Plan
                  </Link>
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Instant Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <FaqAccordion
          items={HOMEPAGE_FAQS}
          heading="Frequently Asked Questions — Idaho Roof Snow & Ice Removal"
        />
      </section>
    </>
  );
}
