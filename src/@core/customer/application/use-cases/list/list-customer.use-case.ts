import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list-customer.dto";
import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";

export class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }
  async execute(_input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zip,
        },
      })),
    };
  }
}
export default ListCustomerUseCase;
