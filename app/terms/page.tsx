import { LegalPage } from "@/components/shared/legal-page";
import { terms } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

// noIndex while the draft awaits client review.
export const metadata = pageMetadata({
  title: "Terms",
  description: "Terms of use for the RCS Logistic Solutions website.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return <LegalPage title="Terms" sections={terms} />;
}
