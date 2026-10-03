import Link from "next/link";
import { services } from "@/data/services";
import { clinic, hoursSummary } from "@/lib/site";
import Logo from "@/components/Logo";

const linkClass = "text-[13px] text-cv-ink-muted hover:text-cv-teal transition-colors";
const headingClass = "text-[10px] tracking-[0.2em] uppercase text-cv-ink mb-4 font-semibold";

const patientLinks = [
  { href: "/#book", label: "Book an Exam" },
  { href: "/#insurance", label: "Insurance & Benefits" },
  { href: "/#frames", label: "Shop Frames" },
  { href: "/#doctors", label: "Our Doctors" },
  { href: "/#reviews", label: "Patient Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact & Hours" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/hipaa", label: "HIPAA Notice" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-cv-teal bg-cv-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-x-8 gap-y-10">
          {/* Brand + contact */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <Logo className="h-5 w-5" />
              <span className="font-display text-lg font-light text-cv-ink">{clinic.name}</span>
            </Link>
            <p className="text-[13px] text-cv-ink-muted leading-relaxed mb-5 max-w-xs">
              Independent optometry in San Francisco. Eye exams, medical eye care, and designer eyewear.
            </p>
            <address className="not-italic font-mono text-xs text-cv-ink-muted space-y-1.5">
              <p>{clinic.street}</p>
              <p>
                {clinic.city}, {clinic.region} {clinic.postalCode}
              </p>
              <p className="pt-2">
                <a href={clinic.phoneHref} className="text-cv-ink hover:text-cv-teal transition-colors">
                  {clinic.phone}
                </a>
              </p>
              <p className="break-all">
                <a href={`mailto:${clinic.email}`} className="hover:text-cv-teal transition-colors">
                  {clinic.email}
                </a>
              </p>
            </address>
            <dl className="mt-5 text-xs text-cv-ink-muted space-y-1">
              {hoursSummary.map((h) => (
                <div key={h.days} className="flex gap-3">
                  <dt className="w-28 shrink-0">{h.days}</dt>
                  <dd className="text-cv-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Services">
            <p className={headingClass}>Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Patients">
            <p className={headingClass}>Patients</p>
            <ul className="space-y-2.5">
              {patientLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="col-span-2 sm:col-span-1">
            <p className={headingClass}>Legal</p>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-cv-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-cv-ink-muted">
          <p>&copy; 2026 {clinic.name}. Licensed optometry practice, California.</p>
          <p>
            Designed by{" "}
            <a
              href="https://alectronicsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cv-ink hover:text-cv-teal transition-colors"
            >
              Alectronic Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
