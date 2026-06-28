"use client";

import { useState } from "react";
import { bookingSlots } from "@/data/optometry";

type Reason = "comprehensive" | "contact-fitting" | "follow-up";
type Doctor = "dr-chen" | "dr-webb";

interface Selections {
  reason: Reason | null;
  doctor: Doctor | null;
  slotId: string | null;
  name: string;
  email: string;
  phone: string;
}

const reasons: { id: Reason; label: string; prompt: string; duration: string; badge: string | null }[] = [
  { id: "comprehensive", label: "Comprehensive Eye Exam", prompt: "It's been a year. Time to check in.", duration: "60", badge: "Most common" },
  { id: "contact-fitting", label: "Contact Lens Fitting", prompt: "I want to switch to or update my contacts", duration: "45", badge: null },
  { id: "follow-up", label: "Follow-up / Other", prompt: "I have a specific concern", duration: "20", badge: "Existing patients" },
];

const doctors = [
  { id: "dr-chen" as Doctor, name: "Dr. Sarah Chen", credential: "OD", npi: "1234567890", note: "Specialty: Pediatric & general optometry" },
  { id: "dr-webb" as Doctor, name: "Dr. Marcus Webb", credential: "OD", npi: "0987654321", note: "Specialty: Contact lens & myopia management" },
];

const doctorNameMap: Record<Doctor, string> = {
  "dr-chen": "Dr. Sarah Chen, OD",
  "dr-webb": "Dr. Marcus Webb, OD",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function getDaysFromSlots(): string[] {
  return Array.from(new Set(bookingSlots.map((s) => s.date))).sort();
}

function CalendarPanel({
  activeDate,
  onSelectDate,
  availableDates,
}: {
  activeDate: string;
  onSelectDate: (date: string) => void;
  availableDates: Set<string>;
}) {
  const initial = new Date(activeDate + "T00:00:00");
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function toDateStr(day: number) {
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${viewYear}-${m}-${d}`;
  }

  function prevMonth() {
    const d = new Date(viewYear, viewMonth - 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  function nextMonth() {
    const d = new Date(viewYear, viewMonth + 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border border-cv-border bg-cv-surface p-5 sticky top-8">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          aria-label="Previous month"
          className="cursor-pointer text-cv-ink-muted hover:text-cv-ink transition-colors px-1 py-0.5 text-sm"
        >
          ←
        </button>
        <p className="text-[10px] font-mono tracking-widest uppercase text-cv-ink">{monthLabel}</p>
        <button
          onClick={nextMonth}
          aria-label="Next month"
          className="cursor-pointer text-cv-ink-muted hover:text-cv-ink transition-colors px-1 py-0.5 text-sm"
        >
          →
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center text-[9px] font-mono text-cv-ink-muted py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateStr = toDateStr(day);
          const isAvailable = availableDates.has(dateStr);
          const isSelected = dateStr === activeDate;
          const isPast = new Date(dateStr + "T00:00:00") < today;
          return (
            <button
              key={i}
              disabled={!isAvailable || isPast}
              onClick={() => onSelectDate(dateStr)}
              className={`text-[11px] font-mono h-7 w-full flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-cv-teal text-white cursor-pointer"
                  : isAvailable && !isPast
                  ? "text-cv-teal hover:bg-cv-teal/10 font-semibold cursor-pointer"
                  : "text-cv-border cursor-default"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-cv-border flex items-center gap-2">
        <span className="text-[9px] font-mono text-cv-teal font-bold">●</span>
        <span className="text-[9px] font-mono text-cv-ink-muted uppercase tracking-wider">
          Available dates
        </span>
      </div>
    </div>
  );
}

export default function AppointmentFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [selections, setSelections] = useState<Selections>({
    reason: null,
    doctor: null,
    slotId: null,
    name: "",
    email: "",
    phone: "",
  });
  const [activeDate, setActiveDate] = useState<string>(getDaysFromSlots()[0] ?? "");

  const days = getDaysFromSlots();
  const availableDates = new Set(bookingSlots.filter((s) => s.available).map((s) => s.date));

  const availableSlots = bookingSlots.filter(
    (s) =>
      s.date === activeDate &&
      s.available &&
      (selections.doctor ? s.doctor === doctorNameMap[selections.doctor] : true)
  );

  const selectedSlot = bookingSlots.find((s) => s.id === selections.slotId);

  function canContinue(): boolean {
    if (step === 1) return selections.reason !== null;
    if (step === 2) return selections.doctor !== null;
    if (step === 3) return selections.slotId !== null;
    if (step === 4) return selections.name.trim() !== "" && selections.email.includes("@");
    return false;
  }

  function handleConfirm() {
    setConfirmed(true);
  }

  function handleCalendarSelect(date: string) {
    setActiveDate(date);
    setSelections((s) => ({ ...s, slotId: null }));
    if (step === 3) return;
  }

  if (confirmed) {
    return (
      <section id="book" className="relative py-16 lg:py-24 overflow-hidden" style={{ background: "#EFF6FF" }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10" style={{ background: "linear-gradient(to bottom, #FAFAFA, transparent)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10" style={{ background: "linear-gradient(to top, #ffffff, transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl border border-cv-teal bg-cv-surface p-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-cv-teal mb-4">
              ✓ Appointment Confirmed
            </p>
            <h2 className="font-display text-2xl font-light text-cv-ink mb-6">
              See you soon, {selections.name.split(" ")[0]}.
            </h2>
            <dl className="space-y-3 font-mono text-sm text-cv-ink-muted">
              {selectedSlot && (
                <>
                  <div>
                    <dt className="text-[10px] tracking-widest uppercase mb-0.5">Date & Time</dt>
                    <dd className="text-cv-ink">{formatDate(selectedSlot.date)} · {selectedSlot.time}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-widest uppercase mb-0.5">Doctor</dt>
                    <dd className="text-cv-ink">{selectedSlot.doctor}</dd>
                  </div>
                </>
              )}
              <div>
                <dt className="text-[10px] tracking-widest uppercase mb-0.5">Visit Type</dt>
                <dd className="text-cv-ink">
                  {reasons.find((r) => r.id === selections.reason)?.label}
                </dd>
              </div>
            </dl>
            <p className="text-xs text-cv-ink-muted mt-6 pt-6 border-t border-cv-border">
              A confirmation will be sent to {selections.email}. Please arrive 10 minutes early.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="relative py-16 lg:py-24 overflow-hidden" style={{ background: "#EFF6FF" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10" style={{ background: "linear-gradient(to bottom, #FAFAFA, transparent)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10" style={{ background: "linear-gradient(to top, #ffffff, transparent)" }} />
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8 pb-4 border-b border-cv-border">
          <p className="text-[10px] tracking-[0.3em] uppercase text-cv-ink-muted mb-1">
            Appointments
          </p>
          <h2 className="font-display text-2xl font-light tracking-tight text-cv-ink mt-2">
            Schedule Your Exam
          </h2>
          {/* Step bar */}
          <div className="mt-4 h-0.75 bg-cv-border relative">
            <div
              className="absolute top-0 left-0 h-0.75 bg-cv-teal transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Body: steps left, calendar right */}
        <div className="flex flex-col lg:flex-row lg:gap-16">

          {/* Steps */}
          <div className="flex-1 min-w-0">

            {/* Step 1: Reason */}
            {step === 1 && (
              <div>
                <p className="text-sm text-cv-ink-muted mb-6">Which of these sounds like you?</p>
                <div className="space-y-3">
                  {reasons.map((r) => {
                    const selected = selections.reason === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setSelections((s) => ({ ...s, reason: r.id }))}
                        className={`btn-shine cursor-pointer w-full flex flex-row text-left border transition-colors ${
                          selected
                            ? "border-cv-teal"
                            : "border-cv-border bg-cv-surface hover:border-cv-ink"
                        }`}
                      >
                        {/* Duration cell */}
                        <div
                          className={`w-16 shrink-0 flex flex-col items-center justify-center py-5 border-r font-mono transition-colors ${
                            selected
                              ? "bg-cv-teal text-white border-cv-teal"
                              : "border-cv-border text-cv-ink-muted"
                          }`}
                        >
                          <span className="text-sm font-semibold leading-none">{r.duration}</span>
                          <span className="text-[9px] opacity-70 mt-0.5">min</span>
                        </div>
                        {/* Content cell */}
                        <div className={`flex-1 px-5 py-4 transition-colors ${selected ? "bg-cv-teal/5" : ""}`}>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-cv-ink">{r.label}</p>
                            {r.badge && (
                              <span className="shrink-0 text-[9px] tracking-widest uppercase font-mono text-cv-teal border border-cv-teal/30 px-1.5 py-0.5">
                                {r.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-cv-ink-muted mt-1 italic">{r.prompt}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Doctor */}
            {step === 2 && (
              <div>
                <p className="text-sm text-cv-ink-muted mb-6">Choose your doctor, or we&apos;ll assign the next available.</p>
                <div className="space-y-3">
                  {doctors.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelections((s) => ({ ...s, doctor: d.id }))}
                      className={`btn-shine cursor-pointer w-full text-left p-5 border transition-colors ${
                        selections.doctor === d.id
                          ? "border-cv-teal bg-cv-teal/5 border-l-4 border-l-cv-teal"
                          : "border-cv-border bg-cv-surface hover:border-cv-ink"
                      }`}
                    >
                      <p className="text-sm font-medium text-cv-ink">
                        {d.name}, {d.credential}
                      </p>
                      <p className="font-mono text-[10px] text-cv-ink-muted mt-0.5">NPI {d.npi}</p>
                      <p className="text-xs text-cv-ink-muted mt-1">{d.note}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div>
                <p className="text-sm text-cv-ink-muted mb-6">Select a date and time.</p>

                {/* Date strip */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6" role="group" aria-label="Select date">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => { setActiveDate(day); setSelections((s) => ({ ...s, slotId: null })); }}
                      className={`btn-shine cursor-pointer shrink-0 px-4 py-3 border text-xs text-center transition-colors ${
                        activeDate === day
                          ? "bg-cv-teal text-white border-cv-teal"
                          : "border-cv-border text-cv-ink-muted hover:border-cv-ink hover:text-cv-ink"
                      }`}
                    >
                      {formatDate(day)}
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                {availableSlots.length === 0 ? (
                  <p className="text-sm text-cv-ink-muted py-6 border border-dashed border-cv-border text-center">
                    No availability on this date. Try another day.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Select time">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelections((s) => ({ ...s, slotId: slot.id }))}
                        className={`btn-shine cursor-pointer font-mono text-xs px-4 py-2.5 border transition-colors ${
                          selections.slotId === slot.id
                            ? "bg-cv-teal text-white border-cv-teal"
                            : "border-cv-border text-cv-ink-muted hover:border-cv-teal hover:text-cv-teal"
                        }`}
                      >
                        {slot.time}
                        {!selections.doctor && (
                          <span className="block text-[9px] opacity-70 mt-0.5">
                            {slot.doctor.split(" ")[2]}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Patient Info */}
            {step === 4 && (
              <div>
                <p className="text-sm text-cv-ink-muted mb-6">Last step: your contact information.</p>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="patient-name" className="block text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                      Full Name
                    </label>
                    <input
                      id="patient-name"
                      type="text"
                      value={selections.name}
                      onChange={(e) => setSelections((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Jane Smith"
                      autoComplete="name"
                      className="w-full border-0 border-b border-cv-border bg-transparent px-0 py-3 text-sm text-cv-ink placeholder:text-cv-ink-muted focus:outline-none focus:border-cv-teal transition-colors rounded-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="patient-email" className="block text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                      Email
                    </label>
                    <input
                      id="patient-email"
                      type="email"
                      value={selections.email}
                      onChange={(e) => setSelections((s) => ({ ...s, email: e.target.value }))}
                      placeholder="jane@example.com"
                      autoComplete="email"
                      className="w-full border-0 border-b border-cv-border bg-transparent px-0 py-3 text-sm text-cv-ink placeholder:text-cv-ink-muted focus:outline-none focus:border-cv-teal transition-colors rounded-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="patient-phone" className="block text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                      Phone <span className="text-cv-ink-muted normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      value={selections.phone}
                      onChange={(e) => setSelections((s) => ({ ...s, phone: e.target.value }))}
                      placeholder="(415) 555-0100"
                      autoComplete="tel"
                      className="w-full border-0 border-b border-cv-border bg-transparent px-0 py-3 text-sm text-cv-ink placeholder:text-cv-ink-muted focus:outline-none focus:border-cv-teal transition-colors rounded-none"
                    />
                  </div>

                  {/* Summary */}
                  {selectedSlot && (
                    <div className="border border-cv-border p-4 mt-2">
                      <p className="text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">Your appointment</p>
                      <p className="text-sm text-cv-ink">
                        {formatDate(selectedSlot.date)} · {selectedSlot.time} · {selectedSlot.doctor}
                      </p>
                      <p className="text-xs text-cv-ink-muted mt-1">
                        {reasons.find((r) => r.id === selections.reason)?.label}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-cv-border">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
                  className="btn-shine cursor-pointer text-xs text-cv-ink-muted hover:text-cv-ink transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4)}
                  disabled={!canContinue()}
                  className="btn-3d cursor-pointer text-xs font-semibold tracking-widest uppercase px-8 py-3 bg-cv-teal text-white hover:bg-cv-teal-dark disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={!canContinue()}
                  className="btn-3d cursor-pointer text-xs font-semibold tracking-widest uppercase px-8 py-3 bg-cv-teal text-white hover:bg-cv-teal-dark disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Confirm Appointment
                </button>
              )}
            </div>
          </div>

          {/* Calendar sidebar */}
          <div className="mt-10 lg:mt-0 lg:w-64 shrink-0">
            <CalendarPanel
              activeDate={activeDate}
              onSelectDate={handleCalendarSelect}
              availableDates={availableDates}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
