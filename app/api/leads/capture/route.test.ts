/**
 * Test: /api/leads/capture Route Handler
 * Critical path: Lead generation API endpoint
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const mocks = vi.hoisted(() => ({
  findPerson: vi.fn(),
  upsertPerson: vi.fn(),
  addTag: vi.fn(),
  createEvent: vi.fn(),
}));

vi.mock("@/lib/fub/client", () => ({
  FollowUpBossClient: class {
    findPerson = mocks.findPerson;
    upsertPerson = mocks.upsertPerson;
    addTag = mocks.addTag;
    createEvent = mocks.createEvent;
  },
}));

function captureRequest(body: Record<string, unknown>) {
  return new Request("http://localhost:3000/api/leads/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as import("next/server").NextRequest;
}

describe("POST /api/leads/capture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.findPerson.mockResolvedValue(null);
    mocks.upsertPerson.mockResolvedValue({ id: 123 });
    mocks.addTag.mockResolvedValue(undefined);
    mocks.createEvent.mockResolvedValue({ id: "evt-1" });
  });

  it("creates lead with valid data", async () => {
    const response = await POST(
      captureRequest({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "7025551234",
        message: "Interested in buying",
        source: "website-form",
        stage: "New Lead",
        tags: ["website"],
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.personId).toBe(123);
    expect(mocks.findPerson).toHaveBeenCalledWith({
      email: "john@example.com",
    });
    expect(mocks.upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
        emails: [{ value: "john@example.com" }],
        stage: "New Lead",
      }),
    );
    expect(mocks.addTag).toHaveBeenCalledWith(123, "website");
    expect(mocks.createEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Inbound Lead",
        personId: 123,
      }),
    );
  });

  it("returns 400 for missing required fields", async () => {
    const response = await POST(
      captureRequest({
        phone: "7025551234",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("required");
  });

  it("returns 400 for invalid email", async () => {
    const response = await POST(
      captureRequest({
        firstName: "John",
        lastName: "Doe",
        email: "not-an-email",
        phone: "7025551234",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("email");
    expect(mocks.upsertPerson).not.toHaveBeenCalled();
  });

  it("handles FUB API errors gracefully", async () => {
    mocks.upsertPerson.mockRejectedValueOnce(new Error("FUB API unavailable"));

    const response = await POST(
      captureRequest({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });

  it("enriches lead with source and tags", async () => {
    await POST(
      captureRequest({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        source: "hero-section",
        stage: "Hot Lead",
        tags: ["website", "hero-cta", "q1-2026"],
      }),
    );

    expect(mocks.upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "hero-section",
        stage: "Hot Lead",
      }),
    );
    expect(mocks.addTag).toHaveBeenCalledWith(123, "website");
    expect(mocks.addTag).toHaveBeenCalledWith(123, "hero-cta");
    expect(mocks.addTag).toHaveBeenCalledWith(123, "q1-2026");
  });

  it("handles property search criteria", async () => {
    await POST(
      captureRequest({
        firstName: "Buyer",
        lastName: "Jones",
        email: "buyer@example.com",
        priceMin: 400000,
        priceMax: 600000,
        bedrooms: 3,
        bathrooms: 2.5,
        timeline: "1-3 months",
        preApproved: true,
      }),
    );

    expect(mocks.upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        customFields: expect.objectContaining({
          priceMin: 400000,
          priceMax: 600000,
          bedrooms: 3,
          bathrooms: 2.5,
          timeline: "1-3 months",
          preApproved: true,
        }),
      }),
    );
    expect(mocks.createEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Property Search",
        personId: 123,
      }),
    );
  });

  it("sanitizes input data", async () => {
    await POST(
      captureRequest({
        firstName: '<script>alert("xss")</script>',
        lastName: "Doe",
        email: "test@example.com",
      }),
    );

    const callArg = mocks.upsertPerson.mock.calls[0][0] as { name: string };
    expect(callArg.name).not.toContain("<script>");
    expect(callArg.name).toContain("Doe");
  });
});
