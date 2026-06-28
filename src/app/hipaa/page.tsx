import Link from "next/link";

export const metadata = { title: "HIPAA Notice - Clear Vision Optometry" };

export default function HipaaPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link href="/" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors tracking-wide">
        &larr; Back to home
      </Link>
      <h1 className="font-display text-3xl font-light text-cv-ink mt-8 mb-2">HIPAA Notice of Privacy Practices</h1>
      <p className="text-xs text-cv-ink-muted mb-10">Effective: January 2026 · Last updated: June 2026</p>

      <div className="space-y-8 text-sm text-cv-ink-muted leading-relaxed">
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Our Obligations</h2>
          <p>Federal law requires us to maintain the privacy of your protected health information (PHI) and to give you this notice of our privacy practices and legal duties.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">How We Use and Disclose PHI</h2>
          <p>We may use your health information for treatment, payment, and care operations without separate written authorization. This covers sharing records with other treating providers, filing insurance claims, and internal quality review.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Your Rights</h2>
          <p>You may inspect and copy your records, request corrections, receive an accounting of certain disclosures, request limits on specific uses, and obtain this notice in paper form at any time.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Complaints</h2>
          <p>If you believe your privacy rights were violated, you may file a complaint with us or with the U.S. Department of Health and Human Services. We do not retaliate against anyone for filing a complaint.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Privacy Officer</h2>
          <p>
            Clear Vision Optometry, 123 Vision Blvd, San Francisco, CA 94102
          </p>
          <p className="mt-1">
            <a href="mailto:hello@clearvisionoptometry.com" className="text-cv-teal hover:underline">hello@clearvisionoptometry.com</a>
            {" · "}
            <a href="tel:+14155552020" className="text-cv-teal hover:underline">+1 (415) 555-2020</a>
          </p>
        </section>
      </div>
    </main>
  );
}
