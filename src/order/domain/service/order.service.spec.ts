import OrderService from "./order.service";
import OrderItem from "../entity/order-item";
import Order from "../entity/order";
import Customer from "../../../customer/domain/entity/customer";

describe("Order service unit tests", () => {
  it("should throw an error when placing an order without item", () => {
    const customer = new Customer({ id: "c1", name: "customer 1" });
    const orderItems: any = [];

    expect(() => OrderService.placeOrder(customer, orderItems)).toThrowError(
      "Item is required"
    );
  });

  it("should place an order", () => {
    const customer = new Customer({ id: "c1", name: "customer 1" });
    const orderItems = [
      new OrderItem({
        id: "i1",
        name: "item 1",
        price: 5,
        productId: "4711",
        quantity: 2,
      }),
    ];

    const order = OrderService.placeOrder(customer, orderItems);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const firstOrderItems: OrderItem[] = [
      new OrderItem({
        id: "1",
        productId: "product 1",
        name: "item 1",
        price: 1,
        quantity: 1,
      }),
      new OrderItem({
        id: "2",
        productId: "product 2",
        name: "item 2",
        price: 2,
        quantity: 2,
      }),
    ];

    const secondOrderItems: OrderItem[] = [
      new OrderItem({
        id: "3",
        productId: "product 3",
        name: "item 3",
        price: 3,
        quantity: 3,
      }),
      new OrderItem({
        id: "4",
        productId: "product 4",
        name: "item 4",
        price: 4,
        quantity: 4,
      }),
    ];

    const orders: Order[] = [
      new Order({
        id: "1",
        customerId: "1",
        items: firstOrderItems,
      }),
      new Order({
        id: "2",
        customerId: "2",
        items: secondOrderItems,
      }),
    ];
    expect(OrderService.total(orders)).toBe(30);
  });
});
