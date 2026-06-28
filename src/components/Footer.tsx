import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-cv-teal bg-cv-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-2">
              <img src="/logo.svg" alt="" className="h-5 w-5" />
              <span className="font-display text-lg font-light text-cv-ink">
                Clear Vision Optometry
              </span>
            </a>
            <p className="text-xs text-cv-ink-muted tracking-wide leading-relaxed">
              Precision eye care. San Francisco.<br />
              Licensed optometrists serving the Bay Area.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-cv-ink-muted mb-3">Navigate</p>
            <ul className="space-y-2">
              <li><a href="#services" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Services</a></li>
              <li><a href="#frames" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Frame Catalog</a></li>
              <li><a href="#insurance" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Insurance Coverage</a></li>
              <li><a href="#book" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Book an Exam</a></li>
              <li><a href="#doctors" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Our Doctors</a></li>
              <li><a href="#reviews" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Patient Reviews</a></li>
              <li><a href="#faq" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Contact &amp; Hours</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-cv-ink-muted mb-3">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Terms of Use</Link></li>
              <li><Link href="/accessibility" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">Accessibility Statement</Link></li>
              <li><Link href="/hipaa" className="text-xs text-cv-ink-muted hover:text-cv-teal transition-colors">HIPAA Notice</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-cv-ink-muted mb-3">Contact</p>
            <div className="font-mono text-xs text-cv-ink-muted space-y-1.5">
              <p>123 Vision Blvd</p>
              <p>San Francisco, CA 94102</p>
              <p className="pt-1">
                <a href="tel:+14155552020" className="hover:text-cv-teal transition-colors">+1 (415) 555-2020</a>
              </p>
              <p className="break-all">
                <a href="mailto:hello@clearvisionoptometry.com" className="hover:text-cv-teal transition-colors">hello@clearvisionoptometry.com</a>
              </p>
              <p className="pt-1 text-[10px]">Mon-Fri 9-6 · Sat 9-2</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cv-border">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            {/* Left cluster */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] text-cv-ink-muted tracking-wide">
                &copy; 2026 Clear Vision Optometry. Licensed Optometry Practice, California.
              </p>
              <p className="text-[10px] text-cv-ink-muted tracking-wide flex flex-wrap gap-x-1 items-center">
                <Link href="/privacy" className="hover:text-cv-teal transition-colors">Privacy</Link>
                <span className="opacity-30">&middot;</span>
                <Link href="/terms" className="hover:text-cv-teal transition-colors">Terms</Link>
                <span className="opacity-30">&middot;</span>
                <Link href="/hipaa" className="hover:text-cv-teal transition-colors">HIPAA</Link>
                <span className="opacity-30">&middot;</span>
                <span>
                  Designed by{" "}
                  <a
                    href="https://alectronicsolutions.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cv-teal transition-colors"
                  >
                    Alectronic Solutions
                  </a>
                </span>
              </p>
            </div>

            {/* Back to top */}
            <a
              href="#"
              className="text-[10px] text-cv-ink-muted hover:text-cv-teal transition-colors tracking-wide shrink-0"
            >
              &uarr; Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
