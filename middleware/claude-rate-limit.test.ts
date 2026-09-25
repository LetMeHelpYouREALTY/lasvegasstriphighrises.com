/**
 * Test: Claude API Rate Limiting Middleware
 * Critical path: AI API cost control and rate limiting
 */

import { beforeEach, describe, expect, it } from "vitest";
import { rateLimitStore } from "./claude-rate-limit";

const limit10 = {
  requestsPerMinute: 10,
  tokensPerMinute: 100000,
  enabled: true,
};

describe("Claude Rate Limiting", () => {
  beforeEach(() => {
    rateLimitStore.reset();
  });

  it("allows requests within rate limit", async () => {
    const clientId = "client-1";

    const result1 = await rateLimitStore.checkLimit(clientId, limit10);
    expect(result1.allowed).toBe(true);

    const result2 = await rateLimitStore.checkLimit(clientId, limit10);
    expect(result2.allowed).toBe(true);
  });

  it("blocks requests exceeding rate limit", async () => {
    const clientId = "client-excessive";

    for (let i = 0; i < 10; i++) {
      const result = await rateLimitStore.checkLimit(clientId, limit10);
      expect(result.allowed).toBe(true);
    }

    const blocked = await rateLimitStore.checkLimit(clientId, limit10);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("tracks different clients separately", async () => {
    const client1 = "client-1";
    const client2 = "client-2";

    for (let i = 0; i < 10; i++) {
      await rateLimitStore.checkLimit(client1, limit10);
    }

    const blocked = await rateLimitStore.checkLimit(client1, limit10);
    expect(blocked.allowed).toBe(false);

    const allowed = await rateLimitStore.checkLimit(client2, limit10);
    expect(allowed.allowed).toBe(true);
  });

  it("provides retry-after time when blocked", async () => {
    const clientId = "client-retry";

    for (let i = 0; i < 10; i++) {
      await rateLimitStore.checkLimit(clientId, limit10);
    }

    const blocked = await rateLimitStore.checkLimit(clientId, limit10);

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeDefined();
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(blocked.retryAfter).toBeLessThanOrEqual(60);
  });

  it("reports usage for monitoring", async () => {
    const clientId = "client-metadata";

    await rateLimitStore.checkLimit(clientId, limit10);
    const usage = rateLimitStore.getUsage(clientId);

    expect(usage.requestsLastMinute).toBe(1);
  });

  it("handles invalid client IDs", async () => {
    await expect(rateLimitStore.checkLimit("", limit10)).rejects.toThrow();
    await expect(
      rateLimitStore.checkLimit(null as unknown as string, limit10),
    ).rejects.toThrow();
  });

  it("allows traffic when rate limiting is disabled", async () => {
    const result = await rateLimitStore.checkLimit("client-off", {
      ...limit10,
      enabled: false,
    });
    expect(result.allowed).toBe(true);
  });
});
