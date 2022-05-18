import NotificationError from "#seedwork/domain/notification/notification.error";
import Product from "./product";

describe("Product Unit Tests", () => {
  it("should throw an error when id is invalid", () => {
    const arrange: { id: string; error: string }[] = [
      { id: "", error: "Id is required" },
      {
        id: null,
        error:
          "product: id must be a `string` type, but the final value was: `null`.",
      },
      {
        id: undefined,
        error: "product: Id is required",
      },
      {
        id: [] as any,
        error:
          "product: id must be a `string` type, but the final value was: `[]`.",
      },
      {
        id: {} as any,
        error:
          "product: id must be a `string` type, but the final value was: `{}`.",
      },
      // { id: new Date() as any, error: "Id must be a string" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () =>
            new Product({
              id: item.id,
              name: "Product name",
              price: 100,
            })
        ).toThrowError(item.error);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });
  it("should throw an error when name is invalid", () => {
    const arrange: { name: string; error: string }[] = [
      { name: "", error: "name is required" },
      {
        name: null,
        error:
          "product: name must be a `string` type, but the final value was: `null`.",
      },
      { name: undefined, error: "product: name is required" },
      {
        name: [] as any,
        error:
          "product: name must be a `string` type, but the final value was: `[]`.",
      },
      {
        name: {} as any,
        error:
          "product: name must be a `string` type, but the final value was: `{}`.",
      },
      // { name: new Date() as any, error: "name must be a string" },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () =>
            new Product({
              id: "123",
              name: item.name,
              price: 100,
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
      { price: 0, error: "product: price must be greater than 0" },
      { price: -1, error: "product: price must be greater than 0" },
      { price: "", error: "product: price must be a `number` type" },
      { price: null, error: "product: price must be a `number` type" },
      { price: undefined, error: "product: price is required" },
      { price: [] as any, error: "product: price must be a `number` type" },
      { price: {} as any, error: "product: price must be a `number` type" },
      {
        price: new Date() as any,
        error: "product: price must be a `number` type",
      },
    ];
    arrange.forEach((item) => {
      try {
        expect(
          () =>
            new Product({
              id: "123",
              name: "Product Name",
              price: item.price,
            })
        ).toThrowError(item.error);
      } catch (e) {
        console.log("item failed: ", item);
        throw e;
      }
    });
  });

  it("should throw an error with invalid name when updating it", () => {
    const product = new Product({
      id: "123",
      name: "Original Name",
      price: 100,
    });
    expect(() => product.changeName("")).toThrowError("name is required");
  });

  it("should throw an error with invalid price when updating it", () => {
    const product = new Product({
      id: "123",
      name: "Original Name",
      price: 100,
    });
    expect(() => product.changePrice(0)).toThrowError("price is required");
  });

  it("should change a product name", () => {
    const product = new Product({
      id: "123",
      name: "Original Name",
      price: 100,
    });
    product.changeName("Changed Name");
    expect(product.name).toBe("Changed Name");
  });

  it("should change a product price", () => {
    const product = new Product({
      id: "123",
      name: "Original Name",
      price: 100,
    });
    product.changePrice(110);
    expect(product.price).toBe(110);
  });

  it("should throw error when id, name and price are invalid", () => {
    expect(() => new Product({ id: "", name: "", price: 0 })).toThrowError(
      "product: Id is required, product: name is required, product: price must be greater than 0"
    );

    expect(() => new Product({ id: "", name: "", price: 0 })).toThrowError(
      new NotificationError([
        {
          context: "product",
          message: "Id is required",
        },
        {
          context: "product",
          message: "name is required",
        },
        {
          context: "product",
          message: "price must be greater than 0",
        },
      ])
    );
  });
});
