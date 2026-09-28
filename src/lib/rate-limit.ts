import "server-only";
import { getDb } from "@/lib/db";

/**
 * Postgres-backed limiter (docs/05-data-and-api.md): max 5 submissions per IP per
 * 10 minutes. In-memory limits don't hold across serverless instances, so each
 * attempt is recorded as a RateLimitHit row keyed by a salted IP hash (never the raw IP).
 * Old rows can be pruned at any time; only the last window is read.
 */
export const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 } as const;

/** Records this attempt and returns true when the IP is over the limit. */
export async function hitRateLimit(ipHash: string): Promise<boolean> {
  const db = getDb();
  const since = new Date(Date.now() - RATE_LIMIT.windowMs);
  const recent = await db.rateLimitHit.count({ where: { ipHash, createdAt: { gte: since } } });
  if (recent >= RATE_LIMIT.max) return true;
  await db.rateLimitHit.create({ data: { ipHash } });
  return false;
}
