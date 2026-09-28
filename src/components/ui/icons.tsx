import {
  BrickWall,
  Boxes,
  ChartNoAxesColumn,
  Factory,
  FlaskConical,
  MapPin,
  Network,
  Pickaxe,
  ShieldCheck,
  ShoppingBasket,
  Truck,
  Users,
  Warehouse,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { IndustryIcon, Service, TrustIcon } from "@/content";

/** Content files name icons by key; this is the single mapping to Lucide components. */
export const trustIcons: Record<TrustIcon, LucideIcon> = {
  reach: MapPin,
  secure: ShieldCheck,
  partner: Users,
  growth: ChartNoAxesColumn,
};

export const serviceIcons: Record<Service["icon"], LucideIcon> = {
  truck: Truck,
  boxes: Boxes,
  warehouse: Warehouse,
  network: Network,
};

export const industryIcons: Record<IndustryIcon, LucideIcon> = {
  steel: Factory,
  mining: Pickaxe,
  cement: BrickWall,
  fmcg: ShoppingBasket,
  agri: Wheat,
  chemicals: FlaskConical,
};
