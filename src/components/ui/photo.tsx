import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { MediaItem } from "@/content";
import { cn } from "@/lib/utils";

const isDev = process.env.NODE_ENV !== "production";

type PhotoProps = {
  item: MediaItem;
  /** Required with `fill`; describes rendered width for srcset selection. */
  sizes: string;
  className?: string;
  /** Hero / LCP image only (Next 16: `preload` replaces `priority`). */
  preload?: boolean;
  /** Placeholder style until the real photo arrives. */
  tone?: "light" | "dark";
};

/**
 * Fills its (relatively positioned) parent. Renders the photo when `item.src` is set,
 * otherwise a neutral placeholder; in development the placeholder shows the photo brief.
 */
export function Photo({ item, sizes, className, preload = false, tone = "light" }: PhotoProps) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", className)}
      />
    );
  }

  const dark = tone === "dark";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex",
        dark
          ? "items-start bg-[#26272b] bg-[linear-gradient(135deg,#2c2d31_0%,#1c1d20_55%,#2a1a12_100%)]"
          : "items-end bg-brand-mist bg-[repeating-linear-gradient(135deg,transparent_0_22px,rgb(22_24_29/0.04)_22px_23px)]",
        className,
      )}
    >
      {isDev && (
        <span
          className={cn(
            "m-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-sm px-2 py-1 text-[11px] leading-tight",
            dark ? "bg-black/40 text-white/80" : "bg-white/90 text-brand-slate",
          )}
        >
          <ImageIcon className="size-3.5 shrink-0" />
          {item.brief}
        </span>
      )}
    </div>
  );
}
