import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create-customer.dto";
import CreateCustomerUseCase from "./create-customer.use-case";

const input: InputCreateCustomerDto = {
  name: "John",
  address: {
    street: "Street of John",
    number: 123,
    city: "City of John",
    zip: "10101-101",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("CreateCustomerUseCase Unit Tests", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);
    const output = await useCase.execute(input);

    const expected: OutputCreateCustomerDto = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      },
    };

    expect(output).toStrictEqual(expected);
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";
    expect(useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";
    expect(useCase.execute(input)).rejects.toThrow("street is required");
  });
});
