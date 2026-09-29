import { getService, services } from "@/content";
import { ogImage, ogSize } from "../../og";

export const alt = "RCS Logistic Solutions service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return ogImage(
    service?.name ?? "RCS Logistic Solutions",
    service?.oneLiner ?? "Truck transport from Odisha across India",
  );
}
