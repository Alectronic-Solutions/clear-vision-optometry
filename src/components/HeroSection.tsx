import HeroVideoBackground from "@/components/HeroVideoBackground";

export default function HeroSection() {
  return (
    <section className="relative bg-cv-bg overflow-hidden">
      <HeroVideoBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-40">
        <div className="max-w-xl">
          {/* Status bar */}
          <div className="flex items-center gap-4 mb-10 text-xs font-mono text-white/80">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <span className="text-green-400 font-semibold tracking-widest uppercase">Open Now</span>
            </span>
            <span className="text-white/30">|</span>
            <a href="tel:3239352014" className="hover:text-white transition-colors tracking-wider">
              (323) 935-2014
            </a>
          </div>

          {/* 20/20 anchor */}
          <h1 className="font-display text-8xl lg:text-[9rem] xl:text-[10rem] font-light leading-none text-white mb-3 tracking-tight drop-shadow-sm">
            20/20
          </h1>

          {/* Practice name */}
          <p className="font-sans text-sm tracking-[0.22em] uppercase text-white/80 mb-6">
            Clear Vision Optometry
          </p>

          {/* Divider */}
          <div className="w-full border-t border-white/25 mb-8" />

          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed max-w-sm mb-6">
            Independent optometry providing comprehensive eye exams, contact lens fittings, myopia control, and a curated selection of premium eyewear. Not a retail chain.
          </p>

          {/* Address */}
          <div className="flex items-center gap-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-cv-teal shrink-0" />
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/80">
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
              className="btn-3d-outline inline-flex items-center gap-2 border border-white text-white text-xs font-bold tracking-[0.15em] uppercase px-7 py-4"
            >
              <span>View Services</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
