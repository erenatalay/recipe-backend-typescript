import * as request from "supertest";

const categoryInput = {
  name: "example",
};
const userInput = {
  email: "eren@gmail.com",
  password: "eren.1234",
};
var token;
var categoryId;

beforeAll(async () => {
  const response = await request("http://localhost:3000/api")
    .post("/user/login")
    .send(userInput);
  token = response.body.data.tokens.access_token;
});

describe("POST /category", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000")
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryInput);
    expect(response.statusCode).toBe(200);
    categoryId = response.body.data.id;

  });
});
describe("GET /category", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000")
      .get("/api/category")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("FIND /category", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000")
      .get("/api/category/" + categoryId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
describe("POST /category", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000")
      .put("/api/category/" + categoryId)
      .set("Authorization", `Bearer ${token}`)
      .send(categoryInput);
    expect(response.statusCode).toBe(200);
  });
});
describe("DELETE /category", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000")
      .delete("/api/category/" + categoryId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
