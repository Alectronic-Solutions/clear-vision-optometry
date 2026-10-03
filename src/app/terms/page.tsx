import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms of use for the Clear Vision Optometry website and online booking.",
  path: "terms",
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Terms of Use", item: `${SITE_URL}/terms/` },
  ],
};

export default function TermsPage() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <Link href="/" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors tracking-wide">
        &larr; Back to home
      </Link>
      <h1 className="font-display text-3xl sm:text-4xl font-light text-cv-ink mt-8 mb-2">Terms of Use</h1>
      <p className="text-xs text-cv-ink-muted mb-10">Last updated: June 2026</p>

      <div className="space-y-8 text-sm text-cv-ink-muted leading-relaxed">
        <section>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-cv-ink font-semibold mb-3">Use of This Site</h2>
          <p>This website exists to provide information and facilitate appointment booking. Nothing on it is medical advice. For any vision health decisions, consult a licensed optometrist.</p>
        </section>
        <section>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-cv-ink font-semibold mb-3">Appointment Bookings</h2>
          <p>Online bookings are requests pending confirmation by our office. We may cancel or reschedule appointments when needed. Please give at least 24 hours notice for cancellations to avoid a missed appointment fee.</p>
        </section>
        <section>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-cv-ink font-semibold mb-3">Intellectual Property</h2>
          <p>All content on this site (text, images, and design) is owned by Clear Vision Optometry or its licensors. Unauthorized reproduction or distribution is prohibited.</p>
        </section>
        <section>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-cv-ink font-semibold mb-3">Limitation of Liability</h2>
          <p>Clear Vision Optometry is not liable for damages arising from use of this website or reliance on its content. Use of this site is at your own risk.</p>
        </section>
        <section>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-cv-ink font-semibold mb-3">Contact</h2>
          <p>
            Questions? Reach us at{" "}
            <a href="mailto:hello@clearvisionoptometry.com" className="text-cv-teal hover:underline">hello@clearvisionoptometry.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
