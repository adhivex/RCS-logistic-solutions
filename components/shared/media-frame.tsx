import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { MediaItem } from "@/content/media";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  item: MediaItem;
  /** Tailwind aspect-ratio classes, e.g. "aspect-[4/5]". */
  className?: string;
  sizes: string;
  /** For the hero LCP image only. */
  preload?: boolean;
};

/**
 * Renders a photo, or — until one is supplied — a neutral placeholder frame.
 * The placeholder is decorative (no alt) and shows the photo brief in development only.
 */
export function MediaFrame({ item, className, sizes, preload = false }: MediaFrameProps) {
  if (item.src) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-end overflow-hidden border border-border bg-surface",
        "bg-[repeating-linear-gradient(135deg,transparent_0_22px,rgb(15_32_38/0.035)_22px_23px)]",
        className,
      )}
    >
      {process.env.NODE_ENV !== "production" && (
        <span className="m-4 inline-flex items-center gap-2 rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <ImageIcon className="size-3.5" />
          Photo: {item.brief}
        </span>
      )}
    </div>
  );
}
