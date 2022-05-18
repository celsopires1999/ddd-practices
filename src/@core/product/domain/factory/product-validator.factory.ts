import ProductInterface from "../entity/product.interface";
import ValidatorInterface, {
  ProductYupValidator,
} from "../entity/validator/product-yup.validator";

export class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator();
  }
}

export default ProductValidatorFactory;
