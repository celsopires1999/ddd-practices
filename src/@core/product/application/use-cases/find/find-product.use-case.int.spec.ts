import { Sequelize } from "sequelize-typescript";
import ProductModel from "#product/infra/db/sequelize/model/product.model";
import ProductRepository from "#product/infra/db/sequelize/repository/product.repository";
import FindProductUseCase from "./find-product.use-case";

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

describe("FindProductUseCase Integration Tests", () => {
  it("should find a product", async () => {
    const data = {
      id: "1",
      name: "some product",
      price: 1.11,
    };
    await ProductModel.create(data);

    const repository = new ProductRepository();
    const useCase = new FindProductUseCase(repository);
    const output = await useCase.execute({ id: "1" });

    expect(output).toStrictEqual(data);
  });

  it("should throw an error when product is not found", async () => {
    const repository = new ProductRepository();
    const useCase = new FindProductUseCase(repository);
    await expect(useCase.execute({ id: "1" })).rejects.toThrow(
      "Product not found using ID 1"
    );
  });
});
