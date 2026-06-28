"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How often should I have a comprehensive eye exam?",
    a: "Adults with no known vision problems should come in every one to two years. If you wear glasses or contacts, have a family history of glaucoma, or manage diabetes, plan on annually. Children should be seen every year. Vision changes fast during school years.",
  },
  {
    q: "Do you accept my insurance?",
    a: "We are in-network with VSP, EyeMed, Davis Vision, and Spectra. For other major vision plans, we submit out-of-network claims on your behalf. Use the Insurance Lookup on this page to check your benefits before your visit.",
  },
  {
    q: "What's included in a comprehensive eye exam?",
    a: "We test visual acuity, refraction, binocular vision, and intraocular pressure, then do a full health evaluation of both the anterior and posterior segments of the eye. Digital retinal imaging and OCT scanning are part of every exam.",
  },
  {
    q: "Can I get contact lenses at my first visit?",
    a: "Yes. A contact lens fitting is billed separately from your eye exam. It includes a trial fitting, lens evaluation, and a follow-up to confirm comfort and vision. We stock daily, monthly, toric, and multifocal lenses.",
  },
  {
    q: "At what age should my child have their first eye exam?",
    a: "The American Optometric Association recommends a first exam at 6 months, again at age 3, and once more before starting school. Annual exams through adolescence after that. Many vision problems that affect learning go undetected because children assume everyone sees the same way.",
  },
  {
    q: "How do I know if I have glaucoma?",
    a: "Early glaucoma has no symptoms. The only way to catch it is through a dilated eye exam and intraocular pressure measurement. Dr. Webb does full glaucoma evaluations with visual field testing and OCT nerve fiber layer analysis.",
  },
  {
    q: "How far in advance do I need to book an appointment?",
    a: "New patients typically get in within one to two weeks. Existing patients usually within a few days. Book through the appointment form on this page. For urgent issues (sudden vision change, eye pain, or flashes), call us and we will fit you in the same day.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-cv-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.2em] uppercase text-cv-teal mb-4">FAQ</p>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-cv-ink">
            Common questions
          </h2>
        </div>

        <div className="max-w-3xl">
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-t border-cv-border last:border-b">
                <button
                  className="w-full flex items-start gap-6 py-6 text-left group cursor-pointer"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display font-light text-2xl leading-none pt-0.5 shrink-0 w-10 transition-colors duration-200 ${
                      isOpen ? "text-cv-teal" : "text-cv-border group-hover:text-cv-teal"
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
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-16 pb-7 pr-8">
                    <div className="border-l-2 border-cv-teal pl-5">
                      <p className="text-sm text-cv-ink-muted leading-7">{item.a}</p>
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
