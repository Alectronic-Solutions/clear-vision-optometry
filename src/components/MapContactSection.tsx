"use client";

import Link from "next/link";
import { useState } from "react";
import { clinic, hoursSummary as hours } from "@/lib/site";
import OpenStatus from "@/components/OpenStatus";

const MIN_ZOOM = 11;
const MAX_ZOOM = 18;
const DEFAULT_ZOOM = 13;

function buildEmbedUrl(zoom: number) {
  return `https://maps.google.com/maps?q=123+Vision+Blvd+San+Francisco+CA+94102&t=m&z=${zoom}&ie=UTF8&output=embed`;
}

export default function MapContactSection() {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  return (
    <section id="contact" className="py-16 lg:py-24 bg-cv-green-light border-t border-cv-green-border" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 lg:mb-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-cv-teal mb-3">Contact</p>
          <h2 id="contact-heading" className="font-display text-3xl lg:text-4xl font-light text-cv-ink">
            Find us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact details */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-cv-ink-muted mb-3">
                Address
              </p>
              <address className="not-italic font-mono text-sm text-cv-ink leading-loose">
                {clinic.street}<br />
                {clinic.city}, {clinic.region} {clinic.postalCode}
              </address>
              <p className="text-xs text-cv-ink-muted mt-2">
                Street parking on Vision Blvd · Civic Center BART, 5 min walk
              </p>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-cv-ink-muted mb-3">
                Phone
              </p>
              <a
                href={clinic.phoneHref}
                className="font-mono text-sm text-cv-ink hover:text-cv-teal transition-colors"
              >
                {clinic.phone}
              </a>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-[10px] tracking-[0.18em] uppercase text-cv-ink-muted">Hours</p>
                <p className="text-xs font-mono text-cv-ink">
                  <OpenStatus tone="light" />
                </p>
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  {hours.map((row) => (
                    <tr
                      key={row.days}
                      className="border-t border-cv-border last:border-b last:border-cv-border"
                    >
                      <td className="py-3 pr-6 font-mono text-xs text-cv-ink-muted">
                        {row.days}
                      </td>
                      <td
                        className={`py-3 font-mono text-xs text-right ${
                          row.time === "Closed" ? "text-cv-ink-muted" : "text-cv-ink"
                        }`}
                      >
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={clinic.phoneHref}
                className="btn-3d inline-flex items-center min-h-11 text-[11px] tracking-[0.12em] uppercase px-5 py-2.5 bg-cv-teal text-white hover:bg-cv-teal-dark"
              >
                <span>Call Us</span>
              </a>
              <Link
                href="/#book"
                className="btn-3d-outline inline-flex items-center min-h-11 text-[11px] tracking-[0.12em] uppercase px-5 py-2.5 border border-cv-teal text-cv-teal hover:bg-cv-teal hover:text-white"
              >
                <span>Book an Appointment</span>
              </Link>
            </div>
          </div>

          {/* Map panel */}
          <div className="flex flex-col gap-0">
            <div className="relative border border-cv-border overflow-hidden w-full min-h-75 lg:min-h-105">
              <iframe
                key={zoom}
                title="Clear Vision Optometry location map"
                src={buildEmbedUrl(zoom)}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
              />

              {/* Zoom controls */}
              <div className="absolute top-3 right-3 flex flex-col border border-cv-border overflow-hidden bg-cv-surface shadow-sm">
                <button
                  onClick={() => setZoom((z) => Math.min(z + 1, MAX_ZOOM))}
                  disabled={zoom >= MAX_ZOOM}
                  aria-label="Zoom in"
                  className="cursor-pointer w-10 h-10 flex items-center justify-center text-cv-ink text-base font-light hover:bg-cv-teal hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-b border-cv-border"
                >
                  +
                </button>
                <button
                  onClick={() => setZoom((z) => Math.max(z - 1, MIN_ZOOM))}
                  disabled={zoom <= MIN_ZOOM}
                  aria-label="Zoom out"
                  className="cursor-pointer w-10 h-10 flex items-center justify-center text-cv-ink text-base font-light hover:bg-cv-teal hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  −
                </button>
              </div>
            </div>

            {/* Below-map strip */}
            <div className="flex items-center justify-between border border-t-0 border-cv-border px-3 py-2.5 bg-cv-surface">
              <span className="font-mono text-[10px] text-cv-ink-muted tracking-[0.08em]">
                123 Vision Blvd · San Francisco CA
              </span>
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center min-h-9 text-[10px] tracking-[0.15em] uppercase px-3 border border-cv-border text-cv-ink hover:border-cv-teal hover:text-cv-teal transition-colors bg-cv-surface"
              >
                Get Directions ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
