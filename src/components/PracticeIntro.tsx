import Link from "next/link";
import Photo from "@/components/Photo";
import { frameBrands, frames } from "@/data/optometry";

const stats = [
  { value: "2015", label: "Serving San Francisco since" },
  { value: "4.9", label: "Average rating, 312 reviews" },
  { value: `${frames.length}+`, label: `Frame styles from ${frameBrands.length} brands` },
  { value: "Same day", label: "Urgent eye care visits" },
];

export default function PracticeIntro() {
  return (
    <section className="bg-cv-surface border-b border-cv-border" aria-labelledby="practice-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative aspect-3/2 overflow-hidden bg-cv-bg">
          <Photo
            src="/images/services/optical-boutique"
            widths={[640, 1280]}
            aspect={[3, 2]}
            alt="Bright optical boutique with eyeglass frames displayed on white shelves"
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-cv-teal mb-3">The Practice</p>
          <h2 id="practice-heading" className="font-display text-3xl lg:text-4xl font-light text-cv-ink leading-tight mb-5">
            Medical eye care and a curated optical, under one roof
          </h2>
          <p className="text-[15px] text-cv-ink-muted leading-relaxed mb-4">
            Clear Vision is an independent, doctor-owned practice. Exams run a full hour so there&apos;s time for your
            questions, and every patient gets retinal imaging as part of the visit, not as an upsell.
          </p>
          <p className="text-[15px] text-cv-ink-muted leading-relaxed mb-8">
            When you&apos;re done, our opticians will help you choose frames from independent and designer brands, take
            precise lens measurements, and adjust the finished pair to your face.
          </p>
          <dl className="grid grid-cols-2 gap-px bg-cv-border border border-cv-border mb-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-cv-surface p-4 sm:p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl sm:text-3xl font-light text-cv-teal-dark">{s.value}</span>
                  <span className="block text-xs text-cv-ink-muted mt-1">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services/comprehensive-eye-exams"
              className="inline-flex items-center min-h-11 px-5 bg-cv-teal hover:bg-cv-teal-dark text-white text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              What happens in an exam
            </Link>
            <Link
              href="/#doctors"
              className="inline-flex items-center min-h-11 px-5 border border-cv-teal text-cv-teal hover:bg-cv-teal hover:text-white text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              Meet the doctors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
