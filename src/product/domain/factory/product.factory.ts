import Product from "#product/domain/entity/product";
import ProductB from "#product/domain/entity/product-b";
import ProductInterface from "#product/domain/entity/product.interface";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
  public static create(props: ProductFactoryProps): ProductInterface {
    switch (props.type) {
      case ProductType.A:
        return new Product({
          id: uuid(),
          name: props.name,
          price: props.price,
        });
      case ProductType.B:
        return new ProductB({
          id: uuid(),
          name: props.name,
          price: props.price,
        });
      default:
        throw new Error("Product type not supported");
    }
  }
}

export type ProductFactoryProps = {
  type: ProductType;
  name: string;
  price: number;
};

export enum ProductType {
  A = "A",
  B = "B",
}
