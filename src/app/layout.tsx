import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { BASE_PATH } from "@/lib/basePath";
import { faqs } from "@/data/faq";
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

const SITE_URL = "https://alectronic-solutions.github.io" + BASE_PATH;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Clear Vision Optometry | San Francisco Eye Care",
  description:
    "Comprehensive eye exams, designer frames, and contact lens fittings in San Francisco. In-network with VSP, EyeMed, Davis Vision, and more. Book your exam today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clear Vision Optometry",
    description: "San Francisco eye care. Book your comprehensive exam today.",
    type: "website",
    url: "/",
    siteName: "Clear Vision Optometry",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Clear Vision Optometry — San Francisco Eye Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear Vision Optometry | San Francisco Eye Care",
    description: "Comprehensive eye exams, designer frames, and contact lens fittings in San Francisco.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Optician"],
  name: "Clear Vision Optometry",
  url: SITE_URL,
  telephone: "+1-415-555-2020",
  priceRange: "$$",
  medicalSpecialty: "Optometry",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Vision Blvd",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94102",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.7749,
    longitude: -122.4194,
  },
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
  employee: [
    {
      "@type": "Physician",
      name: "Dr. Sarah Chen",
      jobTitle: "Optometrist",
      medicalSpecialty: "Optometry",
      identifier: {
        "@type": "PropertyValue",
        name: "NPI",
        value: "1234567890",
      },
    },
    {
      "@type": "Physician",
      name: "Dr. Marcus Webb",
      jobTitle: "Optometrist",
      medicalSpecialty: "Optometry",
      identifier: {
        "@type": "PropertyValue",
        name: "NPI",
        value: "0987654321",
      },
    },
  ],
  availableService: [
    { "@type": "MedicalProcedure", name: "Comprehensive Eye Exam" },
    { "@type": "MedicalProcedure", name: "Contact Lens Fitting" },
    { "@type": "MedicalProcedure", name: "Pediatric Eye Exam" },
    { "@type": "MedicalProcedure", name: "Glaucoma Screening" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Eyewear Collection",
    description: "Designer frames from Lindberg, Oliver Peoples, Warby Parker, and more.",
  },
  paymentAccepted: "Cash, Credit Card, Insurance",
  currenciesAccepted: "USD",
  areaServed: {
    "@type": "City",
    name: "San Francisco",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
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
      <body className="min-h-full flex flex-col bg-cv-bg text-cv-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-cv-teal focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
