/*
 * Startup check for server environment variables (runs once per server instance).
 * Full validation with clear messages lives in lib/env.ts and runs on first use.
 *
 * - REQUIRE_SERVER_ENV=true: missing variables stop the server (fail fast).
 *   Set this in Vercel once Neon, Resend and Turnstile are configured.
 * - Otherwise: a loud warning, so pages still render and the forms return a
 *   clear error. (Throwing here makes every server-rendered route return 500.)
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
  if (process.env.REQUIRE_SERVER_ENV === "true") {
    throw new Error(message);
  }
  console.warn(`\n⚠ ${message}\n`);
}
