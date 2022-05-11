import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create-product.dto";
import CreateProductUseCase from "./create-product.use-case";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("CreateProductUseCase Unit Tests", () => {
  it("should create two products with types A and B", async () => {
    const inputItems: InputCreateProductDto[] = [
      {
        type: "A",
        name: "Product 1",
        price: 2.2,
      },
      {
        type: "B",
        name: "Product 2",
        price: 1.1,
      },
    ];

    const outputItems: Omit<OutputCreateProductDto, "id">[] = [
      {
        name: "Product 1",
        price: 2.2,
      },
      {
        name: "Product 2",
        price: 2.2,
      },
    ];

    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    for (let i = 0; i < inputItems.length; i++) {
      const output = await useCase.execute(inputItems[i]);
      const expected: OutputCreateProductDto = {
        id: expect.any(String),
        name: outputItems[i].name,
        price: outputItems[i].price,
      };
      expect(output).toStrictEqual(expected);
    }
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      type: "B",
      name: "",
      price: 3.33,
    };
    expect(useCase.execute(input)).rejects.toThrow("name is required");
  });

  it("should throw an error when price is missing", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);
    const input: InputCreateProductDto = {
      type: "B",
      name: "Product 3",
      price: 0,
    };
    expect(useCase.execute(input)).rejects.toThrow("price is required");
  });
});
