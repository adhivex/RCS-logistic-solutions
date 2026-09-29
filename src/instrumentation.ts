import { missingEnv } from "@/lib/env-names";

/*
 * One-line startup warning about missing configuration (CLAUDE.md → "Local mode").
 * Database settings decide whether quotes are stored; email settings only decide
 * whether they are also emailed. (No `server-only` imports: instrumentation runs
 * outside React.)
 */
export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const production = process.env.VERCEL_ENV === "production";

  const database = missingEnv(["supabaseUrl", "supabaseServiceKey", "rateLimitSalt"]);
  if (database.length > 0) {
    const effect = production
      ? "Quote requests will fail until these are set."
      : "Local mode: quote requests are logged, not stored.";
    console.warn(`⚠ Missing env: ${database.join(", ")}. ${effect} See .env.example.`);
  }

  const email = missingEnv(["resendApiKey", "quoteFrom", "quoteNotifyTo"]);
  if (email.length > 0) {
    console.warn(
      `⚠ Missing env: ${email.join(", ")}. Quote emails are logged, not sent (requests are still stored). See .env.example.`,
    );
  }
}
