import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { ServiceTypeValue } from "@/content";
import { cn } from "@/lib/utils";

export const QUOTE_HREF = "/contact#quote";

type QuoteButtonProps = {
  /** Pre-selects this service in the dialog. */
  service?: ServiceTypeValue;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "sm";
  arrow?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Every "Get a Quote" is this link. Without JS it goes to /contact#quote; with JS,
 * QuoteDialog intercepts clicks on [data-quote] and opens the shared dialog.
 * A plain <a> (not next/link) so the dialog can cancel navigation reliably.
 */
export function QuoteButton({
  service,
  variant = "primary",
  size = "default",
  arrow = true,
  className,
  children = "Get a Quote",
}: QuoteButtonProps) {
  return (
    <a
      href={QUOTE_HREF}
      data-quote={service ?? ""}
      aria-haspopup="dialog"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
      {arrow && <ArrowRight aria-hidden="true" />}
    </a>
  );
}
