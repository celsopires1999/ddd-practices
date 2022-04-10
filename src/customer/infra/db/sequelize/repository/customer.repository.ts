import CustomerRepositoryInterface from "../../../../domain/repository/customer-repository.interface";
import Customer from "../../../../domain/entity/customer";
import CustomerModel from "../model/customer.model";
import Address from "../../../../../@seedwork/domain/value-objects/address.vo";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    try {
      await CustomerModel.create({
        id: entity.id,
        name: entity.name,
        active: entity.isActive,
        street: entity.address?.street ? entity.address.street : null,
        number: entity.address?.number ? entity.address.number : null,
        zip: entity.address?.zip ? entity.address.zip : null,
        city: entity.address?.city ? entity.address.city : null,
        reward_points: entity.rewardPoints,
      });
    } catch (e) {
      console.log(e);
      throw new Error(`Error by creating a CustomerModel: ${entity.id}`);
    }
  }

  async update(entity: Customer): Promise<void> {
    let affectedCount: any;

    try {
      affectedCount = await CustomerModel.update(
        {
          name: entity.name,
          active: entity.isActive,
          street: entity.address?.street ? entity.address.street : null,
          number: entity.address?.number ? entity.address.number : null,
          zip: entity.address?.zip ? entity.address.zip : null,
          city: entity.address?.city ? entity.address.city : null,
          reward_points: entity.rewardPoints,
        },
        {
          where: {
            id: entity.id,
          },
        }
      );
    } catch (e) {
      console.log(e);
      throw new Error(`Error by updating a CustomerModel: ${entity.id}`);
    }

    if (affectedCount[0] === 0) {
      throw new Error(`CustomerModel not found on updating: ${entity.id}`);
    }
  }
  async find(id: string): Promise<Customer> {
    let address: Address;
    let customerModel: CustomerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
    } catch (e) {
      throw new Error("Customer not found");
    }

    if (customerModel.street !== null) {
      address = new Address({
        street: customerModel.street,
        number: customerModel.number,
        zip: customerModel.zip,
        city: customerModel.city,
      });
    }

    const customer = new Customer({
      id: customerModel.id,
      name: customerModel.name,
      active: customerModel.active,
      address,
    });

    customer.addRewardPoints(customerModel.reward_points);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map((customerModel) => {
      let address: Address;

      if (customerModel.street !== null) {
        address = new Address({
          street: customerModel.street,
          number: customerModel.number,
          zip: customerModel.zip,
          city: customerModel.city,
        });
      }

      const customer = new Customer({
        id: customerModel.id,
        name: customerModel.name,
        active: customerModel.active,
        address,
      });

      customer.addRewardPoints(customerModel.reward_points);
      return customer;
    });
  }
}
