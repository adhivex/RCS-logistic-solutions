import type { ReactNode } from "react";
import type { Heading } from "@/content/home";
import { AccentHeading } from "./accent-heading";
import { Label } from "./label";

/**
 * Navy full-height panel for short pages (thank you, 404, error), in the CTA
 * section's style, so the transparent header still reads over it.
 */
export function StatusPanel({
  label,
  heading,
  children,
}: {
  label: string;
  heading: Heading;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="status-heading"
      className="grain relative isolate flex min-h-[80svh] items-center overflow-hidden bg-[linear-gradient(180deg,var(--color-ink)_0%,var(--color-steel)_140%)] text-white/72"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[-10%] bottom-[-60%] -z-10 h-[120%] bg-[radial-gradient(ellipse_at_50%_100%,rgb(234_90_36/0.3),rgb(234_90_36/0)_60%)]"
      />
      <div className="container-site pt-[132px] pb-20 nav:pt-[150px]">
        <div className="max-w-[720px]">
          <Label tone="dark">{label}</Label>
          <AccentHeading
            as="h1"
            id="status-heading"
            heading={heading}
            tone="dark"
            className="mt-6 text-[clamp(40px,6vw,84px)] leading-[0.98] tracking-[-0.045em]"
          />
          {children}
        </div>
      </div>
    </section>
  );
}
