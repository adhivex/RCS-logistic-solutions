import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-config";

/** Floating click-to-chat button. Hidden entirely when NEXT_PUBLIC_WHATSAPP_NUMBER is unset. */
export function WhatsAppButton() {
  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-navy text-white shadow-lg shadow-navy/20 transition-colors duration-200 hover:bg-[#1a3540] sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="sr-only">Talk to our team on WhatsApp (opens in a new tab)</span>
    </a>
  );
}
