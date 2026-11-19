import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Scale,
} from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { getGuideBySlug, GUIDES } from "@/lib/guides";
import { getLocationBySlug, type LocationData } from "@/lib/locations";
import {
  buildBreadcrumbSchema,
  buildOgImageUrl,
  buildOgImages,
} from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/services";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const canonicalPath = `/guides/${guide.slug}`;
  const fullTitle = `${guide.shortTitle} | Idaho Snow Co.`;
  const ogSubtitle = "Idaho Snow Co. Winter Guide";

  return {
    title: guide.shortTitle,
    description: guide.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: fullTitle,
      description: guide.description,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: buildOgImages({
        title: guide.title,
        subtitle: ogSubtitle,
        category: guide.category,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: guide.description,
      images: [
        buildOgImageUrl({
          title: guide.title,
          subtitle: ogSubtitle,
          category: guide.category,
        }),
      ],
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedLocations = guide.relatedLocationSlugs
    .map((lSlug) => getLocationBySlug(lSlug))
    .filter((loc): loc is LocationData => Boolean(loc));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.businessName,
      url: SITE_CONFIG.domain,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.businessName,
      url: SITE_CONFIG.domain,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.domain}/guides/${guide.slug}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Winter Guides", path: "/guides" },
    { name: guide.shortTitle, path: `/guides/${guide.slug}` },
  ]);

  const midPointIndex = Math.floor(guide.sections.length / 2);

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      <section className="bg-[#0F172A] px-4 pt-16 pb-12 text-white sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-sky-400">
              Home
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-sky-400">
              Winter Guides
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">{guide.category}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-3 py-1 font-bold text-sky-300">
              <BookOpen className="h-3.5 w-3.5" />
              {guide.category}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <Clock className="h-3.5 w-3.5" />
              {guide.readTime}
            </span>
            <span className="text-slate-400">Updated {guide.updatedAt}</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {guide.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Article Body */}
          <article className="space-y-8 lg:col-span-8">
            {guide.sections.map((section, idx) => (
              <div key={section.id}>
                <section
                  id={section.id}
                  className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <ul className="mt-5 space-y-2.5 rounded-2xl bg-slate-50 p-5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm font-medium text-slate-800"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>

                {/* Embedded Mid-Article CTA */}
                {idx === midPointIndex - 1 ? (
                  <div className="mt-8 rounded-3xl border border-sky-400/30 bg-[#0F172A] p-6 text-white shadow-xl sm:p-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                          Need Fast Roof Relief?
                        </span>
                        <h3 className="mt-1 text-xl font-extrabold">
                          See Your Instant Clearing Price Range in 30 Seconds
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">
                          Check your exact town along Highway 55 or calculate your
                          roof&apos;s PSF snow load first.
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Link
                          href="/quote"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-400"
                        >
                          <Calculator className="h-4 w-4" />
                          <span>Instant Quote</span>
                        </Link>
                        <Link
                          href="/snow-load-calculator"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-sky-300 hover:bg-slate-800"
                        >
                          <Scale className="h-4 w-4" />
                          <span>PSF Tool</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}

            {/* End-of-Article CTA */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0F172A] to-slate-900 p-8 text-white shadow-xl">
              <h2 className="text-2xl font-extrabold">
                Ready to Protect Your Cabin Roof Before the Next Storm?
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                Get transparent instant range pricing for McCall, Donnelly,
                Cascade, Garden Valley, Crouch, Idaho City, and Boise Foothills—with
                timestamped before/after photo proof on every visit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-sky-400"
                >
                  <span>Lock In Your Quote Online</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-amber-400"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call {SITE_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Article FAQs */}
            <div className="pt-4">
              <FaqAccordion items={guide.faqs} heading="Frequently Asked Questions" />
            </div>
          </article>

          {/* Sticky Sidebar: TOC & Corridor Town Links */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                  Table of Contents
                </h2>
                <nav className="mt-4 space-y-2.5">
                  {guide.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                  Local Corridor Pages
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Town-specific snow load specs &amp; pre-filled calculators:
                </p>
                <div className="mt-4 space-y-2">
                  {relatedLocations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 hover:border-sky-400 hover:bg-white hover:text-sky-700"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-sky-600" />
                        {loc.name}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-sky-600" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
