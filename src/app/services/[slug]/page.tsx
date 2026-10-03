import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { doctors } from "@/data/doctors";
import { SITE_URL, clinic } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import Photo from "@/components/Photo";
import { PhoneIcon } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} in San Francisco`,
    description: `${service.summary} ${service.intro[0].split(". ")[0]}.`,
    path: `services/${service.slug}`,
    image: `${service.image.slice(1)}-1280.webp`,
    imageAlt: service.imageAlt,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const team = service.doctor === "both" ? doctors : doctors.filter((d) => d.id === service.doctor);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const url = `${SITE_URL}/services/${service.slug}/`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: service.title,
      url,
      about: { "@type": "MedicalProcedure", name: service.title, description: service.summary },
      provider: { "@id": `${SITE_URL}/#clinic` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
        { "@type": "ListItem", position: 3, name: service.title, item: url },
      ],
    },
  ];

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="bg-cv-surface border-b border-cv-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 lg:pt-10 lg:pb-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-cv-ink-muted">
              <li>
                <Link href="/" className="hover:text-cv-teal transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#services" className="hover:text-cv-teal transition-colors">Services</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-cv-ink">{service.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-cv-teal mb-3">
                {service.cpt ? `CPT ${service.cpt} · ` : ""}
                {service.duration}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-light text-cv-ink leading-[1.05] tracking-tight mb-5">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-cv-ink-muted leading-relaxed mb-8">{service.intro[0]}</p>
              <div className="flex flex-col min-[420px]:flex-row gap-3">
                <Link
                  href="/#book"
                  className="inline-flex items-center justify-center min-h-12 px-7 bg-cv-teal hover:bg-cv-teal-dark text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
                >
                  Book an Appointment
                </Link>
                <a
                  href={clinic.phoneHref}
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-7 border border-cv-teal text-cv-teal hover:bg-cv-teal hover:text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
                >
                  <PhoneIcon /> {clinic.phone}
                </a>
              </div>
            </div>
            <div className="relative aspect-3/2 overflow-hidden bg-cv-bg order-first lg:order-last">
              <Photo
                src={service.image}
                widths={[640, 1280]}
                aspect={[3, 2]}
                alt={service.imageAlt}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
        <div className="min-w-0">
          {service.intro.slice(1).map((p) => (
            <p key={p.slice(0, 24)} className="text-[15px] sm:text-base text-cv-ink leading-relaxed mb-10 max-w-2xl">
              {p}
            </p>
          ))}

          <h2 className="font-display text-2xl sm:text-3xl font-light text-cv-ink mb-6">What to expect</h2>
          <ol className="border-t border-cv-border mb-14">
            {service.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 py-5 border-b border-cv-border">
                <span className="font-display text-2xl font-light text-cv-teal leading-none pt-0.5" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-cv-ink mb-1">{step.title}</h3>
                  <p className="text-sm text-cv-ink-muted leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="font-display text-2xl sm:text-3xl font-light text-cv-ink mb-6">Who it&apos;s for</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {service.whoFor.map((w) => (
              <li key={w} className="flex gap-3 border border-cv-border bg-cv-surface p-4 text-sm text-cv-ink leading-snug">
                <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0 mt-0.5 text-cv-teal" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="border border-cv-green-border bg-cv-green-light p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-cv-teal-dark mb-2 font-semibold">Insurance & cost</p>
            <p className="text-sm text-cv-ink leading-relaxed">{service.coverage}</p>
            <Link href="/#insurance" className="inline-block mt-3 text-xs text-cv-teal-dark underline underline-offset-2 hover:text-cv-ink">
              Check your plan&apos;s benefits
            </Link>
          </div>

          <div className="border border-cv-border bg-cv-surface">
            <p className="text-[10px] tracking-[0.2em] uppercase text-cv-ink-muted px-5 pt-5 font-semibold">
              {team.length > 1 ? "Your doctors" : "Your doctor"}
            </p>
            <ul>
              {team.map((d) => (
                <li key={d.id} className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0 border-cv-border">
                  <div className="w-14 h-14 shrink-0 overflow-hidden rounded-full bg-cv-bg">
                    <Photo
                      src={d.photo}
                      widths={[400, 720]}
                      aspect={[4, 5]}
                      alt=""
                      sizes="56px"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cv-ink">{d.name}, OD</p>
                    <p className="text-xs text-cv-ink-muted">{d.focus}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cv-ink text-white p-5">
            <p className="font-display text-xl font-light mb-2">Ready to book?</p>
            <p className="text-sm text-white/75 mb-4">Pick a time online in about a minute, or call and we&apos;ll find a slot for you.</p>
            <Link
              href="/#book"
              className="flex items-center justify-center min-h-11 bg-cv-teal hover:bg-cv-teal-dark text-white text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              Book Online
            </Link>
          </div>
        </aside>
      </section>

      {/* Related */}
      <section className="bg-cv-surface border-t border-cv-border" aria-labelledby="related-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <h2 id="related-heading" className="font-display text-2xl sm:text-3xl font-light text-cv-ink mb-8">
            Other services
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <div className="aspect-3/2 overflow-hidden bg-cv-bg mb-4">
                    <Photo
                      src={s.image}
                      widths={[640, 1280]}
                      aspect={[3, 2]}
                      alt=""
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-cv-ink group-hover:text-cv-teal transition-colors">{s.title}</h3>
                  <p className="text-sm text-cv-ink-muted mt-1">{s.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
