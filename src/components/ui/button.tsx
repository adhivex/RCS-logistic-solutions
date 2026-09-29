import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * docs/02-design-system.md → Button: a pill with the label and a circular icon
 * (ArrowUpRight) that rotates -45° on hover. Variants: primary (orange-deep),
 * light (white, for dark backgrounds), dark (navy). Size sm for header/footer.
 */
export const buttonVariants = cva(
  "group/btn inline-flex cursor-pointer items-center gap-3.5 rounded-full border border-transparent font-body leading-none font-semibold whitespace-nowrap transition-colors duration-350 ease-brand disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-orange-deep text-white hover:bg-orange-dark",
        light: "border-white bg-white text-ink backdrop-blur-sm hover:bg-paper",
        dark: "bg-ink text-white hover:bg-ink-2",
      },
      size: {
        default: "py-2 pr-2 pl-[26px] text-[15px]",
        sm: "py-1.5 pr-1.5 pl-5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

const iconVariants = cva(
  "grid shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-350 ease-brand [&_svg]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-white text-orange-deep",
        light: "bg-paper text-ink group-hover/btn:bg-ink group-hover/btn:text-white",
        dark: "bg-orange-deep text-white",
      },
      size: { default: "size-[38px]", sm: "size-8" },
      rotate: { true: "group-hover/btn:-rotate-45", false: "" },
    },
    defaultVariants: { variant: "primary", size: "default", rotate: true },
  },
);

export type ButtonStyle = VariantProps<typeof buttonVariants>;

/** The label + icon circle, shared by Button, QuoteButton and form submit buttons. */
export function ButtonContent({
  children,
  icon,
  variant,
  size,
  rotate = true,
}: ButtonStyle & { children: ReactNode; icon?: ReactNode; rotate?: boolean }) {
  return (
    <>
      {children}
      <span aria-hidden="true" className={iconVariants({ variant, size, rotate })}>
        {icon ?? <ArrowUpRight strokeWidth={2.2} />}
      </span>
    </>
  );
}

type Common = ButtonStyle & {
  /** Replaces the default ArrowUpRight in the circle. */
  icon?: ReactNode;
  /** Rotate the icon on hover (off for icons like ✕). */
  rotate?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = AsLink | AsButton;

export function Button(props: ButtonProps) {
  const { variant, size, icon, rotate, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const content = (
    <ButtonContent variant={variant} size={size} icon={icon} rotate={rotate}>
      {children}
    </ButtonContent>
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
