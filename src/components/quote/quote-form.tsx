"use client";

import { quoteCopy, serviceOptions, type ServiceTypeValue } from "@/content";
import { cn } from "@/lib/utils";

/*
 * Phase 2: static UI only — fields from docs/05-data-and-api.md. Validation,
 * submission, honeypot handling and the success state are wired in Phase 5.
 */

export const fieldClass =
  "w-full rounded-button border border-field-border bg-white px-3 py-2.5 font-body text-[0.9375rem] text-brand-ink placeholder:text-brand-slate/70 focus-visible:border-brand-orange focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-orange";

const labelClass = "grid gap-1.5 text-[0.8125rem] font-medium text-brand-ink";

type QuoteFormProps = {
  /** Prefix keeps ids unique when the form appears twice (dialog + contact page). */
  idPrefix: string;
  defaultService?: ServiceTypeValue;
  className?: string;
};

export function QuoteForm({ idPrefix, defaultService, className }: QuoteFormProps) {
  const id = (name: string) => `${idPrefix}-${name}`;
  const optional = <span className="font-normal text-brand-slate"> (optional)</span>;

  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className={cn("grid gap-3.5 sm:grid-cols-2", className)}
    >
      {/* Honeypot: hidden from users and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className={labelClass} htmlFor={id("name")}>
        Name
        <input id={id("name")} name="name" autoComplete="name" required className={fieldClass} />
      </label>
      <label className={labelClass} htmlFor={id("company")}>
        <span>Company{optional}</span>
        <input id={id("company")} name="company" autoComplete="organization" className={fieldClass} />
      </label>
      <label className={labelClass} htmlFor={id("phone")}>
        Phone
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          className={fieldClass}
        />
      </label>
      <label className={labelClass} htmlFor={id("email")}>
        <span>Email{optional}</span>
        <input
          id={id("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={fieldClass}
        />
      </label>
      <label className={cn(labelClass, "sm:col-span-2")} htmlFor={id("service")}>
        Service
        <select
          id={id("service")}
          name="service"
          key={defaultService ?? "none"}
          defaultValue={defaultService ?? ""}
          required
          className={fieldClass}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className={labelClass} htmlFor={id("fromCity")}>
        From
        <input id={id("fromCity")} name="fromCity" placeholder="City" required className={fieldClass} />
      </label>
      <label className={labelClass} htmlFor={id("toCity")}>
        To
        <input id={id("toCity")} name="toCity" placeholder="City" required className={fieldClass} />
      </label>
      <label className={labelClass} htmlFor={id("cargoType")}>
        <span>Cargo type{optional}</span>
        <input id={id("cargoType")} name="cargoType" placeholder="e.g. steel coils" className={fieldClass} />
      </label>
      <label className={labelClass} htmlFor={id("weightTons")}>
        <span>Weight in tonnes{optional}</span>
        <input
          id={id("weightTons")}
          name="weightTons"
          type="number"
          inputMode="decimal"
          min={0.1}
          max={100}
          step={0.1}
          className={fieldClass}
        />
      </label>
      <label className={cn(labelClass, "sm:col-span-2")} htmlFor={id("pickupDate")}>
        <span>Preferred pickup date{optional}</span>
        <input id={id("pickupDate")} name="pickupDate" type="date" className={fieldClass} />
      </label>
      <label className={cn(labelClass, "sm:col-span-2")} htmlFor={id("details")}>
        <span>Cargo details{optional}</span>
        <textarea
          id={id("details")}
          name="details"
          rows={3}
          placeholder="Anything else we should know"
          className={cn(fieldClass, "resize-y")}
        />
      </label>

      <p className="text-[0.8125rem] sm:col-span-2">{quoteCopy.privacyNote}</p>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-button bg-action px-6 py-3 font-semibold text-white transition-colors hover:bg-action-hover sm:col-span-2"
      >
        {quoteCopy.submit}
      </button>
    </form>
  );
}
