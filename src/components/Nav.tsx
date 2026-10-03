"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { clinic } from "@/lib/site";
import { useClinicStatus } from "@/lib/hooks";
import Logo from "@/components/Logo";
import { PhoneIcon } from "@/components/icons";

interface MenuLink {
  href: string;
  label: string;
  description?: string;
}

interface MenuGroup {
  id: string;
  label: string;
  links: MenuLink[];
  feature?: { eyebrow: string; title: string; body: string; href: string; cta: string };
}

const menus: MenuGroup[] = [
  {
    id: "services",
    label: "Services",
    links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.title, description: s.summary })),
    feature: {
      eyebrow: "Not sure where to start?",
      title: "Book a comprehensive exam",
      body: "Most visits begin here. Your doctor will recommend anything else you need.",
      href: "/#book",
      cta: "Book online",
    },
  },
  {
    id: "eyewear",
    label: "Eyewear",
    links: [
      { href: "/#frames", label: "Shop Frames", description: "Browse optical frames and sunglasses" },
      { href: "/#brands", label: "Designer Brands", description: "Lindberg, Oliver Peoples, Persol, and more" },
      { href: "/services/lenses-coatings", label: "Lenses & Coatings", description: "Progressives, blue light, anti-glare" },
      { href: "/services/contact-lens-fittings", label: "Contact Lenses", description: "Fittings for every prescription" },
    ],
  },
  {
    id: "patients",
    label: "Patients",
    links: [
      { href: "/#insurance", label: "Insurance & Benefits", description: "Check your vision plan coverage" },
      { href: "/#book", label: "Book an Appointment", description: "Pick a doctor and time online" },
      { href: "/#faq", label: "Patient FAQ", description: "Exams, insurance, and scheduling" },
      { href: "/#reviews", label: "Patient Reviews", description: "4.9 stars from 312 reviews" },
      { href: "/hipaa", label: "HIPAA & Privacy", description: "How we protect your records" },
    ],
  },
  {
    id: "about",
    label: "About",
    links: [
      { href: "/#doctors", label: "Our Doctors", description: "Meet Dr. Chen and Dr. Webb" },
      { href: "/#contact", label: "Contact & Hours", description: "Directions, phone, and hours" },
      { href: "/accessibility", label: "Accessibility", description: "Our WCAG 2.1 AA commitment" },
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const status = useClinicStatus();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedByHover = useRef(false);
  // Reset menus on route change by tracking the path they were opened on.
  const [openedOn, setOpenedOn] = useState(pathname);
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  // Close desktop dropdowns on outside click and Escape.
  useEffect(() => {
    if (!openMenu && !drawerOpen) return;
    function onPointer(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (openMenu) {
        document.getElementById(`nav-trigger-${openMenu}`)?.focus();
        setOpenMenu(null);
      }
      if (drawerOpen) {
        setDrawerOpen(false);
        document.getElementById("nav-drawer-toggle")?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu, drawerOpen]);

  // Lock page scroll behind the mobile drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  function hoverOpen(id: string) {
    window.clearTimeout(closeTimer.current);
    if (openMenu !== id) openedByHover.current = true;
    setOpenMenu(id);
  }
  function toggleMenu(id: string) {
    // A mouse click right after hover-open should keep the menu open.
    if (openMenu === id && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setOpenMenu(openMenu === id ? null : id);
  }
  function hoverClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  }
  function closeAll() {
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  return (
    <header className="sticky top-0 md:-top-9 z-50">
      {/* Utility bar */}
      <div className="hidden md:block bg-cv-ink text-white/80">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between text-[11px] tracking-wide">
          <p className="flex items-center gap-2 min-w-0" aria-live="polite">
            {status ? (
              <>
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.open ? "bg-emerald-400" : "bg-amber-400"}`}
                  aria-hidden="true"
                />
                <span>{status.label}</span>
              </>
            ) : (
              <span>Mon–Fri 9–6 · Sat 9–2</span>
            )}
          </p>
          <div className="flex items-center gap-6">
            <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {clinic.street}, {clinic.city}
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <a href={clinic.phoneHref} className="font-mono hover:text-white transition-colors">
              {clinic.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar — sticky */}
      <div className="bg-cv-surface/95 backdrop-blur-sm border-b border-cv-border" ref={navRef}>
        <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeAll}>
            <Logo className="h-6 w-6" />
            <span className="font-display text-[15px] sm:text-base font-light tracking-[0.06em] text-cv-ink">
              Clear Vision <span className="hidden min-[380px]:inline">Optometry</span>
            </span>
          </Link>

          {/* Desktop menus */}
          <ul className="hidden lg:flex items-center gap-1">
            {menus.map((menu) => {
              const isOpen = openMenu === menu.id;
              const wide = Boolean(menu.feature);
              return (
                <li key={menu.id} className="relative" onMouseEnter={() => hoverOpen(menu.id)} onMouseLeave={hoverClose}>
                  <button
                    id={`nav-trigger-${menu.id}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`nav-panel-${menu.id}`}
                    onClick={() => toggleMenu(menu.id)}
                    className={`cursor-pointer flex items-center gap-1.5 px-3.5 h-16 text-[12px] tracking-[0.1em] uppercase transition-colors ${
                      isOpen ? "text-cv-teal" : "text-cv-ink hover:text-cv-teal"
                    }`}
                  >
                    {menu.label}
                    <Chevron open={isOpen} />
                  </button>
                  <div
                    id={`nav-panel-${menu.id}`}
                    hidden={!isOpen}
                    className={`absolute top-full pt-px ${wide ? "-left-40 w-[720px]" : "left-0 w-80"}`}
                  >
                    <div className={`bg-cv-surface border border-cv-border shadow-xl shadow-cv-ink/5 ${wide ? "grid grid-cols-[1fr_220px]" : ""}`}>
                      <ul className={`p-3 ${wide ? "grid grid-cols-2 gap-x-2" : ""}`}>
                        {menu.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={closeAll}
                              className="block px-3 py-2.5 hover:bg-cv-bg focus-visible:bg-cv-bg transition-colors group"
                            >
                              <span className="block text-sm text-cv-ink group-hover:text-cv-teal transition-colors">{link.label}</span>
                              {link.description && (
                                <span className="block text-xs text-cv-ink-muted mt-0.5 leading-snug">{link.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {menu.feature && (
                        <div className="bg-cv-bg border-l border-cv-border p-5 flex flex-col">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-cv-teal mb-2">{menu.feature.eyebrow}</p>
                          <p className="font-display text-lg font-light text-cv-ink leading-snug mb-2">{menu.feature.title}</p>
                          <p className="text-xs text-cv-ink-muted leading-relaxed flex-1">{menu.feature.body}</p>
                          <Link
                            href={menu.feature.href}
                            onClick={closeAll}
                            className="mt-4 inline-flex justify-center bg-cv-teal hover:bg-cv-teal-dark text-white text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 transition-colors"
                          >
                            {menu.feature.cta}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={clinic.phoneHref}
              className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-2 px-3 h-10 text-[12px] font-mono text-cv-ink hover:text-cv-teal transition-colors"
            >
              <PhoneIcon />
              <span className="hidden xl:inline">{clinic.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <Link
              href="/#book"
              onClick={closeAll}
              className="hidden sm:inline-flex items-center h-10 px-5 bg-cv-teal hover:bg-cv-teal-dark text-white text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
            >
              Book Exam
            </Link>
            <button
              id="nav-drawer-toggle"
              type="button"
              className="lg:hidden cursor-pointer flex flex-col justify-center items-center gap-1.5 w-11 h-11 -mr-2"
              onClick={() => setDrawerOpen((o) => !o)}
              aria-expanded={drawerOpen}
              aria-controls="nav-drawer"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block w-5 h-px bg-cv-ink transition-transform ${drawerOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block w-5 h-px bg-cv-ink transition-opacity ${drawerOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-cv-ink transition-transform ${drawerOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          id="nav-drawer"
          hidden={!drawerOpen}
          className="lg:hidden border-t border-cv-border bg-cv-surface h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
        >
          <ul className="px-4 sm:px-6 py-2">
            {menus.map((menu) => {
              const isOpen = drawerSection === menu.id;
              return (
                <li key={menu.id} className="border-b border-cv-border">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`drawer-${menu.id}`}
                    onClick={() => setDrawerSection(isOpen ? null : menu.id)}
                    className="cursor-pointer w-full flex items-center justify-between py-4 text-sm tracking-[0.08em] uppercase text-cv-ink"
                  >
                    {menu.label}
                    <Chevron open={isOpen} />
                  </button>
                  <ul id={`drawer-${menu.id}`} hidden={!isOpen} className="pb-3 -mt-1">
                    {menu.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className="block py-2.5 pl-3 border-l border-cv-border text-[15px] text-cv-ink-muted hover:text-cv-teal hover:border-cv-teal transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div className="px-4 sm:px-6 py-6 grid grid-cols-2 gap-3">
            <a
              href={clinic.phoneHref}
              className="flex items-center justify-center gap-2 h-12 border border-cv-teal text-cv-teal text-xs font-semibold tracking-[0.12em] uppercase"
            >
              <PhoneIcon /> Call
            </a>
            <Link
              href="/#book"
              onClick={closeAll}
              className="flex items-center justify-center h-12 bg-cv-teal text-white text-xs font-semibold tracking-[0.12em] uppercase"
            >
              Book Exam
            </Link>
          </div>
          <div className="px-4 sm:px-6 pb-10 text-xs text-cv-ink-muted space-y-1">
            {status && <p className={status.open ? "text-emerald-700" : ""}>{status.label}</p>}
            <p>{clinic.street}, {clinic.city}, {clinic.region} {clinic.postalCode}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
