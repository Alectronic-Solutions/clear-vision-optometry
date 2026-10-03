"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { services } from "@/data/services";

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

// Per-card accent styling, cycled across the featured services.
const accents = [
  { accentColor: "#38BDF8", cardGradient: "linear-gradient(160deg, #0C4A6E 0%, #0F172A 100%)", borderColor: "#0EA5E9" },
  { accentColor: "#A5B4FC", cardGradient: "linear-gradient(160deg, #1E3A5F 0%, #1E1B4B 100%)", borderColor: "#6366F1" },
  { accentColor: "#6EE7B7", cardGradient: "linear-gradient(160deg, #064E3B 0%, #0F172A 100%)", borderColor: "#10B981" },
  { accentColor: "#D8B4FE", cardGradient: "linear-gradient(160deg, #2D1B4E 0%, #0F172A 100%)", borderColor: "#A855F7" },
];

const featured = services.filter((s) => s.featured);

export default function ServicesSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!chartRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height + window.innerHeight);
      chartRef.current.style.transform = `translateY(${progress * 60}px)`;
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{ background: "#0A1628" }}
    >
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
                {featured.map((svc, i) => {
                  const accent = accents[i % accents.length];
                  return (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="relative rounded-sm p-6 sm:p-7 flex flex-col min-h-52 group focus-visible:outline-white"
                      style={{
                        background: accent.cardGradient,
                        borderTop: `2px solid ${accent.borderColor}`,
                        boxShadow: `0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent.borderColor}22 0%, transparent 70%)` }}
                        aria-hidden="true"
                      />
                      {svc.cpt && (
                        <p className="font-mono text-[11px] tracking-[0.25em] mb-4" style={{ color: accent.accentColor }}>
                          CPT {svc.cpt}
                        </p>
                      )}
                      <h3 className="font-display text-xl font-light text-white mb-3 leading-snug">{svc.title}</h3>
                      <p className="text-sm text-white/75 leading-relaxed flex-1">{svc.summary}</p>
                      <div className="flex items-center justify-between mt-5">
                        <p className="text-[11px] tracking-[0.2em] uppercase font-mono" style={{ color: accent.accentColor }}>
                          {svc.duration}
                        </p>
                        <span className="text-[11px] tracking-[0.15em] uppercase text-white/85 group-hover:text-white transition-colors">
                          Learn more <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  href="/#book"
                  className="btn-3d-outline inline-block text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 border border-white text-white text-center sm:text-left"
                >
                  <span>Book an Appointment →</span>
                </Link>
                <p className="text-xs text-white/70 font-mono tracking-wide">
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
