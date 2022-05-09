import Address from "../../../../@seedwork/domain/value-objects/address.vo";
import Customer from "../../../domain/entity/customer";
import { InputUpdateCustomerDto } from "./update-customer.dto";
import UpdateCustomerUseCase from "./update-customer.use-case";

const address = new Address({
  street: "New Street",
  number: 101,
  city: "New City",
  zip: "10101-101",
});

const customer = new Customer({
  id: "CUST-4711",
  name: "New Customer",
  address: address,
  active: true,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: "New Customer Updated",
  address: {
    street: "New Street Updated",
    number: 111,
    city: "New City Updated",
    zip: "11111-000",
  },
};

describe("UpdateCustomerUseCase Unit Tests", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);
    const output = await useCase.execute(input);
    expect(output).toStrictEqual(input);
  });

  it("should throw an error when customer is not found by updating", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const useCase = new UpdateCustomerUseCase(customerRepository);
    expect(useCase.execute(input)).rejects.toThrow("Customer not found");
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();

    input.name = "";
    const useCase = new UpdateCustomerUseCase(customerRepository);
    expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();

    input.address.street = null;
    const useCase = new UpdateCustomerUseCase(customerRepository);
    expect(useCase.execute(input)).rejects.toThrow("street is required");
  });
});
