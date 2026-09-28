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
} as const;
