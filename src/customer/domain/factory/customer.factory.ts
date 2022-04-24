import CustomerInterface from "#customer/domain/entity/customer.interface";
import Customer from "#customer/domain/entity/customer";
import { v4 as uuid } from "uuid";
import Address from "#seedwork/domain/value-objects/address.vo";

export default class CustomerFactory {
  public static create(name: string): CustomerInterface {
    return new Customer({ id: uuid(), name });
  }

  public static createWithAddress(
    name: string,
    address: Address
  ): CustomerInterface {
    return new Customer({ id: uuid(), name: name, address: address });
  }
}
