import { z } from "zod";

/*
 * Shared by the client forms (zodResolver) and the server actions (safeParse).
 * Field rules follow docs/content.md → Quote form.
 */

export const SERVICE_TYPES = ["FTL", "PTL", "WAREHOUSING", "SUPPLY_CHAIN", "OTHER"] as const;
export const VEHICLE_TYPES = ["NOT_SURE", "SMALL_COMMERCIAL", "LCV", "ICV", "HCV", "TRAILER", "CONTAINER"] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number];
export type VehicleTypeValue = (typeof VEHICLE_TYPES)[number];

/** Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9. Spaces and dashes allowed. */
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;

function stripPhone(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export function isIndianMobile(value: string): boolean {
  return INDIAN_MOBILE.test(stripPhone(value));
}

/** Normalise a valid Indian mobile to `+91XXXXXXXXXX`. */
export function normalizeIndianMobile(value: string): string {
  return `+91${stripPhone(value).slice(-10)}`;
}

/** Today's date in India as YYYY-MM-DD (the business operates in IST). */
export function todayInIndia(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

const requiredText = (min: number, max: number, messages: { empty: string; short?: string; long: string }) =>
  z
    .string()
    .trim()
    .min(1, { error: messages.empty })
    .min(min, { error: messages.short ?? messages.empty })
    .max(max, { error: messages.long });

const optionalText = (max: number, long: string) => z.string().trim().max(max, { error: long });

const phoneField = z
  .string()
  .trim()
  .min(1, { error: "Enter your mobile number" })
  .refine(isIndianMobile, { error: "Enter a 10-digit mobile number" });

const consentField = z.boolean().refine((value) => value === true, {
  error: "Tick the box to let us contact you about this enquiry",
});

/** Honeypot: real users never see or fill it. */
const honeypotField = z.string().optional();

export const quoteSchema = z.object({
  name: requiredText(2, 80, {
    empty: "Enter your name",
    short: "Enter at least 2 characters",
    long: "Keep your name under 80 characters",
  }),
  company: requiredText(2, 120, {
    empty: "Enter your company name",
    short: "Enter at least 2 characters",
    long: "Keep the company name under 120 characters",
  }),
  email: z.string().trim().min(1, { error: "Enter your email address" }).pipe(
    z.email({ error: "Enter a valid email address, like name@company.com" }),
  ),
  phone: phoneField,
  pickupLocation: requiredText(2, 120, {
    empty: "Enter the city or area for pickup",
    long: "Keep the pickup location under 120 characters",
  }),
  deliveryLocation: requiredText(2, 120, {
    empty: "Enter the city or area for delivery",
    long: "Keep the delivery location under 120 characters",
  }),
  serviceType: z.enum(SERVICE_TYPES, { error: "Choose a service" }),
  approxLoad: optionalText(60, "Keep this under 60 characters"),
  vehicleType: z.enum(VEHICLE_TYPES, { error: "Choose a vehicle type" }),
  pickupDate: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), { error: "Enter a valid date" })
    .refine((value) => value === "" || value >= todayInIndia(), { error: "Choose today or a later date" }),
  message: optionalText(1000, "Keep your message under 1000 characters"),
  consent: consentField,
  website: honeypotField,
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z
  .object({
    name: requiredText(2, 80, {
      empty: "Enter your name",
      short: "Enter at least 2 characters",
      long: "Keep your name under 80 characters",
    }),
    email: z
      .string()
      .trim()
      .refine((value) => value === "" || z.email().safeParse(value).success, {
        error: "Enter a valid email address, like name@company.com",
      }),
    phone: z
      .string()
      .trim()
      .refine((value) => value === "" || isIndianMobile(value), { error: "Enter a 10-digit mobile number" }),
    message: requiredText(2, 1000, {
      empty: "Enter your message",
      short: "Enter at least 2 characters",
      long: "Keep your message under 1000 characters",
    }),
    consent: consentField,
    website: honeypotField,
  })
  .refine((data) => data.email !== "" || data.phone !== "", {
    error: "Enter an email address or a mobile number so we can reply",
    path: ["email"],
  });

export type ContactInput = z.infer<typeof contactSchema>;

/** Typed result returned by every server action — never a raw thrown error. */
export type ActionResult<TField extends string> =
  | { ok: true }
  | { ok: false; fieldErrors?: Partial<Record<TField, string>>; formError?: string };

/** Flatten Zod issues into one message per field (first issue wins). */
export function toFieldErrors<TField extends string>(error: z.ZodError): Partial<Record<TField, string>> {
  const result: Partial<Record<TField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in result)) result[key as TField] = issue.message;
  }
  return result;
}
