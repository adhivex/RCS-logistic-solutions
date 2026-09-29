import "server-only";
import type { AdminClient } from "@/lib/supabase/admin";

/**
 * docs/05-data-and-api.md → Submission, step 2: count this IP hash's quote requests
 * in the last 10 minutes and reject above 5. Only the salted hash is stored.
 */
export const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 } as const;

export async function isRateLimited(db: AdminClient, ipHash: string): Promise<boolean> {
  const since = new Date(Date.now() - RATE_LIMIT.windowMs).toISOString();
  const { count, error } = await db
    .from("quote_requests")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (error) throw new Error(`Rate limit check failed: ${error.message}`);
  return (count ?? 0) >= RATE_LIMIT.max;
}
