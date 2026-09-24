import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getServerEnv } from "@/lib/env";

/** Client IP from proxy headers (Vercel sets x-forwarded-for). Never stored raw. */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip")?.trim() || "unknown";
}

/** Salted SHA-256 of the IP — used only for rate limiting. */
export function hashIp(ip: string): string {
  return createHash("sha256").update(`${getServerEnv().IP_HASH_SALT}:${ip}`).digest("hex");
}
