import { Building2, MapPin, Truck, Warehouse, type LucideIcon } from "lucide-react";
import { capabilities, type CapabilityIcon } from "@/content/home";
import { siteConfig } from "@/lib/site-config";

const icons: Record<CapabilityIcon, LucideIcon> = {
  odisha: MapPin,
  b2b: Building2,
  loads: Truck,
  warehousing: Warehouse,
};

const itemClass =
  "flex items-center gap-3 border-white/10 px-4 py-6 sm:px-6 lg:px-5 lg:py-8 xl:px-6 lg:first:pl-0! [&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0";

/**
 * Non-numeric capability strip. Switches to a metrics strip only when
 * `features.metrics` is on AND verified numbers exist in site-config.
 */
export function CapabilityStrip() {
  const showMetrics = siteConfig.features.metrics && siteConfig.metrics.length > 0;

  return (
    <section aria-label={showMetrics ? "RCS in numbers" : "What RCS offers"} className="bg-navy text-white">
      <div className="container-site px-0! sm:px-6! lg:px-8!">
        {showMetrics ? (
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {siteConfig.metrics.map((metric) => (
              <div key={metric.label} className={`${itemClass} flex-col items-start gap-1`}>
                <dt className="order-2 text-sm text-muted-on-dark">{metric.label}</dt>
                <dd className="font-display order-1 text-3xl text-white lg:text-4xl">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.label} className={itemClass}>
                  <Icon className="size-5 shrink-0 text-brand-orange sm:size-6" aria-hidden="true" />
                  <span className="text-[0.9375rem] leading-snug font-semibold sm:text-base lg:text-[0.9375rem] xl:text-base">{item.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
