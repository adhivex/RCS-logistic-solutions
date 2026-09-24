import { SectionHeading } from "@/components/shared/section-heading";
import { processIntro } from "@/content/home";
import { processSteps } from "@/content/process";
import { RouteLine } from "./route-line";

/** The one place numbered steps are appropriate — it is a real sequence. */
export function HowItWorks() {
  return (
    <section aria-labelledby="process-heading" className="section-y bg-navy text-white">
      <div className="container-site">
        <SectionHeading id="process-heading" heading={processIntro.heading} body={processIntro.body} tone="dark" />

        <div className="relative mt-12 lg:mt-20">
          <RouteLine />
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title} className="relative pl-12 lg:pt-14 lg:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 size-6 rounded-full border-2 border-brand-orange bg-navy"
                />
                <span className="font-display block text-4xl text-brand-orange lg:text-5xl" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-wide mt-3 text-lg font-bold text-white lg:text-xl">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-64 text-muted-on-dark">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
