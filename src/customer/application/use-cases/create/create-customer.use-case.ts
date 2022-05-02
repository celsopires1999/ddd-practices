import Address from "../../..//../@seedwork/domain/value-objects/address.vo";
import CustomerFactory from "../../../domain/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create-customer.dto";

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }
  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const address = new Address({
      street: input.address.street,
      number: input.address.number,
      city: input.address.city,
      zip: input.address.zip,
    });
    const customer = CustomerFactory.createWithAddress(input.name, address);

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip,
      },
    };
  }
}

export default CreateCustomerUseCase;
