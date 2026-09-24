import "server-only";
import { z } from "zod";

const required = (name: string, hint?: string) =>
  z
    .string({ error: `${name} is not set${hint ? ` — ${hint}` : ""}` })
    .trim()
    .min(1, { error: `${name} is empty${hint ? ` — ${hint}` : ""}` });

const serverEnvSchema = z.object({
  DATABASE_URL: required("DATABASE_URL", "pooled Neon connection string").pipe(
    z.url({ error: "DATABASE_URL must be a connection URL" }),
  ),
  RESEND_API_KEY: required("RESEND_API_KEY"),
  RESEND_FROM_EMAIL: required("RESEND_FROM_EMAIL", "an address on a Resend-verified domain"),
  QUOTE_NOTIFICATION_EMAIL: required("QUOTE_NOTIFICATION_EMAIL").pipe(
    z.email({ error: "QUOTE_NOTIFICATION_EMAIL must be an email address" }),
  ),
  TURNSTILE_SECRET_KEY: required("TURNSTILE_SECRET_KEY"),
  IP_HASH_SALT: required("IP_HASH_SALT", "e.g. `openssl rand -hex 32`").pipe(
    z.string().min(16, { error: "IP_HASH_SALT must be at least 16 characters" }),
  ),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | undefined;

export class EnvError extends Error {
  constructor(issues: string[]) {
    super(`Missing or invalid server environment variables:\n  - ${issues.join("\n  - ")}\nSee .env.example.`);
    this.name = "EnvError";
  }
}

/** Validated server environment. Throws EnvError listing every problem at once. */
export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) throw new EnvError(parsed.error.issues.map((issue) => issue.message));
  cached = parsed.data;
  return cached;
}
