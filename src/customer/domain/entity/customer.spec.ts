import Address from "../../../@seedwork/domain/value-objects/address.vo";
import Customer, { CustomerProperties } from "./customer";

describe("Customer Unit Tests", () => {
  it("should throw an error when Id is empty", () => {
    const arrange: CustomerProperties[] = [
      { id: "", name: "Customer Name" },
      { id: null, name: "Customer Name" },
      { id: undefined, name: "Customer Name" },
    ];
    arrange.forEach((item) => {
      expect(() => new Customer(item)).toThrowError("Id is required");
    });
  });

  it("should throw an error when Name is empty", () => {
    const arrange: CustomerProperties[] = [
      { id: "123", name: "" },
      { id: "123", name: null },
      { id: "123", name: undefined },
    ];
    arrange.forEach((item) => {
      expect(() => new Customer(item)).toThrowError("Name is required");
    });
  });

  it("should create a customer", () => {
    const entity = new Customer({ id: "123", name: "Customer Name" });
    expect(entity.id).toBe("123");
    expect(entity.name).toBe("Customer Name");
  });

  it("should change customer name", () => {
    const entity = new Customer({ id: "123", name: "Customer Name" });
    entity.changeName("New Customer Name");
    expect(entity.name).toBe("New Customer Name");
  });

  it("should not change customer name", () => {
    const entity = new Customer({ id: "123", name: "Customer Name" });
    try {
      entity.changeName("");
    } catch (error) {
      expect(entity.name).toBe("Customer Name");
    }
  });

  it("should activate a customer", () => {
    const entity = new Customer({ id: "123", name: "Customer Name" });
    const address = new Address({
      street: "Test street",
      number: 333,
      zip: "55555",
      city: "City Test",
    });
    entity.address = address;
    entity.activate();
    expect(entity.isActive).toBeTruthy();
  });

  it("should deactivate a customer", () => {
    const entity = new Customer({ id: "123", name: "Customer Name" });
    entity.deactivate();
    expect(entity.isActive).toBeFalsy();
  });

  it("should throw an error when activate a customer without address", () => {
    const entity = new Customer({ id: "123", name: "Customer Name" });
    expect(() => entity.activate()).toThrowError(
      "Address is required to activate a customer"
    );
  });
});
