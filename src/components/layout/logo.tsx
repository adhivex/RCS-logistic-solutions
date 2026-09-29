import Image from "next/image";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

/*
 * Official "RCS Logistic Solutions" logo (docs/reference/brand/), 846×263.
 * `on-dark` = white wordmark (hero, navy, footer); `on-light` = dark wordmark.
 * TODO(client): a true vector logo before launch.
 */
const LOGO = { width: 846, height: 263 } as const;

export const logoSrc = {
  dark: "/brand/logo-on-dark.png",
  light: "/brand/logo-on-light.png",
} as const;

export function logoWidth(height: number) {
  return Math.round((LOGO.width / LOGO.height) * height);
}

export function LogoImage({
  on,
  height,
  decorative = false,
  eager = false,
  className,
}: {
  /** Background the logo sits on. */
  on: "dark" | "light";
  height: number;
  /** The second of a cross-faded pair is hidden from assistive tech. */
  decorative?: boolean;
  eager?: boolean;
  className?: string;
}) {
  const width = logoWidth(height);
  return (
    <Image
      src={logoSrc[on]}
      alt={decorative ? "" : company.name}
      aria-hidden={decorative || undefined}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      sizes={`${width}px`}
      className={cn("max-w-none", className)}
      style={{ width, height }}
    />
  );
}
