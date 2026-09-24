import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// 1200×630 share image: the unaltered logo on a light background.
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/brand/rcs-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderBottom: "12px solid #ff6b00",
        }}
      >
        {/* Logo is 1079×357; rendered at its aspect ratio. */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={logoSrc} width={648} height={214} />
        <div style={{ marginTop: 48, fontSize: 34, color: "#0f2026", letterSpacing: -0.5 }}>
          B2B logistics and supply-chain partner, based in Odisha
        </div>
      </div>
    ),
    size,
  );
}
