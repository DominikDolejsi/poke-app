import { describe, it, expect } from "vitest";
import request from "supertest";

import server from "../../server.js";

describe("apiRouter", () => {
  it("responds with Hello World", async () => {
    const response = await request(server)
      .get("/api/v1/")
      .set("accept", "application/json");

    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ message: "Hello World from API" });
  });
});
