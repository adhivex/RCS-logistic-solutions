"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formCopy } from "@/content/forms";
import { submitContact, type ContactField } from "@/lib/actions/submit-contact";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { ConsentCheckbox, Field, FormAlert, Honeypot, focusFirstInvalid, controlClass } from "./fields";
import { SuccessPanel } from "./success-panel";
import { Turnstile, turnstileConfigured, type TurnstileHandle } from "./turnstile";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [token, setToken] = useState<string>();
  const turnstileRef = useRef<TurnstileHandle>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    shouldFocusError: false,
    defaultValues: { name: "", email: "", phone: "", message: "", consent: false, website: "" },
  });

  const onSubmit = handleSubmit(async (values, event) => {
    const form = event?.target as HTMLFormElement | undefined;
    setFormError(undefined);
    if (turnstileConfigured && !token) {
      setFormError(formCopy.spamCheckMissing);
      return;
    }

    try {
      const result = await submitContact(values, token);
      if (result.ok) {
        setSubmitted(true);
        return;
      }
      for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
        setError(field as ContactField, { type: "server", message });
      }
      if (result.fieldErrors) focusFirstInvalid(form, Object.keys(result.fieldErrors));
      if (result.formError) setFormError(result.formError);
    } catch {
      setFormError(formCopy.networkError);
    } finally {
      turnstileRef.current?.reset();
    }
  }, (invalid, event) => focusFirstInvalid(event?.target as HTMLFormElement | undefined, Object.keys(invalid)));

  if (submitted) {
    return <SuccessPanel heading={formCopy.contact.successHeading} body={formCopy.contact.successBody} />;
  }

  const err = (field: ContactField) => errors[field]?.message;
  const aria = (field: ContactField, describedBy?: string) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": describedBy,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6" aria-describedby="contact-usage-note">
      <Honeypot {...register("website")} />

      <Field id="contact-name" label="Name" error={err("name")}>
        {(d) => (
          <input id="contact-name" autoComplete="name" className={controlClass} {...aria("name", d)} {...register("name")} />
        )}
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-email" label="Email" hint="Email or mobile — at least one" error={err("email")}>
          {(d) => (
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className={controlClass}
              {...aria("email", d)}
              {...register("email")}
            />
          )}
        </Field>
        <Field id="contact-phone" label="Mobile number" hint="10-digit Indian mobile" error={err("phone")}>
          {(d) => (
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={controlClass}
              {...aria("phone", d)}
              {...register("phone")}
            />
          )}
        </Field>
      </div>
      <Field id="contact-message" label="Message" error={err("message")}>
        {(d) => (
          <textarea
            id="contact-message"
            rows={5}
            className={`${controlClass} resize-y`}
            {...aria("message", d)}
            {...register("message")}
          />
        )}
      </Field>

      <ConsentCheckbox error={err("consent")} {...register("consent")} />
      <Turnstile ref={turnstileRef} action="contact" onToken={setToken} />
      {formError && <FormAlert>{formError}</FormAlert>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-usage-note" className="text-sm text-muted-foreground">
          {formCopy.usageNote}
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:min-w-48">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              {formCopy.contact.submitting}
            </>
          ) : (
            formCopy.contact.submit
          )}
        </Button>
      </div>
    </form>
  );
}
