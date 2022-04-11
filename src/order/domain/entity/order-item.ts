export interface OrderItemProperties {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default class OrderItem {
  constructor(public readonly props: OrderItemProperties) {
    OrderItem.validate(props);
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

  get quantity(): number {
    return this.props.quantity;
  }

  get productId(): string {
    return this.props.productId;
  }

  get subTotal(): number {
    return this.props.price * this.props.quantity;
  }

  private static validate(props: OrderItemProperties) {
    OrderItem.validateId(props.id);
    OrderItem.validateProductId(props.productId);
    OrderItem.validateName(props.name);
    OrderItem.validatePrice(props.price);
    OrderItem.validateQuantity(props.quantity);
  }

  private static validateId(id: string) {
    if (OrderItem.isEmpty(id)) {
      throw new Error("Id is required");
    }
    if (typeof id !== "string") {
      throw new Error("Id must be a string");
    }
    if (id.length === 0) {
      throw new Error("Id is required");
    }
  }

  private static validateProductId(productId: string) {
    if (OrderItem.isEmpty(productId)) {
      throw new Error("productId is required");
    }

    if (typeof productId !== "string") {
      throw new Error("productId must be a string");
    }
    if (productId.length === 0) {
      throw new Error("productId is required");
    }
  }

  private static validateName(name: string) {
    if (typeof name !== "string") {
      throw new Error("name must be a string");
    }
    if (OrderItem.isEmpty(name) || name.length === 0) {
      throw new Error("name is required");
    }
  }

  private static validatePrice(price: number) {
    if (typeof price !== "number") {
      throw new Error("price must be a number");
    }
    if (OrderItem.isEmpty(price) || price === 0) {
      throw new Error("price is required");
    }
    if (price <= 0) {
      throw new Error("price must be greater than zero");
    }
  }

  private static validateQuantity(quantity: number) {
    if (typeof quantity !== "number") {
      throw new Error("quantity must be a number");
    }
    if (OrderItem.isEmpty(quantity) || quantity === 0) {
      throw new Error("quantity is required");
    }
    if (quantity <= 0) {
      throw new Error("quantity must be greater than zero");
    }
  }

  private static isEmpty(value: any): boolean {
    return value === null || value === undefined;
  }
}
