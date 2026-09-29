/**
 * Photo slots. The kit's photos (docs/reference/images/) are crops of the concept
 * art: low resolution, marked `placeholder`, to be replaced with real RCS photos
 * before launch. `devOnly` images never render in production (docs/12-decisions.md
 * → D-17): the founder headshot is concept art, not a confirmed photo of Satya.
 * To add a real photo: put it in public/images/, set src/width/height, drop the flags.
 */
export type MediaItem = {
  src: string | null;
  width: number;
  height: number;
  alt: string;
  /** Kit placeholder — replace with a real photo before launch. */
  placeholder?: boolean;
  /** Render only in development (production falls back to a monogram/neutral frame). */
  devOnly?: boolean;
  /** What the real photo should show. */
  brief: string;
};

export const media = {
  hero: {
    src: "/images/hero-truck.webp",
    width: 1536,
    height: 639,
    alt: "Orange RCS Logistic Solutions truck on a highway at sunset",
    placeholder: true,
    brief: "TODO(client): hero — real RCS truck on an Indian highway, landscape, 2400px+",
  },
  founderHeadshot: {
    src: "/images/founder-headshot.webp",
    width: 240,
    height: 240,
    alt: "Satya Sankar Swain",
    placeholder: true,
    devOnly: true,
    brief: "TODO(client): real headshot of Satya Sankar Swain, square, 600px+",
  },
  founderPortrait: {
    src: "/images/founder-desk.webp",
    width: 438,
    height: 356,
    alt: "Satya Sankar Swain, founder of RCS Logistic Solutions",
    placeholder: true,
    devOnly: true,
    brief: "TODO(client): real photo of Satya Sankar Swain, landscape, 1600px+",
  },
} satisfies Record<string, MediaItem>;

const isDev = process.env.NODE_ENV !== "production";

/** The image source to render, or null when it must not appear in this build. */
export function mediaSrc(item: MediaItem): string | null {
  if (!item.src) return null;
  if (item.devOnly && !isDev) return null;
  return item.src;
}
