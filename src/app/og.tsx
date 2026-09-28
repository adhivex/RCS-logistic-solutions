import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * Shared 1200×630 Open Graph image: ink background, orange accents, logo on a white
 * tile, page title (docs/06-seo-launch.md). The logo file is used unaltered.
 */
export const ogSize = { width: 1200, height: 630 };

const logoData = await readFile(join(process.cwd(), "public/brand/rcs-logo.png"), "base64");
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
        background: "#16181D",
        color: "#ffffff",
        padding: "64px 72px",
        borderLeft: "16px solid #F2611D",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", background: "#ffffff", borderRadius: 10, padding: "14px 20px" }}>
          {/* 1079×357 logo at its own aspect ratio */}
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logoSrc} width={290} height={96} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
        <div style={{ marginTop: 20, fontSize: 32, color: "rgba(255,255,255,0.8)" }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#F2611D" }}>
        <div style={{ width: 48, height: 4, background: "#F2611D", marginRight: 16 }} />
        Right Cargo, Right Stop · www.rcsls.in
      </div>
    </div>,
    ogSize,
  );
}
