import { company } from "./company";

/** Quote form options — values match the Prisma `ServiceType` enum. */
export const SERVICE_TYPES = [
  "FULL_TRUCK_LOAD",
  "PART_TRUCK_LOAD",
  "WAREHOUSING",
  "SUPPLY_CHAIN",
  "NOT_SURE",
] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number];

export const serviceOptions: { value: ServiceTypeValue; label: string }[] = [
  { value: "FULL_TRUCK_LOAD", label: "Full Truck Load" },
  { value: "PART_TRUCK_LOAD", label: "Part Truck Load" },
  { value: "WAREHOUSING", label: "Warehousing & Storage" },
  { value: "SUPPLY_CHAIN", label: "Supply Chain Solutions" },
  { value: "NOT_SURE", label: "Not sure yet" },
];

export const quoteCopy = {
  title: "Get a Quote",
  intro: "Tell us what you're moving and where. We'll come back with a quote.",
  submit: "Request Quote",
  submitting: "Sending…",
  privacyNote: "We use these details only to respond to your quote request.",
  errors: {
    rateLimited: `We've received several requests from your connection in the last few minutes. Please wait a little, or call or WhatsApp us on ${company.phone}.`,
    unavailable: `We couldn't send your request just now. Please try again, or call or WhatsApp us on ${company.phone} — your details are still here.`,
    network:
      "We couldn't reach our server. Check your connection and try again — your details are still here.",
  },
} as const;
