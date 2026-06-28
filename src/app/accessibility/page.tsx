import Link from "next/link";

export const metadata = { title: "Accessibility Statement - Clear Vision Optometry" };

export default function AccessibilityPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link href="/" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors tracking-wide">
        &larr; Back to home
      </Link>
      <h1 className="font-display text-3xl font-light text-cv-ink mt-8 mb-2">Accessibility Statement</h1>
      <p className="text-xs text-cv-ink-muted mb-10">Last updated: June 2026</p>

      <div className="space-y-8 text-sm text-cv-ink-muted leading-relaxed">
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Our Standard</h2>
          <p>This site targets WCAG 2.1 Level AA. We test for sufficient color contrast, keyboard navigability, screen reader compatibility, and text alternatives for non-text content.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Known Limitations</h2>
          <p>Some third-party embedded content may not meet the same standard. We work with vendors to resolve gaps as they are identified.</p>
        </section>
        <section>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-3">Feedback</h2>
          <p>
            If you hit a barrier on this site, contact us and we will get you the information or service through another channel.{" "}
            <a href="mailto:hello@clearvisionoptometry.com" className="text-cv-teal hover:underline">hello@clearvisionoptometry.com</a>
            {" "}or{" "}
            <a href="tel:+14155552020" className="text-cv-teal hover:underline">+1 (415) 555-2020</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
