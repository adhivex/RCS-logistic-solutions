"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formCopy, serviceOptions, vehicleOptions } from "@/content/forms";
import { submitQuote, type QuoteField } from "@/lib/actions/submit-quote";
import { quoteSchema, todayInIndia, type QuoteInput, type ServiceTypeValue } from "@/lib/validations";
import { ConsentCheckbox, Field, FormAlert, Honeypot, focusFirstInvalid, Select, controlClass } from "./fields";
import { SuccessPanel } from "./success-panel";
import { Turnstile, turnstileConfigured, type TurnstileHandle } from "./turnstile";

type QuoteFormProps = { defaultService?: ServiceTypeValue };

export function QuoteForm({ defaultService }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [token, setToken] = useState<string>();
  const turnstileRef = useRef<TurnstileHandle>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      pickupLocation: "",
      deliveryLocation: "",
      // Empty until chosen, unless opened from a service page; the schema rejects "".
      serviceType: defaultService ?? ("" as ServiceTypeValue),
      approxLoad: "",
      vehicleType: "NOT_SURE",
      pickupDate: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values, event) => {
    const form = event?.target as HTMLFormElement | undefined;
    setFormError(undefined);
    if (turnstileConfigured && !token) {
      setFormError(formCopy.spamCheckMissing);
      return;
    }

    try {
      const result = await submitQuote(values, token, `${window.location.pathname}${window.location.search}`);
      if (result.ok) {
        setSubmitted(true);
        return;
      }
      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        setError(field as QuoteField, { type: "server", message });
      }
      if (result.fieldErrors) focusFirstInvalid(form, Object.keys(result.fieldErrors));
      if (result.formError) setFormError(result.formError);
    } catch {
      // Network failure or the server was unreachable — input is kept.
      setFormError(formCopy.networkError);
    } finally {
      turnstileRef.current?.reset();
    }
  }, (invalid, event) => focusFirstInvalid(event?.target as HTMLFormElement | undefined, Object.keys(invalid)));

  if (submitted) {
    return <SuccessPanel heading={formCopy.quote.successHeading} body={formCopy.quote.successBody} />;
  }

  const err = (field: QuoteField) => errors[field]?.message;
  const aria = (field: QuoteField, describedBy?: string) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": describedBy,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-10" aria-describedby="quote-usage-note">
      <Honeypot {...register("website")} />

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="font-wide mb-6 text-xl font-bold text-navy">Your details</legend>
        <Field id="name" label="Name" error={err("name")}>
          {(d) => <input id="name" autoComplete="name" className={controlClass} {...aria("name", d)} {...register("name")} />}
        </Field>
        <Field id="company" label="Company" error={err("company")}>
          {(d) => (
            <input
              id="company"
              autoComplete="organization"
              className={controlClass}
              {...aria("company", d)}
              {...register("company")}
            />
          )}
        </Field>
        <Field id="email" label="Email" error={err("email")}>
          {(d) => (
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className={controlClass}
              {...aria("email", d)}
              {...register("email")}
            />
          )}
        </Field>
        <Field id="phone" label="Mobile number" hint="10-digit Indian mobile" error={err("phone")}>
          {(d) => (
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={controlClass}
              {...aria("phone", d)}
              {...register("phone")}
            />
          )}
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="font-wide mb-6 text-xl font-bold text-navy">Shipment</legend>
        <Field id="pickupLocation" label="Pickup location" hint="City or area" error={err("pickupLocation")}>
          {(d) => (
            <input
              id="pickupLocation"
              className={controlClass}
              {...aria("pickupLocation", d)}
              {...register("pickupLocation")}
            />
          )}
        </Field>
        <Field id="deliveryLocation" label="Delivery location" hint="City or area" error={err("deliveryLocation")}>
          {(d) => (
            <input
              id="deliveryLocation"
              className={controlClass}
              {...aria("deliveryLocation", d)}
              {...register("deliveryLocation")}
            />
          )}
        </Field>
        <Field id="serviceType" label="Service" error={err("serviceType")}>
          {(d) => (
            <Select id="serviceType" {...aria("serviceType", d)} {...register("serviceType")}>
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field id="vehicleType" label="Vehicle type" optional error={err("vehicleType")}>
          {(d) => (
            <Select id="vehicleType" {...aria("vehicleType", d)} {...register("vehicleType")}>
              {vehicleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field
          id="approxLoad"
          label="Approximate weight or load"
          optional
          hint='For example "8 tonnes" or "12 pallets"'
          error={err("approxLoad")}
        >
          {(d) => (
            <input id="approxLoad" className={controlClass} {...aria("approxLoad", d)} {...register("approxLoad")} />
          )}
        </Field>
        <Field id="pickupDate" label="Preferred pickup date" optional error={err("pickupDate")}>
          {(d) => (
            <input
              id="pickupDate"
              type="date"
              min={todayInIndia()}
              suppressHydrationWarning
              className={controlClass}
              {...aria("pickupDate", d)}
              {...register("pickupDate")}
            />
          )}
        </Field>
        <Field id="message" label="Message" optional className="md:col-span-2" error={err("message")}>
          {(d) => (
            <textarea
              id="message"
              rows={5}
              className={`${controlClass} resize-y`}
              {...aria("message", d)}
              {...register("message")}
            />
          )}
        </Field>
      </fieldset>

      <div className="grid gap-6 border-t border-border pt-8">
        <ConsentCheckbox error={err("consent")} {...register("consent")} />
        <Turnstile ref={turnstileRef} action="quote" onToken={setToken} />
        {formError && <FormAlert>{formError}</FormAlert>}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p id="quote-usage-note" className="text-sm text-muted-foreground">
            {formCopy.usageNote}
          </p>
          <Button type="submit" size="lg" disabled={isSubmitting} className="sm:min-w-52">
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                {formCopy.quote.submitting}
              </>
            ) : (
              formCopy.quote.submit
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
