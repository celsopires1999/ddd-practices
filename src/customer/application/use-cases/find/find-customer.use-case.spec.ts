import Address from "../../../../@seedwork/domain/value-objects/address.vo";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find-customer.dto";
import Customer from "#customer/domain/entity/customer";
import FindCustomerUseCase from "./find-customer.use-case";

const address = new Address({
  street: "new stree",
  number: 101,
  city: "new city",
  zip: "10101-101",
});

const customer = new Customer({
  id: "101",
  name: "new customer",
  address,
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

describe("FindCustomerUseCase Unit Tests", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input: InputFindCustomerDto = { id: customer.id };
    const expectedOutput: OutputFindCustomerDto = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip,
      },
    };
    const output = await usecase.execute(input);
    expect(output).toStrictEqual(expectedOutput);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input: InputFindCustomerDto = { id: customer.id };
    expect(useCase.execute(input)).rejects.toThrow("Customer not found");
  });
});
