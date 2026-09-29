import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getRateLimitSalt } from "@/lib/env";

/** Client IP from proxy headers (Vercel sets x-forwarded-for). Never stored raw. */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip")?.trim() || "unknown";
}

/** sha256(IP + RATE_LIMIT_SALT) — used only for rate limiting (docs/05-data-and-api.md). */
export function hashIp(ip: string): string {
  return createHash("sha256").update(`${ip}${getRateLimitSalt()}`).digest("hex");
}
