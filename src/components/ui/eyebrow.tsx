import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  /** "dark" for ink/photo backgrounds (white text). */
  tone?: "light" | "dark";
  /** Hero variant: the bar sits after the text. */
  barAfter?: boolean;
  className?: string;
};

/**
 * docs/02-design-system.md → Eyebrow: a 28×3px orange bar plus an uppercase label
 * (Inter 12px, 600, tracking .18em).
 */
export function Eyebrow({ children, tone = "light", barAfter = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "mb-3.5 flex items-center gap-3 font-body text-xs font-semibold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-white" : "text-brand-ink",
        barAfter && "flex-row-reverse justify-end",
        className,
      )}
    >
      <span aria-hidden="true" className="h-[3px] w-7 shrink-0 rounded-sm bg-brand-orange" />
      <span>{children}</span>
    </p>
  );
}
