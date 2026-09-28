import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { pages } from "@/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-site max-w-2xl">
        <p className="font-display text-sm font-semibold tracking-[0.18em] text-action uppercase">404</p>
        <h1 className="mt-2 text-[clamp(34px,5vw,52px)] font-extrabold">{pages.notFound.title}</h1>
        <p className="mt-4 text-lg">{pages.notFound.body}</p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Button href="/">Home</Button>
          <Button href="/services" variant="outline">
            Services
          </Button>
          <Button href="/contact" variant="outline">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
