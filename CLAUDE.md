@AGENTS.md
# CLEAR VISION OPTOMETRY — SYSTEM CONSTITUTION

## 1. BRAND IDENTITY & AESTHETIC ARCHITECTURE
- **Design System:** Swiss Medical Minimalism. High-contrast, hyper-clean, trustworthy, and accessible.
- **Color Palette (Native Tailwind v4 @theme):**
  - Background: `#FAFAFA` (Pure Medical White)
  - Surface/Cards: `#FFFFFF`
  - Primary Ink: `#111827` (Deep Slate/Charcoal)
  - Accent/Interactive: `#0284C7` (Clinical Precision Blue)
- **Typography:** Clean geometric sans-serif for primary reading; strict monospaced typography for optical frame dimensions (e.g., `51▢19-140`).
- **Layout Rules:** Rely on ample negative space. No decorative floating shapes or generic AI gradients. Use crisp 1px borders (`#E5E7EB`).

## 2. CORE OPERATIONAL MODULES
- **Appointment Booking Engine:** Must feature a clear multi-step triage flow (Reason for Visit -> Select Doctor -> Date/Time Slot -> Patient Demographics).
- **Vision Insurance Lookup:** An interactive search matrix allowing users to filter by major providers (VSP, EyeMed, Davis Vision, Spectra) to immediately verify coverage benefits.
- **Eyewear Shop (200+ Frame Catalog):** 
  - Must use an indexed database structure (`src/data/frames.ts`) capable of easily scaling to 200+ items.
  - Filter state requirements: Frame Shape (Round, Square, Aviator), Material (Acetate, Titanium), Bridge Width, and Face Fit.
  - Virtual Try-On placeholder UI (clean webcam request modal or frame overlay preview).

## 3. TECHNICAL & LOCAL SEO DOMINANCE
- **Structured Data:** Inject complete `MedicalBusiness` and `Optician` JSON-LD schema into the root layout, explicitly defining clinic hours, geo-coordinates, optometrist NPI numbers, and accepted insurance networks.
- **Accessibility:** Strict WCAG 2.1 AA compliance. High contrast ratios are mandatory for visually impaired visitors seeking eye care.