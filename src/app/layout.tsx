import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import DemoNotice from "./DemoNotice";
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
  // Fictional business: keep it out of search (see DemoNotice).
  robots: { index: false, follow: false },
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
        <DemoNotice />
        <MobileActionBar />
      </body>
    </html>
  );
}
