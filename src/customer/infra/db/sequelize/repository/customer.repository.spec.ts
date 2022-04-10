import Customer from "../../../../domain/entity/customer";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../model/customer.model";
import CustomerRepository from "./customer.repository";
import Address from "../../../../../@seedwork/domain/value-objects/address.vo";

describe("Customer Repository Test", () => {
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

  it("should throw an error when creating a customer twice ", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer({
      id: "1",
      name: "customer one",
      active: false,
    });
    await customerRepository.create(customer);
    expect(async () => {
      await customerRepository.create(customer);
    }).rejects.toThrowError("Error by creating a CustomerModel: 1");
  });

  it("should throw an error when updating an inexisting customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address({
      street: "New Street",
      number: 707,
      city: "New City",
      zip: "77777-000",
    });
    const customer = new Customer({
      id: "1",
      name: "Customer Name",
      active: true,
      address,
    });

    expect(async () => {
      await customerRepository.update(customer);
    }).rejects.toThrowError("CustomerModel not found on updating: 1");
  });

  it("should throw an error when trying to find an inexisting customer", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("Fake Id");
    }).rejects.toThrowError("Customer not found");
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address({
      street: "New Street",
      number: 707,
      city: "New City",
      zip: "77777-000",
    });
    const customer = new Customer({
      id: "1",
      name: "Customer Name",
      active: false,
      address,
    });

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      street: customer.address.value.street,
      number: customer.address.value.number,
      zip: customer.address.value.zip,
      city: customer.address.value.city,
      reward_points: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address({
      street: "New Street",
      number: 707,
      city: "New City",
      zip: "77777-000",
    });
    const customer = new Customer({
      id: "1",
      name: "Customer Name",
      active: true,
      address,
    });

    await customerRepository.create(customer);

    customer.changeName("New Name");
    customer.deactivate();
    customer.removeAddress();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      street: customer.address?.street ? customer.address.street : null,
      number: customer.address?.number ? customer.address.street : null,
      city: customer.address?.city ? customer.address.street : null,
      zip: customer.address?.zip ? customer.address.street : null,
      reward_points: customer.rewardPoints,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address({
      street: "New Street",
      number: 707,
      city: "New City",
      zip: "77777-000",
    });
    const customer = new Customer({
      id: "1",
      name: "Customer Name",
      active: true,
      address,
    });

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find("1");

    expect(foundCustomer).toStrictEqual(customer);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address({
      street: "Customer Street",
      number: 707,
      zip: "77777-000",
      city: "Customer City",
    });

    const customer1 = new Customer({
      id: "1",
      name: "customer one",
      active: false,
      address,
    });
    customer1.activate();
    customer1.addRewardPoints(10);

    const customer2 = new Customer({
      id: "2",
      name: "customer two",
      active: false,
    });
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(foundCustomers.length).toBe(2);
    expect(foundCustomers).toEqual(customers);
    expect(foundCustomers).toContainEqual(customer1);
    expect(foundCustomers).toContainEqual(customer2);
  });

  it("should find zero customers", async () => {
    const customerRepository = new CustomerRepository();

    const foundCustomers = await customerRepository.findAll();
    console.log("foundCustomers: ", foundCustomers);
    expect(foundCustomers.length).toBe(0);
  });
});
