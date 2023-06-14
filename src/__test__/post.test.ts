import * as request from "supertest";
import app from "../utils/Server";
import { createConnection, getConnection, getConnectionOptions } from "typeorm";

const categoryInput = {
  name: "examples",
};
const postInput = {
  name: "example",
  description: "example post",
  photoId: [],
  categoryId: [],
};
const userInput = {
  email: "eren@gmail.com",
  password: "eren.1234",
};
var token;
var postId;
var categoryId;
beforeAll(async () => {
  const connectionOptions = await getConnectionOptions();
  await createConnection({ ...connectionOptions, name: "default" });
});

afterAll(async () => {
  const defaultConnection = getConnection("default");
  await defaultConnection.close();
});

describe("POST /user", () => {
  it("should return 200", async () => {
    const response = await request(app).post("/api/user/login").send(userInput);
    // @ts-ignore
    console.log(response.error);
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

describe("POST /post", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .post("/api/post")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...postInput, categoryId: [categoryId] });

    expect(response.statusCode).toBe(200);
    // @ts-ignore
    postId = response.body?.data?.id;
  });
});

describe("GET /post", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/api/post")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("FIND /post", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/api/post/" + postId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
describe("PUT /post", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .put("/api/post/" + postId)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...postInput, categoryId: [categoryId] });
  expect(response.statusCode).toBe(200);

  });
});
describe("DELETE /post", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .delete("/api/post/" + postId)
      .set("Authorization", `Bearer ${token}`);
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
