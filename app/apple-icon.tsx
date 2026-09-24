import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// iOS renders transparency as black, so the R mark sits on a white tile.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const markData = await readFile(join(process.cwd(), "public/brand/rcs-mark.png"), "base64");
const markSrc = `data:image/png;base64,${markData}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={markSrc} width={140} height={140} />
      </div>
    ),
    size,
  );
}
