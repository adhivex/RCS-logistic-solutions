/*
 * Environment variable names, with accepted aliases (docs/12-decisions.md → D-25).
 * The first name is the canonical one from .env.example. The others are accepted so
 * existing deployments keep working without renaming:
 *   - v1 production names (RESEND_FROM_EMAIL, QUOTE_NOTIFICATION_EMAIL, IP_HASH_SALT);
 *   - names created by the Vercel ↔ Supabase integration (SUPABASE_URL, SUPABASE_SECRET_KEY).
 * No `server-only` import: instrumentation.ts reads these too.
 */
export const ENV = {
  supabaseUrl: ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL"],
  supabaseServiceKey: ["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY"],
  resendApiKey: ["RESEND_API_KEY"],
  quoteFrom: ["QUOTE_FROM_EMAIL", "RESEND_FROM_EMAIL"],
  quoteNotifyTo: ["QUOTE_NOTIFY_TO", "QUOTE_NOTIFICATION_EMAIL"],
  rateLimitSalt: ["RATE_LIMIT_SALT", "IP_HASH_SALT"],
} as const;

export type EnvKey = keyof typeof ENV;

/** The first non-empty value among a setting's names, trimmed. */
export function readEnv(key: EnvKey): string | undefined {
  for (const name of ENV[key]) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return undefined;
}

/** Canonical names of settings with no value under any accepted name. */
export function missingEnv(keys: EnvKey[] = Object.keys(ENV) as EnvKey[]): string[] {
  return keys.filter((key) => !readEnv(key)).map((key) => ENV[key][0]);
}
