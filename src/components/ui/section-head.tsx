import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Heading } from "@/content/home";
import { cn } from "@/lib/utils";
import { AccentHeading } from "./accent-heading";
import { Label } from "./label";

/** Underlined text link with an arrow ("All services", "Our story"). */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 border-b border-ink pb-1 font-semibold text-ink transition-colors hover:border-orange-deep hover:text-orange-deep",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
    </Link>
  );
}

/**
 * docs/02-design-system.md → SectionHead: label + H2 on the left, "View all" link
 * on the right (hidden on mobile).
 */
export function SectionHead({
  label,
  heading,
  link,
  id,
  tone = "light",
  className,
}: {
  label: string;
  heading: Heading;
  link?: { label: string; href: string };
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn("mb-[clamp(28px,4vw,48px)] flex items-end justify-between gap-6", className)}
    >
      <div>
        <Label tone={tone}>{label}</Label>
        <AccentHeading
          id={id}
          heading={heading}
          tone={tone}
          className="mt-[18px] text-[clamp(32px,4.2vw,56px)]"
        />
      </div>
      {link && (
        <TextLink href={link.href} className="max-nav:hidden">
          {link.label}
        </TextLink>
      )}
    </div>
  );
}
