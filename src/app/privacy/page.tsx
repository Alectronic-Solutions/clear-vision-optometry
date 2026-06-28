import Link from "next/link";

export const metadata = { title: "Privacy Policy - Clear Vision Optometry" };

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link href="/" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors tracking-wide">
        &larr; Back to home
      </Link>
      <h1 className="font-display text-3xl font-light text-cv-ink mt-8 mb-2">Privacy Policy</h1>
      <p className="text-xs text-cv-ink-muted mb-10">Last updated: June 2026</p>

      <div className="space-y-8 text-sm text-cv-ink-muted leading-relaxed">
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Information We Collect</h2>
          <p>We collect information you provide when booking appointments, completing patient intake forms, or contacting us. This includes your name, date of birth, contact details, insurance information, and health history relevant to your eye care.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">How We Use Your Information</h2>
          <p>Your information is used to provide eye care services, process insurance claims, send appointment reminders, and meet legal requirements. We do not sell your personal information to third parties.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Data Security</h2>
          <p>Medical records are handled per HIPAA requirements. See our <Link href="/hipaa" className="text-cv-teal hover:underline">HIPAA Notice</Link> for details on how protected health information is managed.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Contact</h2>
          <p>
            Questions about this policy? Reach us at{" "}
            <a href="mailto:hello@clearvisionoptometry.com" className="text-cv-teal hover:underline">hello@clearvisionoptometry.com</a>
            {" "}or call{" "}
            <a href="tel:+14155552020" className="text-cv-teal hover:underline">+1 (415) 555-2020</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
