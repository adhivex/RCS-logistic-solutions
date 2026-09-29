export type NavItem = { label: string; href: string };

/** Header navigation, in the preview's order. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

/** Footer "Company" column (preview), plus Industries so the page stays reachable. */
export const footerCompanyLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Industries", href: "/industries" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

/** Website credit shown in the footer's bottom bar. */
export const siteCredit = {
  prefix: "Designed & Developed by",
  name: "OrangeKite",
  href: "https://orangekite.in/",
} as const;
