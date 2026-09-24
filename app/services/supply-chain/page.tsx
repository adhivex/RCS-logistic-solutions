import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getService("supply-chain");

export const metadata = pageMetadata({
  title: service.name,
  description: service.summary,
  path: service.href,
});

export default function Page() {
  return <ServicePage service={service} />;
}
