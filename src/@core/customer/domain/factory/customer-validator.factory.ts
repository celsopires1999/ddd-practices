import ValidatorInterface from "#seedwork/domain/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer-yup.validator";

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}

export default CustomerValidatorFactory;
