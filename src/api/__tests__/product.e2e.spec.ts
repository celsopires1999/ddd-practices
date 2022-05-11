import { app, sequelize } from "../express";
import request from "supertest";

describe("Product E2E Tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "A",
      name: "Product 1",
      price: 1.01,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(1.01);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const arrange = [
      {
        type: "A",
        name: "Product 1",
        price: 1.01,
      },
      {
        type: "B",
        name: "Product 2",
        price: 1.01,
      },
    ];

    const expected = [
      {
        name: "Product 1",
        price: 1.01,
      },
      {
        name: "Product 2",
        price: 2.02,
      },
    ];

    for (const item of arrange) {
      const response = await request(app).post("/product").send(item);
      expect(response.status).toBe(200);
    }

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(arrange.length);

    for (let i = 0; i < arrange.length; i++) {
      expect(listResponse.body.products[i].name).toBe(expected[i].name);
      expect(listResponse.body.products[i].price).toBe(expected[i].price);
    }
  });
});
