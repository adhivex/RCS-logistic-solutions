import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { PageHero } from "@/components/ui/page-hero";
import { Todo } from "@/components/ui/todo";
import { pages } from "@/content";
import { cookiePolicy, privacyPolicy, privacyUpdated } from "@/content/privacy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: pages.privacy.title,
  description: pages.privacy.description,
  path: "/privacy",
});

/** docs/03-pages.md → /privacy, with the Cookies section from 09-cookie-consent.md. */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        path="/privacy"
        {...pages.privacy.hero}
        intro={`Last updated: ${privacyUpdated}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <section className="bg-white section-y">
        <div className="container-site max-w-3xl">
          <div className="grid gap-10">
            {privacyPolicy.map((section) => (
              <section key={section.heading} aria-label={section.heading}>
                <h2 className="text-[26px] tracking-[-0.03em]">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 mb-0">
                    <Todo value={paragraph} />
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 grid list-disc gap-2 pl-5 marker:text-orange">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section id={cookiePolicy.id} aria-labelledby="cookies-heading" className="scroll-mt-28">
              <h2 id="cookies-heading" className="text-[26px] tracking-[-0.03em]">
                {cookiePolicy.heading}
              </h2>
              {cookiePolicy.intro.map((paragraph) => (
                <p key={paragraph} className="mt-3 mb-0">
                  {paragraph}
                </p>
              ))}
              <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
                  <thead className="bg-paper text-[11px] tracking-[0.14em] text-muted uppercase">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookiePolicy.rows.map((row) => (
                      <tr key={row.name} className="border-t border-line align-top">
                        <th scope="row" className="px-4 py-3 font-semibold text-ink">
                          {row.name}
                        </th>
                        <td className="px-4 py-3">{row.category}</td>
                        <td className="px-4 py-3">{row.purpose}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 mb-0">{cookiePolicy.marketingNote}</p>
              <p className="mt-4 mb-0 font-semibold text-ink underline underline-offset-4 [&_button]:cursor-pointer">
                <CookieSettingsButton />
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
