import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infra/db/sequelize/repository/customer.repository";
import Address from "../../../../@seedwork/domain/value-objects/address.vo";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find-customer.dto";
import Customer from "#customer/domain/entity/customer";
import FindCustomerUseCase from "./find-customer.use-case";

let sequelize: Sequelize;

beforeEach(async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });
  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
});

afterEach(async () => {
  await sequelize.close();
});

it("should find a customer", async () => {
  const customerRepository = new CustomerRepository();
  const usecase = new FindCustomerUseCase(customerRepository);

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

  await customerRepository.create(customer);

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
