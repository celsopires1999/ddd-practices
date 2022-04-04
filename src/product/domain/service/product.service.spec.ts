import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const arrange: {
      data: { id: string; name: string; price: number };
      newPrice: number;
    }[] = [
      { data: { id: "product1", name: "Product 1", price: 10 }, newPrice: 20 },
      { data: { id: "product2", name: "Product 2", price: 20 }, newPrice: 40 },
    ];

    const products = arrange.map((item) => {
      return new Product(item.data);
    });

    ProductService.increasePrice(products, 100);

    for (let i = 0; i < arrange.length; i++) {
      try {
        expect(products[i].price).toBe(arrange[i].newPrice);
      } catch (e) {
        console.log("item failed: ", arrange[i]);
        throw e;
      }
    }
  });
});
