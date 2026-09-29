"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { submitQuote } from "@/app/actions/quote";
import { ButtonContent, buttonVariants } from "@/components/ui/button";
import { customerTypeOptions, quoteCopy, serviceOptions, type ServiceTypeValue } from "@/content/quote";
import { cn } from "@/lib/utils";
import {
  emptyQuoteValues,
  quoteSchema,
  todayInIndia,
  type QuoteData,
  type QuoteField,
  type QuoteFormValues,
} from "@/lib/validation/quote";

/** Underline-style field (preview): 2px orange underline on focus, ≥ 3:1 at rest. */
export const fieldClass =
  "w-full rounded-none border-0 border-b border-field bg-transparent px-0 py-2.5 font-body text-base tracking-normal text-ink normal-case placeholder:text-muted focus:border-orange focus:shadow-[0_1px_0_var(--color-orange)] focus:outline-none aria-invalid:border-danger";

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
      <label htmlFor={htmlFor} className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
        {label}
        {optional && <span className="font-normal tracking-normal normal-case"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-[13px] font-medium text-danger">
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: emptyQuoteValues(defaultService),
    mode: "onTouched",
    shouldFocusError: false,
  });
  const customerType = useWatch({ control, name: "customerType" });
  const isBusiness = customerType !== "individual";

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
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn("relative grid gap-x-4 gap-y-[18px] sm:grid-cols-2", className)}
    >
      {/* Honeypot: hidden from users and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          {quoteCopy.customerTypeLegend}
        </legend>
        <div className="inline-grid grid-cols-2 rounded-full bg-paper p-1">
          {customerTypeOptions.map((option) => (
            <label
              key={option.value}
              className="relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold text-slate transition-colors has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-orange"
            >
              <input type="radio" value={option.value} className="sr-only" {...register("customerType")} />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <FieldShell {...shell("name")} label="Name" full={!isBusiness}>
        <input autoComplete="name" className={fieldClass} {...a11y("name")} {...register("name")} />
      </FieldShell>
      {isBusiness && (
        <FieldShell {...shell("company")} label="Company" optional>
          <input
            autoComplete="organization"
            className={fieldClass}
            {...a11y("company")}
            {...register("company")}
          />
        </FieldShell>
      )}
      <FieldShell {...shell("phone")} label="Phone">
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="10-digit mobile"
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
      <FieldShell {...shell("service")} label="Service">
        <select className={cn(fieldClass, "cursor-pointer")} {...a11y("service")} {...register("service")}>
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
      <FieldShell {...shell("pickupDate")} label="Pickup date" optional>
        <input
          type="date"
          min={todayInIndia()}
          suppressHydrationWarning
          className={fieldClass}
          {...a11y("pickupDate")}
          {...register("pickupDate")}
        />
      </FieldShell>
      <FieldShell {...shell("fromCity")} label="From">
        <input
          placeholder="City"
          autoComplete="address-level2"
          className={fieldClass}
          {...a11y("fromCity")}
          {...register("fromCity")}
        />
      </FieldShell>
      <FieldShell {...shell("toCity")} label="To">
        <input placeholder="City" className={fieldClass} {...a11y("toCity")} {...register("toCity")} />
      </FieldShell>
      <FieldShell {...shell("cargoType")} label="Cargo type" optional>
        <input
          placeholder={isBusiness ? "e.g. steel coils" : "e.g. household goods"}
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
      <FieldShell {...shell("details")} label="Cargo details" optional full>
        <textarea
          rows={2}
          placeholder="Type of goods, approx. weight, dates"
          className={cn(fieldClass, "resize-y")}
          {...a11y("details")}
          {...register("details")}
        />
      </FieldShell>

      {formError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-[#fef3f2] px-3.5 py-3 text-sm font-medium text-danger sm:col-span-2"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {formError}
        </div>
      )}

      <p className="m-0 text-[13px] text-muted sm:col-span-2">
        {quoteCopy.privacyNote}{" "}
        <Link href={quoteCopy.privacyLink.href} className="text-ink underline underline-offset-2">
          {quoteCopy.privacyLink.label}
        </Link>
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting || undefined}
        className={cn(buttonVariants(), "justify-between sm:col-span-2")}
      >
        <ButtonContent icon={isSubmitting ? <Loader2 className="animate-spin" /> : undefined}>
          {isSubmitting ? quoteCopy.submitting : quoteCopy.submit}
        </ButtonContent>
      </button>
    </form>
  );
}
