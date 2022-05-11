import OrderFactory, { OrderFactoryProps } from "./order.factory";
import { v4 as uuid } from "uuid";

describe("Order Factory Unit Tests", () => {
  it("should create an order", () => {
    const orderProps: OrderFactoryProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "product 1",
          productId: uuid(),
          price: 1.11,
          quantity: 1,
        },
        {
          id: uuid(),
          name: "product 2",
          productId: uuid(),
          price: 2.22,
          quantity: 2,
        },
      ],
    };
    const order = OrderFactory.create(orderProps);
    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    for (let i = 0; i < orderProps.items.length; i++) {
      expect(order.items[i].id).toBe(orderProps.items[i].id);
      expect(order.items[i].name).toBe(orderProps.items[i].name);
      expect(order.items[i].productId).toBe(orderProps.items[i].productId);
      expect(order.items[i].price).toBe(orderProps.items[i].price);
      expect(order.items[i].quantity).toBe(orderProps.items[i].quantity);
    }
    expect(order.total()).toBe(5.55);
  });
});
