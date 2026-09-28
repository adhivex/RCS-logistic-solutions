import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * docs/02-design-system.md → Button: primary (solid orange), outline (orange border),
 * ghost (white border, on dark). rounded-md px-6 py-3, optional trailing arrow.
 * Renders a link when given `href`.
 *
 * Orange uses the accessible `action` shade for button fills and text (white on
 * #B94A15 is 5.18:1); the brighter brand orange is kept for the outline border.
 */
export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-button border-[1.5px] px-6 py-3 font-body text-[0.9375rem] font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[18px] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-action text-white hover:bg-action-hover",
        outline:
          "border-brand-orange bg-transparent text-action hover:border-action hover:bg-action hover:text-white",
        ghost: "border-white/85 bg-black/15 text-white hover:bg-white hover:text-brand-ink",
      },
      size: {
        default: "",
        sm: "min-h-10 px-4 py-2 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type Common = VariantProps<typeof buttonVariants> & {
  /** Show a trailing ArrowRight. */
  arrow?: boolean;
  /** Optional leading icon. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = AsLink | AsButton;

export function Button(props: ButtonProps) {
  const { variant, size, arrow, icon, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const content = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight aria-hidden="true" />}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as Omit<AsLink, keyof Common>;
    if (/^(https?:|tel:|mailto:)/.test(href)) {
      return (
        <a href={href} className={classes} {...(linkProps as ComponentProps<"a">)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<AsButton, keyof Common>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
