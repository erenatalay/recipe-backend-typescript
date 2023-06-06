import * as request from "supertest";

const userInput = {
  name: "examples232",
};

describe("POST /category", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000")
      .post("/api/category")
      .send(userInput);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /category", () => {
  it("should return 200", async () => {
    const response = await request("http://localhost:3000").get(
      "/api/category"
    );
    expect(response.statusCode).toBe(200);
  });
});
