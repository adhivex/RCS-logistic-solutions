import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { QuoteDialog } from "@/components/quote/quote-dialog";
import { company } from "@/content";
import { fontVariables } from "./fonts";
import "./globals.css";

// Full SEO metadata (metadataBase, canonical, OG, JSON-LD) arrives in Phase 6.
export const metadata: Metadata = {
  title: {
    default: "RCS Logistic | B2B Truck Transport from Odisha Across India",
    template: `%s | RCS Logistic — ${company.tagline}`,
  },
  description:
    "RCS Logistic delivers dependable B2B transportation solutions across Odisha and India — full truck load, part truck load, warehousing and supply chain.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-button bg-brand-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <QuoteDialog />
        <Analytics />
      </body>
    </html>
  );
}
