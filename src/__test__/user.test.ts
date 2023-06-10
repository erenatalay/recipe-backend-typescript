import * as request from "supertest";
import app from "../utils/Server";
import { createConnection, getConnection, getConnectionOptions } from "typeorm";

const userInput = {
  firstname: "example",
  lastname: "example",
  username: "example",
  email: "example@gmail.com",
  password: "example.1234",
  confirm_password: "example.1234",
  gender: "man",
};

const userChangePassword = {
  password: "example.12345",
  confirm_password: "example.12345",
};
const userLogin = {
  email: "example@gmail.com",
  password: "example.12345",
};

let token;

beforeAll(async () => {
  const connectionOptions = await getConnectionOptions();
  await createConnection({ ...connectionOptions, name: "default" });
});

afterAll(async () => {
  const defaultConnection = getConnection("default");
  await defaultConnection.close();
});

describe("POST /user/register", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .post("/api/user/register")
      .send(userInput);
    expect(response.statusCode).toBe(200);
  });
});
describe("POST /user/login", () => {
    it("should return 200", async () => {
      const response = await request(app).post("/api/user/login").send({email : userInput.email,password : userInput.password});
      token = response.body?.data?.tokens?.access_token;
      expect(response.statusCode).toBe(200);
    });
  });
describe("PUT /user/change-password", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .put("/api/user/change-password")
      .send(userChangePassword)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
describe("POST /user/login", () => {
    it("should return 200", async () => {
      const response = await request(app).post("/api/user/login").send(userLogin);
      token = response.body?.data?.tokens?.access_token;
      expect(response.statusCode).toBe(200);
    });
  });
describe("PUT /user/change-password", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .put("/api/user/change-password")
      .send(userChangePassword)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /user/me", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/api/user/me")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE /user", () => {
    it("should return 200", async () => {
      const response = await request(app)
        .delete("/api/user")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
  
