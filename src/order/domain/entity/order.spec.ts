import Address from "../../../@seedwork/domain/value-objects/address.vo";
import Customer from "../../../customer/domain/entity/customer";
import Order, { OrderProperties } from "./order";
import OrderItem, { OrderItemProperties } from "./order-item";

interface OrderPropertiesArrange {
  data: OrderProperties;
  error: string;
}

describe("Order Unit Test", () => {
  it("should throw error", () => {
    const orderItem = new OrderItem({
      id: "1",
      name: "Test Item",
      price: 10.0,
    });
    const arrange: OrderPropertiesArrange[] = [
      {
        data: { id: "", customerId: "1", items: [orderItem] },
        error: "Id is required",
      },
      {
        data: { id: "123", customerId: "", items: [orderItem] },
        error: "Customer is required",
      },
      {
        data: { id: "123", customerId: "1", items: [] },
        error: "Item is required",
      },
    ];
    arrange.forEach((item) => {
      try {
        expect(() => new Order(item.data)).toThrowError(item.error);
      } catch (e) {
        console.log("item failed:", item);
        throw e;
      }
    });
  });

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
      { id: "1", name: "First Item", price: 100.01 },
      { id: "2", name: "Second Item", price: 200.04 },
    ];

    const items = arrange.map((item) => {
      return new OrderItem(item);
    });
    const order = new Order({ id: "1", customerId: customer.id, items });

    expect(order.items.length).toBe(2);
    expect(order.items).toBe(items);
    expect(order.total()).toBe(300.05);
  });
});
