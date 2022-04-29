import ProductFactory, { ProductType } from "./product.factory";

describe("Product Factory Unit Tests", () => {
  it("should create a product type A", () => {
    const product = ProductFactory.create({
      type: ProductType.A,
      name: "Product Name A",
      price: 10.5,
    });
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product Name A");
    expect(product.price).toBe(10.5);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type B", () => {
    const product = ProductFactory.create({
      type: ProductType.B,
      name: "Product Name B",
      price: 10.5,
    });
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product Name B");
    expect(product.price).toBe(21.0);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    expect(() =>
      ProductFactory.create({
        type: "c",
        name: "Product Name C",
        price: 10.0,
      } as any)
    ).toThrowError("Product type not supported");
  });
});
