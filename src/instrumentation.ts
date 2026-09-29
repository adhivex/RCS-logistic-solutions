/*
 * One-line startup warning when the quote flow is running in local mode
 * (CLAUDE.md → "Local mode"): missing Supabase/Resend variables mean quote
 * requests are logged to the console instead of being stored or emailed.
 * (Kept free of `server-only` imports: instrumentation runs outside React.)
 */
const REQUIRED = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "QUOTE_FROM_EMAIL",
  "QUOTE_NOTIFY_TO",
  "RATE_LIMIT_SALT",
] as const;

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const missing = REQUIRED.filter((name) => !process.env[name]?.trim());
  if (missing.length === 0) return;
  const mode =
    process.env.VERCEL_ENV === "production"
      ? "Quote requests will fail until these are set."
      : "Local mode: quote requests are logged, not stored/emailed.";
  console.warn(`⚠ Missing env: ${missing.join(", ")}. ${mode} See .env.example.`);
}
