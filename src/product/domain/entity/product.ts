export interface ProductProperties {
  id: string;
  name: string;
  price: number;
}

export default class Product {
  constructor(public readonly props: ProductProperties) {
    Product.validate(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  changeName(name: string) {
    Product.validateName(name);
    this.props.name = name;
  }

  changePrice(price: number) {
    Product.validatePrice(price);
    this.props.price = price;
  }

  private static validate(props: ProductProperties) {
    Product.validateId(props.id);
    Product.validateName(props.name);
    Product.validatePrice(props.price);
  }

  private static validateId(id: string) {
    if (typeof id !== "string") {
      throw new Error("Id must be a string");
    }
    if (Product.isEmpty(id) || id.length === 0) {
      throw new Error("Id is required");
    }
  }

  private static validateName(name: string) {
    if (typeof name !== "string") {
      throw new Error("name must be a string");
    }
    if (Product.isEmpty(name) || name.length === 0) {
      throw new Error("name is required");
    }
  }

  private static validatePrice(price: number) {
    if (typeof price !== "number") {
      throw new Error("price must be a number");
    }
    if (Product.isEmpty(price) || price === 0) {
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
