import * as request from "supertest";
import  app from "../utils/Server";
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
const categoryInput = {
  name: "example",
};
const userInput = {
  email: "eren@gmail.com",
  password: "eren.1234",
};
// @ts-ignore
var token;
// @ts-ignore
var categoryId;
beforeAll(async () => {
  const connectionOptions = await getConnectionOptions();
  await createConnection({ ...connectionOptions, name: 'default' });
 
});

afterAll(async () => {
  const defaultConnection = getConnection('default');
  await defaultConnection.close();
});

describe("POST /user", () => {
  it("should return 200", async () => {
    const response = await request(app)
    .post("/api/user/login")
    .send(userInput);
    // @ts-ignore
    console.log(response.error)
    token = response.body?.data?.tokens?.access_token;

  });
});
describe("POST /category", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryInput);

    expect(response.statusCode).toBe(200);
    // @ts-ignore
    categoryId = response.body?.data?.id;

  });
});
describe("GET /category", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/api/category")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("FIND /category", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/api/category/" + categoryId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
describe("POST /category", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .put("/api/category/" + categoryId)
      .set("Authorization", `Bearer ${token}`)
      .send(categoryInput);
    expect(response.statusCode).toBe(200);
  });
});
describe("DELETE /category", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .delete("/api/category/" + categoryId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
