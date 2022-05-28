import Product from "#product/domain/entity/product";
import { InputUpdateProductDto } from "./update-product.dto";
import { UpdateProductUseCase } from "./update-product.use-case";

describe("UpdateProductUseCase Unit Tests", () => {
  it("should update a product", async () => {
    const product = new Product({ id: "1", name: "some product", price: 1.11 });
    const MockRepository = () => {
      return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      };
    };
    const input: InputUpdateProductDto = {
      id: "1",
      name: "update product",
      price: 2.22,
    };

    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);
    const output = await useCase.execute(input);

    expect(output).toStrictEqual(input);
  });

  it("should throw an error when product is not found", async () => {
    const input: InputUpdateProductDto = {
      id: "1",
      name: "update product",
      price: 2.22,
    };
    const mockRepository = () => {
      return {
        find: jest.fn().mockImplementation(() => {
          throw new Error("Product not found");
        }),
      };
    };

    const productRepository = mockRepository();
    //@ts-expect-error mock for testing
    const useCase = new UpdateProductUseCase(productRepository);
    await expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });
});
