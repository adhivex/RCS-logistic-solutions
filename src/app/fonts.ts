import { Inter, Instrument_Serif, Manrope } from "next/font/google";

/** Display — headings, numbers, drawer links. Variable font (500–800 used). */
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

/** Body and UI. Variable font. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Italic accent words, quotes and taglines. */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const fontVariables = `${manrope.variable} ${inter.variable} ${instrumentSerif.variable}`;
