/**
 * Site photography. `src: null` renders a neutral placeholder frame.
 *
 * To add a photo: put the file in public/images/ and set `src`, `width`, `height`.
 * Photos must be real RCS images, or stock licensed for commercial use that shows
 * no other company's branding and no people presented as RCS staff
 * (docs/design-system.md → Photography).
 */
export type MediaItem = {
  src: string | null;
  width: number;
  height: number;
  alt: string;
  /** What the photo should show — displayed on the placeholder in development. */
  brief: string;
};

export const media = {
  hero: {
    src: null,
    width: 1200,
    height: 1500,
    alt: "Commercial truck on a highway",
    brief: "Commercial truck on an Indian highway (portrait crop)",
  },
  ftl: {
    src: null,
    width: 1200,
    height: 800,
    alt: "Fully loaded truck ready for dispatch",
    brief: "Full-load truck or loading dock",
  },
  ptl: {
    src: null,
    width: 1200,
    height: 800,
    alt: "Palletised goods ready for shared transport",
    brief: "Mixed cargo or palletised goods",
  },
} satisfies Record<string, MediaItem>;
