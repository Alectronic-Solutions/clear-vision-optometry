import { doctors, type DoctorId } from "@/data/doctors";

export type Material = "acetate" | "titanium" | "stainless-steel" | "mixed";
export type FrameShape = "round" | "square" | "aviator" | "cat-eye" | "rectangle" | "oval";
export type FaceFit = "small" | "medium" | "large" | "extra-large";
export type FrameType = "optical" | "sun";
export type BridgeFit = "narrow" | "standard" | "wide";

export interface Frame {
  id: string;
  name: string;
  brand: string;
  material: Material;
  shape: FrameShape;
  type: FrameType;
  /** Optical size notation: eye ▢ bridge - temple (mm). */
  dimensions: string;
  eyeSize: number;
  bridgeWidth: number;
  templeLength: number;
  color: string;
  colorHex: string;
  price: number;
  faceFit: FaceFit;
  inStock: boolean;
  /** Public path prefix; append `-480.webp` / `-800.webp`. */
  image: string;
}

type FrameRow = [
  id: string,
  name: string,
  brand: string,
  material: Material,
  shape: FrameShape,
  type: FrameType,
  size: [eye: number, bridge: number, temple: number],
  color: string,
  colorHex: string,
  price: number,
  inStock?: boolean,
];

/** Total frame width (two lenses + bridge) maps to a face-width bucket. */
function faceFitFor(eye: number, bridge: number): FaceFit {
  const width = eye * 2 + bridge;
  if (width <= 116) return "small";
  if (width <= 122) return "medium";
  if (width <= 128) return "large";
  return "extra-large";
}

export function bridgeFitFor(bridge: number): BridgeFit {
  if (bridge <= 17) return "narrow";
  if (bridge <= 20) return "standard";
  return "wide";
}

function toFrame([id, name, brand, material, shape, type, [eye, bridge, temple], color, colorHex, price, inStock = true]: FrameRow): Frame {
  return {
    id,
    name,
    brand,
    material,
    shape,
    type,
    dimensions: `${eye}▢${bridge}-${temple}`,
    eyeSize: eye,
    bridgeWidth: bridge,
    templeLength: temple,
    color,
    colorHex,
    price,
    faceFit: faceFitFor(eye, bridge),
    inStock,
    image: `/images/frames/${id}`,
  };
}

const HOUSE = "Clear Vision House";

const rows: FrameRow[] = [
  // Round
  ["f001", "Montrose", "Moscot", "acetate", "round", "optical", [46, 22, 145], "Black", "#111111", 290],
  ["f002", "Lennox", "Lindberg", "titanium", "round", "optical", [47, 21, 140], "Matte Black", "#1F1F1F", 465],
  ["f003", "Hale", "Lindberg", "titanium", "round", "optical", [49, 20, 140], "Black / Silver", "#3A3A3A", 445],
  ["f004", "Finch", "Oliver Peoples", "mixed", "round", "optical", [48, 21, 145], "Black / Gold", "#1A1A1A", 425],
  ["f005", "Dalton", "Moscot", "mixed", "round", "optical", [50, 22, 145], "Black / Antique Gold", "#161616", 310, false],
  ["f006", "Marlowe", "Oliver Peoples", "mixed", "round", "optical", [49, 21, 145], "Tortoise / Gold", "#6B4226", 455],
  ["f007", "Rosa", HOUSE, "stainless-steel", "round", "optical", [50, 19, 140], "Rose Gold", "#C9A08A", 165],
  ["f008", "Arlo", HOUSE, "acetate", "round", "optical", [48, 20, 145], "Black / Red", "#141414", 145],
  ["f009", "Wren", "Lindberg", "titanium", "round", "optical", [48, 20, 140], "Brushed Silver", "#BFC3C7", 485],
  ["f010", "Holloway", "Moscot", "acetate", "round", "optical", [49, 21, 145], "Black Fade", "#2A2A2A", 295],
  ["f011", "Sloane", "Oliver Peoples", "titanium", "round", "optical", [52, 19, 145], "Silver", "#C0C0C0", 440],
  ["f012", "Soleil", "Ray-Ban", "stainless-steel", "round", "sun", [50, 21, 145], "Gold / G-15 Green", "#C8A96E", 183],
  ["f013", "Laurel", HOUSE, "stainless-steel", "round", "sun", [51, 20, 140], "Silver / Brown Gradient", "#B8B8B8", 135],
  // Square
  ["f014", "Prescott", "Persol", "acetate", "square", "optical", [52, 19, 145], "Black", "#111111", 310],
  ["f015", "Kelvin", "Moscot", "acetate", "square", "optical", [50, 20, 145], "Black", "#151515", 295],
  ["f016", "Aldgate", HOUSE, "acetate", "square", "optical", [53, 18, 145], "Matte Black", "#2C2C2C", 145],
  ["f017", "Clifton", "Oliver Peoples", "mixed", "square", "optical", [52, 20, 145], "Black / Silver", "#1C1C1C", 435],
  ["f018", "Ashby", "Persol", "acetate", "square", "optical", [54, 20, 145], "Dark Havana", "#4A2C17", 320],
  ["f019", "Juno", "Lindberg", "titanium", "square", "optical", [51, 18, 140], "Gold", "#C9A44C", 495],
  ["f020", "Regent", "Lindberg", "mixed", "square", "optical", [55, 17, 145], "Gold / Walnut", "#B8934A", 525],
  ["f021", "Halo", HOUSE, "acetate", "square", "optical", [50, 20, 145], "Crystal Clear", "#E5E7EB", 145],
  ["f022", "Bexley", "Oliver Peoples", "titanium", "square", "optical", [53, 18, 145], "Brushed Gold", "#C8A96E", 465, false],
  // Rectangle
  ["f023", "Stanton", "Ray-Ban", "acetate", "rectangle", "optical", [52, 19, 145], "Black", "#111111", 168],
  ["f024", "Corbin", "Lindberg", "titanium", "rectangle", "optical", [53, 18, 140], "Matte Black", "#262626", 455],
  ["f025", "Vance", "Lindberg", "titanium", "rectangle", "optical", [54, 17, 145], "Silver", "#C0C0C0", 475],
  ["f026", "Wayland", "Ray-Ban", "acetate", "rectangle", "optical", [54, 16, 145], "Black", "#111111", 163],
  ["f027", "Sterling", "Oliver Peoples", "mixed", "rectangle", "optical", [51, 20, 145], "Tortoise / Gold", "#6B4226", 445],
  ["f028", "Harlow", "Moscot", "mixed", "rectangle", "optical", [50, 21, 145], "Black / Silver", "#141414", 315],
  ["f029", "Clubline", "Ray-Ban", "mixed", "rectangle", "optical", [51, 21, 145], "Black / Gold", "#111111", 178],
  ["f030", "Kipling", HOUSE, "stainless-steel", "rectangle", "optical", [53, 18, 145], "Gunmetal", "#4A4A52", 155],
  // Aviator
  ["f031", "Skyline", "Randolph", "stainless-steel", "aviator", "optical", [55, 16, 140], "23K Gold", "#D4AF37", 249],
  ["f032", "Concorde", "Randolph", "stainless-steel", "aviator", "sun", [58, 14, 140], "Gold / Gray Polarized", "#C8A96E", 279],
  ["f033", "Meridian", "Ray-Ban", "stainless-steel", "aviator", "sun", [56, 17, 145], "Gold / Yellow", "#D4AF37", 193],
  ["f034", "Navigator", "Persol", "acetate", "aviator", "sun", [58, 15, 140], "Havana / Brown Gradient", "#5C3317", 345],
  ["f035", "Pilot", "Lindberg", "titanium", "aviator", "optical", [52, 19, 140], "Matte Black", "#1F1F1F", 465],
  ["f036", "Nightfall", "Randolph", "stainless-steel", "aviator", "sun", [57, 16, 145], "Matte Black / Gray", "#1A1A1A", 269, false],
  // Cat-eye
  ["f037", "Scarlett", HOUSE, "acetate", "cat-eye", "optical", [52, 17, 140], "Crystal Red", "#B0233A", 145],
  ["f038", "Vivienne", "Oliver Peoples", "acetate", "cat-eye", "optical", [52, 17, 145], "Havana Tortoise", "#7B4F2E", 415],
  ["f039", "Iris", "Persol", "acetate", "cat-eye", "optical", [53, 16, 140], "Violet Fade", "#7C3AED", 295],
  ["f040", "Starlet", "Moscot", "acetate", "cat-eye", "optical", [51, 18, 145], "Black / Crystal", "#111111", 305],
  ["f041", "Riviera", "Persol", "acetate", "cat-eye", "sun", [54, 18, 140], "Tortoise / Brown", "#6B4226", 335],
  ["f042", "Bardot", "Ray-Ban", "acetate", "cat-eye", "sun", [53, 19, 145], "White / Black", "#F5F5F5", 171],
  ["f043", "Gala", "Oliver Peoples", "mixed", "cat-eye", "optical", [53, 16, 140], "Black / Gold", "#111111", 445],
  // Oval
  ["f044", "Ellis", "Lindberg", "titanium", "oval", "optical", [50, 19, 140], "Black / Gold", "#1A1A1A", 475],
  ["f045", "Mira", HOUSE, "acetate", "oval", "optical", [49, 20, 145], "Crystal Gray", "#9CA3AF", 145],
  ["f046", "Otto", "Moscot", "acetate", "oval", "optical", [50, 21, 145], "Black", "#111111", 285],
  ["f047", "Prism", HOUSE, "acetate", "oval", "optical", [51, 19, 145], "Crystal", "#E5E7EB", 145, false],
  ["f048", "Cove", "Oliver Peoples", "acetate", "oval", "optical", [47, 22, 145], "Crystal / Honey", "#C8A96E", 395],
  ["f049", "Archer", "Persol", "acetate", "oval", "optical", [50, 20, 145], "Amber Tortoise", "#8B5A2B", 305],
];

export const frames: Frame[] = rows.map(toFrame);

export const frameBrands = Array.from(new Set(frames.map((f) => f.brand))).sort((a, b) =>
  a === HOUSE ? 1 : b === HOUSE ? -1 : a.localeCompare(b)
);

export interface InsuranceProvider {
  id: string;
  name: string;
  inNetwork: boolean;
  examCopay: number;
  frameAllowance: number;
  lensAllowance: number;
  contactAllowance: number;
  examFrequency: string;
  notes: string;
}

export const insuranceProviders: InsuranceProvider[] = [
  {
    id: "vsp",
    name: "VSP",
    inNetwork: true,
    examCopay: 10,
    frameAllowance: 150,
    lensAllowance: 0,
    contactAllowance: 130,
    examFrequency: "Once per calendar year",
    notes: "Lens enhancements (AR coating, progressive) covered at 20% off retail.",
  },
  {
    id: "eyemed",
    name: "EyeMed",
    inNetwork: true,
    examCopay: 0,
    frameAllowance: 200,
    lensAllowance: 0,
    contactAllowance: 150,
    examFrequency: "Once per benefit year",
    notes: "Exam fully covered in-network. 40% off additional pairs of eyeglasses.",
  },
  {
    id: "davis-vision",
    name: "Davis Vision",
    inNetwork: true,
    examCopay: 20,
    frameAllowance: 175,
    lensAllowance: 0,
    contactAllowance: 120,
    examFrequency: "Once per plan year",
    notes: "Featured frame collection available with $0 copay after allowance.",
  },
  {
    id: "spectra",
    name: "Spectra",
    inNetwork: true,
    examCopay: 15,
    frameAllowance: 125,
    lensAllowance: 50,
    contactAllowance: 100,
    examFrequency: "Once every 12 months",
    notes: "Lens benefit applies to standard single vision, bifocal, and trifocal lenses.",
  },
  {
    id: "metlife",
    name: "MetLife Vision",
    inNetwork: true,
    examCopay: 10,
    frameAllowance: 130,
    lensAllowance: 0,
    contactAllowance: 130,
    examFrequency: "Once per calendar year",
    notes: "15% discount on remaining balance after allowance is applied.",
  },
  {
    id: "cigna",
    name: "Cigna Vision",
    inNetwork: false,
    examCopay: 0,
    frameAllowance: 0,
    lensAllowance: 0,
    contactAllowance: 0,
    examFrequency: "",
    notes: "Out-of-network reimbursement available. Call us to verify your out-of-network benefits.",
  },
  {
    id: "aetna",
    name: "Aetna Vision",
    inNetwork: false,
    examCopay: 0,
    frameAllowance: 0,
    lensAllowance: 0,
    contactAllowance: 0,
    examFrequency: "",
    notes: "Out-of-network reimbursement available. We can provide an itemized receipt for claim submission.",
  },
  {
    id: "uhc",
    name: "United Healthcare Vision",
    inNetwork: true,
    examCopay: 0,
    frameAllowance: 200,
    lensAllowance: 0,
    contactAllowance: 160,
    examFrequency: "Once per plan year",
    notes: "Exam covered in full. $50 off laser vision correction at network providers.",
  },
];


export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  doctorId: DoctorId;
  available: boolean;
}

const SLOT_TIMES = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

/** Formats a local date as YYYY-MM-DD without UTC conversion. */
export function toDateKey(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

/**
 * Weekday slots for a rolling window starting the day after `from`.
 * Must be called on the client: the result depends on the visitor's clock,
 * so generating it during the static build would bake in the build date.
 */
export function generateSlots(from: Date, windowDays = 60): BookingSlot[] {
  const slots: BookingSlot[] = [];
  for (let offset = 1; offset <= windowDays; offset++) {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue;
    const dateKey = toDateKey(date);
    for (const doctor of doctors) {
      SLOT_TIMES.forEach((time, t) => {
        // Deterministic pseudo-random gaps so the schedule looks lived-in.
        const seed = (date.getDate() * 31 + date.getMonth() * 7 + t * 13 + doctor.npi.charCodeAt(0)) % 9;
        slots.push({
          id: `slot-${dateKey}-${doctor.id}-${t}`,
          date: dateKey,
          time,
          doctorId: doctor.id,
          available: seed > 2,
        });
      });
    }
  }
  return slots;
}
