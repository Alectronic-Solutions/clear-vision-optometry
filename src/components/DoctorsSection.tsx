import Link from "next/link";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import Photo from "@/components/Photo";

export default function DoctorsSection() {
  return (
    <section id="doctors" className="py-16 lg:py-24 bg-cv-surface" aria-labelledby="doctors-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 lg:mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-cv-teal mb-2">Our Optometrists</p>
            <h2 id="doctors-heading" className="font-display text-3xl lg:text-4xl font-light text-cv-ink">
              Meet the team
            </h2>
          </div>
          <p className="text-sm text-cv-ink-muted max-w-sm">
            Two doctors, one practice. You&apos;ll see the same optometrist year after year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {doctors.map((doc) => {
            const specialties = services.filter((s) => s.doctor === doc.id);
            return (
              <article key={doc.npi} className="border border-cv-border bg-cv-bg flex flex-col sm:flex-row">
                <div className="sm:w-48 lg:w-56 shrink-0 aspect-4/5 sm:aspect-auto overflow-hidden bg-cv-border">
                  <Photo
                    src={doc.photo}
                    widths={[400, 720]}
                    aspect={[4, 5]}
                    alt={`Portrait of ${doc.name}`}
                    sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 100vw"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex flex-col gap-4 p-5 sm:p-6 flex-1">
                  <div>
                    <h3 className="font-display text-2xl font-light text-cv-ink leading-tight">{doc.name}</h3>
                    <p className="text-[11px] tracking-[0.1em] uppercase text-cv-teal-dark mt-1">{doc.credentials}</p>
                  </div>

                  <div className="border-l-2 border-cv-amber pl-4">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-cv-ink-muted mb-1">Specialty</p>
                    <p className="text-sm text-cv-ink font-medium">{doc.focus}</p>
                  </div>

                  <p className="text-sm text-cv-ink-muted leading-relaxed">{doc.bio}</p>

                  <p className="font-display text-sm italic text-cv-ink-muted leading-snug">&ldquo;{doc.quote}&rdquo;</p>

                  {specialties.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {specialties.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="inline-block text-[11px] px-2.5 py-1 border border-cv-border text-cv-ink hover:border-cv-teal hover:text-cv-teal transition-colors"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="font-mono text-xs text-cv-ink-muted tracking-wide mt-auto pt-2">NPI {doc.npi}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
