/**
 * Cookie banner and preferences copy — docs/09-cookie-consent.md, wording from the
 * approved preview. TODO(client): legal review together with the privacy policy.
 */
export const cookieConsentCopy = {
  bannerLabel: "Cookie consent",
  title: "We value your privacy",
  body: "We use essential cookies to run this site and, with your permission, analytics and marketing cookies to improve it. See our",
  policyLink: "Privacy & Cookie Policy",
  reject: "Reject optional",
  accept: "Accept all",
  customise: "Customise preferences",
  save: "Save preferences",
  prefsTitle: "Cookie preferences",
  prefsIntro:
    "Choose which cookies we can use. You can change this any time from “Cookie settings” in the footer.",
  categories: [
    {
      key: "essential",
      title: "Essential",
      body: "Needed for the site and quote form to work. Always on.",
    },
    {
      key: "analytics",
      title: "Analytics",
      body: "Helps us understand which pages are useful, using anonymous visit statistics.",
    },
    {
      key: "marketing",
      title: "Marketing",
      body: "Lets us measure our ads on Google and social media. Off unless you allow it.",
    },
  ] as const,
};
