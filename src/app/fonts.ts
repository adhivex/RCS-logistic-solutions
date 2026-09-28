import { Caveat, Inter, Poppins } from "next/font/google";

/** Display — headings. Weights used: 400 (hero corner), 500, 600, 700, 800. */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

/** Body and UI. Variable font. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Script accents only: the founder signature and "Bigger Routes, Brighter Tomorrows". */
export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = `${poppins.variable} ${inter.variable} ${caveat.variable}`;
