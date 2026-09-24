import { services } from "@/content/services";
import type { ServiceTypeValue, VehicleTypeValue } from "@/lib/validations";

/** Service options: exact service display names + "Other / not sure". */
export const serviceOptions: { value: ServiceTypeValue; label: string }[] = [
  ...services.map((service) => ({ value: service.type, label: `${service.name} (${service.shortLabel})` })),
  { value: "OTHER", label: "Other / not sure" },
];

/** Plain-language vehicle labels. */
export const vehicleOptions: { value: VehicleTypeValue; label: string }[] = [
  { value: "NOT_SURE", label: "Not sure" },
  { value: "SMALL_COMMERCIAL", label: "Small commercial vehicle (e.g. pickup)" },
  { value: "LCV", label: "Light truck (LCV)" },
  { value: "ICV", label: "Medium truck (ICV)" },
  { value: "HCV", label: "Heavy truck (HCV)" },
  { value: "TRAILER", label: "Trailer" },
  { value: "CONTAINER", label: "Container truck" },
];

export const formCopy = {
  usageNote: "We use these details only to respond to your enquiry.",
  consentBefore: "I agree to RCS Logistic Solutions contacting me about this enquiry, as described in the ",
  consentLinkText: "Privacy Policy",
  consentAfter: ".",
  networkError: "We couldn't send your request. Check your connection and try again — your details are still here.",
  genericError: "Something went wrong on our side and your request wasn't sent. Please try again — your details are still here.",
  spamCheckError: "We couldn't confirm the security check. Complete it again, then resubmit.",
  spamCheckMissing: "Complete the security check above the button, then submit again.",
  rateLimitError:
    "We've received several requests from your connection in the last hour. Please wait a while and try again, or use Talk to our team.",
  quote: {
    submit: "Request quote",
    submitting: "Sending request…",
    successHeading: "Quote request received",
    successBody: "Our team will contact you on the phone number or email you provided.",
  },
  contact: {
    submit: "Send message",
    submitting: "Sending message…",
    successHeading: "Message received",
    successBody: "Our team will reply on the email or phone number you provided.",
  },
} as const;
