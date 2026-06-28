"use client";

import { useState } from "react";
import { insuranceProviders, type InsuranceProvider } from "@/data/optometry";

export default function InsuranceChecker() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = insuranceProviders.find((p) => p.id === selectedId) ?? null;

  function handleSelect(p: InsuranceProvider) {
    setSelectedId(selectedId === p.id ? null : p.id);
  }

  return (
    <section id="insurance" className="py-16 lg:py-24 bg-cv-bg">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8 pb-4 border-b border-cv-border">
          <p className="text-[10px] tracking-[0.3em] uppercase text-cv-ink-muted mb-1">
            Benefits
          </p>
          <h2 className="font-display text-3xl font-light tracking-tight text-cv-ink">
            Insurance Coverage
          </h2>
          <p className="text-base text-cv-ink-muted mt-2">
            Select your plan to see your in-office benefits at a glance.
          </p>
        </div>

        {/* Provider pills */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Select insurance provider">
          {insuranceProviders.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              aria-pressed={selectedId === p.id}
              className="btn-3d cursor-pointer text-sm px-5 py-2.5 bg-cv-teal text-white"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Result */}
        {selected && (
          <div
            className={`p-6 border-t-2 ${
              selected.inNetwork
                ? "border-t-cv-teal bg-cv-green-light border border-cv-green-border"
                : "border-t-amber-400 bg-cv-amber-light border border-cv-amber-border"
            }`}
            role="status"
            aria-live="polite"
          >
            {selected.inNetwork ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-cv-teal text-white px-3 py-1 text-[10px] tracking-widest uppercase font-semibold">
                    ✓ In Network
                  </span>
                  <span className="text-sm font-semibold text-cv-ink">{selected.name}</span>
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-cv-border shadow-sm p-4">
                    <dt className="text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                      Exam Copay
                    </dt>
                    <dd className="font-display text-3xl font-light text-cv-teal">
                      {selected.examCopay === 0 ? "Free" : `$${selected.examCopay}`}
                    </dd>
                  </div>
                  <div className="bg-white border border-cv-border shadow-sm p-4">
                    <dt className="text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                      Frames
                    </dt>
                    <dd className="font-display text-3xl font-light text-cv-teal">
                      ${selected.frameAllowance}
                    </dd>
                  </div>
                  <div className="bg-white border border-cv-border shadow-sm p-4">
                    <dt className="text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                      Contacts
                    </dt>
                    <dd className="font-display text-3xl font-light text-cv-teal">
                      ${selected.contactAllowance}
                    </dd>
                  </div>
                  <div className="bg-white border border-cv-border shadow-sm p-4">
                    <dt className="text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                      Frequency
                    </dt>
                    <dd className="text-sm text-cv-ink leading-snug pt-1">{selected.examFrequency}</dd>
                  </div>
                </dl>
                {selected.notes && (
                  <p className="mt-4 text-xs text-cv-ink-muted border-t border-cv-green-border pt-4">
                    {selected.notes}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-600 border border-amber-400 px-3 py-1">
                    Out of Network
                  </span>
                  <span className="text-sm font-semibold text-cv-ink">{selected.name}</span>
                </div>
                <p className="text-sm text-cv-ink-muted">{selected.notes}</p>
                <a
                  href="#book"
                  className="btn-3d cursor-pointer inline-block mt-4 text-xs font-semibold tracking-widest uppercase px-5 py-3 bg-cv-teal text-white hover:bg-cv-teal-dark"
                >
                  Contact Us to Verify Benefits
                </a>
              </>
            )}
          </div>
        )}

        {!selected && (
          <div className="p-12 text-center">
            <svg
              className="mx-auto mb-4 text-cv-border"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <p className="text-sm text-cv-ink-muted">
              Choose a plan above to see your benefits.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
