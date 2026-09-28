"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { submitQuote } from "@/app/actions/quote";
import { quoteCopy, serviceOptions, type ServiceTypeValue } from "@/content";
import { cn } from "@/lib/utils";
import {
  emptyQuoteValues,
  quoteSchema,
  todayInIndia,
  type QuoteData,
  type QuoteField,
  type QuoteFormValues,
} from "@/lib/validation/quote";

export const fieldClass =
  "w-full rounded-button border border-field-border bg-white px-3 py-2.5 font-body text-[0.9375rem] text-brand-ink placeholder:text-brand-slate/70 focus-visible:border-brand-orange focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-orange aria-invalid:border-danger";

type QuoteFormProps = {
  /** Prefix keeps ids unique when the form appears twice (dialog + contact page). */
  idPrefix: string;
  defaultService?: ServiceTypeValue;
  className?: string;
  /** Called after a successful submit, before navigating to /thank-you (e.g. close the dialog). */
  onSuccess?: () => void;
};

/** Focus the first invalid control in visual (DOM) order. */
function focusFirstInvalid(form: HTMLFormElement | null, fields: string[]) {
  if (!form) return;
  const invalid = new Set(fields);
  for (const element of Array.from(form.elements)) {
    if (element instanceof HTMLElement && invalid.has(element.getAttribute("name") ?? "")) {
      element.focus();
      return;
    }
  }
}

type FieldShellProps = {
  htmlFor: string;
  errorId: string;
  label: string;
  error?: string;
  optional?: boolean;
  full?: boolean;
  children: ReactNode;
};

/** Module-level so inputs are not remounted on every render. */
function FieldShell({ htmlFor, errorId, label, error, optional, full, children }: FieldShellProps) {
  return (
    <div className={cn("grid content-start gap-1.5", full && "sm:col-span-2")}>
      <label htmlFor={htmlFor} className="text-[0.8125rem] font-medium text-brand-ink">
        {label}
        {optional && <span className="font-normal text-brand-slate"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-[0.8125rem] font-medium text-danger">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({ idPrefix, defaultService, className, onSuccess }: QuoteFormProps) {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: emptyQuoteValues(defaultService),
    mode: "onTouched",
    shouldFocusError: false,
  });

  const id = (name: QuoteField) => `${idPrefix}-${name}`;
  const errorId = (name: QuoteField) => `${idPrefix}-${name}-error`;
  const a11y = (name: QuoteField) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
  });

  const shell = (name: QuoteField) => ({
    htmlFor: id(name),
    errorId: errorId(name),
    error: errors[name]?.message,
  });

  const onSubmit = handleSubmit(
    async (_data, event) => {
      setFormError(undefined);
      const form = event?.target as HTMLFormElement | null;
      try {
        // Send the raw strings; the server validates again with the same schema.
        const result = await submitQuote(getValues(), window.location.pathname);
        if (result.ok) {
          onSuccess?.();
          router.push("/thank-you");
          return;
        }
        for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
          setError(field as QuoteField, { type: "server", message });
        }
        if (result.fieldErrors) focusFirstInvalid(form, Object.keys(result.fieldErrors));
        if (result.formError) setFormError(result.formError);
      } catch {
        setFormError(quoteCopy.errors.network);
      }
    },
    (invalid, event) => focusFirstInvalid(event?.target as HTMLFormElement | null, Object.keys(invalid)),
  );

  return (
    <form noValidate onSubmit={onSubmit} className={cn("relative grid gap-3.5 sm:grid-cols-2", className)}>
      {/* Honeypot: hidden from users and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <FieldShell {...shell("name")} label="Name">
        <input autoComplete="name" className={fieldClass} {...a11y("name")} {...register("name")} />
      </FieldShell>
      <FieldShell {...shell("company")} label="Company" optional>
        <input
          autoComplete="organization"
          className={fieldClass}
          {...a11y("company")}
          {...register("company")}
        />
      </FieldShell>
      <FieldShell {...shell("phone")} label="Phone">
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={fieldClass}
          {...a11y("phone")}
          {...register("phone")}
        />
      </FieldShell>
      <FieldShell {...shell("email")} label="Email" optional>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          className={fieldClass}
          {...a11y("email")}
          {...register("email")}
        />
      </FieldShell>
      <FieldShell {...shell("service")} label="Service" full>
        <select className={fieldClass} {...a11y("service")} {...register("service")}>
          <option value="" disabled>
            Choose a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FieldShell>
      <FieldShell {...shell("fromCity")} label="From">
        <input placeholder="City" className={fieldClass} {...a11y("fromCity")} {...register("fromCity")} />
      </FieldShell>
      <FieldShell {...shell("toCity")} label="To">
        <input placeholder="City" className={fieldClass} {...a11y("toCity")} {...register("toCity")} />
      </FieldShell>
      <FieldShell {...shell("cargoType")} label="Cargo type" optional>
        <input
          placeholder="e.g. steel coils"
          className={fieldClass}
          {...a11y("cargoType")}
          {...register("cargoType")}
        />
      </FieldShell>
      <FieldShell {...shell("weightTons")} label="Weight in tonnes" optional>
        <input
          type="number"
          inputMode="decimal"
          min={0.1}
          max={100}
          step={0.1}
          className={fieldClass}
          {...a11y("weightTons")}
          {...register("weightTons")}
        />
      </FieldShell>
      <FieldShell {...shell("pickupDate")} label="Preferred pickup date" optional full>
        <input
          type="date"
          min={todayInIndia()}
          suppressHydrationWarning
          className={fieldClass}
          {...a11y("pickupDate")}
          {...register("pickupDate")}
        />
      </FieldShell>
      <FieldShell {...shell("details")} label="Cargo details" optional full>
        <textarea
          rows={3}
          placeholder="Anything else we should know"
          className={cn(fieldClass, "resize-y")}
          {...a11y("details")}
          {...register("details")}
        />
      </FieldShell>

      {formError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-button border border-danger/30 bg-[#fef3f2] px-3.5 py-3 text-sm font-medium text-danger sm:col-span-2"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {formError}
        </div>
      )}

      <p className="text-[0.8125rem] sm:col-span-2">{quoteCopy.privacyNote}</p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-action px-6 py-3 font-semibold text-white transition-colors hover:bg-action-hover disabled:opacity-70 sm:col-span-2"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {isSubmitting ? quoteCopy.submitting : quoteCopy.submit}
      </button>
    </form>
  );
}
