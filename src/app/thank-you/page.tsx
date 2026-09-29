import { Button } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { StatusPanel } from "@/components/ui/status-panel";
import { company, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank you",
  description: "Your quote request has been received by RCS Logistic Solutions.",
  path: "/thank-you",
  noIndex: true,
});

/** Shown after a quote submit (docs/03-pages.md). noindex. */
export default function ThankYouPage() {
  const copy = pages.thankYou;
  return (
    <StatusPanel label={copy.label} heading={copy.heading}>
      <p className="mt-6 max-w-[520px] text-[17px]">{copy.body}</p>
      <h2 className="mt-10 font-body text-xs font-semibold tracking-[0.2em] text-white uppercase">
        {copy.nextHeading}
      </h2>
      <ol className="mt-4 grid gap-3 border-t border-white/12 pt-4">
        {copy.next.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span aria-hidden="true" className="font-serif text-xl leading-tight text-orange-light italic">
              {String(index + 1).padStart(2, "0")}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-10 mb-4">{copy.urgent}</p>
      <div className="flex flex-wrap gap-3">
        <Button href={company.phoneHref} icon={<PhoneIcon />}>
          {company.phone}
        </Button>
        <Button variant="light" href="/">
          Back to home
        </Button>
      </div>
    </StatusPanel>
  );
}
