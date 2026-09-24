"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-y">
      <div className="container-site max-w-2xl">
        <h1 className="font-display text-4xl sm:text-5xl">Something went wrong</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This page couldn&apos;t load. Try again, or go back to the homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => retry()}>
            Try again
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
