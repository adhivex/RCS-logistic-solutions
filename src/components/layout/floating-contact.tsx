import { MessageCircle, Phone } from "lucide-react";
import { company, whatsappHref } from "@/content";

/**
 * docs/02-design-system.md → FloatingContact (mobile only): WhatsApp + Call at the
 * bottom right, clear of the iOS home indicator via the safe-area inset.
 */
export function FloatingContact() {
  const base =
    "inline-flex size-14 items-center justify-center rounded-full text-white shadow-card transition-colors";
  return (
    <div
      className="fixed right-4 z-30 flex flex-col gap-3 nav:hidden"
      style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-[#1f7a4d] hover:bg-[#186540]`}
      >
        <MessageCircle className="size-6" aria-hidden="true" />
        <span className="sr-only">Chat on WhatsApp (opens in a new tab)</span>
      </a>
      <a href={company.phoneHref} className={`${base} bg-action hover:bg-action-hover`}>
        <Phone className="size-6" aria-hidden="true" />
        <span className="sr-only">Call {company.phone}</span>
      </a>
    </div>
  );
}
