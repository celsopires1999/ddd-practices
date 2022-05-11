import Address from "../../../../@seedwork/domain/value-objects/address.vo";
import Customer from "../../../domain/entity/customer";
import { OutputListCustomerDto } from "./list-customer.dto";
import ListCustomerUseCase from "./list-customer.use-case";

const expectedOutput: OutputListCustomerDto = {
  customers: [
    {
      id: "CUST-1",
      name: "Customer 1",
      address: {
        street: "Customer 1 Street",
        number: 1,
        city: "Customer 1 City",
        zip: "11111-111",
      },
    },
    {
      id: "CUST-2",
      name: "Customer 2",
      address: {
        street: "Customer 2 Street",
        number: 2,
        city: "Customer 2 Street",
        zip: "Customer 2",
      },
    },
  ],
};

const mockedCustomers = expectedOutput.customers.map((customer) => {
  return new Customer({
    id: customer.id,
    name: customer.name,
    address: new Address({
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      zip: customer.address.zip,
    }),
  });
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(mockedCustomers)),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("ListCustomerUseCase Unit Tests", () => {
  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);
    const output = await usecase.execute({});

    expect(output).toStrictEqual(expectedOutput);
    expect(output.customers[0].name).toBe(expectedOutput.customers[0].name);
    expect(output.customers[0].address.street).toBe(
      expectedOutput.customers[0].address.street
    );
  });
});
