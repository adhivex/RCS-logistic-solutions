import type { MediaItem } from "./media";

/**
 * Vehicle types — docs/04-content.md → Fleet. Photos are the kit's concept crops
 * (placeholders); capacities and typical routes are still to come from the client.
 */
export type Vehicle = {
  slug: string;
  name: string;
  /** Short name for the homepage cards. */
  cardName: string;
  /** Uppercase meta on the card: the kind of work it does. */
  role: string;
  oneLiner: string;
  carries: string;
  capacity: string;
  routes: string;
  image: MediaItem;
};

export const fleet: Vehicle[] = [
  {
    slug: "semi-trailer-trucks",
    name: "Semi-Trailer Trucks",
    cardName: "Semi-Trailer Trucks",
    role: "Long haul",
    oneLiner: "For heavy-duty, long-distance transportation.",
    carries: "Heavy industrial goods, steel, machinery and bulk loads over long distances.", // TODO(client): review
    capacity: "TODO(client): capacity range",
    routes: "TODO(client): typical routes",
    image: {
      src: "/images/fleet-semi-trailer.webp",
      width: 295,
      height: 123,
      alt: "Semi-trailer truck on a highway",
      placeholder: true,
      brief: "TODO(client): photo of an RCS semi-trailer truck, 1600px+",
    },
  },
  {
    slug: "straight-trucks",
    name: "Straight Trucks (Box Trucks)",
    cardName: "Box Trucks",
    role: "Regional",
    oneLiner: "Flexible. Reliable. Business ready.",
    carries: "Packaged goods, FMCG and mixed consignments that need a covered body.", // TODO(client): review
    capacity: "TODO(client): capacity range",
    routes: "TODO(client): typical routes",
    image: {
      src: "/images/fleet-box-truck.webp",
      width: 284,
      height: 123,
      alt: "Box truck on an open road",
      placeholder: true,
      brief: "TODO(client): photo of an RCS box truck, 1600px+",
    },
  },
  {
    slug: "light-commercial-vehicles",
    name: "Light Commercial Vehicles",
    cardName: "Light Commercial",
    role: "Last mile",
    oneLiner: "Built for the final mile.",
    carries: "Smaller loads and last-mile deliveries within cities and towns.", // TODO(client): review
    capacity: "TODO(client): capacity range",
    routes: "TODO(client): typical routes",
    image: {
      src: "/images/fleet-lcv.webp",
      width: 292,
      height: 123,
      alt: "Light commercial vehicle",
      placeholder: true,
      brief: "TODO(client): photo of an RCS light commercial vehicle, 1600px+",
    },
  },
];
