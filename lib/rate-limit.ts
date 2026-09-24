import "server-only";
import { getDb } from "@/lib/db";

export const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 } as const;

/**
 * Postgres-backed limiter: counts submissions from this hashed IP in the last
 * hour across both tables. No extra service needed at this scale.
 */
export async function isRateLimited(ipHash: string): Promise<boolean> {
  const db = getDb();
  const since = new Date(Date.now() - RATE_LIMIT.windowMs);
  const where = { ipHash, createdAt: { gte: since } };
  const [quotes, messages] = await Promise.all([
    db.quoteRequest.count({ where }),
    db.contactMessage.count({ where }),
  ]);
  return quotes + messages >= RATE_LIMIT.max;
}
