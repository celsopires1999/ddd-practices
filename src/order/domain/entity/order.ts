import OrderItem from "./order-item";
import OrderInterface from "./order.interface";

export interface OrderProperties {
  id: string;
  customerId: string;
  items: OrderItem[];
}

export default class Order implements OrderInterface {
  constructor(public readonly props: OrderProperties) {
    Order.validate(props);
  }

  get id(): string {
    return this.props.id;
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  static validate(props: OrderProperties) {
    Order.validateId(props.id);
    Order.validateCustomerId(props.customerId);
    Order.validateItems(props.items);
  }

  private static validateId(id: string) {
    if (Order.isEmpty(id)) {
      throw new Error("Id is required");
    }
    if (typeof id !== "string") {
      throw new Error("Id must be a string");
    }
    if (id.length === 0) {
      throw new Error("Id is required");
    }
  }

  private static validateCustomerId(customerId: string) {
    if (Order.isEmpty(customerId)) {
      throw new Error("Customer is required");
    }

    if (typeof customerId !== "string") {
      throw new Error("Customer must be a string");
    }
    if (customerId.length === 0) {
      throw new Error("Customer is required");
    }
  }

  private static validateItems(items: OrderItem[]) {
    if (Order.isEmpty(items)) {
      throw new Error("Item is required");
    }

    if (!Array.isArray(items)) {
      throw new Error("Item must be an array of OrderItem");
    }

    if (items.length === 0) {
      throw new Error("Item is required");
    }

    items.forEach((item) => {
      if (!(item instanceof OrderItem)) {
        throw new Error("Item must be an instance of OrderItem");
      }
    });
  }

  private static isEmpty(value: any): boolean {
    return value === null || value === undefined;
  }

  total() {
    const total = this.props.items.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );
    return Math.round(total * 100) / 100;
  }
}
