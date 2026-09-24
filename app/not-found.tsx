import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-site max-w-3xl">
        <p className="font-semibold text-muted-foreground">404</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl">This page isn&apos;t on our route</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page may have moved, or the link may be mistyped. These pages might help:
        </p>
        <ul className="mt-6 grid gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={service.href} className="font-semibold text-action-orange underline underline-offset-4">
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Go to homepage</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/get-a-quote">Get a quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
