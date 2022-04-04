import Order, { OrderProperties } from "./order";

describe("Order Unit Tests", () => {
  it("should throw error with all arguments", () => {
    const orderItem = { props: { id: "1", name: "1", price: 1 } };

    const arrange: {
      data: { id: string; customerId: string; items: any };
      error: string;
    }[] = [
      {
        data: { id: "", customerId: "1", items: [orderItem] },
        error: "Id is required",
      },
      {
        data: { id: null, customerId: "1", items: [orderItem] },
        error: "Id is required",
      },
      {
        data: { id: undefined, customerId: "1", items: [orderItem] },
        error: "Id is required",
      },
      {
        data: { id: 5 as any, customerId: "1", items: [orderItem] },
        error: "Id must be a string",
      },
      {
        data: { id: "123", customerId: "", items: [orderItem] },
        error: "Customer is required",
      },
      {
        data: { id: "123", customerId: null, items: [orderItem] },
        error: "Customer is required",
      },
      {
        data: { id: "123", customerId: undefined, items: [orderItem] },
        error: "Customer is required",
      },
      {
        data: { id: "123", customerId: 5 as any, items: [orderItem] },
        error: "Customer must be a string",
      },
      // {
      //   data: { id: "123", customerId: "1", items: [] },
      //   error: "Item must be an instance of OrderItem",
      // },
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

  it("should throw an error when Id is invalid", () => {
    const arrange: { id: any; message: string }[] = [
      { id: null, message: "Id is required" },
      { id: undefined, message: "Id is required" },
      { id: "", message: "Id is required" },
      { id: 5, message: "Id must be a string" },
      { id: true, message: "Id must be a string" },
      { id: new Date(), message: "Id must be a string" },
      { id: {}, message: "Id must be a string" },
      { id: [], message: "Id must be a string" },
    ];
    arrange.forEach((item) => {
      try {
        expect(() => new Order({ id: item.id } as any)).toThrowError(
          item.message
        );
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should throw an error when Customer is invalid", () => {
    const arrange: { customerId: any; message: string }[] = [
      { customerId: null, message: "Customer is required" },
      { customerId: undefined, message: "Customer is required" },
      { customerId: "", message: "Customer is required" },
      { customerId: 5, message: "Customer must be a string" },
      { customerId: true, message: "Customer must be a string" },
      { customerId: new Date(), message: "Customer must be a string" },
      { customerId: {}, message: "Customer must be a string" },
      { customerId: [], message: "Customer must be a string" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () => new Order({ id: "123", customerId: item.customerId } as any)
        ).toThrowError(item.message);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should throw an error when items property is invalid", () => {
    const arrange: { items: any; message: string }[] = [
      { items: null, message: "Item is required" },
      { items: undefined, message: "Item is required" },
      { items: "", message: "Item must be an array of OrderItem" },
      { items: {}, message: "Item must be an array of OrderItem" },
      { items: [], message: "Item is required" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () => new Order({ id: "123", customerId: "123", items: item.items })
        ).toThrowError(item.message);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should create an order", () => {
    const orderValidateMock = jest
      .spyOn(Order, "validate")
      .mockImplementation();

    const orderTotalMock = jest
      .spyOn(Order.prototype, "total")
      .mockImplementation(() => {
        return 100;
      });

    const arrange: OrderProperties = {
      id: "123",
      customerId: "123",
      items: [],
    };
    const order = new Order(arrange);
    expect(order.total()).toBe(100);
    expect(order.props).toStrictEqual(arrange);
    expect(orderValidateMock).toHaveBeenCalled();
    expect(orderTotalMock).toHaveBeenCalled();
  });
});
