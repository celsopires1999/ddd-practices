import Customer from "../../../customer/domain/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const order = new Order({
      id: uuid(),
      customerId: customer.id,
      items: items,
    });

    customer.addRewardPoints(order.total() / 2);

    return order;
  }
}
