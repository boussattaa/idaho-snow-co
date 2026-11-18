import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { JsonLd } from "@/components/JsonLd";
import { LOCATIONS } from "@/lib/locations";
import { SITE_CONFIG } from "@/lib/services";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const ogImageUrl = `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(
  "Idaho Snow Co. — Roof Snow Removal & Ice Dam Mitigation"
)}&subtitle=${encodeURIComponent(
  "Serving Highway 55 & Boise Basin: McCall, Donnelly, Cascade, Garden Valley & Boise Foothills"
)}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default:
      "Idaho Snow Co. | Roof Snow Removal & Ice Dam Mitigation (Boise to McCall)",
    template: "%s",
  },
  description:
    "Professional roof snow removal, ice dam mitigation, and out-of-town cabin storm monitoring serving the Highway 55 corridor from Boise Foothills to McCall, Donnelly, Cascade & Garden Valley. Get an instant online quote.",
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.businessName,
    title:
      "Idaho Snow Co. | Roof Snow Removal & Ice Dam Mitigation (Boise to McCall)",
    description:
      "Get an instant transparent roof snow removal quote in 30 seconds. Serving McCall, Donnelly, Tamarack, Cascade, Garden Valley, Crouch & Boise Foothills.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Idaho Snow Co. — Roof Snow Removal & Ice Dam Mitigation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Idaho Snow Co. | Roof Snow Removal & Ice Dam Mitigation (Boise to McCall)",
    description:
      "Instant roof snow removal quotes & 24-hour dispatch across McCall, Donnelly, Cascade, Garden Valley & Boise Foothills.",
    images: [ogImageUrl],
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
    areaServed: LOCATIONS.map((loc) => ({
      "@type": "City",
      name: `${loc.name}, ID`,
      postalCode: loc.zipCodes.join(", "),
    })),
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

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] antialiased">
        <JsonLd data={localBusinessSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
