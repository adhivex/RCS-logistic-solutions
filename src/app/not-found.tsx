import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { StatusPanel } from "@/components/ui/status-panel";
import { pages } from "@/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <StatusPanel label={pages.notFound.label} heading={pages.notFound.heading}>
      <p className="mt-6 max-w-[520px] text-[17px]">{pages.notFound.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Home</Button>
        <Button href="/services" variant="light">
          Services
        </Button>
        <Button href="/contact" variant="light">
          Contact
        </Button>
      </div>
    </StatusPanel>
  );
}
