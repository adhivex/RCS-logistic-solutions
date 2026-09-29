import type { SVGProps } from "react";
import {
  BrickWall,
  Factory,
  FlaskConical,
  Pickaxe,
  ShoppingBasket,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { IndustryIcon, Service, TrustIcon } from "@/content";

/*
 * Thin-line icons drawn in the preview (docs/reference/homepage-preview.html), so
 * the trust bar and service tiles match it exactly. Industries use Lucide.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Svg({ strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </Svg>
  );
}

function PeopleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.2a3 3 0 0 1 0 5.6M18 14a5 5 0 0 1 3 4.8" />
    </Svg>
  );
}

function GrowthIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 20h18M6 16v-4M11 16V8M16 16v-6M20 16V5" />
    </Svg>
  );
}

function TruckIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.7} {...props}>
      <path d="M1.5 6h13v10h-13zM14.5 9.5h4l3.5 3.5V16h-7.5" />
      <circle cx="6" cy="17.5" r="1.8" />
      <circle cx="18" cy="17.5" r="1.8" />
    </Svg>
  );
}

function PartLoadIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.7} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" strokeDasharray="2 2" />
    </Svg>
  );
}

function WarehouseIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.7} {...props}>
      <path d="M2.5 21V9l9.5-5.5L21.5 9v12" />
      <path d="M6.5 21v-8h11v8M6.5 17h11" />
    </Svg>
  );
}

function NetworkIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.7} {...props}>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7.5 6h9M6.3 8.2l4.4 7.6M17.7 8.2l-4.4 7.6" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </Svg>
  );
}

export function CookieIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.7} {...props}>
      <path d="M21 12.5A9 9 0 1 1 11.5 3a3 3 0 0 0 3.5 3.5 3 3 0 0 0 3.5 3.5 3 3 0 0 0 2.5 2.5z" />
      <circle cx="8.5" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" />
      <circle cx="16" cy="13" r=".8" fill="currentColor" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg strokeWidth={1.8} {...props}>
      <path d="M3 8h18M3 16h18" />
    </Svg>
  );
}

export const trustIcons: Record<TrustIcon, (props: IconProps) => React.JSX.Element> = {
  reach: PinIcon,
  secure: ShieldIcon,
  partner: PeopleIcon,
  growth: GrowthIcon,
};

export const serviceIcons: Record<Service["icon"], (props: IconProps) => React.JSX.Element> = {
  truck: TruckIcon,
  boxes: PartLoadIcon,
  warehouse: WarehouseIcon,
  network: NetworkIcon,
};

export const industryIcons: Record<IndustryIcon, LucideIcon> = {
  steel: Factory,
  mining: Pickaxe,
  cement: BrickWall,
  fmcg: ShoppingBasket,
  agri: Wheat,
  chemicals: FlaskConical,
};
