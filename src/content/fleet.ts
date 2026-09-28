import type { MediaItem } from "./media";

/**
 * Vehicle types — docs/04-content.md → Fleet. Capacities, typical routes and photos
 * are still to come from the client (placeholders until then).
 */
export type Vehicle = {
  slug: string;
  name: string;
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
    oneLiner: "For heavy-duty, long-distance transportation",
    carries: "Heavy industrial goods, steel, machinery and bulk loads over long distances.", // TODO(client): review
    capacity: "TODO(client): capacity range",
    routes: "TODO(client): typical routes",
    image: {
      src: null,
      width: 1200,
      height: 800,
      alt: "Semi-trailer truck on a highway",
      brief: "TODO(client): photo of an RCS semi-trailer truck",
    },
  },
  {
    slug: "straight-trucks",
    name: "Straight Trucks (Box Trucks)",
    oneLiner: "Flexible. Reliable. Business ready.",
    carries: "Packaged goods, FMCG and mixed consignments that need a covered body.", // TODO(client): review
    capacity: "TODO(client): capacity range",
    routes: "TODO(client): typical routes",
    image: {
      src: null,
      width: 1200,
      height: 800,
      alt: "Box truck on an open road",
      brief: "TODO(client): photo of an RCS box truck",
    },
  },
  {
    slug: "light-commercial-vehicles",
    name: "Light Commercial Vehicles",
    oneLiner: "Built for the final mile.",
    carries: "Smaller loads and last-mile deliveries within cities and towns.", // TODO(client): review
    capacity: "TODO(client): capacity range",
    routes: "TODO(client): typical routes",
    image: {
      src: null,
      width: 1200,
      height: 800,
      alt: "Light commercial vehicle",
      brief: "TODO(client): photo of an RCS light commercial vehicle",
    },
  },
];
