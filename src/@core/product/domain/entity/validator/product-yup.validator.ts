import * as yup from "yup";
import ValidatorInterface from "#seedwork/domain/validator/validator.interface";
import ProductInterface from "../product.interface";

export class ProductYupValidator
  implements ValidatorInterface<ProductInterface>
{
  validate(entity: ProductInterface): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("name is required"),
          price: yup.number().required("price is required").moreThan(0),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },

          { abortEarly: false }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({ context: "product", message: error });
      });
    }
  }
}

export default ValidatorInterface;
