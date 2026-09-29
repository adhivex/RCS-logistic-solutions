import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * docs/02-design-system.md → Label: a thin 36px line, then uppercase text.
 * `centered` adds a second line after the text (CTA section).
 */
export function Label({
  children,
  tone = "light",
  centered = false,
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  centered?: boolean;
  className?: string;
}) {
  const bar = <span aria-hidden="true" className="h-px w-9 shrink-0 bg-current opacity-35" />;
  return (
    <p
      className={cn(
        "flex items-center gap-3.5 text-xs font-semibold tracking-[0.22em] uppercase max-sm:text-[11px] max-sm:tracking-[0.18em]",
        tone === "dark" ? "text-white/80" : "text-ink",
        centered && "justify-center",
        className,
      )}
    >
      {bar}
      {children}
      {centered && bar}
    </p>
  );
}
