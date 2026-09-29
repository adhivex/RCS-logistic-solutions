import "server-only";
import { z } from "zod";
import { readEnv } from "./env-names";

/*
 * Server configuration for the quote flow. CLAUDE.md → "Local mode": with no
 * credentials the site still runs — quotes are validated and logged instead of
 * stored, and emails are logged instead of sent. On the Vercel *production*
 * deployment local mode is never used: a missing database is an error the visitor
 * sees ("call or WhatsApp us"), so no lead is silently dropped.
 * Accepted variable names (incl. v1 aliases): src/lib/env-names.ts.
 */
export const isProductionDeploy = process.env.VERCEL_ENV === "production";

const emailList = z
  .string()
  .transform((value) =>
    value
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.email({ error: "QUOTE_NOTIFY_TO must be email addresses, comma-separated" })).min(1));

export type ResendConfig = { apiKey: string; from: string; notifyTo: string[] };

/** Resend settings, or null when RESEND_API_KEY is unset (emails are then logged). */
export function getResendConfig(): ResendConfig | null {
  const apiKey = readEnv("resendApiKey");
  if (!apiKey) return null;
  const from = readEnv("quoteFrom");
  if (!from) throw new Error("QUOTE_FROM_EMAIL is not set — a sender on a Resend-verified domain");
  const notifyTo = emailList.parse(readEnv("quoteNotifyTo") ?? "");
  return { apiKey, from, notifyTo };
}

const DEV_SALT = "local-development-salt-not-secret";

/** Salt for IP hashing. Required on production; a fixed dev salt elsewhere. */
export function getRateLimitSalt(): string {
  const salt = readEnv("rateLimitSalt");
  if (salt && salt.length >= 16) return salt;
  if (isProductionDeploy) throw new Error("RATE_LIMIT_SALT must be set (16+ characters) in production");
  return DEV_SALT;
}
