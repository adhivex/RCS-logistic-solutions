export type NavItem = { label: string; href: string };

/** Header navigation, in mockup order. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

export const footerCompanyLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Our Fleet", href: "/fleet" },
  { label: "Industries", href: "/industries" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export const footerDescription =
  "B2B road transport and logistics from Odisha, keeping businesses across India moving.";

/** Website credit shown in the footer's bottom bar. */
export const siteCredit = {
  prefix: "Designed & Developed by",
  name: "OrangeKite",
  href: "https://orangekite.in/",
} as const;
