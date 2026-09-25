/**
 * Test: Follow Up Boss API Client
 * Critical path: CRM integration with rate limiting
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { FollowUpBossClient } from "./client";

function jsonResponse(body: unknown, status = 200, headers?: HeadersInit) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: new Headers(headers),
    json: async () => body,
  };
}

describe("FUB Client", () => {
  let client: FollowUpBossClient;

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    client = new FollowUpBossClient({
      apiKey: "test-key",
      enableRateLimiting: false,
      retryAttempts: 0,
    });
  });

  it("creates lead successfully", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      jsonResponse({
        id: 123,
        emails: [{ value: "john@example.com" }],
      }),
    );

    const result = await client.upsertPerson({
      firstName: "John",
      lastName: "Doe",
      emails: ["john@example.com"],
      phones: ["7025551234"],
    });

    expect(result.id).toBe(123);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/people"),
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("handles rate limiting with retry", async () => {
    client = new FollowUpBossClient({
      apiKey: "test-key",
      enableRateLimiting: false,
      retryAttempts: 1,
    });

    (global.fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(jsonResponse({}, 429, { "Retry-After": "0" }))
      .mockResolvedValueOnce(jsonResponse({ id: 123 }));

    const result = await client.upsertPerson({
      firstName: "John",
      lastName: "Doe",
      emails: ["john@example.com"],
    });

    expect(result.id).toBe(123);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("caches GET requests", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      jsonResponse({
        people: [{ id: 1, emails: [{ value: "cached@example.com" }] }],
      }),
    );

    await client.listPeople({ email: "cached@example.com" });
    await client.listPeople({ email: "cached@example.com" });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("handles API errors gracefully", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      jsonResponse({ message: "Internal server error" }, 500),
    );

    await expect(
      client.upsertPerson({
        firstName: "John",
        lastName: "Doe",
        emails: ["john@example.com"],
      }),
    ).rejects.toThrow();
  });

  it("includes custom fields in lead creation", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      jsonResponse({ id: 123 }),
    );

    await client.upsertPerson({
      firstName: "Jane",
      lastName: "Smith",
      emails: ["jane@example.com"],
      customFields: {
        priceMin: 400000,
        priceMax: 600000,
        bedrooms: 3,
        source: "website-hero",
      },
    });

    const callArg = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1];
    const bodyData = JSON.parse(callArg.body);

    expect(bodyData.customFields).toBeDefined();
    expect(bodyData.customFields.priceMin).toBe(400000);
    expect(bodyData.customFields.source).toBe("website-hero");
  });

  it("adds tags to lead", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      jsonResponse({}),
    );

    await client.addTag(123, "website");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/people/123/tags"),
      expect.objectContaining({
        method: "POST",
      }),
    );
    const callArg = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(JSON.parse(callArg.body)).toEqual({ tag: "website" });
  });

  it("retries on network errors", async () => {
    client = new FollowUpBossClient({
      apiKey: "test-key",
      enableRateLimiting: false,
      retryAttempts: 1,
    });

    (global.fetch as ReturnType<typeof vi.fn>)
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce(jsonResponse({ id: 123 }));

    const result = await client.upsertPerson({
      firstName: "John",
      lastName: "Doe",
      emails: ["john@example.com"],
    });

    expect(result.id).toBe(123);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("updates existing lead by email", async () => {
    (global.fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(
        jsonResponse({
          people: [{ id: 123, emails: [{ value: "john@example.com" }] }],
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          id: 123,
          emails: [{ value: "john@example.com" }],
          phones: [{ value: "7025559999" }],
        }),
      );

    const existing = await client.findPerson({ email: "john@example.com" });
    expect(existing?.id).toBe(123);

    const result = await client.upsertPerson({
      emails: ["john@example.com"],
      phones: ["7025559999"],
    });

    expect(result.id).toBe(123);
    expect(result.phones?.[0]?.value).toBe("7025559999");
  });
});
