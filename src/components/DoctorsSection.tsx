import Image from "next/image";

const doctors = [
  {
    name: "Dr. Sarah Chen",
    credentials: "OD, FAAO",
    npi: "1234567890",
    focus: "Pediatric Vision & Myopia Management",
    bio: "Dr. Chen completed her residency at UCSF with a focus on pediatric eye care and has been with Clear Vision since 2015. She brings a meticulous, evidence-based approach to every exam — from first prescriptions to complex contact fittings.",
    quote: "A first prescription shapes a child's relationship with the world.",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face",
    initials: "SC",
  },
  {
    name: "Dr. Marcus Webb",
    credentials: "OD, FCOVD",
    npi: "0987654321",
    focus: "Glaucoma & Ocular Disease Management",
    bio: "Dr. Webb trained at the Southern California College of Optometry and spent four years in a hospital-based practice before joining Clear Vision in 2018. He specializes in detecting and managing early-stage glaucoma and diabetic retinopathy.",
    quote: "Most glaucoma damage is preventable. Detection timing is everything.",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face",
    initials: "MW",
  },
];

export default function DoctorsSection() {
  return (
    <section id="doctors" className="py-16 lg:py-24 bg-cv-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono text-xs text-cv-ink-muted mb-3">02</p>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-cv-ink">
            Meet the team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.npi}
              className="border border-cv-border bg-cv-bg flex flex-col sm:flex-row gap-0"
            >
              {/* Photo — left column, rectangle */}
              <div className="w-full sm:w-32 shrink-0 overflow-hidden" style={{ minHeight: "160px" }}>
                <Image
                  src={doc.photo}
                  alt={`Photo of ${doc.name}`}
                  width={128}
                  height={200}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "160px" }}
                />
              </div>

              {/* Content — right column */}
              <div className="flex flex-col gap-4 p-6 flex-1">
                <div>
                  <p className="font-display text-2xl font-light text-cv-ink leading-tight">{doc.name}</p>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-cv-teal mt-1">
                    {doc.credentials}
                  </p>
                </div>

                {/* Specialty — amber accent */}
                <div className="border-l-2 border-cv-amber pl-4">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-cv-ink-muted mb-1">
                    Specialty
                  </p>
                  <p className="text-sm text-cv-ink font-medium">{doc.focus}</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-cv-ink-muted leading-relaxed">{doc.bio}</p>

                {/* Pull quote */}
                <p className="font-display text-sm italic text-cv-ink-muted leading-snug">
                  &ldquo;{doc.quote}&rdquo;
                </p>

                {/* NPI */}
                <p className="font-mono text-xs text-cv-ink-muted tracking-wide mt-auto">
                  NPI {doc.npi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
