import { OutputListCustomerDto } from "#customer/application/use-cases/list/list-customer.dto";
import { toXML } from "jstoxml";

export class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: data.customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            zip: customer.address.zip,
          },
        })),
      },
      xmlOption
    );
  }
}

export default CustomerPresenter;
