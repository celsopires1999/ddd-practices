import { OutputListProductDto } from "./list-product.dto";
import ListProductUseCase from "./list-product.use.case";
import Product from "#product/domain/entity/product";

const expected: OutputListProductDto = {
  products: [
    { id: "PROD-1", name: "Product 1", price: 1.01 },
    { id: "PROD-2", name: "Product 2", price: 2.02 },
    { id: "PROD-3", name: "Product 3", price: 3.03 },
  ],
};

const mockedProducts = expected.products.map((product) => {
  return new Product({
    id: product.id,
    name: product.name,
    price: product.price,
  });
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(mockedProducts)),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("ListProductUseCase Unit Tests", () => {
  it("shoud list all products", async () => {
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute({});

    expect(output).toStrictEqual(expected);
  });
});
