"use client";

import { useClinicStatus } from "@/lib/hooks";

/** Live open/closed badge; renders the static hours until hydrated. */
export default function OpenStatus({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const status = useClinicStatus();

  if (!status) {
    return <span className="tracking-wider">Mon–Fri 9–6 · Sat 9–2</span>;
  }

  return (
    <span className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full inline-block ${status.open ? "bg-emerald-400" : "bg-amber-400"}`}
        aria-hidden="true"
      />
      <span
        className={`font-semibold tracking-wider ${
          tone === "dark"
            ? status.open ? "text-emerald-300" : "text-amber-200"
            : status.open ? "text-emerald-800" : "text-amber-900"
        }`}
      >
        {status.label}
      </span>
    </span>
  );
}
