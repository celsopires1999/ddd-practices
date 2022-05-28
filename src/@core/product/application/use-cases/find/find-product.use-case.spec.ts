import Product from "#product/domain/entity/product";
import { InputFindProductDto, OutputFindProductDto } from "./find-product.dto";
import FindProductUseCase from "./find-product.use-case";

const product = new Product({ id: "1", name: "some product", price: 1.1 });
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("FindProductUseCase Unit Tests", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);
    const input: InputFindProductDto = {
      id: product.id,
    };
    const expectedOutput: OutputFindProductDto = {
      id: "1",
      name: "some product",
      price: 1.1,
    };
    const output = await useCase.execute(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(productRepository);

    const input: InputFindProductDto = { id: product.id };
    expect(useCase.execute(input)).rejects.toThrow("Product not found");
  });
});
