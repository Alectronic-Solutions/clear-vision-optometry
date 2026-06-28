"use client";

import { useState } from "react";
import { frames, type Material, type FrameShape, type FaceFit, type Frame } from "@/data/optometry";

const materialLabels: Record<Material, string> = {
  acetate: "Acetate",
  titanium: "Titanium",
  "stainless-steel": "Steel",
  mixed: "Mixed",
};

const shapeLabels: Record<FrameShape, string> = {
  round: "Round",
  square: "Square",
  aviator: "Aviator",
  "cat-eye": "Cat-Eye",
  rectangle: "Rectangle",
  oval: "Oval",
};

const faceFitLabels: Record<FaceFit, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  "extra-large": "XL",
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function GlassesIcon({ shape, colorHex, id: iconId }: { shape: FrameShape; colorHex: string; id: string }) {
  const rgb = hexToRgb(colorHex);
  const fill = `rgba(${rgb},0.20)`;
  const stroke = colorHex;
  const shadowColor = `rgba(${rgb},0.30)`;
  const sid = `g-${iconId}`;

  const sharedDefs = (
    <defs>
      <filter id={`sh-${sid}`} x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor={shadowColor} />
      </filter>
      <linearGradient id={`hl-${sid}`} x1="15%" y1="5%" x2="65%" y2="95%">
        <stop offset="0%" stopColor="white" stopOpacity="0.60" />
        <stop offset="55%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  );

  const lensProps = {
    fill,
    stroke,
    strokeWidth: "2",
    filter: `url(#sh-${sid})`,
    strokeLinejoin: "round" as const,
  };

  /* ─── AVIATOR ───────────────────────────────────────────────────────────
     Classic teardrop silhouette:
     - Thin flat brow-bar running temple-to-temple at top
     - Two teardrop lenses hanging from the brow bar
     - Thin wire nose bridge
     - Nose pads
  ─────────────────────────────────────────────────────────────────────── */
  if (shape === "aviator") {
    return (
      <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {sharedDefs}

        {/* Brow bar + temple arms (single thin line across the top) */}
        <path
          d="M 0,12 L 120,12"
          stroke={stroke} strokeWidth="1.6" strokeLinecap="round" opacity="0.55"
        />

        {/* Left teardrop lens */}
        <path
          d="M 54,13
             C 54,11 50,9 42,9
             C 34,9 22,9 16,11
             C 9,13 7,18 7,25
             C 7,34 12,44 27,49
             C 33,51 42,48 48,41
             C 53,35 54,28 54,20 Z"
          {...lensProps}
        />
        {/* Left shine */}
        <path
          d="M 17,13 C 21,10 30,10 38,11 L 32,19 C 26,17 20,16 17,13 Z"
          fill={`url(#hl-${sid})`}
        />

        {/* Right teardrop lens (mirror of left) */}
        <path
          d="M 66,13
             C 66,11 70,9 78,9
             C 86,9 98,9 104,11
             C 111,13 113,18 113,25
             C 113,34 108,44 93,49
             C 87,51 78,48 72,41
             C 67,35 66,28 66,20 Z"
          {...lensProps}
        />
        {/* Right shine */}
        <path
          d="M 103,13 C 99,10 90,10 82,11 L 88,19 C 94,17 100,16 103,13 Z"
          fill={`url(#hl-${sid})`}
        />

        {/* Wire nose bridge */}
        <path
          d="M 54,16 C 57,20 63,20 66,16"
          stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round"
        />

        {/* Nose pads */}
        <ellipse cx="57" cy="22" rx="2.2" ry="1.3" fill={stroke} opacity="0.45" />
        <ellipse cx="63" cy="22" rx="2.2" ry="1.3" fill={stroke} opacity="0.45" />
      </svg>
    );
  }

  /* ─── ROUND ──────────────────────────────────────────────────────────── */
  if (shape === "round") {
    return (
      <svg viewBox="0 0 120 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {sharedDefs}
        {/* Temple arms */}
        <line x1="0" y1="16" x2="14" y2="20" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        <line x1="120" y1="16" x2="106" y2="20" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        {/* Left lens */}
        <circle cx="34" cy="28" r="18" {...lensProps} />
        <ellipse cx="26" cy="19" rx="7" ry="4.5" fill={`url(#hl-${sid})`} />
        {/* Right lens */}
        <circle cx="86" cy="28" r="18" {...lensProps} />
        <ellipse cx="78" cy="19" rx="7" ry="4.5" fill={`url(#hl-${sid})`} />
        {/* Bridge */}
        <path d="M 52,24 C 56,19 64,19 68,24" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="56" cy="27" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
        <ellipse cx="64" cy="27" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
      </svg>
    );
  }

  /* ─── OVAL ───────────────────────────────────────────────────────────── */
  if (shape === "oval") {
    return (
      <svg viewBox="0 0 120 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {sharedDefs}
        <line x1="0" y1="16" x2="14" y2="19" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        <line x1="120" y1="16" x2="106" y2="19" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        {/* Left lens — wide and short */}
        <ellipse cx="33" cy="26" rx="19" ry="13" {...lensProps} />
        <ellipse cx="25" cy="18" rx="7" ry="4" fill={`url(#hl-${sid})`} />
        {/* Right lens */}
        <ellipse cx="87" cy="26" rx="19" ry="13" {...lensProps} />
        <ellipse cx="79" cy="18" rx="7" ry="4" fill={`url(#hl-${sid})`} />
        {/* Bridge */}
        <path d="M 52,22 C 56,18 64,18 68,22" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="56" cy="25" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
        <ellipse cx="64" cy="25" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
      </svg>
    );
  }

  /* ─── CAT-EYE ────────────────────────────────────────────────────────── */
  if (shape === "cat-eye") {
    return (
      <svg viewBox="0 0 120 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {sharedDefs}
        {/* Temple arms — angled upward (cat-eye hinges high) */}
        <line x1="0" y1="10" x2="13" y2="16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        <line x1="120" y1="10" x2="107" y2="16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        {/* Left lens — flat bottom, upswept outer top corner */}
        <path
          d="M 13,34
             C 13,42 18,48 28,48
             C 38,48 51,46 52,36
             L 52,24
             C 52,18 48,13 40,10
             C 32,8 22,8 16,13
             C 13,16 13,24 13,34 Z"
          {...lensProps}
        />
        <path
          d="M 17,14 C 22,10 32,9 40,11 L 34,19 C 28,17 21,16 17,14 Z"
          fill={`url(#hl-${sid})`}
        />
        {/* Right lens (mirror) */}
        <path
          d="M 107,34
             C 107,42 102,48 92,48
             C 82,48 69,46 68,36
             L 68,24
             C 68,18 72,13 80,10
             C 88,8 98,8 104,13
             C 107,16 107,24 107,34 Z"
          {...lensProps}
        />
        <path
          d="M 103,14 C 98,10 88,9 80,11 L 86,19 C 92,17 99,16 103,14 Z"
          fill={`url(#hl-${sid})`}
        />
        {/* Bridge */}
        <path d="M 52,26 C 56,22 64,22 68,26" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="56" cy="29" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
        <ellipse cx="64" cy="29" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
      </svg>
    );
  }

  /* ─── SQUARE ─────────────────────────────────────────────────────────── */
  if (shape === "square") {
    return (
      <svg viewBox="0 0 120 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {sharedDefs}
        <line x1="0" y1="14" x2="12" y2="16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        <line x1="120" y1="14" x2="108" y2="16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        {/* Left lens — square proportions */}
        <rect x="12" y="8" width="38" height="36" rx="3.5" {...lensProps} />
        <path d="M 16,11 L 44,11 L 44,20 L 16,20 Z" fill={`url(#hl-${sid})`} rx="2" />
        {/* Right lens */}
        <rect x="70" y="8" width="38" height="36" rx="3.5" {...lensProps} />
        <path d="M 74,11 L 102,11 L 102,20 L 74,20 Z" fill={`url(#hl-${sid})`} />
        {/* Bridge */}
        <path d="M 50,20 C 54,16 66,16 70,20" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="55" cy="23" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
        <ellipse cx="65" cy="23" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
      </svg>
    );
  }

  /* ─── RECTANGLE (default) ────────────────────────────────────────────── */
  const id2 = sid;
  return (
    <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {sharedDefs}
      <line x1="0" y1="16" x2="12" y2="18" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <line x1="120" y1="16" x2="108" y2="18" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      {/* Left lens — wider than tall */}
      <rect x="12" y="10" width="40" height="27" rx="3" {...lensProps} />
      <path d="M 16,13 L 46,13 L 46,21 L 16,21 Z" fill={`url(#hl-${id2})`} />
      {/* Right lens */}
      <rect x="68" y="10" width="40" height="27" rx="3" {...lensProps} />
      <path d="M 72,13 L 102,13 L 102,21 L 72,21 Z" fill={`url(#hl-${id2})`} />
      {/* Bridge */}
      <path d="M 52,20 C 56,16 64,16 68,20" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="56" cy="23" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
      <ellipse cx="64" cy="23" rx="2" ry="1.2" fill={stroke} opacity="0.45" />
    </svg>
  );
}

function TryOnModal({ frame, onClose }: { frame: Frame; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-cv-ink/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Virtual Try-On: ${frame.name}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-cv-surface border border-cv-border w-full sm:max-w-md p-6 sm:p-8 relative rounded-t-xl sm:rounded-none">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-cv-ink-muted hover:text-cv-ink hover:bg-cv-bg transition-colors rounded-full text-base"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-[10px] tracking-[0.3em] uppercase text-cv-teal mb-1">Virtual Try-On</p>
        <h3 className="font-display text-xl font-light text-cv-ink mb-1">{frame.name}</h3>
        <p className="text-[10px] tracking-widest uppercase text-cv-ink-muted mb-5">{frame.brand} · {frame.color}</p>

        {/* Camera preview area */}
        <div className="relative bg-cv-bg border border-cv-border h-48 flex flex-col items-center justify-center mb-5 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-36 h-20 border border-dashed border-cv-border-strong rounded-full opacity-40" />
          </div>
          <div className="text-center px-6">
            <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center border border-cv-border rounded-full">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cv-ink-muted" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <p className="text-xs text-cv-ink-muted leading-relaxed">
              Allow camera access to preview<br />{frame.name} on your face
            </p>
          </div>
        </div>

        <button
          className="btn-3d cursor-pointer w-full py-3.5 bg-cv-teal text-white text-xs font-semibold tracking-[0.15em] uppercase hover:bg-cv-teal-dark mb-3"
          onClick={() => {}}
        >
          Enable Camera
        </button>
        <p className="text-[10px] text-cv-ink-muted text-center mb-5">
          Camera feed stays on your device. Nothing is recorded or uploaded.
        </p>

        <div className="pt-5 border-t border-cv-border">
          <dl className="flex gap-6 font-mono text-[10px] text-cv-ink-muted">
            <div><dt className="tracking-widest uppercase mb-0.5">Size</dt><dd className="text-cv-ink">{frame.dimensions}</dd></div>
            <div><dt className="tracking-widest uppercase mb-0.5">Face Fit</dt><dd className="text-cv-ink capitalize">{frame.faceFit}</dd></div>
            <div><dt className="tracking-widest uppercase mb-0.5">Price</dt><dd className="text-cv-gold font-semibold">${frame.price}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

const PAGE_SIZE = 8;
const BRAND_COUNT = new Set(frames.map((f) => f.brand)).size;

export default function FrameCatalog() {
  const [activeMaterial, setActiveMaterial] = useState<Material | "all">("all");
  const [activeShape, setActiveShape] = useState<FrameShape | "all">("all");
  const [activeFaceFit, setActiveFaceFit] = useState<FaceFit | "all">("all");
  const [tryOnFrame, setTryOnFrame] = useState<Frame | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = frames.filter(
    (f) =>
      (activeMaterial === "all" || f.material === activeMaterial) &&
      (activeShape === "all" || f.shape === activeShape) &&
      (activeFaceFit === "all" || f.faceFit === activeFaceFit)
  );

  const materials = Array.from(new Set(frames.map((f) => f.material))) as Material[];
  const shapes = Array.from(new Set(frames.map((f) => f.shape))) as FrameShape[];
  const faceFits = (["small", "medium", "large", "extra-large"] as FaceFit[]).filter((fit) =>
    frames.some((f) => f.faceFit === fit)
  );

  function clearFilters() {
    setActiveMaterial("all");
    setActiveShape("all");
    setActiveFaceFit("all");
    setVisibleCount(PAGE_SIZE);
  }

  const hasFilters = activeMaterial !== "all" || activeShape !== "all" || activeFaceFit !== "all";
  const activeFilterCount = [activeMaterial, activeShape, activeFaceFit].filter((v) => v !== "all").length;

  const pillClass = (active: boolean) =>
    `cursor-pointer whitespace-nowrap text-[11px] px-4 py-2 border transition-colors tracking-wider min-h-9 flex items-center ${
      active
        ? "bg-cv-teal text-white border-cv-teal"
        : "border-cv-border text-cv-ink-muted hover:border-cv-ink hover:text-cv-ink bg-cv-surface"
    }`;

  return (
    <>
      <section id="frames" className="py-16 lg:py-24 bg-cv-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── Header ──────────────────────────────────────────────── */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-cv-teal mb-2">Eyewear Collection</p>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl lg:text-4xl font-light tracking-tight text-cv-ink">
                Frame Catalog
              </h2>
              <div className="text-right shrink-0">
                <p className="font-mono text-[10px] text-cv-ink-muted tracking-widest uppercase hidden sm:block">
                  {frames.length} Styles · {BRAND_COUNT} Brands
                </p>
                <p className="font-mono text-[10px] text-cv-ink-muted mt-0.5">
                  {Math.min(visibleCount, filtered.length)}<span className="hidden sm:inline"> of {filtered.length}</span>
                  <span className="sm:hidden"> / {filtered.length}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 h-px bg-cv-border" />
          </div>

          {/* ── Filters — desktop (always visible) ─────────────────── */}
          <div className="hidden sm:block mb-10">
            <div className="border border-cv-border bg-cv-surface p-5 space-y-4" role="group" aria-label="Filter frames">
              {/* Material */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[9px] tracking-[0.3em] uppercase text-cv-ink-muted w-16 shrink-0">Material</span>
                <button onClick={() => setActiveMaterial("all")} className={pillClass(activeMaterial === "all")}>All</button>
                {materials.map((m) => (
                  <button key={m} onClick={() => setActiveMaterial(activeMaterial === m ? "all" : m)} className={pillClass(activeMaterial === m)}>
                    {materialLabels[m]}
                  </button>
                ))}
              </div>
              <div className="h-px bg-cv-border" />
              {/* Shape */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[9px] tracking-[0.3em] uppercase text-cv-ink-muted w-16 shrink-0">Shape</span>
                <button onClick={() => setActiveShape("all")} className={pillClass(activeShape === "all")}>All</button>
                {shapes.map((s) => (
                  <button key={s} onClick={() => setActiveShape(activeShape === s ? "all" : s)} className={pillClass(activeShape === s)}>
                    {shapeLabels[s]}
                  </button>
                ))}
              </div>
              <div className="h-px bg-cv-border" />
              {/* Face Fit */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[9px] tracking-[0.3em] uppercase text-cv-ink-muted w-16 shrink-0">Face Fit</span>
                <button onClick={() => setActiveFaceFit("all")} className={pillClass(activeFaceFit === "all")}>All</button>
                {faceFits.map((fit) => (
                  <button key={fit} onClick={() => setActiveFaceFit(activeFaceFit === fit ? "all" : fit)} className={pillClass(activeFaceFit === fit)}>
                    {faceFitLabels[fit]}
                  </button>
                ))}
                {hasFilters && (
                  <button onClick={clearFilters} className="cursor-pointer ml-2 text-[10px] tracking-widest uppercase text-cv-teal border border-cv-teal px-4 py-2 hover:bg-cv-teal hover:text-white transition-colors min-h-9">
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Filters — mobile (collapsible drawer) ──────────────── */}
          <div className="sm:hidden mb-6">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="cursor-pointer w-full flex items-center justify-between px-4 py-3.5 border border-cv-border bg-cv-surface text-sm text-cv-ink"
              aria-expanded={filtersOpen}
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-cv-ink-muted">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm2 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Filter Frames
                {activeFilterCount > 0 && (
                  <span className="bg-cv-teal text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <svg
                viewBox="0 0 20 20" fill="currentColor"
                className={`w-4 h-4 text-cv-ink-muted transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {filtersOpen && (
              <div className="border border-t-0 border-cv-border bg-cv-surface p-4 space-y-5">
                {/* Material */}
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-cv-ink-muted mb-2">Material</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setActiveMaterial("all")} className={pillClass(activeMaterial === "all")}>All</button>
                    {materials.map((m) => (
                      <button key={m} onClick={() => setActiveMaterial(activeMaterial === m ? "all" : m)} className={pillClass(activeMaterial === m)}>
                        {materialLabels[m]}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Shape */}
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-cv-ink-muted mb-2">Shape</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setActiveShape("all")} className={pillClass(activeShape === "all")}>All</button>
                    {shapes.map((s) => (
                      <button key={s} onClick={() => setActiveShape(activeShape === s ? "all" : s)} className={pillClass(activeShape === s)}>
                        {shapeLabels[s]}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Face Fit */}
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-cv-ink-muted mb-2">Face Fit</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setActiveFaceFit("all")} className={pillClass(activeFaceFit === "all")}>All</button>
                    {faceFits.map((fit) => (
                      <button key={fit} onClick={() => setActiveFaceFit(activeFaceFit === fit ? "all" : fit)} className={pillClass(activeFaceFit === fit)}>
                        {faceFitLabels[fit]}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-cv-border">
                  {hasFilters ? (
                    <button onClick={clearFilters} className="cursor-pointer text-[10px] tracking-widest uppercase text-cv-teal">
                      Clear All
                    </button>
                  ) : <span />}
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="cursor-pointer text-xs bg-cv-teal text-white px-5 py-2.5 tracking-widest uppercase"
                  >
                    Show {filtered.length} Results
                  </button>
                </div>
              </div>
            )}

            {/* Active filter chips (mobile) */}
            {hasFilters && !filtersOpen && (
              <div className="flex flex-wrap gap-2 mt-3">
                {activeMaterial !== "all" && (
                  <button
                    onClick={() => setActiveMaterial("all")}
                    className="cursor-pointer flex items-center gap-1.5 text-[10px] px-3 py-1.5 bg-cv-teal text-white"
                  >
                    {materialLabels[activeMaterial]} <span aria-hidden>×</span>
                  </button>
                )}
                {activeShape !== "all" && (
                  <button
                    onClick={() => setActiveShape("all")}
                    className="cursor-pointer flex items-center gap-1.5 text-[10px] px-3 py-1.5 bg-cv-teal text-white"
                  >
                    {shapeLabels[activeShape]} <span aria-hidden>×</span>
                  </button>
                )}
                {activeFaceFit !== "all" && (
                  <button
                    onClick={() => setActiveFaceFit("all")}
                    className="cursor-pointer flex items-center gap-1.5 text-[10px] px-3 py-1.5 bg-cv-teal text-white"
                  >
                    {faceFitLabels[activeFaceFit]} <span aria-hidden>×</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── Grid ────────────────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-cv-border bg-cv-surface">
              <p className="text-cv-ink-muted text-sm mb-4">No frames match this combination.</p>
              <button onClick={clearFilters} className="cursor-pointer text-xs tracking-widest uppercase text-cv-teal border border-cv-teal px-6 py-2.5 hover:bg-cv-teal hover:text-white transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <ul
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-cv-border border border-cv-border"
                role="list"
              >
                {filtered.slice(0, visibleCount).map((frame) => (
                  <li
                    key={frame.id}
                    className="bg-cv-surface group relative hover:z-10 hover:shadow-lg transition-all duration-200 flex flex-col"
                  >
                    {/* Frame illustration */}
                    <div
                      className="relative overflow-hidden flex items-center justify-center px-4 pt-5 pb-3 sm:px-6 sm:pt-7 sm:pb-4"
                      style={{
                        background: `linear-gradient(150deg, ${frame.colorHex}1A 0%, transparent 65%)`,
                        minHeight: "96px",
                      }}
                    >
                      <div className="w-full max-w-40">
                        <GlassesIcon shape={frame.shape} colorHex={frame.colorHex} id={frame.id} />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-3.5 sm:p-5 flex flex-col flex-1">
                      {/* Brand */}
                      <p className="text-[9px] tracking-[0.28em] uppercase text-cv-teal font-medium mb-1">
                        {frame.brand}
                      </p>

                      {/* Name + color chip */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <p className="text-sm font-semibold text-cv-ink leading-tight">{frame.name}</p>
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full shrink-0 border border-black/10 shadow-sm"
                          style={{ backgroundColor: frame.colorHex }}
                          title={frame.color}
                          aria-label={frame.color}
                        />
                      </div>

                      <p className="text-[10px] text-cv-ink-muted leading-snug mb-2">{frame.color}</p>

                      {/* Specs — scrollable on mobile */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-3">
                        <span className="font-mono text-[9px] text-cv-ink-muted bg-cv-bg px-1.5 py-0.5">{frame.dimensions}</span>
                        <span className="text-[9px] text-cv-ink-muted">{shapeLabels[frame.shape]}</span>
                        <span className="text-cv-border-strong text-[9px]">·</span>
                        <span className="text-[9px] text-cv-ink-muted">{materialLabels[frame.material]}</span>
                      </div>

                      <div className="flex-1" />

                      {/* Footer */}
                      <div className="pt-3 border-t border-cv-border mt-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-base font-bold text-cv-ink">${frame.price}</span>
                          {frame.inStock ? (
                            <span className="flex items-center gap-1.5 text-[9px] tracking-widest uppercase text-emerald-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              In Stock
                            </span>
                          ) : (
                            <span className="text-[9px] tracking-widest uppercase text-cv-ink-muted">Sold Out</span>
                          )}
                        </div>

                        {frame.inStock ? (
                          <button
                            onClick={() => setTryOnFrame(frame)}
                            className="cursor-pointer w-full py-2.5 text-[10px] tracking-widest uppercase text-cv-teal border border-cv-teal hover:bg-cv-teal hover:text-white transition-colors"
                            aria-label={`Try on ${frame.name}`}
                          >
                            Virtual Try-On
                          </button>
                        ) : (
                          <button className="cursor-pointer w-full py-2.5 text-[10px] tracking-widest uppercase text-cv-ink-muted border border-cv-border hover:border-cv-ink hover:text-cv-ink transition-colors">
                            Notify Me
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {filtered.length > PAGE_SIZE && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 pt-8 border-t border-cv-border">
                  <div className="flex gap-3">
                    {visibleCount < filtered.length && (
                      <button
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="cursor-pointer text-xs px-8 py-3.5 border border-cv-teal text-cv-teal hover:bg-cv-teal hover:text-white transition-colors tracking-widest uppercase"
                      >
                        View More
                      </button>
                    )}
                    {visibleCount > PAGE_SIZE && (
                      <button
                        onClick={() => setVisibleCount((c) => Math.max(PAGE_SIZE, c - PAGE_SIZE))}
                        className="cursor-pointer text-xs px-8 py-3.5 border border-cv-border text-cv-ink-muted hover:border-cv-ink hover:text-cv-ink transition-colors tracking-widest uppercase"
                      >
                        View Less
                      </button>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-cv-ink-muted">
                    {Math.min(visibleCount, filtered.length)} / {filtered.length}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {tryOnFrame && (
        <TryOnModal frame={tryOnFrame} onClose={() => setTryOnFrame(null)} />
      )}
    </>
  );
}
