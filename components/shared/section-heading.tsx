import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  heading: string;
  body?: string;
  /** "dark" for navy sections. */
  tone?: "light" | "dark";
  className?: string;
};

/** Left-aligned H2 + optional intro. No eyebrow label (design-system.md → Avoid). */
export function SectionHeading({ id, heading, body, tone = "light", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2
        id={id}
        className={cn("font-display text-[1.875rem] sm:text-4xl lg:text-[2.75rem]", tone === "dark" && "text-white")}
      >
        {heading}
      </h2>
      {body && (
        <p
          className={cn(
            "mt-4 text-base lg:text-lg",
            tone === "dark" ? "text-muted-on-dark" : "text-muted-foreground",
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}
