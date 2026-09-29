import { company } from "./company";

/** Quote form options — values match the `service_type` enum in supabase/migrations. */
export const SERVICE_TYPES = [
  "full_truck_load",
  "part_truck_load",
  "warehousing",
  "supply_chain",
  "not_sure",
] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number];

export const serviceOptions: { value: ServiceTypeValue; label: string }[] = [
  { value: "full_truck_load", label: "Full Truck Load" },
  { value: "part_truck_load", label: "Part Truck Load" },
  { value: "warehousing", label: "Warehousing & Storage" },
  { value: "supply_chain", label: "Supply Chain Solutions" },
  { value: "not_sure", label: "Not sure yet" },
];

export const CUSTOMER_TYPES = ["business", "individual"] as const;

export type CustomerTypeValue = (typeof CUSTOMER_TYPES)[number];

export const customerTypeOptions: { value: CustomerTypeValue; label: string }[] = [
  { value: "business", label: "Business" },
  { value: "individual", label: "Individual" },
];

export const quoteCopy = {
  title: "Request a quote",
  intro: "We usually respond within one working day.", // from the approved preview — TODO(client): confirm response time
  customerTypeLegend: "I'm requesting as",
  submit: "Send request",
  submitting: "Sending…",
  privacyNote: "We use these details only to respond to your request.",
  privacyLink: { label: "Privacy policy", href: "/privacy" },
  errors: {
    rateLimited: `We've received several requests from your connection in the last few minutes. Please wait a little, or call or WhatsApp us on ${company.phone}.`,
    unavailable: `We couldn't send your request just now. Please try again, or call or WhatsApp us on ${company.phone} — your details are still here.`,
    network:
      "We couldn't reach our server. Check your connection and try again — your details are still here.",
  },
} as const;
