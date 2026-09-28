/**
 * Photo slots. `src: null` renders a labelled placeholder frame until the client
 * supplies real photos (founder, fleet, hero). No AI images of real people.
 * To add a photo: put it in public/images/, then set src, width and height.
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
    width: 2400,
    height: 1350,
    alt: "RCS Logistic truck on a highway in Odisha",
    brief: "TODO(client): hero — RCS truck on an Indian highway, landscape, 2400px+",
  },
  founder: {
    src: null,
    width: 1600,
    height: 1300,
    alt: "Satya Sankar Swain, founder of RCS Logistic",
    brief: "TODO(client): real photo of Satya Sankar Swain, landscape, 1600px+",
  },
  networkBand: {
    src: null,
    width: 2400,
    height: 800,
    alt: "",
    brief: "TODO(client): wide highway or bridge at dusk (decorative background)",
  },
  aboutHero: {
    src: null,
    width: 2400,
    height: 1000,
    alt: "RCS Logistic operations",
    brief: "TODO(client): operations or loading-dock photo, landscape",
  },
} satisfies Record<string, MediaItem>;
