import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { QuoteButton } from "@/components/quote/quote-button";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { Todo } from "@/components/ui/todo";
import {
  company,
  footerCompanyLinks,
  footerCopy,
  isFilled,
  locality,
  mailtoHref,
  services,
  siteCredit,
} from "@/content";
import { LogoImage } from "./logo";

const socialLabels = { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" } as const;

function Column({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <nav aria-label={label}>
      <h2 className="mt-1.5 mb-5 font-body text-xs font-semibold tracking-[0.2em] text-white uppercase">
        {title}
      </h2>
      {children}
    </nav>
  );
}

/**
 * docs/02-design-system.md → Footer (preview structure): desktop 4 columns; tablet
 * brand row on top + 3 columns; mobile brand, Company + Services side by side,
 * contact full width. Bottom bar: © · Privacy · Cookie settings | OrangeKite credit.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(company.social).filter(([, url]) => isFilled(url)) as [
    keyof typeof socialLabels,
    string,
  ][];

  return (
    <footer className="bg-footer text-[14.5px] text-white/62 max-nav:pb-20">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 pt-[52px] pb-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 desk:grid-cols-[1.5fr_1fr_1fr_1.3fr] desk:gap-12 desk:pt-[72px] desk:pb-14">
          <div className="col-span-full border-b border-white/10 pb-7 sm:grid sm:grid-cols-[auto_1fr] sm:items-center sm:gap-x-10 sm:gap-y-1 sm:pb-9 desk:col-span-1 desk:block desk:border-0 desk:pb-0">
            <Link href="/" aria-label={`${company.name} home`} className="mb-[18px] inline-block sm:row-span-2 sm:mb-0 desk:mb-[22px]">
              <LogoImage on="dark" height={52} className="max-sm:h-[46px]! max-sm:w-auto!" />
            </Link>
            <p className="mb-3 font-serif text-[21px] leading-[1.3] text-white italic sm:text-2xl">
              {footerCopy.tagline}
            </p>
            <p className="max-w-[300px] leading-[1.6] sm:max-w-none desk:max-w-[300px]">{footerCopy.about}</p>
          </div>

          <Column title="Company" label="Company">
            <ul className="grid gap-3">
              {footerCompanyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Services" label="Services">
            <ul className="grid gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="transition-colors hover:text-white">
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <div className="col-span-full sm:col-span-1">
            <h2 className="mt-1.5 mb-5 font-body text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Get in touch
            </h2>
            <ul className="grid gap-3 [&_svg]:size-[17px] [&_svg]:shrink-0 [&_svg]:text-orange-light">
              <li>
                <a href={company.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <PhoneIcon strokeWidth={1.8} />
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={mailtoHref} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <MailIcon />
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PinIcon strokeWidth={1.8} />
                {locality}
              </li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-4 flex gap-4" aria-label="Social media">
                {socials.map(([network, url]) => (
                  <li key={network}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {socialLabels[network]}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <QuoteButton size="sm" className="mt-6 max-sm:w-full max-sm:justify-between" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-1.5 border-t border-white/10 py-[22px] text-[13px] text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3">
          <p>
            © {year} {company.name}. All rights reserved. ·{" "}
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>{" "}
            · <CookieSettingsButton />
            <Todo value={company.gstin} tone="dark" className="ml-2">
              {" "}
              · GSTIN {company.gstin}
            </Todo>
          </p>
          <p>
            {siteCredit.prefix}{" "}
            <a
              href={siteCredit.href}
              target="_blank"
              rel="noopener"
              className="border-b border-transparent font-semibold text-orange-light transition-colors hover:border-current hover:text-white"
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
