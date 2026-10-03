"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  frames,
  frameBrands,
  bridgeFitFor,
  type Frame,
  type Material,
  type FrameShape,
  type FaceFit,
  type FrameType,
  type BridgeFit,
} from "@/data/optometry";
import Photo from "@/components/Photo";

const typeLabels: Record<FrameType, string> = { optical: "Eyeglasses", sun: "Sunglasses" };
const shapeLabels: Record<FrameShape, string> = {
  round: "Round",
  square: "Square",
  rectangle: "Rectangle",
  aviator: "Aviator",
  "cat-eye": "Cat-Eye",
  oval: "Oval",
};
const materialLabels: Record<Material, string> = {
  acetate: "Acetate",
  titanium: "Titanium",
  "stainless-steel": "Steel",
  mixed: "Mixed",
};
const bridgeLabels: Record<BridgeFit, string> = {
  narrow: "Narrow ≤17",
  standard: "Standard 18–20",
  wide: "Wide 21+",
};
const faceFitLabels: Record<FaceFit, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  "extra-large": "XL",
};

type FilterKey = "type" | "shape" | "material" | "bridge" | "faceFit";
type Filters = Record<FilterKey, string>;

const filterGroups: { key: FilterKey; label: string; options: Record<string, string>; value: (f: Frame) => string }[] = [
  { key: "type", label: "Type", options: typeLabels, value: (f) => f.type },
  { key: "shape", label: "Shape", options: shapeLabels, value: (f) => f.shape },
  { key: "material", label: "Material", options: materialLabels, value: (f) => f.material },
  { key: "bridge", label: "Bridge", options: bridgeLabels, value: (f) => bridgeFitFor(f.bridgeWidth) },
  { key: "faceFit", label: "Face Fit", options: faceFitLabels, value: (f) => f.faceFit },
];

const sortOptions = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  name: "Name A–Z",
} as const;
type SortKey = keyof typeof sortOptions;

const EMPTY_FILTERS: Filters = { type: "all", shape: "all", material: "all", bridge: "all", faceFit: "all" };
const PAGE_SIZE = 12;

function TryOnModal({ frame, onClose }: { frame: Frame; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camera, setCamera] = useState<"idle" | "requesting" | "live" | "denied" | "unsupported">("idle");

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      trigger?.focus();
    };
  }, [onClose]);

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamera("unsupported");
      return;
    }
    setCamera("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCamera("live");
    } catch {
      setCamera("denied");
    }
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-end sm:items-center justify-center bg-cv-ink/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tryon-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="bg-cv-surface border border-cv-border w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto p-5 sm:p-8 relative"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-cv-ink-muted hover:text-cv-ink hover:bg-cv-bg transition-colors rounded-full text-base"
          aria-label="Close try-on"
        >
          ✕
        </button>

        <p className="text-[10px] tracking-[0.3em] uppercase text-cv-teal mb-1">Virtual Try-On</p>
        <h3 id="tryon-title" className="font-display text-xl font-light text-cv-ink mb-1 pr-10">
          {frame.brand} {frame.name}
        </h3>
        <p className="text-[11px] tracking-widest uppercase text-cv-ink-muted mb-5">{frame.color}</p>

        <div className="relative bg-cv-ink aspect-4/3 mb-4 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover -scale-x-100 ${camera === "live" ? "" : "hidden"}`}
            aria-label="Your camera preview"
          />
          {camera === "live" ? (
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[46%] aspect-3/4 rounded-[50%] border-2 border-dashed border-white/70" />
            </div>
          ) : (
            <Photo
              src={frame.image}
              widths={[480, 800]}
              aspect={[4, 3]}
              alt={`${frame.brand} ${frame.name} in ${frame.color}`}
              sizes="(min-width: 640px) 448px, 100vw"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        <div aria-live="polite" className="text-xs text-cv-ink-muted leading-relaxed mb-4 min-h-10">
          {camera === "idle" && "Turn on your camera to check the frame width against your face. Video stays on your device and is never uploaded."}
          {camera === "requesting" && "Waiting for camera permission…"}
          {camera === "live" && "Center your face in the guide. Live frame overlay is coming soon. Book a fitting to try this pair in person."}
          {camera === "denied" && "Camera access was blocked. You can allow it in your browser settings, or book a fitting to try frames in person."}
          {camera === "unsupported" && "Your browser doesn't support camera access. Book a fitting to try frames in person."}
        </div>

        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 mb-5">
          {camera === "live" ? (
            <button
              onClick={() => {
                streamRef.current?.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
                setCamera("idle");
              }}
              className="cursor-pointer h-12 border border-cv-border text-cv-ink text-xs font-semibold tracking-[0.12em] uppercase hover:border-cv-ink transition-colors"
            >
              Turn Camera Off
            </button>
          ) : (
            <button
              onClick={startCamera}
              disabled={camera === "requesting"}
              className="cursor-pointer h-12 bg-cv-teal hover:bg-cv-teal-dark text-white text-xs font-semibold tracking-[0.12em] uppercase transition-colors disabled:opacity-60"
            >
              Use My Camera
            </button>
          )}
          <Link
            href="/#book"
            onClick={onClose}
            className="h-12 flex items-center justify-center border border-cv-teal text-cv-teal text-xs font-semibold tracking-[0.12em] uppercase hover:bg-cv-teal hover:text-white transition-colors"
          >
            Book a Fitting
          </Link>
        </div>

        <dl className="pt-5 border-t border-cv-border grid grid-cols-3 gap-4 font-mono text-[11px] text-cv-ink-muted">
          <div>
            <dt className="tracking-widest uppercase mb-0.5">Size</dt>
            <dd className="text-cv-ink">{frame.dimensions}</dd>
          </div>
          <div>
            <dt className="tracking-widest uppercase mb-0.5">Face Fit</dt>
            <dd className="text-cv-ink">{faceFitLabels[frame.faceFit]}</dd>
          </div>
          <div>
            <dt className="tracking-widest uppercase mb-0.5">Price</dt>
            <dd className="text-cv-teal-dark font-semibold">${frame.price}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function FrameCard({ frame, onTryOn }: { frame: Frame; onTryOn: () => void }) {
  return (
    <li className="bg-cv-surface group relative flex flex-col">
      <div className="relative aspect-4/3 overflow-hidden bg-cv-bg">
        <Photo
          src={frame.image}
          widths={[480, 800]}
          aspect={[4, 3]}
          alt={`${frame.brand} ${frame.name} ${shapeLabels[frame.shape].toLowerCase()} ${frame.type === "sun" ? "sunglasses" : "eyeglasses"} in ${frame.color}`}
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {frame.type === "sun" && (
          <span className="absolute top-2 left-2 bg-cv-surface/95 text-cv-ink text-[9px] tracking-[0.2em] uppercase px-2 py-1">
            Sun
          </span>
        )}
        {!frame.inStock && (
          <span className="absolute top-2 right-2 bg-cv-ink/85 text-white text-[9px] tracking-[0.2em] uppercase px-2 py-1">
            Sold Out
          </span>
        )}
      </div>

      <div className="p-3.5 sm:p-5 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.22em] uppercase text-cv-teal font-medium mb-1 truncate">{frame.brand}</p>
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="text-sm sm:text-[15px] font-semibold text-cv-ink leading-tight">{frame.name}</h3>
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0 border border-black/15"
            style={{ backgroundColor: frame.colorHex }}
            aria-hidden="true"
          />
        </div>
        <p className="text-[11px] text-cv-ink-muted leading-snug mb-2">{frame.color}</p>

        <div className="flex items-center gap-1.5 flex-wrap mb-3 text-[10px] text-cv-ink-muted">
          <span className="font-mono bg-cv-bg px-1.5 py-0.5 text-cv-ink" title="Eye size ▢ bridge – temple (mm)">
            {frame.dimensions}
          </span>
          <span className="whitespace-nowrap">
            {shapeLabels[frame.shape]} <span aria-hidden="true">·</span> {materialLabels[frame.material]}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-cv-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-cv-ink">${frame.price}</span>
            {frame.inStock ? (
              <span className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                In Stock
              </span>
            ) : (
              <span className="text-[10px] tracking-wider uppercase text-cv-ink-muted">Back soon</span>
            )}
          </div>
          {frame.inStock ? (
            <button
              onClick={onTryOn}
              className="cursor-pointer w-full min-h-11 text-[10px] sm:text-[11px] tracking-widest uppercase text-cv-teal border border-cv-teal hover:bg-cv-teal hover:text-white transition-colors"
              aria-label={`Virtual try-on: ${frame.brand} ${frame.name}`}
            >
              Try On
            </button>
          ) : (
            <a
              href={`mailto:hello@clearvisionoptometry.com?subject=${encodeURIComponent(`Restock: ${frame.brand} ${frame.name} (${frame.color})`)}`}
              className="flex items-center justify-center w-full min-h-11 text-[10px] sm:text-[11px] tracking-widest uppercase text-cv-ink-muted border border-cv-border hover:border-cv-ink hover:text-cv-ink transition-colors"
              aria-label={`Email us when ${frame.brand} ${frame.name} is back in stock`}
            >
              Notify Me
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function FrameCatalog() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>("featured");
  const [tryOnFrame, setTryOnFrame] = useState<Frame | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const closeTryOn = useCallback(() => setTryOnFrame(null), []);

  const filtered = useMemo(() => {
    const list = frames.filter((f) =>
      filterGroups.every((g) => filters[g.key] === "all" || g.value(f) === filters[g.key])
    );
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filters, sort]);

  // Only show options that exist in the catalog, with live result counts.
  const groupOptions = useMemo(
    () =>
      filterGroups.map((g) => ({
        ...g,
        entries: Object.entries(g.options)
          .map(([value, label]) => ({
            value,
            label,
            count: frames.filter(
              (f) =>
                g.value(f) === value &&
                filterGroups.every((o) => o.key === g.key || filters[o.key] === "all" || o.value(f) === filters[o.key])
            ).length,
          }))
          .filter((e) => frames.some((f) => g.value(f) === e.value)),
      })),
    [filters]
  );

  const activeFilters = filterGroups.filter((g) => filters[g.key] !== "all");

  function setFilter(key: FilterKey, value: string) {
    setFilters((f) => ({ ...f, [key]: f[key] === value ? "all" : value }));
    setVisibleCount(PAGE_SIZE);
  }
  function clearFilters() {
    setFilters(EMPTY_FILTERS);
    setVisibleCount(PAGE_SIZE);
  }

  const pillClass = (active: boolean, disabled = false) =>
    `cursor-pointer whitespace-nowrap text-[11px] px-3.5 py-2 border transition-colors tracking-wider min-h-10 flex items-center gap-1.5 ${
      active
        ? "bg-cv-teal text-white border-cv-teal"
        : disabled
        ? "border-cv-border text-cv-ink-muted/60 bg-cv-surface"
        : "border-cv-border text-cv-ink-muted hover:border-cv-ink hover:text-cv-ink bg-cv-surface"
    }`;

  const filterControls = (layout: "row" | "stack") => (
    <div className={layout === "row" ? "space-y-3" : "space-y-5"}>
      {groupOptions.map((g, i) => (
        <div key={g.key}>
          {layout === "row" && i > 0 && <div className="h-px bg-cv-border mb-3" />}
          <fieldset className={layout === "row" ? "flow-root" : ""}>
            <legend
              className={`text-[10px] tracking-[0.25em] uppercase text-cv-ink-muted font-medium ${
                layout === "row" ? "float-left w-20 shrink-0 pt-3" : "mb-2"
              }`}
            >
              {g.label}
            </legend>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilters((f) => ({ ...f, [g.key]: "all" }))}
                aria-pressed={filters[g.key] === "all"}
                className={pillClass(filters[g.key] === "all")}
              >
                All
              </button>
              {g.entries.map((e) => {
                const active = filters[g.key] === e.value;
                return (
                  <button
                    type="button"
                    key={e.value}
                    onClick={() => setFilter(g.key, e.value)}
                    aria-pressed={active}
                    className={pillClass(active, e.count === 0)}
                  >
                    {e.label}
                    <span className={`font-mono text-[10px] ${active ? "text-white/80" : "text-cv-ink-muted"}`}>
                      {e.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section id="frames" className="py-16 lg:py-24 bg-cv-bg" aria-labelledby="frames-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-cv-teal mb-2">Eyewear Collection</p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="frames-heading" className="font-display text-3xl lg:text-4xl font-light tracking-tight text-cv-ink">
                Shop Frames
              </h2>
              <p className="font-mono text-[11px] text-cv-ink-muted tracking-widest uppercase">
                {frames.length} styles · {frameBrands.length} brands
              </p>
            </div>
            <p className="text-sm text-cv-ink-muted mt-3 max-w-2xl">
              Every frame is in our San Francisco optical. Try them on in person after your exam, or use the virtual
              try-on to check the fit first. Sizes are listed as eye ▢ bridge – temple, in millimeters.
            </p>
          </div>

          {/* Brands */}
          <div id="brands" className="mb-10 border-y border-cv-border py-5">
            <p className="sr-only">Brands we carry</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-between">
              {frameBrands.map((b) => (
                <li key={b} className="font-display text-base sm:text-lg font-light text-cv-ink tracking-wide">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Filters — desktop */}
          <div className="hidden md:block mb-6 border border-cv-border bg-cv-surface p-5" role="group" aria-label="Filter frames">
            {filterControls("row")}
          </div>

          {/* Filters — mobile */}
          <div className="md:hidden mb-4">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className="cursor-pointer w-full flex items-center justify-between px-4 h-12 border border-cv-border bg-cv-surface text-sm text-cv-ink"
              aria-expanded={filtersOpen}
              aria-controls="frame-filters-mobile"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-cv-ink-muted" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm2 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Filter Frames
                {activeFilters.length > 0 && (
                  <span className="bg-cv-teal text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {activeFilters.length}
                  </span>
                )}
              </span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 text-cv-ink-muted transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div
              id="frame-filters-mobile"
              hidden={!filtersOpen}
              className="border border-t-0 border-cv-border bg-cv-surface p-4"
            >
              {filterControls("stack")}
              <div className="flex items-center justify-between pt-4 mt-5 border-t border-cv-border">
                {activeFilters.length > 0 ? (
                  <button type="button" onClick={clearFilters} className="cursor-pointer text-[11px] tracking-widest uppercase text-cv-teal min-h-11">
                    Clear All
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="cursor-pointer text-xs bg-cv-teal text-white px-5 h-11 tracking-widest uppercase"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          </div>

          {/* Toolbar: active chips, count, sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2 min-h-8">
              <p className="font-mono text-[11px] text-cv-ink-muted mr-2" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? "frame" : "frames"}
              </p>
              {activeFilters.map((g) => (
                <button
                  type="button"
                  key={g.key}
                  onClick={() => setFilter(g.key, filters[g.key])}
                  className="cursor-pointer flex items-center gap-1.5 text-[11px] px-3 h-8 bg-cv-teal/10 text-cv-teal-dark border border-cv-teal/30 hover:bg-cv-teal/20"
                  aria-label={`Remove filter ${g.label}: ${g.options[filters[g.key]]}`}
                >
                  {g.options[filters[g.key]]} <span aria-hidden="true">×</span>
                </button>
              ))}
              {activeFilters.length > 1 && (
                <button type="button" onClick={clearFilters} className="cursor-pointer text-[11px] tracking-widest uppercase text-cv-teal px-2 h-8">
                  Clear all
                </button>
              )}
            </div>
            <label className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-cv-ink-muted">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="cursor-pointer bg-cv-surface border border-cv-border text-cv-ink text-xs normal-case tracking-normal h-10 px-3 focus:border-cv-teal"
              >
                {Object.entries(sortOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-cv-border bg-cv-surface">
              <p className="text-cv-ink-muted text-sm mb-4">No frames match this combination.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="cursor-pointer text-xs tracking-widest uppercase text-cv-teal border border-cv-teal px-6 h-11 hover:bg-cv-teal hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-cv-border border border-cv-border">
                {filtered.slice(0, visibleCount).map((frame) => (
                  <FrameCard key={frame.id} frame={frame} onTryOn={() => setTryOnFrame(frame)} />
                ))}
              </ul>

              {filtered.length > PAGE_SIZE && (
                <div className="flex flex-col items-center gap-3 mt-10">
                  <p className="font-mono text-[11px] text-cv-ink-muted">
                    Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
                  </p>
                  <div className="flex gap-3">
                    {visibleCount < filtered.length && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="cursor-pointer text-xs px-8 h-12 border border-cv-teal text-cv-teal hover:bg-cv-teal hover:text-white transition-colors tracking-widest uppercase"
                      >
                        Load More
                      </button>
                    )}
                    {visibleCount > PAGE_SIZE && (
                      <button
                        type="button"
                        onClick={() => {
                          setVisibleCount(PAGE_SIZE);
                          document.getElementById("frames")?.scrollIntoView();
                        }}
                        className="cursor-pointer text-xs px-8 h-12 border border-cv-border text-cv-ink-muted hover:border-cv-ink hover:text-cv-ink transition-colors tracking-widest uppercase"
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {tryOnFrame && <TryOnModal frame={tryOnFrame} onClose={closeTryOn} />}
    </>
  );
}
