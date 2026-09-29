import type { Metadata, Viewport } from "next";
import { ConsentManager } from "@/components/consent/consent-manager";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileQuickBar } from "@/components/layout/mobile-quick-bar";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { QuoteDialog } from "@/components/quote/quote-dialog";
import { JsonLd } from "@/components/seo/json-ld";
import { company } from "@/content";
import { canonicalOrigin, localBusinessJsonLd } from "@/lib/seo";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  applicationName: company.name,
  openGraph: { siteName: company.name, locale: "en_IN", type: "website" },
  title: {
    default: "RCS Logistic Solutions | B2B & B2C Truck Transport from Odisha Across India",
    template: `%s | ${company.name}`,
  },
  description:
    "RCS Logistic Solutions: dependable road transport from Odisha across India for businesses and individuals — full truck load, part truck load, warehousing and supply chain.",
};

export const viewport: Viewport = {
  themeColor: "#19283b",
  colorScheme: "light",
  viewportFit: "cover",
};

/** Marks JS as available before first paint, so reveal-on-scroll never hides content without JS. */
const jsFlag = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-70 rounded-full bg-ink px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileQuickBar />
        <QuoteDialog />
        <RevealObserver />
        <ConsentManager />
      </body>
    </html>
  );
}
