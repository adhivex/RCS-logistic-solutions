import { LegalPage } from "@/components/shared/legal-page";
import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

// noIndex while the draft awaits client review.
export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How RCS Logistic Solutions collects, uses and protects personal data submitted through this website.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" sections={privacyPolicy} />;
}
