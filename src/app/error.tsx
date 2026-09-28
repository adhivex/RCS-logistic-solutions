"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { company } from "@/content/company";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-y">
      <div className="container-site max-w-2xl">
        <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold">Something went wrong</h1>
        <p className="mt-4 text-lg">
          This page couldn&apos;t load. Try again, or call us on {company.phone}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Button onClick={() => retry()}>Try again</Button>
          <Button href="/" variant="outline">
            Home
          </Button>
        </div>
      </div>
    </section>
  );
}
