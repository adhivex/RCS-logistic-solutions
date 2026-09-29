import type { MouseEventHandler, ReactNode } from "react";
import { ButtonContent, buttonVariants, type ButtonStyle } from "@/components/ui/button";
import type { ServiceTypeValue } from "@/content/quote";
import { cn } from "@/lib/utils";

export const QUOTE_HREF = "/contact#quote";

type QuoteButtonProps = ButtonStyle & {
  /** Pre-selects this service in the dialog. */
  service?: ServiceTypeValue;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Every "Get a Quote" is this link. Without JS it goes to /contact#quote; with JS,
 * QuoteDialog intercepts clicks on [data-quote] and opens the shared dialog.
 * A plain <a> (not next/link) so the dialog can cancel navigation reliably.
 */
export function QuoteButton({
  service,
  variant = "primary",
  size,
  className,
  children = "Get a Quote",
  onClick,
}: QuoteButtonProps) {
  return (
    <a
      href={QUOTE_HREF}
      data-quote={service ?? ""}
      aria-haspopup="dialog"
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <ButtonContent variant={variant} size={size}>
        {children}
      </ButtonContent>
    </a>
  );
}
