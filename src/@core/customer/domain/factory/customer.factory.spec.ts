import Address from "#seedwork/domain/value-objects/address.vo";
import Customer from "../entity/customer";
import CustomerFactory from "./customer.factory";

describe("Customer Factory Unit Tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address({
      street: "New Street",
      number: 101,
      city: "New City",
      zip: "10101-001",
    });
    const customer = CustomerFactory.createWithAddress("John", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toStrictEqual(address);
    expect(customer).toBeInstanceOf(Customer);
  });
});
