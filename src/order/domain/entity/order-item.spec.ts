import OrderItem from "./order-item";

describe("OrdemItem Unit Test", () => {
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
        expect(() => new OrderItem({ id: item.id } as any)).toThrowError(
          item.message
        );
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should throw an error when productId is invalid", () => {
    const arrange: { productId: any; message: string }[] = [
      { productId: null, message: "productId is required" },
      { productId: undefined, message: "productId is required" },
      { productId: "", message: "productId is required" },
      { productId: 5, message: "productId must be a string" },
      { productId: true, message: "productId must be a string" },
      { productId: new Date(), message: "Id must be a string" },
      { productId: {}, message: "productId must be a string" },
      { productId: [], message: "productId must be a string" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () => new OrderItem({ id: "123", productId: item.productId } as any)
        ).toThrowError(item.message);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should throw an error when name is invalid", () => {
    const arrange: { name: string; error: string }[] = [
      { name: "", error: "name is required" },
      { name: null, error: "name must be a string" },
      { name: undefined, error: "name must be a string" },
      { name: [] as any, error: "name must be a string" },
      { name: {} as any, error: "name must be a string" },
      { name: new Date() as any, error: "name must be a string" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () =>
            new OrderItem({
              id: "123",
              productId: "4711",
              name: item.name,
              price: 100,
              quantity: 2,
            })
        ).toThrowError(item.error);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should throw an error when price is invalid", () => {
    const arrange: { price: number; error: string }[] = [
      { price: 0, error: "price is required" },
      { price: -1, error: "price must be greater than zero" },
      { price: "", error: "price must be a number" },
      { price: null, error: "price must be a number" },
      { price: undefined, error: "price must be a number" },
      { price: [] as any, error: "price must be a number" },
      { price: {} as any, error: "price must be a number" },
      { price: new Date() as any, error: "price must be a number" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () =>
            new OrderItem({
              id: "123",
              productId: "4711",
              name: "Item Name",
              price: item.price,
              quantity: 2,
            })
        ).toThrowError(item.error);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should throw an error when quantity is invalid", () => {
    const arrange: { quantity: number; error: string }[] = [
      { quantity: 0, error: "quantity is required" },
      { quantity: -1, error: "quantity must be greater than zero" },
      { quantity: "", error: "quantity must be a number" },
      { quantity: null, error: "quantity must be a number" },
      { quantity: undefined, error: "quantity must be a number" },
      { quantity: [] as any, error: "quantity must be a number" },
      { quantity: {} as any, error: "quantity must be a number" },
      { quantity: new Date() as any, error: "quantity must be a number" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () =>
            new OrderItem({
              id: "123",
              productId: "4711",
              name: "Item Name",
              price: 100,
              quantity: item.quantity,
            })
        ).toThrowError(item.error);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });
});
