import Image from "next/image";
import { company, media, mediaSrc } from "@/content";
import { cn } from "@/lib/utils";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Round founder headshot with the orange ring (FounderStrip). The kit's headshot is
 * concept art, so it renders only in development; production shows Satya's
 * initials until a real photo arrives (docs/12-decisions.md → D-17).
 */
export function FounderFace({ className, sizes }: { className?: string; sizes: string }) {
  const item = media.founderHeadshot;
  const src = mediaSrc(item);
  const ring = "shadow-[0_0_0_3px_var(--color-white),0_0_0_4px_var(--color-orange)]";
  if (!src) {
    return (
      <span
        role="img"
        aria-label={company.founder}
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-ink font-serif text-2xl text-white italic",
          ring,
          className,
        )}
      >
        {company.founderInitials}
      </span>
    );
  }
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full", ring, className)}>
      <Image src={src} alt={item.alt} fill sizes={sizes} className="object-cover" />
      {isDev && item.placeholder && (
        <span
          title={item.brief}
          className="absolute inset-x-0 bottom-0 bg-ink/75 py-px text-center font-body text-[8px] font-semibold tracking-wide text-white uppercase"
        >
          Placeholder
        </span>
      )}
    </span>
  );
}
