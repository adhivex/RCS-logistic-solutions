"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { quoteCopy, SERVICE_TYPES, type ServiceTypeValue } from "@/content/quote";

// The form (React Hook Form + Zod) loads on first open, keeping it out of every page's initial JS.
const QuoteForm = dynamic(() => import("./quote-form").then((module) => module.QuoteForm), {
  ssr: false,
  loading: () => (
    <p className="flex min-h-40 items-center justify-center gap-2 text-sm">
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      Loading form…
    </p>
  ),
});

function asService(value: string | undefined): ServiceTypeValue | undefined {
  return SERVICE_TYPES.find((service) => service === value);
}

/**
 * The single site-wide quote dialog (native <dialog>: focus containment, Esc to
 * close, focus returns to the trigger). Opens from any [data-quote] link; the
 * link's data-quote value pre-selects the service. On /contact the links fall
 * through to the inline form at #quote instead.
 */
export function QuoteDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [service, setService] = useState<ServiceTypeValue>();
  const [openCount, setOpenCount] = useState(0);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }
      const trigger = (event.target as Element | null)?.closest<HTMLElement>("[data-quote]");
      if (!trigger || pathname === "/contact") return;
      event.preventDefault();
      setService(asService(trigger.dataset.quote));
      setOpenCount((count) => count + 1); // fresh form each time
      dialogRef.current?.showModal();
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quote-dialog-title"
      onClick={(event) => {
        // Click on the backdrop (the dialog element itself) closes it.
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(560px,calc(100%-32px))] overflow-y-auto rounded-2xl bg-white p-0 text-slate shadow-dialog"
    >
      <div className="flex items-start justify-between gap-5 px-6 pt-[26px] sm:px-8 sm:pt-[30px]">
        <div>
          <h2 id="quote-dialog-title" className="text-[32px] tracking-[-0.04em]">
            {quoteCopy.title}
          </h2>
          <p className="mt-1.5 text-sm">{quoteCopy.intro}</p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
          className="inline-flex size-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-line"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="px-6 pt-5 pb-7 sm:px-8 sm:pt-6 sm:pb-8">
        {openCount > 0 && (
          <QuoteForm
            key={openCount}
            idPrefix="dialog"
            defaultService={service}
            onSuccess={() => dialogRef.current?.close()}
          />
        )}
      </div>
    </dialog>
  );
}
