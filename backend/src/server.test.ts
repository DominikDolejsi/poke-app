import { describe, it, expect } from "vitest";
import request from "supertest";

import server from "./server.js";

describe("server", () => {
  it("responds with a not found message", async () => {
    const response = await request(server)
      .get("/what-is-this-even")
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: "404 - Resource not found" });
  });
});
