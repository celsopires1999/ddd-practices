import ProductInterface from "./product.interface";
export interface ProductBProperties {
  id: string;
  name: string;
  price: number;
}

export default class ProductB implements ProductInterface {
  constructor(public readonly props: ProductBProperties) {
    ProductB.validate(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price * 2;
  }

  changeName(name: string) {
    ProductB.validateName(name);
    this.props.name = name;
  }

  changePrice(price: number) {
    ProductB.validatePrice(price);
    this.props.price = price;
  }

  private static validate(props: ProductBProperties) {
    ProductB.validateId(props.id);
    ProductB.validateName(props.name);
    ProductB.validatePrice(props.price);
  }

  private static validateId(id: string) {
    if (typeof id !== "string") {
      throw new Error("Id must be a string");
    }
    if (ProductB.isEmpty(id) || id.length === 0) {
      throw new Error("Id is required");
    }
  }

  private static validateName(name: string) {
    if (typeof name !== "string") {
      throw new Error("name must be a string");
    }
    if (ProductB.isEmpty(name) || name.length === 0) {
      throw new Error("name is required");
    }
  }

  private static validatePrice(price: number) {
    if (typeof price !== "number") {
      throw new Error("price must be a number");
    }
    if (ProductB.isEmpty(price) || price === 0) {
      throw new Error("price is required");
    }
    if (price <= 0) {
      throw new Error("price must be greater than zero");
    }
  }

  private static isEmpty(value: any): boolean {
    return value === null || value === undefined;
  }
}
