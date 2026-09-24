import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/* Intrinsic sizes of the supplied assets — never distort, recolour or redraw them. */
const LOGO = { src: "/brand/rcs-logo.png", width: 1079, height: 357 } as const;
const MARK = { src: "/brand/rcs-mark.png", width: 512, height: 512 } as const;

type LogoProps = {
  /** Rendered height in px; width follows the logo's aspect ratio. */
  height?: number;
  eager?: boolean;
  className?: string;
};

/** Full-colour logo. Light surfaces (white / surface) only. */
export function Logo({ height = 40, eager = false, className }: LogoProps) {
  const width = Math.round((LOGO.width / LOGO.height) * height);
  return (
    <Image
      src={LOGO.src}
      alt={siteConfig.name}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      className={cn("max-w-none", className)}
      style={{ width, height }}
    />
  );
}

/**
 * Dark-surface lockup: the "R" mark plus the brand name set in white text.
 * No reversed logo exists yet — do not create one (see CLAUDE.md → Logo usage).
 */
export function MarkLockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image src={MARK.src} alt="" width={40} height={40} className="size-10" />
      <span className="font-wide text-lg leading-tight font-bold text-white">{siteConfig.name}</span>
    </span>
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 rounded-sm", className)} aria-label={`${siteConfig.name} — home`}>
      <Logo height={40} eager />
    </Link>
  );
}
