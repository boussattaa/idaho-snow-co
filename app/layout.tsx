import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { JsonLd } from "@/components/JsonLd";
import { LOCATIONS } from "@/lib/locations";
import { buildOgImageUrl, buildOgImages } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/services";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const DEFAULT_TITLE =
  "Idaho Snow Co. | Roof Snow & Ice Dam Removal (McCall to Boise)";
const DEFAULT_DESCRIPTION =
  "Roof-safe snow & ice dam removal across Highway 55 from Boise to McCall, Donnelly, Cascade & Garden Valley. Get your instant online quote in 60 seconds.";

const defaultOgTitle = "Roof Snow & Ice Dam Removal";
const defaultOgSubtitle =
  "McCall • Donnelly • Cascade • Garden Valley | Instant Online Quotes";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Idaho Snow Co.",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/logo.png"],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_CONFIG.businessName,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: buildOgImages({
      title: defaultOgTitle,
      subtitle: defaultOgSubtitle,
      alt: "Idaho Snow Co. — Roof Snow & Ice Dam Removal",
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      buildOgImageUrl({
        title: defaultOgTitle,
        subtitle: defaultOgSubtitle,
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_CONFIG.businessName,
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}/logo.png`,
    image: `${SITE_CONFIG.domain}/logo.png`,
    telephone: "+1-208-965-4285",
    email: SITE_CONFIG.email,
    priceRange: "$$",
    description:
      "Professional roof snow removal, ice dam mitigation, and second-home cabin snow monitoring serving the Highway 55 corridor and Boise Basin mountain communities.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "ID",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    knowsAbout: [
      "Roof Snow Removal",
      "Ice Dam Mitigation",
      "Standing Seam Metal Roof Snow Clearing",
      "Architectural Shingle Snow Unloading",
      "Mountain Cabin Storm Monitoring",
      "Idaho Snow Load PSF Calculations",
    ],
    areaServed: [
      ...LOCATIONS.map((loc) => ({
        "@type": "City",
        name: `${loc.name}, ID`,
        postalCode: loc.zipCodes.join(", "),
      })),
      { "@type": "AdministrativeArea", name: "Valley County, ID" },
      { "@type": "AdministrativeArea", name: "Boise County, ID" },
      { "@type": "AdministrativeArea", name: "Adams County, ID" },
      { "@type": "AdministrativeArea", name: "Ada County, ID" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Winter Roof & Ice Dam Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Roof Snow Removal",
            url: `${SITE_CONFIG.domain}/services/roof-snow-removal`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ice Dam Removal & Prevention",
            url: `${SITE_CONFIG.domain}/services/ice-dam-removal`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Out-of-Town Cabin Snow Monitoring",
            url: `${SITE_CONFIG.domain}/services/cabin-snow-monitoring`,
          },
        },
      ],
    },
  };

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] antialiased">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        {metaPixelId ? (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}
        <JsonLd data={localBusinessSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
