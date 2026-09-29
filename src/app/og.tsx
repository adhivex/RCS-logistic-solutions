import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * Shared 1200×630 Open Graph image (docs/06-seo-launch.md): navy → steel with an
 * orange glow, the white logo, and the page title. Logo file used unaltered.
 */
export const ogSize = { width: 1200, height: 630 };

const logoData = await readFile(join(process.cwd(), "public/brand/logo-on-dark.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export function ogImage(title: string, subtitle: string) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(ellipse at 80% 110%, rgba(234,90,36,0.45), rgba(234,90,36,0) 55%), linear-gradient(160deg, #19283B 0%, #243F5C 100%)",
        color: "#ffffff",
        padding: "64px 72px",
      }}
    >
      <div style={{ display: "flex" }}>
        {/* 846×263 logo at its own aspect ratio */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={logoSrc} width={309} height={96} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2.5 }}>{title}</div>
        <div style={{ marginTop: 20, fontSize: 32, color: "rgba(255,255,255,0.75)" }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#F2763F" }}>
        <div style={{ width: 36, height: 2, background: "#F2763F", marginRight: 16 }} />
        Right Cargo, Right Stop · www.rcsls.in
      </div>
    </div>,
    ogSize,
  );
}
