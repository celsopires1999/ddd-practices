import Customer from "../../../customer/domain/entity/customer";
import Order from "./order";
import OrderItem, { OrderItemProperties } from "./order-item";
import Address from "../../../@seedwork/domain/value-objects/address.vo";

describe("Order Integration Tests", () => {
  it("should create an order", () => {
    const customer = new Customer({ id: "123", name: "New Customer" });
    const address = new Address({
      street: "New Street",
      number: 123,
      zip: "55555",
      city: "New City",
    });
    customer.address = address;
    customer.activate();

    const arrange: OrderItemProperties[] = [
      {
        id: "1",
        productId: "4711",
        name: "First Item",
        price: 100.01,
        quantity: 2,
      },
      {
        id: "2",
        productId: "4712",
        name: "Second Item",
        price: 200.04,
        quantity: 3,
      },
    ];

    const items = arrange.map((item) => {
      return new OrderItem(item);
    });
    const order = new Order({ id: "1", customerId: customer.id, items });

    expect(order.items.length).toBe(2);
    expect(order.items).toBe(items);
    expect(order.total()).toBe(800.14);
  });
});
