import { ogImage, ogSize } from "./og";

export const alt = "RCS Logistic — Moving Business Forward. B2B truck transport from Odisha across India.";
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogImage("Moving Business Forward", "B2B truck transport from Odisha across India");
}
