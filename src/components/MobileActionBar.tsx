import Link from "next/link";
import { clinic } from "@/lib/site";
import { PhoneIcon } from "@/components/icons";

/** Thumb-reachable Call / Book bar shown on phones only. */
export default function MobileActionBar() {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-cv-border bg-cv-surface/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <a
        href={clinic.phoneHref}
        className="flex items-center justify-center gap-2 h-14 text-cv-teal text-xs font-semibold tracking-[0.12em] uppercase"
      >
        <PhoneIcon className="w-4 h-4" />
        Call
      </a>
      <Link
        href="/#book"
        className="flex items-center justify-center h-14 bg-cv-teal text-white text-xs font-semibold tracking-[0.12em] uppercase"
      >
        Book Exam
      </Link>
    </div>
  );
}
