import { app, sequelize } from "../express";
import request from "supertest";

describe("Customer E2E Tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "New Street",
          number: 101,
          city: "New City",
          zip: "10101-101",
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("New Street");
    expect(response.body.address.number).toBe(101);
    expect(response.body.address.city).toBe("New City");
    expect(response.body.address.zip).toBe("10101-101");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
    });
    expect(response.status).toBe(500);
  });
});
