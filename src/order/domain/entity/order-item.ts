export interface OrderItemProperties {
  id: string;
  name: string;
  price: number;
}

export default class OrderItem {
  constructor(public readonly props: OrderItemProperties) {
    this.validate();
  }

  private validate() {
    console.log("TBD");
  }
}
