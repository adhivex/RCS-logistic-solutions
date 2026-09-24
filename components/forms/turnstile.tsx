"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, type Ref } from "react";
import Script from "next/script";

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  theme: "light";
  size: "flexible";
  action?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export type TurnstileHandle = { reset: () => void };

type TurnstileProps = {
  onToken: (token: string | undefined) => void;
  action: string;
  ref?: Ref<TurnstileHandle>;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const turnstileConfigured = siteKey !== "";

/** Cloudflare Turnstile widget (explicit render). Tokens are single-use: call `reset()` after each submit. */
export function Turnstile({ onToken, action, ref }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      theme: "light",
      size: "flexible",
      callback: (token) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(undefined),
      "error-callback": () => onTokenRef.current(undefined),
    });
  }, [action]);

  useEffect(() => {
    // Script may already be loaded from a previous page.
    renderWidget();
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [renderWidget]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current(undefined);
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    },
  }));

  if (!siteKey) {
    return process.env.NODE_ENV !== "production" ? (
      <p className="rounded-md border border-dashed border-input px-4 py-3 text-sm text-muted-foreground">
        Turnstile is not configured (set NEXT_PUBLIC_TURNSTILE_SITE_KEY). Submissions will be rejected by the server.
      </p>
    ) : null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
}
