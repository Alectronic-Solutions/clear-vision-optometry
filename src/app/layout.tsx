import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clear Vision Optometry | San Francisco Eye Care",
  description:
    "Comprehensive eye exams, designer frames, and contact lens fittings in San Francisco. In-network with VSP, EyeMed, Davis Vision, and more. Book your exam today.",
  keywords: [
    "optometrist",
    "eye exam",
    "San Francisco",
    "eyeglasses",
    "contact lenses",
    "VSP",
    "EyeMed",
    "vision insurance",
  ],
  openGraph: {
    title: "Clear Vision Optometry",
    description: "San Francisco eye care. Book your comprehensive exam today.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Optician"],
  name: "Clear Vision Optometry",
  url: "https://clearvisionoptometry.com",
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
      </head>
      <body className="min-h-full flex flex-col bg-cv-bg text-cv-ink">
        {children}
      </body>
    </html>
  );
}
