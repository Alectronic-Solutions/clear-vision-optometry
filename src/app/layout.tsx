import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { faqs } from "@/data/faq";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import { insuranceProviders } from "@/data/optometry";
import { SITE_URL, clinic } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  ...pageMetadata({
    title: "Clear Vision Optometry | San Francisco Eye Care",
    description:
      "Comprehensive eye exams, designer frames, and contact lens fittings in San Francisco. In-network with VSP, EyeMed, Davis Vision, and more. Book your exam today.",
    path: "",
  }),
  title: {
    default: "Clear Vision Optometry | San Francisco Eye Care",
    template: "%s | Clear Vision Optometry",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Optician"],
  "@id": `${SITE_URL}/#clinic`,
  name: clinic.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.svg`,
  telephone: "+1-415-555-2020",
  email: clinic.email,
  priceRange: "$$",
  medicalSpecialty: "Optometry",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.street,
    addressLocality: clinic.city,
    addressRegion: clinic.region,
    postalCode: clinic.postalCode,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  hasMap: clinic.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  employee: doctors.map((d) => ({
    "@type": "Physician",
    name: d.name,
    jobTitle: "Optometrist",
    medicalSpecialty: "Optometry",
    image: `${SITE_URL}${d.photo}-720.webp`,
    identifier: {
      "@type": "PropertyValue",
      name: "NPI",
      value: d.npi,
    },
  })),
  availableService: services.map((s) => ({
    "@type": "MedicalProcedure",
    name: s.title,
    url: `${SITE_URL}/services/${s.slug}/`,
  })),
  healthPlanNetworkId: insuranceProviders.filter((p) => p.inNetwork).map((p) => p.name),
  paymentAccepted: "Cash, Credit Card, Vision Insurance, HSA, FSA",
  currenciesAccepted: "USD",
  areaServed: {
    "@type": "City",
    name: "San Francisco",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-cv-bg text-cv-ink pb-14 sm:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-60 focus:bg-cv-teal focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
