import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { QuoteForm } from "@/components/quote/quote-form";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { company, formatAddress, mailtoHref, pages, quoteCopy, whatsappHref } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: pages.contact.description,
  path: "/contact",
});

const mapQuery = encodeURIComponent(`${company.name}, ${formatAddress()}`);

/** docs/03-pages.md → /contact: details + map left, full quote form (#quote) right. No CtaBand. */
export default function ContactPage() {
  const rows = [
    { icon: Phone, label: "Phone", value: company.phone, href: company.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: company.phone, href: whatsappHref, external: true },
    { icon: Mail, label: "Email", value: company.email, href: mailtoHref },
    { icon: MapPin, label: "Address", value: formatAddress() },
    { icon: Clock, label: "Hours", value: company.hours },
  ];

  return (
    <>
      <PageHero
        path="/contact"
        title={pages.contact.title}
        intro={pages.contact.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-y">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>{pages.contact.detailsHeading}</Eyebrow>
            <h2 className="text-[clamp(26px,3vw,36px)] font-bold">
              Call, WhatsApp or <span className="text-highlight">email us</span>
            </h2>
            <dl className="mt-8 grid gap-5">
              {rows.map(({ icon: Icon, label, value, href, external }) => (
                // dt/dd are direct children of each row; the icon sits inside the dt.
                <div key={label} className="grid grid-cols-[44px_1fr] gap-x-4">
                  <dt className="contents">
                    <span className="row-span-2 inline-flex size-11 items-center justify-center rounded-button bg-brand-mist">
                      <Icon className="size-5 text-action" aria-hidden="true" />
                    </span>
                    <span className="self-end text-xs font-semibold tracking-[0.12em] text-brand-ink uppercase">
                      {label}
                    </span>
                  </dt>
                  <dd className="text-[1.0625rem]">
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="font-medium text-brand-ink underline-offset-4 hover:text-action hover:underline"
                      >
                        {value}
                        {external && <span className="sr-only"> (opens WhatsApp in a new tab)</span>}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 aspect-[4/3] overflow-hidden rounded-card border border-brand-line bg-brand-mist">
              <iframe
                title={`Map showing ${company.name}, ${formatAddress()}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0"
              />
            </div>
          </div>

          <div id="quote" className="scroll-mt-28 rounded-card border border-brand-line p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">{pages.contact.formHeading}</h2>
            <p className="mt-1 mb-6">{quoteCopy.intro}</p>
            <QuoteForm idPrefix="contact" className="relative" />
          </div>
        </div>
      </section>
    </>
  );
}
