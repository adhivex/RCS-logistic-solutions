import type { ReactNode } from "react";
import { isTodo } from "@/content/todo";
import { cn } from "@/lib/utils";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Renders `children` for confirmed content. For `TODO(client)` values it shows a
 * dashed placeholder in development and nothing in production (docs/04-content.md).
 */
export function Todo({
  value,
  children,
  className,
  tone = "light",
}: {
  value: string;
  children?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (!isTodo(value)) return <>{children ?? value}</>;
  if (!isDev) return null;
  return (
    <span
      className={cn(
        "inline-block rounded-sm border border-dashed px-1.5 py-0.5 font-body text-xs leading-snug font-medium tracking-normal normal-case",
        tone === "dark" ? "border-white/50 text-white/80" : "border-orange-deep text-orange-deep",
        className,
      )}
    >
      [{value.replace(/^TODO\(client\):?\s*/, "TODO: ")}]
    </span>
  );
}
