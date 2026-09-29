"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPanel } from "@/components/ui/status-panel";
import { company } from "@/content/company";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPanel label="Error" heading={{ lead: "Something went", accent: "wrong." }}>
      <p className="mt-6 max-w-[520px] text-[17px]">
        This page couldn&apos;t load. Try again, or call us on {company.phone}.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => retry()} icon={<RotateCcw />} rotate={false}>
          Try again
        </Button>
        <Button href="/" variant="light">
          Home
        </Button>
      </div>
    </StatusPanel>
  );
}
