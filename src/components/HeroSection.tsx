import EyeTracker from "@/components/EyeTracker";

export default function HeroSection() {
  return (
    <section className="bg-cv-bg">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

          {/* Left: content */}
          <div className="lg:pr-12">
            {/* Status bar */}
            <div className="flex items-center gap-4 mb-10 text-xs font-mono text-cv-ink-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-green-600 font-semibold tracking-widest uppercase">Open Now</span>
              </span>
              <span className="text-cv-border">|</span>
              <a href="tel:3239352014" className="hover:text-cv-ink transition-colors tracking-wider">
                (323) 935-2014
              </a>
            </div>

            {/* 20/20 anchor */}
            <h1 className="font-display text-8xl lg:text-[9rem] xl:text-[10rem] font-light leading-none text-cv-ink mb-3 tracking-tight">
              20/20
            </h1>

            {/* Practice name */}
            <p className="font-sans text-sm tracking-[0.22em] uppercase text-cv-ink-muted mb-6">
              Clear Vision Optometry
            </p>

            {/* Divider */}
            <div className="w-full border-t border-cv-border mb-8" />

            {/* Description */}
            <p className="text-sm text-cv-ink-muted leading-relaxed max-w-sm mb-6">
              Independent optometry providing comprehensive eye exams, contact lens fittings, myopia control, and a curated selection of premium eyewear. Not a retail chain.
            </p>

            {/* Address */}
            <div className="flex items-center gap-2 mb-10">
              <span className="w-2 h-2 rounded-full bg-cv-teal shrink-0" />
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-cv-ink-muted">
                Wilshire Blvd &amp; Fairfax Ave — Mid-City / Miracle Mile
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#book"
                className="btn-3d inline-flex items-center gap-2 bg-cv-teal text-white text-xs font-bold tracking-[0.15em] uppercase px-7 py-4"
              >
                <span>Book Appointment →</span>
              </a>
              <a
                href="#services"
                className="btn-3d-outline inline-flex items-center gap-2 border border-cv-teal text-cv-teal text-xs font-bold tracking-[0.15em] uppercase px-7 py-4"
              >
                <span>View Services</span>
              </a>
            </div>
          </div>

          {/* Right: eye tracker — dominant, ophthalmoscope-framed */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Amber ophthalmoscope ring */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: "340px",
                  height: "340px",
                  border: "1px solid #B07D3A",
                  opacity: 0.3,
                }}
              />
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: "390px",
                  height: "390px",
                  border: "1px solid #B07D3A",
                  opacity: 0.12,
                }}
              />
              <EyeTracker />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
