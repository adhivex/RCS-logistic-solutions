import Link from "next/link";
import { Todo } from "@/components/ui/todo";
import {
  company,
  footerCompanyLinks,
  footerDescription,
  formatAddress,
  isFilled,
  mailtoHref,
  services,
  siteCredit,
  whatsappHref,
} from "@/content";
import { Logo } from "./logo";

const linkClass = "transition-colors hover:text-brand-orange";

const socialLabels = { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" } as const;

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-[0.9375rem] font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

/** docs/02-design-system.md → Footer: ink background, logo on a white tile, 4 columns, bottom bar. */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(company.social).filter(([, url]) => isFilled(url)) as [
    keyof typeof socialLabels,
    string,
  ][];

  return (
    <footer className="bg-brand-ink text-sm text-white/75">
      <div className="container-site grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:pb-11">
        <div>
          <Link
            href="/"
            className="mb-4 inline-block rounded-button bg-white px-3 py-2"
            aria-label="RCS Logistic — home"
          >
            <Logo height={34} />
          </Link>
          <p className="max-w-[300px]">{footerDescription}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-4" aria-label="Social media">
              {socials.map(([network, url]) => (
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

        <Column title="Company">
          <ul className="grid gap-2.5">
            {footerCompanyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Services">
          <ul className="grid gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Contact">
          <ul className="grid gap-2.5">
            <li>
              <a href={company.phoneHref} className={linkClass}>
                {company.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={mailtoHref} className={linkClass}>
                {company.email}
              </a>
            </li>
            <li>
              <address className="not-italic">{formatAddress()}</address>
            </li>
            <li>{company.hours}</li>
          </ul>
        </Column>
      </div>

      <div className="border-t border-white/12">
        <div className="container-site flex flex-col gap-3 pt-5 pb-40 nav:pb-5 text-[0.8125rem] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
            <Todo value={company.gstin} tone="dark">
              {" "}
              GSTIN {company.gstin}
            </Todo>
          </p>
          <p>
            {siteCredit.prefix}{" "}
            <a
              href={siteCredit.href}
              target="_blank"
              rel="noopener"
              className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-brand-orange"
            >
              {siteCredit.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
