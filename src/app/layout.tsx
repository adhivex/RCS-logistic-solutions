import type { Metadata, Viewport } from "next";
import { company } from "@/content";
import { fontVariables } from "./fonts";
import "./globals.css";

// Phase 1 shell. Header, footer, floating contact and SEO metadata arrive in
// Phases 2 and 6 (docs/07-build-plan.md).
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
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
