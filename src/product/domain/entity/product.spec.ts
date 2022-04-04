import Product from "./product";

describe("Product Unit Tests", () => {
  it("should throw an error when id is invalid", () => {
    const arrange: { id: string; error: string }[] = [
      { id: "", error: "Id is required" },
      { id: null, error: "Id must be a string" },
      { id: undefined, error: "Id must be a string" },
      { id: [] as any, error: "Id must be a string" },
      { id: {} as any, error: "Id must be a string" },
      { id: new Date() as any, error: "Id must be a string" },
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
});
