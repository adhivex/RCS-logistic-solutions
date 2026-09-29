import Image from "next/image";
import type { ReactNode } from "react";
import { mediaSrc, type MediaItem } from "@/content/media";
import { cn } from "@/lib/utils";

const isDev = process.env.NODE_ENV !== "production";

type PhotoProps = {
  item: MediaItem;
  /** Rendered width, for srcset selection. */
  sizes: string;
  className?: string;
  /** Hero / LCP image only (Next 16: `preload` replaces `priority`). */
  preload?: boolean;
  /** Rendered when the image must not appear (no src, or dev-only in production). */
  fallback?: ReactNode;
};

/**
 * Fills its (relatively positioned) parent. Kit placeholder photos carry a small
 * "Placeholder photo" tag in development so they aren't mistaken for final images.
 */
export function Photo({ item, sizes, className, preload = false, fallback = null }: PhotoProps) {
  const src = mediaSrc(item);
  if (!src) return <>{fallback}</>;
  return (
    <>
      <Image
        src={src}
        alt={item.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", className)}
      />
      {isDev && item.placeholder && <PlaceholderTag brief={item.brief} />}
    </>
  );
}

function PlaceholderTag({ brief }: { brief: string }) {
  return (
    <span
      title={brief}
      className="absolute right-2 bottom-2 z-10 rounded-full border border-dashed border-white/70 bg-ink/70 px-2 py-0.5 font-body text-[10px] font-medium tracking-normal text-white normal-case"
    >
      Placeholder photo
    </span>
  );
}
