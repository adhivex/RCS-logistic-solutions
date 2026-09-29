import { Clock, MessageCircle } from "lucide-react";
import { QuoteForm } from "@/components/quote/quote-form";
import { AccentHeading } from "@/components/ui/accent-heading";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/ui/page-hero";
import { company, formatAddress, mailtoHref, pages, quoteCopy, whatsappHref } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: pages.contact.title,
  description: pages.contact.description,
  path: "/contact",
});

const mapQuery = encodeURIComponent(`${company.name}, ${formatAddress()}`);

/** docs/03-pages.md → /contact: details + map left, full quote form (#quote) right. No CTA section. */
export default function ContactPage() {
  const rows = [
    { icon: <PhoneIcon />, label: "Phone", value: company.phone, href: company.phoneHref },
    {
      icon: <MessageCircle strokeWidth={1.7} />,
      label: "WhatsApp",
      value: company.phone,
      href: whatsappHref,
      external: true,
    },
    { icon: <MailIcon />, label: "Email", value: company.email, href: mailtoHref },
    { icon: <PinIcon />, label: "Address", value: formatAddress() },
    { icon: <Clock strokeWidth={1.7} />, label: "Hours", value: company.hours },
  ];

  return (
    <>
      <PageHero
        path="/contact"
        {...pages.contact.hero}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-paper section-y">
        <div className="container-site grid gap-14 wide:grid-cols-[1fr_1.15fr] wide:gap-16">
          <div>
            <Label>{pages.contact.detailsLabel}</Label>
            <AccentHeading
              heading={pages.contact.detailsHeading}
              className="mt-[18px] text-[clamp(32px,4.2vw,56px)]"
            />
            <dl className="mt-8 grid border-t border-line">
              {rows.map(({ icon, label, value, href, external }) => (
                // dt/dd are direct children of each row; the icon sits inside the dt.
                <div key={label} className="grid grid-cols-[44px_1fr] gap-x-4 border-b border-line py-4">
                  <dt className="contents">
                    <span className="row-span-2 grid size-11 place-items-center rounded-xl bg-orange-soft text-orange [&_svg]:size-5">
                      {icon}
                    </span>
                    <span className="self-end text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                      {label}
                    </span>
                  </dt>
                  <dd className="m-0 text-[17px] text-ink">
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="font-medium underline-offset-4 hover:text-orange-deep hover:underline"
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
            <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-white">
              <iframe
                title={`Map showing ${company.name}, ${formatAddress()}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0"
              />
            </div>
          </div>

          <div id="quote" className="scroll-mt-28 self-start rounded-2xl bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-[32px] tracking-[-0.04em]">{quoteCopy.title}</h2>
            <p className="mt-1.5 mb-6 text-sm">{quoteCopy.intro}</p>
            <QuoteForm idPrefix="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
