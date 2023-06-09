import * as request from "supertest";
import  app from "../utils/Server";
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
const wishListInput = {
  postId: "example",
};
const userInput = {
  email: "eren@gmail.com",
  password: "eren.1234",
};
// @ts-ignore
var token;
// @ts-ignore
var wishlistId;
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
describe("POST /wishlist", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .post("/api/wishlist")
      .set("Authorization", `Bearer ${token}`)
      .send(wishListInput);

    expect(response.statusCode).toBe(200);
    // @ts-ignore
    wishlistId = response.body?.data?.id;

  });
});
describe("GET /wishlist", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/api/wishlist")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("FIND /wishlist", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/api/wishlist/" + wishlistId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
describe("POST /wishlist", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .put("/api/wishlist/" + wishlistId)
      .set("Authorization", `Bearer ${token}`)
      .send(wishListInput);
    expect(response.statusCode).toBe(200);
  });
});
describe("DELETE /wishlist", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .delete("/api/wishlist/" + wishlistId)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
