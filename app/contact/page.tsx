import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/shared/page-header";
import { pageMetadata } from "@/lib/seo";
import { getContactRows, whatsappUrl } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact RCS Logistic Solutions, an Odisha-based B2B logistics company.",
  path: "/contact",
});

export default function ContactPage() {
  const rows = getContactRows();

  return (
    <>
      <PageHeader
        title="Contact"
        intro="Send us a message and our team will get back to you. For a shipment quote, the quote form collects everything we need."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="section-y pt-12! lg:pt-16!">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-wide mb-8 text-2xl font-bold">Send a message</h2>
            <ContactForm />
          </div>

          <aside aria-labelledby="contact-details-heading" className="lg:col-span-5">
            <div className="rounded-lg bg-surface p-6 sm:p-8">
              <h2 id="contact-details-heading" className="font-wide text-xl font-bold">
                Contact details
              </h2>
              {rows.length > 0 && (
                <dl className="mt-6 grid gap-5">
                  {rows.map((row) => (
                    <div key={row.label}>
                      <dt className="text-sm text-muted-foreground">{row.label}</dt>
                      <dd className="mt-0.5 font-medium text-navy">
                        {row.href ? (
                          <a href={row.href} className="underline-offset-4 hover:underline">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <ul className="mt-6 grid gap-2 border-t border-border pt-6">
                {whatsappUrl && (
                  <li>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-action-orange underline underline-offset-4"
                    >
                      Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
                <li>
                  <Link href="/get-a-quote" className="font-semibold text-action-orange underline underline-offset-4">
                    Request a shipment quote
                  </Link>
                </li>
              </ul>
            </div>
            {/* Map: add once the head office address is confirmed (docs/open-questions.md). */}
          </aside>
        </div>
      </section>
    </>
  );
}
