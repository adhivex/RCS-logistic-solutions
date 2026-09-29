import { afterEach, describe, expect, it, vi } from "vitest";
import { missingEnv, readEnv } from "./env-names";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("environment variable aliases", () => {
  it("prefers the canonical name", () => {
    vi.stubEnv("QUOTE_FROM_EMAIL", "RCS <quotes@rcsls.in>");
    vi.stubEnv("RESEND_FROM_EMAIL", "Old <old@rcsls.in>");
    expect(readEnv("quoteFrom")).toBe("RCS <quotes@rcsls.in>");
  });

  it("falls back to the v1 production names", () => {
    vi.stubEnv("QUOTE_FROM_EMAIL", "");
    vi.stubEnv("RESEND_FROM_EMAIL", "RCS <quotes@rcsls.in>");
    vi.stubEnv("QUOTE_NOTIFY_TO", "");
    vi.stubEnv("QUOTE_NOTIFICATION_EMAIL", "info@rcsls.in");
    vi.stubEnv("RATE_LIMIT_SALT", "");
    vi.stubEnv("IP_HASH_SALT", "a-long-random-salt-value");
    expect(readEnv("quoteFrom")).toBe("RCS <quotes@rcsls.in>");
    expect(readEnv("quoteNotifyTo")).toBe("info@rcsls.in");
    expect(readEnv("rateLimitSalt")).toBe("a-long-random-salt-value");
  });

  it("accepts the Vercel Supabase integration names", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    vi.stubEnv("SUPABASE_SECRET_KEY", "secret");
    expect(readEnv("supabaseUrl")).toBe("https://example.supabase.co");
    expect(readEnv("supabaseServiceKey")).toBe("secret");
  });

  it("ignores blank values and reports canonical names as missing", () => {
    vi.stubEnv("RESEND_API_KEY", "   ");
    expect(readEnv("resendApiKey")).toBeUndefined();
    expect(missingEnv(["resendApiKey"])).toEqual(["RESEND_API_KEY"]);
  });
});
