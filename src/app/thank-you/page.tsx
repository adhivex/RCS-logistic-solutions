import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank you",
  description: "Your quote request has been received by RCS Logistic.",
  path: "/thank-you",
  noIndex: true,
});

/** Shown after a quote submit (docs/03-pages.md). noindex. */
export default function ThankYouPage() {
  const copy = pages.thankYou;
  return (
    <section className="section-y">
      <div className="container-site max-w-2xl">
        <span aria-hidden="true" className="mb-6 block h-[3px] w-10 bg-brand-orange" />
        <h1 className="text-[clamp(34px,5vw,52px)] font-extrabold">{copy.title}</h1>
        <p className="mt-4 text-lg">{copy.body}</p>
        <h2 className="mt-10 text-xl font-semibold">{copy.nextHeading}</h2>
        <ol className="mt-4 grid gap-3">
          {copy.next.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="font-display font-bold text-action">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-10">{copy.urgent}</p>
        <div className="mt-4 flex flex-wrap gap-3.5">
          <Button href={company.phoneHref} icon={<Phone aria-hidden="true" />}>
            {company.phone}
          </Button>
          <Button variant="outline" href="/">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
