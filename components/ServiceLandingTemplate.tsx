import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck } from "lucide-react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { LOCATIONS } from "@/lib/locations";
import { SITE_CONFIG, type ServiceDefinition } from "@/lib/services";

interface ServiceLandingTemplateProps {
  service: ServiceDefinition;
  defaultLocationSlug?: string;
}

export function ServiceLandingTemplate({
  service,
  defaultLocationSlug = "mccall",
}: ServiceLandingTemplateProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE_CONFIG.businessName,
      telephone: "+1-208-965-4285",
      url: SITE_CONFIG.domain,
    },
    areaServed: LOCATIONS.map((loc) => ({
      "@type": "City",
      name: `${loc.name}, ID`,
      postalCode: loc.zipCodes.join(", "),
    })),
    url: `${SITE_CONFIG.domain}${service.href}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <JsonLd data={[serviceSchema, faqSchema]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_50%)]"
        />

        <div className="relative mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{service.badge}</span>
          </span>

          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            {service.headline}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {service.description}
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <a
              href="#service-quote-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-4 text-sm font-extrabold text-slate-950 hover:bg-sky-400 transition-colors"
            >
              <span>Get Instant Estimate</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-sm font-extrabold text-slate-950 hover:bg-amber-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call {SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Highlights & 3-Step Process */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-5">
            <h2 className="text-xl font-extrabold text-slate-900">
              What&apos;s Included With {service.shortTitle}
            </h2>
            <ul className="mt-5 space-y-3.5">
              {service.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {service.processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-black text-sky-700">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-base font-extrabold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Calculator */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <QuoteCalculator
          defaultLocationSlug={defaultLocationSlug}
          id="service-quote-calculator"
        />
      </section>

      {/* Corridor Quick Links */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900">
            Communities Covered for {service.title}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-800 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-sky-600" />
                <span>
                  {loc.name} ({loc.zipCodes[0]})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="mx-auto max-w-4xl px-4 pt-14 sm:px-6 lg:px-8">
        <FaqAccordion
          items={service.faqs}
          heading={`${service.shortTitle} FAQs`}
        />
      </section>
    </div>
  );
}
