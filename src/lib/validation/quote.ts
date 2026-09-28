import { z } from "zod";
import { SERVICE_TYPES } from "@/content/quote";

/*
 * One shared schema for the quote form (client, via zodResolver) and the server
 * action (safeParse). Rules: docs/05-data-and-api.md → Quote form fields.
 */

/** Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9. Spaces, dashes, dots allowed. */
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;

const stripPhone = (value: string) => value.replace(/[\s\-().]/g, "");

export function isIndianMobile(value: string): boolean {
  return INDIAN_MOBILE.test(stripPhone(value));
}

/** Normalise a valid Indian mobile to +91XXXXXXXXXX. Throws on invalid input. */
export function normalizeIndianMobile(value: string): string {
  if (!isIndianMobile(value)) throw new Error("Not a valid Indian mobile number");
  return `+91${stripPhone(value).slice(-10)}`;
}

/** Today's date in India (IST) as YYYY-MM-DD. `now` is injectable for tests. */
export function todayInIndia(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, { error: message })
    .transform((value) => value || undefined);

export function createQuoteSchema(now?: Date) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { error: "Enter your name" })
      .min(2, { error: "Enter at least 2 characters" })
      .max(80, { error: "Keep your name under 80 characters" }),
    company: optionalText(120, "Keep the company name under 120 characters"),
    phone: z
      .string()
      .trim()
      .min(1, { error: "Enter your mobile number" })
      .refine(isIndianMobile, { error: "Enter a 10-digit mobile number" })
      .transform(normalizeIndianMobile),
    email: z
      .string()
      .trim()
      .refine((value) => value === "" || z.email().safeParse(value).success, {
        error: "Enter a valid email address, like name@company.com",
      })
      .transform((value) => value || undefined),
    service: z.enum(SERVICE_TYPES, { error: "Choose a service" }),
    fromCity: z
      .string()
      .trim()
      .min(1, { error: "Enter the pickup city" })
      .min(2, { error: "Enter at least 2 characters" })
      .max(60, { error: "Keep this under 60 characters" }),
    toCity: z
      .string()
      .trim()
      .min(1, { error: "Enter the delivery city" })
      .min(2, { error: "Enter at least 2 characters" })
      .max(60, { error: "Keep this under 60 characters" }),
    cargoType: optionalText(80, "Keep this under 80 characters"),
    weightTons: z
      .string()
      .trim()
      .refine((value) => value === "" || !Number.isNaN(Number(value)), {
        error: "Enter a number, like 8 or 12.5",
      })
      .refine((value) => value === "" || (Number(value) >= 0.1 && Number(value) <= 100), {
        error: "Enter a weight between 0.1 and 100 tonnes",
      })
      .transform((value) => (value === "" ? undefined : Math.round(Number(value) * 100) / 100)),
    pickupDate: z
      .string()
      .trim()
      .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), { error: "Enter a valid date" })
      .refine((value) => value === "" || value >= todayInIndia(now), {
        error: "Choose today or a later date",
      })
      .transform((value) => value || undefined),
    details: optionalText(1000, "Keep this under 1000 characters"),
    /** Honeypot — must stay empty. Checked separately so bots get a silent "success". */
    website: z.string().optional(),
  });
}

export const quoteSchema = createQuoteSchema();

/** What the form holds (all strings). */
export type QuoteFormValues = z.input<typeof quoteSchema>;
/** What the server stores after validation and normalisation. */
export type QuoteData = z.output<typeof quoteSchema>;
export type QuoteField = keyof QuoteFormValues;

export const emptyQuoteValues = (service?: QuoteFormValues["service"]): QuoteFormValues => ({
  name: "",
  company: "",
  phone: "",
  email: "",
  service: service ?? ("" as QuoteFormValues["service"]),
  fromCity: "",
  toCity: "",
  cargoType: "",
  weightTons: "",
  pickupDate: "",
  details: "",
  website: "",
});
