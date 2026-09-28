import Image from "next/image";
import { company } from "@/content";
import { cn } from "@/lib/utils";

/*
 * TODO(client): replace with the new "RCS Logistic — Right Cargo, Right Stop" logo as SVG.
 * Until then the current official logo (public/brand/rcs-logo.png, 1079×357) is used,
 * unaltered. Its alt text matches the words in the image.
 */
const LOGO = { src: "/brand/rcs-logo.png", width: 1079, height: 357 } as const;

export function Logo({
  height = 44,
  eager = false,
  className,
}: {
  height?: number;
  eager?: boolean;
  className?: string;
}) {
  const width = Math.round((LOGO.width / LOGO.height) * height);
  return (
    <Image
      src={LOGO.src}
      alt={company.name}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      className={cn("h-auto max-w-none", className)}
      style={{ width, height }}
    />
  );
}
