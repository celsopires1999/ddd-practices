import OrderItem from "#order/domain/entity/order-item";
import Order from "#order/domain/entity/order";

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map(
      (item) =>
        new OrderItem({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })
    );

    return new Order({ id: props.id, customerId: props.customerId, items });
  }
}

export type OrderFactoryProps = {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
};
