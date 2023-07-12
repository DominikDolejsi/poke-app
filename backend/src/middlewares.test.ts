import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import bcrypt from "bcrypt";

import server from "./server.js";

describe("middlewares", () => {
  let accesToken: string;
  let adminAccesToken: string;

  beforeAll(async () => {
    const requestBody = {
      email: "someemail@email.com",
      password: "password",
    };

    const response = await request(server).post("/login").send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.accessToken).toBeTypeOf("string");
    expect(response.body.accessToken.length).toBeGreaterThan(0);

    accesToken = response.body.accessToken;

    const adminRequestBody = {
      password: "password1234",
      email: "dominik@gmail.com",
    };

    const adminResponse = await request(server)
      .post("/login")
      .send(adminRequestBody);

    expect(response.statusCode).toBe(200);
    expect(adminResponse.body).toHaveProperty("accessToken");
    expect(adminResponse.body.accessToken).toBeTypeOf("string");
    expect(adminResponse.body.accessToken.length).toBeGreaterThan(0);

    adminAccesToken = adminResponse.body.accessToken;
  });

  describe("authorize user", () => {
    it("should return all users", async () => {
      const response = await request(server)
        .get("/api/v1/users")
        .set("accept", "application/json")
        .set("authorization", `Bearer ${adminAccesToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
    it("should throw unauthorized error", async () => {
      const response = await request(server)
        .get("/api/v1/users")
        .set("accept", "application/json")
        .set("authorization", `Bearer ${accesToken}`);

      expect(response.statusCode).toBe(403);
      expect(response.body).toEqual({
        message: "Unauthorzied access",
      });
    });
  });

  describe("verify jsonwebtoken", () => {
    it("should return all users", async () => {
      const response = await request(server)
        .get("/api/v1/users")
        .set("accept", "application/json")
        .set("authorization", `Bearer ${adminAccesToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
    it("should throw authentication error", async () => {
      const response = await request(server)
        .get("/api/v1/users")
        .set("accept", "application/json")
        .set("authorization", `Bearer whatisthiseven`);

      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual({
        message: "jwt malformed",
      });
    });
  });

  describe("hash password", () => {
    it("should return hashed password", async () => {
      const response = await request(server)
        .get("/api/v1/users/b33ed0ed-d8eb-4b6b-8826-6bc865beae96")
        .set("accept", "application/json")
        .set("authorization", `Bearer ${adminAccesToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();

      const isHashed = await bcrypt.compare(
        "password1234",
        response.body.password,
      );
      expect(isHashed).toBeTruthy;
    });
  });

  describe("validate request", () => {
    it("should create user", async () => {
      const requestBody = {
        password: "testpassword",
        name: "dummyname",
        email: "dummy@email.com",
      };
      const response = await request(server)
        .post("/api/v1/users")
        .set("accept", "application/json")
        .set("authorization", `Bearer ${adminAccesToken}`)
        .send(requestBody);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("admin");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("password");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("createdAt");
      expect(response.body).toHaveProperty("updatedAt");
      expect(response.body).toHaveProperty("refreshToken");

      const delResponse = await request(server)
        .delete(`/api/v1/users/${response.body.id}`)
        .set("accept", "application/json")
        .set("authorization", `Bearer ${adminAccesToken}`);

      expect(delResponse.statusCode).toBe(204);
    });
    it("should throw 422 error", async () => {
      const requestBody = {
        password: "test",
        name: "dummyname",
        email: "dummy@email.com",
      };
      const response = await request(server)
        .post("/api/v1/users")
        .set("accept", "application/json")
        .set("authorization", `Bearer ${adminAccesToken}`)
        .send(requestBody);

      expect(response.statusCode).toBe(422);
      expect(response.body).toHaveProperty("name", "ZodError");
    });
  });
  // describe("handle error", () => {
  //   it("should throw error", () => {});
  // });
  describe("handle not found", () => {
    it("should respond with not found message", async () => {
      const response = await request(server)
        .get("/api/v1/what")
        .set("accept", "application/json")
        .set("authorization", `Bearer ${adminAccesToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: "404 - Resource not found" });
    });
  });
});
