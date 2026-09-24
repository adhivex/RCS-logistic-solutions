import Link from "next/link";
import { TalkToTeamButton } from "@/components/shared/talk-to-team-button";
import { Button } from "@/components/ui/button";
import { quoteCta } from "@/content/home";

/** The page's one centred block. */
export function QuoteCta() {
  return (
    <section aria-labelledby="quote-cta-heading" className="section-y">
      <div className="container-site">
        <div className="mx-auto max-w-4xl rounded-lg bg-surface px-6 py-14 text-center sm:px-12 lg:py-20">
          <span aria-hidden="true" className="mx-auto mb-8 block h-0.5 w-12 bg-brand-orange" />
          <h2 id="quote-cta-heading" className="font-display text-[1.875rem] sm:text-4xl lg:text-[2.75rem]">
            {quoteCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground lg:text-lg">{quoteCta.body}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/get-a-quote">Get a quote</Link>
            </Button>
            <TalkToTeamButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
