import { Sequelize } from "sequelize-typescript";
import ProductModel from "#product/infra/db/sequelize/model/product.model";
import ProductRepository from "#product/infra/db/sequelize/repository/product.repository";
import UpdateProductUseCase from "./update-product.use-case";
import { InputUpdateProductDto } from "./update-product.dto";

let sequelize: Sequelize;

beforeEach(async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });
  sequelize.addModels([ProductModel]);
  await sequelize.sync();
});

afterEach(async () => {
  await sequelize.close();
});

describe("UpdateProductUseCase Integration Tests", () => {
  it("should update a product", async () => {
    const data = {
      id: "1",
      name: "some product",
      price: 1.11,
    };
    await ProductModel.create(data);

    const input: InputUpdateProductDto = {
      id: "1",
      name: "updated product",
      price: 2.22,
    };

    const repository = new ProductRepository();
    const useCase = new UpdateProductUseCase(repository);
    const output = await useCase.execute(input);

    expect(output).toStrictEqual(input);
  });

  it("should throw an error when product is not found", async () => {
    const input: InputUpdateProductDto = {
      id: "1",
      name: "updated product",
      price: 2.22,
    };
    const repository = new ProductRepository();
    const useCase = new UpdateProductUseCase(repository);
    await expect(useCase.execute(input)).rejects.toThrow(
      "Product not found using ID 1"
    );
  });
});
