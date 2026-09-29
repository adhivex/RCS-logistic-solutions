import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readEnv } from "@/lib/env-names";
import type { Database } from "./database.types";

/*
 * Service-role client (docs/05-data-and-api.md → Clients). Bypasses RLS, so it is
 * used only by the quote server action. Never import this from client code: the
 * `server-only` import makes that a build error.
 */
export type AdminClient = SupabaseClient<Database>;

let cached: AdminClient | undefined;

/** True when the Supabase URL and service key are set; otherwise the quote flow runs in local mode. */
export function isSupabaseConfigured(): boolean {
  return Boolean(readEnv("supabaseUrl") && readEnv("supabaseServiceKey"));
}

export function getSupabaseAdmin(): AdminClient {
  if (cached) return cached;
  const url = readEnv("supabaseUrl");
  const key = readEnv("supabaseServiceKey");
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  cached = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return cached;
}
