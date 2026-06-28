"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-cv-surface/90 backdrop-blur-sm border-b border-cv-border"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2"
          aria-label="Clear Vision Optometry — home"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/>
            <circle cx="12" cy="12" r="3"/>
            <circle cx="12" cy="12" r="1" fill="#111827" stroke="none"/>
          </svg>
          <span className="font-display text-sm font-light tracking-[0.08em] text-cv-ink">
            Clear Vision Optometry
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          <a
            href="#services"
            className="text-xs tracking-[0.1em] uppercase text-cv-ink hover:text-cv-teal transition-colors"
          >
            Services
          </a>
          <a
            href="#frames"
            className="text-xs tracking-[0.1em] uppercase text-cv-ink hover:text-cv-teal transition-colors"
          >
            Frames
          </a>
          <a
            href="#insurance"
            className="text-xs tracking-[0.1em] uppercase text-cv-ink hover:text-cv-teal transition-colors"
          >
            Insurance
          </a>
          <a
            href="#doctors"
            className="text-xs tracking-[0.1em] uppercase text-cv-ink hover:text-cv-teal transition-colors"
          >
            Doctors
          </a>
          <a
            href="#contact"
            className="text-xs tracking-[0.1em] uppercase text-cv-ink hover:text-cv-teal transition-colors"
          >
            Contact
          </a>
          <a
            href="#book"
            className="text-xs tracking-[0.1em] uppercase px-4 py-1.5 border border-cv-teal text-cv-teal hover:bg-cv-teal hover:text-white transition-colors duration-200"
          >
            Book Exam
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-cv-ink transition-transform origin-center ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-cv-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-cv-ink transition-transform origin-center ${open ? "-rotate-45 translate-y-[-3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-cv-border bg-cv-surface px-6 py-4 flex flex-col gap-4">
          <a href="#services" onClick={() => setOpen(false)} className="text-[11px] tracking-[0.12em] uppercase text-cv-ink">Services</a>
          <a href="#frames" onClick={() => setOpen(false)} className="text-[11px] tracking-[0.12em] uppercase text-cv-ink">Frames</a>
          <a href="#insurance" onClick={() => setOpen(false)} className="text-[11px] tracking-[0.12em] uppercase text-cv-ink">Insurance</a>
          <a href="#doctors" onClick={() => setOpen(false)} className="text-[11px] tracking-[0.12em] uppercase text-cv-ink">Doctors</a>
          <a href="#contact" onClick={() => setOpen(false)} className="text-[11px] tracking-[0.12em] uppercase text-cv-ink">Contact</a>
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="text-xs tracking-[0.1em] uppercase px-4 py-3 border border-cv-teal text-cv-teal text-center hover:bg-cv-teal hover:text-white transition-colors duration-200"
          >
            Book Exam
          </a>
        </div>
      )}
    </nav>
  );
}
