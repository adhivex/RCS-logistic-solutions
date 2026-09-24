import { siteConfig } from "@/lib/site-config";

export type NavLink = { label: string; href: string };

/** Primary navigation. Services has its own group built from content/services.ts. */
export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  ...(siteConfig.features.industries ? [{ label: "Industries", href: "/industries" }] : []),
  { label: "Contact", href: "/contact" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  ...(siteConfig.features.industries ? [{ label: "Industries", href: "/industries" }] : []),
  { label: "Get a quote", href: "/get-a-quote" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

export const footerDescription = "B2B logistics and supply-chain partner, based in Odisha.";
