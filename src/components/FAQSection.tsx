"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 lg:py-28 bg-cv-surface" aria-labelledby="faq-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 lg:mb-16">
          <p className="text-[10px] tracking-[0.2em] uppercase text-cv-teal mb-4">FAQ</p>
          <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-cv-ink">
            Common questions
          </h2>
        </div>

        <div className="max-w-3xl">
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-t border-cv-border last:border-b">
                <button
                  className="w-full flex items-start gap-4 sm:gap-6 py-5 sm:py-6 text-left group cursor-pointer"
                  id={`faq-q-${i}`}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    aria-hidden="true"
                    className={`font-display font-light text-xl sm:text-2xl leading-none pt-0.5 shrink-0 w-8 sm:w-10 transition-colors duration-200 ${
                      isOpen ? "text-cv-teal" : "text-cv-border-strong group-hover:text-cv-teal"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 text-base font-medium transition-colors duration-200 ${isOpen ? "text-cv-teal" : "text-cv-ink group-hover:text-cv-teal"}`}>
                    {item.q}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={`shrink-0 mt-0.5 transition-all duration-200 ${
                      isOpen ? "rotate-180 text-cv-teal" : "text-cv-ink-muted group-hover:text-cv-teal"
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </button>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-12 sm:ml-16 pb-6 sm:pb-7 pr-2 sm:pr-8">
                      <div className="border-l-2 border-cv-teal pl-4 sm:pl-5">
                        <p className="text-sm text-cv-ink-muted leading-7">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
