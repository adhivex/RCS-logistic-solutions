import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Heading } from "@/content";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  heading: Heading;
  description?: string;
  link?: { label: string; href: string };
  tone?: "light" | "dark";
  /** H2 by default; pages whose hero already has the H1 keep this. */
  as?: "h1" | "h2";
  className?: string;
};

/**
 * docs/02-design-system.md → SectionHeading: eyebrow + H2 on the left (last phrase
 * in orange), optional description + link on the right; stacks on mobile.
 */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  description,
  link,
  tone = "light",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("mb-9 flex flex-wrap items-end justify-between gap-x-10 gap-y-4", className)}>
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Tag id={id} className={cn("text-[1.75rem] font-bold md:text-[2.5rem]", dark && "text-white")}>
          {heading.lead} <span className="text-brand-orange">{heading.highlight}</span>
        </Tag>
      </div>
      {(description || link) && (
        <div className={cn("max-w-[380px] text-sm", dark && "text-white/80")}>
          {description && <p>{description}</p>}
          {link && (
            <Link
              href={link.href}
              className={cn(
                "mt-2 inline-flex min-h-11 items-center gap-1.5 font-semibold underline-offset-4 hover:underline",
                dark ? "text-brand-orange" : "text-action",
              )}
            >
              {link.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
