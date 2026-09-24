import Link from "next/link";
import { footerCompanyLinks, footerDescription, legalLinks } from "@/content/navigation";
import { services } from "@/content/services";
import { isConfirmed, shouldDisplay, siteConfig, whatsappUrl } from "@/lib/site-config";
import { MarkLockup } from "./logo";

const socialLabels = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
} as const;

const linkClass =
  "inline-flex min-h-8 items-center text-muted-on-dark transition-colors hover:text-white";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-wide text-sm font-bold tracking-wide text-white">{children}</h2>;
}

export function Footer() {
  const { contact, social } = siteConfig;
  const year = new Date().getFullYear();
  const socialEntries = Object.entries(social).filter(([, url]) => shouldDisplay(url)) as [
    keyof typeof socialLabels,
    string,
  ][];

  const contactRows = [
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Address", value: contact.address },
    { label: "Hours", value: contact.hours },
  ].filter((row) => shouldDisplay(row.value));

  return (
    <footer className="bg-navy text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="max-w-xs">
          <Link href="/" className="inline-flex rounded-sm" aria-label={`${siteConfig.name} — home`}>
            <MarkLockup />
          </Link>
          <p className="mt-5 text-muted-on-dark">{footerDescription}</p>
        </div>

        <nav aria-labelledby="footer-company">
          <FooterHeading>
            <span id="footer-company">Company</span>
          </FooterHeading>
          <ul className="mt-4 grid gap-1">
            {footerCompanyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <FooterHeading>
            <span id="footer-services">Services</span>
          </FooterHeading>
          <ul className="mt-4 grid gap-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={service.href} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact</FooterHeading>
          <dl className="mt-4 grid gap-3">
            {contactRows.map((row) => (
              <div key={row.label}>
                <dt className="text-sm text-muted-on-dark">{row.label}</dt>
                <dd className="text-white">
                  {row.href && isConfirmed(row.value) ? (
                    <a href={row.href} className="transition-colors hover:text-brand-orange">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-4 grid gap-1">
            {whatsappUrl && (
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            <li>
              <Link href="/contact" className="inline-flex min-h-8 items-center font-semibold text-brand-orange hover:underline underline-offset-4">
                Contact page
              </Link>
            </li>
          </ul>

          {socialEntries.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4" aria-label="Social media">
              {socialEntries.map(([network, url]) => (
                <li key={network}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {socialLabels[network]}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year}
            {shouldDisplay(siteConfig.legalName) ? ` ${siteConfig.legalName}` : ` ${siteConfig.name}`}. All rights
            reserved.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
