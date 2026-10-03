"use client";

import { useSyncExternalStore } from "react";
import { clinic, weeklyHours } from "@/lib/site";

const noopSubscribe = () => () => {};

/** False during prerender and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatHour(h: number) {
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour} ${suffix}`;
}

/** Current open/closed status in the clinic's time zone, as display text. */
function computeStatus(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: clinic.timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = DAY_NAMES.indexOf(get("weekday"));
  const time = Number(get("hour")) + Number(get("minute")) / 60;

  const today = weeklyHours[day];
  if (today && time >= today.open && time < today.close) {
    return `open|Open today until ${formatHour(today.close)}`;
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const hours = weeklyHours[d];
    if (!hours) continue;
    if (i === 0 && time < hours.open) return `closed|Closed · Opens today at ${formatHour(hours.open)}`;
    if (i === 1) return `closed|Closed · Opens tomorrow at ${formatHour(hours.open)}`;
    if (i > 1) return `closed|Closed · Opens ${DAY_NAMES[d]} at ${formatHour(hours.open)}`;
  }
  return "closed|Closed";
}

function subscribeMinute(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/** `null` until hydrated, so prerendered HTML never shows a stale status. */
export function useClinicStatus(): { open: boolean; label: string } | null {
  const snapshot = useSyncExternalStore(subscribeMinute, () => computeStatus(new Date()), () => null);
  if (!snapshot) return null;
  const [state, label] = snapshot.split("|");
  return { open: state === "open", label };
}
