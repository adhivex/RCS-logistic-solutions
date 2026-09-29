import type { Heading } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Headline pattern (docs/02-design-system.md → Typography): Manrope, with the last
 * phrase in italic Instrument Serif, orange. On navy the accent uses orange-light
 * (5.3:1); on light backgrounds orange is only used at ≥ 32px (3:1 large text).
 */
export function AccentHeading({
  heading,
  as: Tag = "h2",
  tone = "light",
  id,
  className,
}: {
  heading: Heading;
  as?: "h1" | "h2" | "h3";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  return (
    <Tag id={id} className={cn(tone === "dark" && "text-white", className)}>
      {heading.lead}{" "}
      <em className={cn("accent pr-[0.05em]", tone === "dark" ? "text-orange-light" : "text-orange")}>
        {heading.accent}
      </em>
    </Tag>
  );
}
