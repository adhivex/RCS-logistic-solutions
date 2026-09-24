/*
 * Startup check for server environment variables (runs once per server instance).
 * Full validation with clear messages lives in lib/env.ts and runs on first use.
 *
 * - Vercel production (or REQUIRE_SERVER_ENV=true): missing variables stop the server.
 * - Everywhere else (local dev, previews, `next start` for testing): a loud warning,
 *   so the marketing pages still run and the forms return a clear error.
 */
const REQUIRED = [
  "DATABASE_URL",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "QUOTE_NOTIFICATION_EMAIL",
  "TURNSTILE_SECRET_KEY",
  "IP_HASH_SALT",
] as const;

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const missing = REQUIRED.filter((name) => !process.env[name]);
  if (missing.length === 0) return;

  const message = `Missing server environment variables: ${missing.join(", ")}. Quote and contact forms will not work. See .env.example.`;
  if (process.env.VERCEL_ENV === "production" || process.env.REQUIRE_SERVER_ENV === "true") {
    throw new Error(message);
  }
  console.warn(`\n⚠ ${message}\n`);
}
