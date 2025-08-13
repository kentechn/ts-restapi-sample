import { describe, it, expect } from "vitest";
import app from "@/app.js";

describe("Health Route", () => {
  it("should return ok status", async () => {
    const res = await app.request("/api/v1/health");
    
    expect(res.status).toBe(200);
    
    const json = await res.json();
    expect(json).toEqual({
      status: "ok",
    });
  });

  it("should have correct content-type", async () => {
    const res = await app.request("/api/v1/health");
    
    expect(res.headers.get("content-type")).toContain("application/json");
  });
});
