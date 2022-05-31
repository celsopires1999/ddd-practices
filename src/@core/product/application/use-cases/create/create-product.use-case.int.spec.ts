import { Sequelize } from "sequelize-typescript";
import ProductModel from "#product/infra/db/sequelize/model/product.model";
import ProductRepository from "#product/infra/db/sequelize/repository/product.repository";
import CreateProductUseCase from "./create-product.use-case";
import { InputCreateProductDto } from "./create-product.dto";

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

describe("CreateProductUseCase Integration Tests", () => {
  it("should create a product", async () => {
    const input: InputCreateProductDto = {
      type: "A",
      name: "some product",
      price: 1.11,
    };

    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);
    const output = await useCase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toStrictEqual(input.name);
    expect(output.price).toStrictEqual(input.price);
  });
});
