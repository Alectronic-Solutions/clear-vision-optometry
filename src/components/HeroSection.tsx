import Link from "next/link";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import OpenStatus from "@/components/OpenStatus";
import { clinic } from "@/lib/site";

export default function HeroSection() {
  return (
    <section className="relative bg-cv-ink overflow-hidden">
      <HeroVideoBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-40">
        <div className="max-w-xl">
          {/* Status bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 sm:mb-10 text-xs font-mono text-white/85">
            <OpenStatus />
            <span className="text-white/30 hidden sm:inline" aria-hidden="true">|</span>
            <a href={clinic.phoneHref} className="hover:text-white transition-colors tracking-wider">
              {clinic.phone}
            </a>
          </div>

          <h1 className="font-display text-7xl sm:text-8xl lg:text-[9rem] xl:text-[10rem] font-light leading-none text-white mb-3 tracking-tight">
            <span aria-hidden="true">20/20</span>
            <span className="sr-only">Clear Vision Optometry: eye exams and eyewear in San Francisco</span>
          </h1>

          <p aria-hidden="true" className="font-sans text-xs sm:text-sm tracking-[0.22em] uppercase text-white/85 mb-6">
            Clear Vision Optometry
          </p>

          <div className="w-full border-t border-white/25 mb-8" />

          <p className="text-[15px] sm:text-base text-white/85 leading-relaxed max-w-md mb-6">
            Independent optometry providing comprehensive eye exams, contact lens fittings, myopia control, and a
            curated selection of designer eyewear. Not a retail chain.
          </p>

          <div className="flex items-center gap-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-cv-gold shrink-0" aria-hidden="true" />
            <p className="text-[11px] font-mono tracking-[0.16em] uppercase text-white/85">
              {clinic.street}, {clinic.city}, {clinic.region} {clinic.postalCode}
            </p>
          </div>

          <div className="flex flex-col min-[420px]:flex-row gap-3 sm:gap-4">
            <Link
              href="/#book"
              className="btn-3d inline-flex items-center justify-center gap-2 bg-cv-teal text-white text-xs font-bold tracking-[0.15em] uppercase px-7 py-4"
            >
              <span>Book Appointment →</span>
            </Link>
            <Link
              href="/#frames"
              className="btn-3d-outline inline-flex items-center justify-center gap-2 border border-white text-white text-xs font-bold tracking-[0.15em] uppercase px-7 py-4"
            >
              <span>Shop Frames</span>
            </Link>
          </div>

          <p className="mt-8 text-[11px] tracking-wide text-white/70">
            In-network with VSP · EyeMed · Davis Vision · Spectra · MetLife · UHC Vision
          </p>
        </div>
      </div>
    </section>
  );
}
