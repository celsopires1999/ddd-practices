import * as yup from "yup";
import ValidatorInterface from "#seedwork/domain/validator/validator.interface";
import Customer from "#customer/domain/entity/customer";

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required").nullable(),
          name: yup.string().required("Name is required").nullable(),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },

          { abortEarly: false }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}

export default CustomerYupValidator;
