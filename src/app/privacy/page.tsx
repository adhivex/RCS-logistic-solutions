import { Todo } from "@/components/ui/todo";
import { privacyPolicy, privacyUpdated } from "@/content/privacy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "How RCS Logistic Solutions collects, uses and protects the details you send through our quote form, and your rights under India's DPDP Act 2023.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section-y">
      <div className="container-site max-w-3xl">
        <h1 className="text-[clamp(34px,5vw,52px)] font-extrabold">Privacy policy</h1>
        <p className="mt-3 text-sm">Last updated: {privacyUpdated}</p>
        <div className="mt-10 grid gap-9">
          {privacyPolicy.map((section) => (
            <section key={section.heading} aria-label={section.heading}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3">
                  <Todo value={paragraph} />
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 grid list-disc gap-2 pl-5 marker:text-brand-orange">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
