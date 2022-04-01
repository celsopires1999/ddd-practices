import OrderItem from "./order-item";

export interface OrderProperties {
  id: string;
  customerId: string;
  items: OrderItem[];
}

export default class Order {
  constructor(public readonly props: OrderProperties) {
    this.validate();
  }

  get items(): OrderItem[] {
    return this.props.items;
  }

  private validate() {
    if (!this.props.id || this.props.id.length === 0) {
      throw new Error("Id is required");
    }
    if (!this.props.customerId || this.props.customerId.length === 0) {
      throw new Error("Customer is required");
    }
    if (!this.props.items || this.props.items.length === 0) {
      throw new Error("Item is required");
    }
  }

  total() {
    const total = this.props.items.reduce(
      (acc, item) => acc + item.props.price,
      0
    );
    return Math.round(total * 100) / 100;
  }
}
