"use client";

import { useMemo, useRef, useState } from "react";
import { generateSlots, toDateKey, type BookingSlot } from "@/data/optometry";
import { doctors, getDoctor, type DoctorId } from "@/data/doctors";
import { useHydrated } from "@/lib/hooks";
import { clinic } from "@/lib/site";

type Reason = "comprehensive" | "contact-fitting" | "pediatric" | "medical" | "follow-up";
type DoctorChoice = DoctorId | "any";
type Step = 1 | 2 | 3 | 4;

interface Selections {
  reason: Reason | null;
  doctor: DoctorChoice | null;
  slotId: string | null;
  name: string;
  email: string;
  phone: string;
  newPatient: boolean;
}

const reasons: { id: Reason; label: string; prompt: string; duration: string; badge: string | null }[] = [
  { id: "comprehensive", label: "Comprehensive Eye Exam", prompt: "Annual check-up or new glasses prescription", duration: "60", badge: "Most common" },
  { id: "contact-fitting", label: "Exam + Contact Lens Fitting", prompt: "New to contacts, or updating your lenses", duration: "75", badge: null },
  { id: "pediatric", label: "Children's Eye Exam", prompt: "For kids 6 months and older", duration: "40", badge: null },
  { id: "medical", label: "Medical Eye Visit", prompt: "Red eye, dry eye, glaucoma check, or a new symptom", duration: "30", badge: null },
  { id: "follow-up", label: "Follow-up Visit", prompt: "Checking in after a recent exam or treatment", duration: "20", badge: "Existing patients" },
];

const stepLabels: Record<Step, string> = {
  1: "Reason for visit",
  2: "Choose your doctor",
  3: "Select date and time",
  4: "Your details",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatDate(dateStr: string, opts: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" }) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", opts);
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
  const initial = activeDate ? new Date(activeDate + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const todayKey = toDateKey(new Date());
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const now = new Date();
  const canGoBack = viewYear > now.getFullYear() || (viewYear === now.getFullYear() && viewMonth > now.getMonth());

  function shiftMonth(delta: number) {
    const d = new Date(viewYear, viewMonth + delta);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="border border-cv-border bg-cv-surface p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="cursor-pointer w-9 h-9 flex items-center justify-center text-cv-ink-muted hover:text-cv-ink disabled:opacity-30 disabled:cursor-default"
        >
          ←
        </button>
        <p className="text-[11px] font-mono tracking-widest uppercase text-cv-ink" aria-live="polite">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
          className="cursor-pointer w-9 h-9 flex items-center justify-center text-cv-ink-muted hover:text-cv-ink"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1" aria-hidden="true">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center text-[10px] font-mono text-cv-ink-muted py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isAvailable = availableDates.has(dateStr);
          const isSelected = dateStr === activeDate;
          const label = formatDate(dateStr, { weekday: "long", month: "long", day: "numeric" });
          return (
            <button
              type="button"
              key={i}
              disabled={!isAvailable}
              onClick={() => onSelectDate(dateStr)}
              aria-label={`${label}, ${isAvailable ? "available" : "unavailable"}`}
              aria-pressed={isSelected}
              aria-current={dateStr === todayKey ? "date" : undefined}
              className={`text-[11px] font-mono h-8 w-full flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-cv-teal text-white cursor-pointer"
                  : isAvailable
                  ? "text-cv-teal-dark hover:bg-cv-teal/10 font-semibold cursor-pointer"
                  : "text-cv-ink-muted/50 cursor-default"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-cv-border flex items-center gap-2">
        <span className="w-2 h-2 bg-cv-teal" aria-hidden="true" />
        <span className="text-[10px] font-mono text-cv-ink-muted uppercase tracking-wider">Available dates</span>
      </div>
    </div>
  );
}

export default function AppointmentFlow() {
  const hydrated = useHydrated();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [touched, setTouched] = useState(false);
  const [selections, setSelections] = useState<Selections>({
    reason: null,
    doctor: null,
    slotId: null,
    name: "",
    email: "",
    phone: "",
    newPatient: true,
  });
  const [pickedDate, setPickedDate] = useState("");

  // Slots depend on the visitor's clock, so they only exist after hydration.
  const slots = useMemo<BookingSlot[]>(() => (hydrated ? generateSlots(new Date()) : []), [hydrated]);

  const doctorSlots = useMemo(
    () =>
      slots.filter(
        (s) => s.available && (selections.doctor && selections.doctor !== "any" ? s.doctorId === selections.doctor : true)
      ),
    [slots, selections.doctor]
  );
  const availableDates = useMemo(() => Array.from(new Set(doctorSlots.map((s) => s.date))), [doctorSlots]);
  const availableDateSet = useMemo(() => new Set(availableDates), [availableDates]);
  const activeDate = availableDateSet.has(pickedDate) ? pickedDate : availableDates[0] ?? "";

  // With "any doctor", collapse duplicate times so each time shows once.
  const daySlots = useMemo(() => {
    const seen = new Set<string>();
    return doctorSlots.filter((s) => {
      if (s.date !== activeDate || seen.has(s.time)) return false;
      seen.add(s.time);
      return true;
    });
  }, [doctorSlots, activeDate]);

  const selectedSlot = slots.find((s) => s.id === selections.slotId);
  const emailValid = EMAIL_RE.test(selections.email.trim());
  const nameValid = selections.name.trim().length > 1;

  function canContinue(): boolean {
    if (step === 1) return selections.reason !== null;
    if (step === 2) return selections.doctor !== null;
    if (step === 3) return selections.slotId !== null;
    return nameValid && emailValid;
  }

  function goTo(next: Step) {
    setStep(next);
    sectionRef.current?.scrollIntoView({ block: "start" });
  }

  function selectDate(date: string) {
    setPickedDate(date);
    setSelections((s) => ({ ...s, slotId: null }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 4) {
      if (canContinue()) goTo((step + 1) as Step);
      return;
    }
    setTouched(true);
    if (!canContinue()) return;
    setConfirmed(true);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  const reasonLabel = reasons.find((r) => r.id === selections.reason)?.label;

  return (
    <section id="book" ref={sectionRef} className="py-16 lg:py-24 bg-cv-green-light border-y border-cv-green-border" aria-labelledby="book-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {confirmed ? (
          <div className="max-w-xl border border-cv-teal bg-cv-surface p-6 sm:p-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-cv-teal mb-4">✓ Request received</p>
            <h2 id="book-heading" ref={headingRef} tabIndex={-1} className="font-display text-2xl font-light text-cv-ink mb-6 focus:outline-none">
              See you soon, {selections.name.trim().split(" ")[0]}.
            </h2>
            <dl className="space-y-3 font-mono text-sm text-cv-ink-muted">
              {selectedSlot && (
                <>
                  <div>
                    <dt className="text-[10px] tracking-widest uppercase mb-0.5">Date & Time</dt>
                    <dd className="text-cv-ink">
                      {formatDate(selectedSlot.date, { weekday: "long", month: "long", day: "numeric" })} · {selectedSlot.time}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-widest uppercase mb-0.5">Doctor</dt>
                    <dd className="text-cv-ink">
                      {selections.doctor === "any" ? "First available optometrist" : `${getDoctor(selectedSlot.doctorId).name}, OD`}
                    </dd>
                  </div>
                </>
              )}
              <div>
                <dt className="text-[10px] tracking-widest uppercase mb-0.5">Visit Type</dt>
                <dd className="text-cv-ink">{reasonLabel}</dd>
              </div>
            </dl>
            <p className="text-xs text-cv-ink-muted mt-6 pt-6 border-t border-cv-border leading-relaxed">
              We&apos;ll email {selections.email} to confirm within one business day. Please bring your insurance card,
              current glasses or contacts, and a list of medications. Need to change something? Call{" "}
              <a href={clinic.phoneHref} className="text-cv-teal underline underline-offset-2">
                {clinic.phone}
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 pb-4 border-b border-cv-green-border">
              <p className="text-[10px] tracking-[0.3em] uppercase text-cv-teal mb-1">Appointments</p>
              <h2 id="book-heading" className="font-display text-3xl lg:text-4xl font-light tracking-tight text-cv-ink mt-2">
                Schedule Your Exam
              </h2>
              <ol className="mt-5 grid grid-cols-4 gap-2" aria-label="Booking progress">
                {([1, 2, 3, 4] as Step[]).map((n) => (
                  <li key={n} aria-current={n === step ? "step" : undefined}>
                    <div className={`h-1 ${n <= step ? "bg-cv-teal" : "bg-cv-border"}`} />
                    <p className={`hidden sm:block mt-2 text-[10px] tracking-widest uppercase ${n === step ? "text-cv-ink" : "text-cv-ink-muted"}`}>
                      {n}. {stepLabels[n]}
                    </p>
                  </li>
                ))}
              </ol>
              <p aria-live="polite" className="sm:hidden mt-2 text-[11px] tracking-widest uppercase text-cv-ink">
                Step {step} of 4 · {stepLabels[step]}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-16">
              <form className="flex-1 min-w-0" onSubmit={handleSubmit} noValidate>
                {step === 1 && (
                  <fieldset>
                    <legend className="text-sm text-cv-ink-muted mb-5">What brings you in?</legend>
                    <div className="space-y-3">
                      {reasons.map((r) => {
                        const selected = selections.reason === r.id;
                        return (
                          <button
                            type="button"
                            key={r.id}
                            onClick={() => setSelections((s) => ({ ...s, reason: r.id }))}
                            aria-pressed={selected}
                            className={`cursor-pointer w-full flex text-left border transition-colors bg-cv-surface ${
                              selected ? "border-cv-teal ring-1 ring-cv-teal" : "border-cv-border hover:border-cv-ink"
                            }`}
                          >
                            <span
                              className={`w-16 shrink-0 flex flex-col items-center justify-center py-4 border-r font-mono transition-colors ${
                                selected ? "bg-cv-teal text-white border-cv-teal" : "border-cv-border text-cv-ink-muted"
                              }`}
                            >
                              <span className="text-sm font-semibold leading-none">{r.duration}</span>
                              <span className="text-[10px] mt-0.5">min</span>
                            </span>
                            <span className="flex-1 px-4 sm:px-5 py-4">
                              <span className="flex flex-wrap items-start justify-between gap-2">
                                <span className="text-sm font-medium text-cv-ink">{r.label}</span>
                                {r.badge && (
                                  <span className="shrink-0 text-[9px] tracking-widest uppercase font-mono text-cv-teal-dark border border-cv-teal/40 px-1.5 py-0.5">
                                    {r.badge}
                                  </span>
                                )}
                              </span>
                              <span className="block text-xs text-cv-ink-muted mt-1">{r.prompt}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset>
                    <legend className="text-sm text-cv-ink-muted mb-5">Choose a doctor, or let us book the first available.</legend>
                    <div className="space-y-3">
                      {[
                        { id: "any" as DoctorChoice, title: "No preference", sub: "Show me the most appointment times", note: null },
                        ...doctors.map((d) => ({
                          id: d.id as DoctorChoice,
                          title: `${d.name}, OD`,
                          sub: d.focus,
                          note: `NPI ${d.npi}`,
                        })),
                      ].map((d) => {
                        const selected = selections.doctor === d.id;
                        return (
                          <button
                            type="button"
                            key={d.id}
                            onClick={() => setSelections((s) => ({ ...s, doctor: d.id, slotId: null }))}
                            aria-pressed={selected}
                            className={`cursor-pointer w-full text-left p-5 border bg-cv-surface transition-colors ${
                              selected ? "border-cv-teal ring-1 ring-cv-teal" : "border-cv-border hover:border-cv-ink"
                            }`}
                          >
                            <span className="block text-sm font-medium text-cv-ink">{d.title}</span>
                            <span className="block text-xs text-cv-ink-muted mt-1">{d.sub}</span>
                            {d.note && <span className="block font-mono text-[10px] text-cv-ink-muted mt-1">{d.note}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <div>
                    <p className="text-sm text-cv-ink-muted mb-5">Select a date and time.</p>
                    {!hydrated ? (
                      <p className="text-sm text-cv-ink-muted py-6">Loading availability…</p>
                    ) : (
                      <>
                        <div
                          className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x"
                          role="group"
                          aria-label="Select date"
                        >
                          {availableDates.slice(0, 15).map((day) => (
                            <button
                              type="button"
                              key={day}
                              onClick={() => selectDate(day)}
                              aria-pressed={activeDate === day}
                              className={`cursor-pointer snap-start shrink-0 w-16 py-2.5 border text-center transition-colors ${
                                activeDate === day
                                  ? "bg-cv-teal text-white border-cv-teal"
                                  : "bg-cv-surface border-cv-border text-cv-ink hover:border-cv-ink"
                              }`}
                            >
                              <span className="block text-[10px] uppercase tracking-widest opacity-80">{formatDate(day, { weekday: "short" })}</span>
                              <span className="block text-lg font-light leading-tight">{formatDate(day, { day: "numeric" })}</span>
                              <span className="block text-[10px] uppercase tracking-widest opacity-80">{formatDate(day, { month: "short" })}</span>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-cv-ink-muted mb-3">
                          {activeDate && formatDate(activeDate, { weekday: "long", month: "long", day: "numeric" })}
                        </p>
                        {daySlots.length === 0 ? (
                          <p className="text-sm text-cv-ink-muted py-6 border border-dashed border-cv-border text-center">
                            No availability on this date. Try another day.
                          </p>
                        ) : (
                          <div className="grid grid-cols-3 min-[420px]:grid-cols-4 sm:grid-cols-6 gap-2" role="group" aria-label="Select time">
                            {daySlots.map((slot) => (
                              <button
                                type="button"
                                key={slot.id}
                                onClick={() => setSelections((s) => ({ ...s, slotId: slot.id }))}
                                aria-pressed={selections.slotId === slot.id}
                                className={`cursor-pointer font-mono text-xs h-11 border transition-colors ${
                                  selections.slotId === slot.id
                                    ? "bg-cv-teal text-white border-cv-teal"
                                    : "bg-cv-surface border-cv-border text-cv-ink hover:border-cv-teal hover:text-cv-teal"
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className="text-sm text-cv-ink-muted mb-6">Last step: how can we reach you?</p>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="patient-name" className="block text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                          Full name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="patient-name"
                          type="text"
                          required
                          value={selections.name}
                          onChange={(e) => setSelections((s) => ({ ...s, name: e.target.value }))}
                          autoComplete="name"
                          aria-invalid={touched && !nameValid}
                          aria-describedby={touched && !nameValid ? "name-error" : undefined}
                          className="w-full border border-cv-border bg-cv-surface px-3 h-12 text-base text-cv-ink focus:outline-none focus:border-cv-teal focus:ring-1 focus:ring-cv-teal"
                        />
                        {touched && !nameValid && (
                          <p id="name-error" className="text-xs text-red-700 mt-1.5">Please enter your full name.</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="patient-email" className="block text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                          Email <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="patient-email"
                          type="email"
                          inputMode="email"
                          required
                          value={selections.email}
                          onChange={(e) => setSelections((s) => ({ ...s, email: e.target.value }))}
                          autoComplete="email"
                          aria-invalid={touched && !emailValid}
                          aria-describedby={touched && !emailValid ? "email-error" : undefined}
                          className="w-full border border-cv-border bg-cv-surface px-3 h-12 text-base text-cv-ink focus:outline-none focus:border-cv-teal focus:ring-1 focus:ring-cv-teal"
                        />
                        {touched && !emailValid && (
                          <p id="email-error" className="text-xs text-red-700 mt-1.5">Please enter a valid email address.</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="patient-phone" className="block text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">
                          Phone <span className="normal-case tracking-normal">(optional)</span>
                        </label>
                        <input
                          id="patient-phone"
                          type="tel"
                          inputMode="tel"
                          value={selections.phone}
                          onChange={(e) => setSelections((s) => ({ ...s, phone: e.target.value }))}
                          autoComplete="tel"
                          className="w-full border border-cv-border bg-cv-surface px-3 h-12 text-base text-cv-ink focus:outline-none focus:border-cv-teal focus:ring-1 focus:ring-cv-teal"
                        />
                      </div>
                      <label className="flex items-center gap-3 text-sm text-cv-ink cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selections.newPatient}
                          onChange={(e) => setSelections((s) => ({ ...s, newPatient: e.target.checked }))}
                          className="w-5 h-5 accent-cv-teal"
                        />
                        I&apos;m a new patient at Clear Vision
                      </label>

                      {selectedSlot && (
                        <div className="border border-cv-border bg-cv-surface p-4">
                          <p className="text-[10px] tracking-widest uppercase text-cv-ink-muted mb-2">Your appointment</p>
                          <p className="text-sm text-cv-ink">
                            {formatDate(selectedSlot.date)} · {selectedSlot.time} ·{" "}
                            {selections.doctor === "any" ? "First available" : getDoctor(selectedSlot.doctorId).name}
                          </p>
                          <p className="text-xs text-cv-ink-muted mt-1">{reasonLabel}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-10 pt-6 border-t border-cv-green-border">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => goTo((step - 1) as Step)}
                      className="cursor-pointer text-xs tracking-widest uppercase text-cv-ink-muted hover:text-cv-ink transition-colors min-h-11 px-1"
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    disabled={step < 4 && !canContinue()}
                    className="btn-3d cursor-pointer text-xs font-semibold tracking-widest uppercase px-8 h-12 bg-cv-teal text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>{step < 4 ? "Continue →" : "Request Appointment"}</span>
                  </button>
                </div>
              </form>

              <aside className="hidden lg:block w-72 shrink-0" aria-label="Appointment calendar">
                {hydrated && step >= 3 ? (
                  <CalendarPanel
                    key={selections.doctor ?? "none"}
                    activeDate={activeDate}
                    onSelectDate={selectDate}
                    availableDates={availableDateSet}
                  />
                ) : (
                  <div className="border border-cv-border bg-cv-surface p-5 text-sm text-cv-ink-muted leading-relaxed sticky top-24">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-cv-teal mb-3">Before you book</p>
                    <ul className="space-y-2">
                      <li>New patients usually get in within 1–2 weeks.</li>
                      <li>Urgent problem? Call {clinic.phone} for a same-day visit.</li>
                      <li>We verify your insurance before every appointment.</li>
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
