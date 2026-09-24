import Link from "next/link";
import { Button } from "@/components/ui/button";
import { talkToTeamHref, whatsappUrl } from "@/lib/site-config";

/*
 * Phase 1 placeholder: layout shell only. Homepage sections are built in
 * Phase 2 once the design plan (docs/homepage-design-plan.md) is approved.
 */
export default function Home() {
  return (
    <section className="section-y">
      <div className="container-site">
        <h1 className="font-display max-w-3xl text-[2.5rem] sm:text-6xl lg:text-7xl">
          Reliable logistics for a stronger tomorrow
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl">
          RCS Logistic Solutions helps businesses move goods with dependable, efficient logistics support — from full
          truck loads to warehousing.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/get-a-quote">Get a quote</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            {whatsappUrl ? (
              <a href={talkToTeamHref} target="_blank" rel="noopener noreferrer">
                Talk to our team<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            ) : (
              <Link href={talkToTeamHref}>Talk to our team</Link>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
