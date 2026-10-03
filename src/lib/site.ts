import { BASE_PATH } from "@/lib/basePath";

export const SITE_URL = "https://alectronic-solutions.github.io" + BASE_PATH;

export const clinic = {
  name: "Clear Vision Optometry",
  phone: "+1 (415) 555-2020",
  phoneHref: "tel:+14155552020",
  email: "hello@clearvisionoptometry.com",
  street: "123 Vision Blvd",
  city: "San Francisco",
  region: "CA",
  postalCode: "94102",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=123+Vision+Blvd+San+Francisco+CA+94102",
  timeZone: "America/Los_Angeles",
} as const;

/** Weekly hours in 24h clock, indexed by Date#getDay() (0 = Sunday). */
export const weeklyHours: ({ open: number; close: number } | null)[] = [
  null,
  { open: 9, close: 18 },
  { open: 9, close: 18 },
  { open: 9, close: 18 },
  { open: 9, close: 18 },
  { open: 9, close: 18 },
  { open: 9, close: 14 },
];

export const hoursSummary = [
  { days: "Monday – Friday", time: "9:00 am – 6:00 pm" },
  { days: "Saturday", time: "9:00 am – 2:00 pm" },
  { days: "Sunday", time: "Closed" },
];

/** Returns a public asset URL with the deploy basePath applied. */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
