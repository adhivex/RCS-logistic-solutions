import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { formCopy } from "@/content/forms";
import { cn } from "@/lib/utils";

/*
 * Form primitives: visible label above, 48px controls, plain-language error below,
 * wired with aria-invalid / aria-describedby. Required is the default; optional
 * fields are marked "(optional)".
 */

export const controlClass =
  "block w-full min-h-12 rounded-md border border-input bg-white px-4 py-3 text-base text-navy transition-colors placeholder:text-muted-foreground hover:border-navy/60 focus-visible:border-navy aria-invalid:border-destructive disabled:opacity-60";

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

export function Field({ id, label, optional, hint, error, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-semibold text-navy">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="-mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {children(describedBy)}
      {error && <FieldError id={errorId!}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm font-medium text-destructive">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        controlClass,
        "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%230f2026' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")] bg-[position:right_1rem_center] bg-no-repeat pr-11",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

/** Visually hidden honeypot. Real users never see or fill it. */
export function Honeypot(props: ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Company website</label>
      <input id="website" type="text" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  );
}

type ConsentProps = ComponentProps<"input"> & { error?: string };

/** Unticked-by-default DPDP consent checkbox. */
export function ConsentCheckbox({ error, ...props }: ConsentProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-error" : undefined}
          className="mt-1 size-5 shrink-0 cursor-pointer rounded-sm border-input accent-action-orange"
          {...props}
        />
        <label htmlFor="consent" className="cursor-pointer text-navy">
          {formCopy.consentBefore}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="font-semibold text-action-orange underline underline-offset-4"
          >
            {formCopy.consentLinkText}
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
          {formCopy.consentAfter}
        </label>
      </div>
      {error && <FieldError id="consent-error">{error}</FieldError>}
    </div>
  );
}

/**
 * Focus the first invalid field in visual (DOM) order. Used instead of React Hook
 * Form's built-in focus, which can pick a field out of order (e.g. the checkbox).
 */
export function focusFirstInvalid(form: HTMLFormElement | undefined, fieldNames: string[]) {
  if (!form) return;
  const invalid = new Set(fieldNames);
  for (const element of Array.from(form.elements)) {
    if (element instanceof HTMLElement && invalid.has(element.getAttribute("name") ?? "")) {
      element.focus();
      return;
    }
  }
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-md border border-destructive/30 bg-[#fef3f2] px-4 py-3 text-destructive"
    >
      <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p className="font-medium">{children}</p>
    </div>
  );
}
