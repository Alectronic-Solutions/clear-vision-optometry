"use client";

import { useEffect, useRef } from "react";

const CHART_ROWS = [
  { letters: "E",                   size: 82,  acuity: "20/200" },
  { letters: "F P",                 size: 58,  acuity: "20/100" },
  { letters: "T O Z",               size: 46,  acuity: "20/70"  },
  { letters: "L P E D",             size: 36,  acuity: "20/50"  },
  { letters: "P E C F D",           size: 28,  acuity: "20/40"  },
  { letters: "E D F C Z P",         size: 22,  acuity: "20/30"  },
  { letters: "F E L O P Z D",       size: 17,  acuity: "20/25"  },
  { letters: "D E F P O T E C",     size: 14,  acuity: "20/20"  },
  { letters: "L E F O D P C T",     size: 11,  acuity: "20/15"  },
  { letters: "F D P L T C E O Z",   size: 9,   acuity: "20/10"  },
];

const services = [
  {
    code: "92004",
    label: "Comprehensive Eye Exam",
    description:
      "Full binocular vision workup, refraction, IOP measurement, and retinal assessment. New and returning patients.",
    duration: "45–60 min",
    accentColor: "#38BDF8",
    cardGradient: "linear-gradient(160deg, #0C4A6E 0%, #0F172A 100%)",
    borderColor: "#0EA5E9",
  },
  {
    code: "92310",
    label: "Contact Lens Fitting",
    description:
      "Soft, rigid gas-permeable, and specialty lens fitting including scleral and toric designs for astigmatism.",
    duration: "30–45 min",
    accentColor: "#818CF8",
    cardGradient: "linear-gradient(160deg, #1E3A5F 0%, #1E1B4B 100%)",
    borderColor: "#6366F1",
  },
  {
    code: "92012",
    label: "Pediatric Eye Exam",
    description:
      "Vision screening and ocular health evaluation for children from age 3. Early detection of amblyopia and strabismus.",
    duration: "30–40 min",
    accentColor: "#34D399",
    cardGradient: "linear-gradient(160deg, #064E3B 0%, #0F172A 100%)",
    borderColor: "#10B981",
  },
  {
    code: "92083",
    label: "Glaucoma Screening",
    description:
      "Visual field testing, optic nerve photography, and intraocular pressure monitoring for at-risk patients.",
    duration: "20–30 min",
    accentColor: "#C084FC",
    cardGradient: "linear-gradient(160deg, #2D1B4E 0%, #0F172A 100%)",
    borderColor: "#A855F7",
  },
];

export default function ServicesSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!chartRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height + window.innerHeight);
      chartRef.current.style.transform = `translateY(${progress * 60}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{ background: "#0A1628" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10" style={{ background: "linear-gradient(to bottom, #F9F7F4, transparent)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10" style={{ background: "linear-gradient(to top, #F9F7F4, transparent)" }} />
      <div className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section header */}
          <div className="mb-10 pb-6 border-b border-white/10">
            <h2 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-white">
              What We Treat
            </h2>
          </div>

          {/* Two-column: chart left, cards right */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* LEFT — Snellen chart panel */}
            <div
              className="hidden lg:flex flex-col items-center shrink-0 w-75 xl:w-85"
              style={{ alignSelf: "flex-start", position: "sticky", top: "6rem" }}
            >
              <div
                ref={chartRef}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
                  padding: "28px 20px 20px 20px",
                  width: "100%",
                  willChange: "transform",
                }}
              >
                {/* Chart header */}
                <div className="text-center mb-3">
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-400 mb-1">Snellen</p>
                  {/* Red fixation dot */}
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626", margin: "0 auto 10px" }} />
                </div>

                {/* Chart rows */}
                <div className="flex flex-col items-center gap-0">
                  {CHART_ROWS.map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center w-full justify-between"
                      style={{ marginBottom: `${Math.max(2, 10 - i)}px` }}
                    >
                      {/* Acuity label left */}
                      <span
                        className="font-mono shrink-0"
                        style={{
                          fontSize: 8,
                          color: "#94A3B8",
                          width: 36,
                          textAlign: "right",
                          paddingRight: 8,
                          lineHeight: 1,
                        }}
                      >
                        {row.acuity}
                      </span>

                      {/* Letters — centered */}
                      <div
                        className="flex-1 text-center font-mono leading-none tracking-widest"
                        style={{
                          fontSize: row.size,
                          color: "#FFFFFF",
                          opacity: 0.75 + i * 0.025,
                          letterSpacing: `${Math.max(0.08, 0.45 - i * 0.04)}em`,
                          lineHeight: 1,
                        }}
                      >
                        {row.letters}
                      </div>

                      {/* Row number right */}
                      <span
                        className="font-mono shrink-0"
                        style={{
                          fontSize: 8,
                          color: "#94A3B8",
                          width: 20,
                          textAlign: "left",
                          paddingLeft: 6,
                          lineHeight: 1,
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chart footer */}
                <p className="font-mono text-center mt-4" style={{ fontSize: 8, color: "#94A3B8", letterSpacing: "0.2em" }}>
                  6m / 20ft
                </p>
              </div>
            </div>

            {/* RIGHT — Cards + CTA */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((svc) => (
                  <div
                    key={svc.code}
                    className="relative rounded-sm p-6 sm:p-7 flex flex-col min-h-56 group"
                    style={{
                      background: svc.cardGradient,
                      borderTop: `2px solid ${svc.borderColor}`,
                      boxShadow: `0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${svc.borderColor}22 0%, transparent 70%)`,
                      }}
                    />

                    <p
                      className="font-mono text-[11px] tracking-[0.25em] mb-4"
                      style={{ color: `${svc.accentColor}bb` }}
                    >
                      CPT {svc.code}
                    </p>

                    <h3 className="font-display text-lg font-light text-white mb-3 leading-snug">
                      {svc.label}
                    </h3>

                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      {svc.description}
                    </p>

                    <p
                      className="text-[11px] tracking-[0.2em] uppercase font-mono mt-5"
                      style={{ color: svc.accentColor }}
                    >
                      {svc.duration}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#book"
                  className="btn-3d-outline inline-block text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 border border-white text-white text-center sm:text-left"
                >
                  Book an Appointment →
                </a>
                <p className="text-xs text-white/40 font-mono tracking-wide">
                  Most major insurance accepted &nbsp;·&nbsp; No referral needed
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
