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

  it("should list all customers", async () => {
    const arrange = [
      {
        name: "John",
        address: {
          street: "New John Street",
          number: 101,
          city: "New John City",
          zip: "10101-101",
        },
      },
      {
        name: "Jane",
        address: {
          street: "New Jane Street",
          number: 202,
          city: "New Jane City",
          zip: "20202-202",
        },
      },
    ];

    for (const item of arrange) {
      const response = await request(app).post("/customer").send(item);
      expect(response.status).toBe(200);
    }

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(arrange.length);

    for (let i = 0; i < arrange.length; i++) {
      expect(listResponse.body.customers[i].name).toBe(arrange[i].name);
      expect(listResponse.body.customers[i].address.street).toBe(
        arrange[i].address.street
      );
      expect(listResponse.body.customers[i].address.number).toBe(
        arrange[i].address.number
      );
      expect(listResponse.body.customers[i].address.city).toBe(
        arrange[i].address.city
      );
      expect(listResponse.body.customers[i].address.zip).toBe(
        arrange[i].address.zip
      );
    }
  });

  it("should list all customer in XML format", async () => {
    const arrange = [
      {
        name: "John",
        address: {
          street: "New John Street",
          number: 101,
          city: "New John City",
          zip: "10101-101",
        },
      },
      {
        name: "Jane",
        address: {
          street: "New Jane Street",
          number: 202,
          city: "New Jane City",
          zip: "20202-202",
        },
      },
    ];

    for (const item of arrange) {
      const response = await request(app).post("/customer").send(item);
      expect(response.status).toBe(200);
    }

    const listResponse = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponse.text).toContain("<customers>");
    expect(listResponse.text).toContain("<name>John</name>");
    expect(listResponse.text).toContain("<address>");
    expect(listResponse.text).toContain("<street>New John Street</street>");
    expect(listResponse.text).toContain("<number>101</number>");
    expect(listResponse.text).toContain("<city>New John City</city>");
    expect(listResponse.text).toContain("<zip>10101-101</zip>");
    expect(listResponse.text).toContain("</address>");
    expect(listResponse.text).toContain("<name>Jane</name>");
    expect(listResponse.text).toContain("<street>New Jane Street</street>");
    expect(listResponse.text).toContain("<number>202</number>");
    expect(listResponse.text).toContain("<city>New Jane City</city>");
    expect(listResponse.text).toContain("<zip>20202-202</zip>");
    expect(listResponse.text).toContain("</customers>");
  });
});
