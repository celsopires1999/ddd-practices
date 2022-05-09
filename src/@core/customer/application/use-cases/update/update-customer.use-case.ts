import Address from "../../../../@seedwork/domain/value-objects/address.vo";
import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./update-customer.dto";
export class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }
  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    const address = new Address({
      street: input.address.street,
      number: input.address.number,
      city: input.address.city,
      zip: input.address.zip,
    });

    customer.changeName(input.name);
    customer.changeAddress(address);

    await this.customerRepository.update(customer);

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

export default UpdateCustomerUseCase;
