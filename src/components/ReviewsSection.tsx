"use client";

import { useState, useCallback } from "react";

const reviews = [
  {
    name: "Priya M.",
    rating: 5,
    date: "March 2026",
    quote:
      "Dr. Chen caught an early sign of macular stress that my previous doctor had missed for two years. The exam was thorough, unhurried, and she explained everything clearly. I won't go anywhere else.",
  },
  {
    name: "James T.",
    rating: 5,
    date: "February 2026",
    quote:
      "Switched to Clear Vision after my old practice kept rushing me through. Night and day difference. Dr. Webb spent forty minutes on my glaucoma follow-up and answered every question I had.",
  },
  {
    name: "Sofia R.",
    rating: 5,
    date: "January 2026",
    quote:
      "My daughter has been seeing Dr. Chen since she was six. She's patient, great with kids, and her myopia management plan has genuinely slowed the progression. We drive 45 minutes for these appointments.",
  },
  {
    name: "Derek L.",
    rating: 5,
    date: "December 2025",
    quote:
      "The frame selection is excellent and the staff helped me find a pair I actually like wearing. Insurance checkout was smooth. They handled the VSP paperwork in-office with no hassle.",
  },
];

const FADE_MS = 400;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 14 14"
          fill={i < count ? "#F59E0B" : "none"}
          stroke={i < count ? "#F59E0B" : "#D1D5DB"}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M7 1l1.55 3.14L12 4.74l-2.5 2.43.59 3.43L7 9l-3.09 1.6.59-3.43L2 4.74l3.45-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setVisible(true);
    }, FADE_MS);
  }, []);

  const prev = () => goTo((current - 1 + reviews.length) % reviews.length);
  const next = () => goTo((current + 1) % reviews.length);

  return (
    <section id="reviews" className="bg-cv-bg border-y border-cv-border" aria-labelledby="reviews-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center">

        {/* Amber decorative quotemark */}
        <div
          className="font-display leading-none select-none mb-2"
          style={{ fontSize: "clamp(4.5rem, 12vw, 7rem)", color: "#B07D3A", lineHeight: 1, opacity: 0.9 }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <h2 id="reviews-heading" className="font-display text-3xl lg:text-4xl font-light text-cv-ink mb-3">
          What patients say
        </h2>

        {/* Aggregate */}
        <div className="flex items-center justify-center gap-2 mb-10 sm:mb-14">
          <Stars count={5} />
          <span className="font-mono text-xs text-cv-ink-muted">4.9 · 312 reviews</span>
        </div>

        {/* All quotes share one grid cell, so the area is as tall as the longest one and never overlaps the controls. */}
        <div className="grid" aria-live="polite">
          {reviews.map((r, i) => (
            <blockquote
              key={r.name}
              className="col-start-1 row-start-1 w-full flex flex-col items-center justify-center"
              style={{
                opacity: i === current && visible ? 1 : 0,
                visibility: i === current ? "visible" : "hidden",
                transition: `opacity ${FADE_MS}ms ease`,
              }}
              aria-hidden={i !== current}
            >
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-light text-cv-ink leading-relaxed max-w-2xl mx-auto">
                {r.quote}
              </p>
              <footer className="mt-8 flex flex-col items-center gap-1.5">
                <cite className="not-italic text-[11px] font-medium tracking-[0.12em] uppercase text-cv-ink">{r.name}</cite>
                <span className="font-mono text-[11px] text-cv-ink-muted">{r.date}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-10">
          <button
            onClick={prev}
            aria-label="Previous review"
            className="w-11 h-11 flex items-center justify-center border border-cv-border text-cv-ink-muted hover:border-cv-teal hover:text-cv-teal transition-colors cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9 2L4 7l5 5" />
            </svg>
          </button>

          <div className="flex items-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show review ${i + 1} of ${reviews.length}`}
                aria-current={i === current ? "true" : undefined}
                className="cursor-pointer h-11 px-1.5 flex items-center"
              >
                <span
                  className="block transition-all duration-300 rounded-full h-1.5"
                  style={{ width: i === current ? "1.5rem" : "0.375rem", backgroundColor: i === current ? "#B07D3A" : "#9CA3AF" }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next review"
            className="w-11 h-11 flex items-center justify-center border border-cv-border text-cv-ink-muted hover:border-cv-teal hover:text-cv-teal transition-colors cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 2l5 5-5 5" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
