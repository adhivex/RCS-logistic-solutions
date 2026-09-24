"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Replaces the form after a successful submit; focus moves to the heading so it is announced. */
export function SuccessPanel({ heading, body }: { heading: string; body: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="rounded-lg border border-border bg-surface px-6 py-12 text-center sm:px-10">
      <CheckCircle2 className="mx-auto size-12 text-brand-orange" aria-hidden="true" />
      <h2 ref={headingRef} tabIndex={-1} className="font-display mt-6 text-3xl outline-none sm:text-4xl">
        {heading}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">{body}</p>
      <Button asChild variant="secondary" className="mt-8">
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
}
