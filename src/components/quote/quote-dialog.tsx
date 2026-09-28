"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { quoteCopy, SERVICE_TYPES, type ServiceTypeValue } from "@/content";
import { QuoteForm } from "./quote-form";

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
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(560px,calc(100%-2rem))] overflow-y-auto rounded-xl bg-white p-0 text-brand-slate shadow-dialog"
    >
      <div className="flex items-center justify-between border-b border-brand-line px-6 py-5">
        <div>
          <h2 id="quote-dialog-title" className="text-xl font-semibold">
            {quoteCopy.title}
          </h2>
          <p className="mt-1 text-sm">{quoteCopy.intro}</p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
          className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-button text-brand-slate hover:bg-brand-mist hover:text-brand-ink"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>
      <div className="relative px-6 pt-5 pb-6">
        <QuoteForm key={openCount} idPrefix="dialog" defaultService={service} />
      </div>
    </dialog>
  );
}
