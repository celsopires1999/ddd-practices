import { Sequelize } from "sequelize-typescript";
import ProductModel from "#product/infra/db/sequelize/model/product.model";
import ProductRepository from "#product/infra/db/sequelize/repository/product.repository";
import { OutputListProductDto } from "./list-product.dto";
import ListProductUseCase from "./list-product.use.case";

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

describe("ListProductUseCase Integration Tests", () => {
  it("should list all products", async () => {
    const arrange: OutputListProductDto = {
      products: [
        {
          id: "1",
          name: "some product 1",
          price: 1.11,
        },
        {
          id: "2",
          name: "some product 2",
          price: 2.22,
        },
      ],
    };

    for (const product of arrange.products) {
      await ProductModel.create(product);
    }

    const repository = new ProductRepository();
    const useCase = new ListProductUseCase(repository);
    const output = await useCase.execute({});
    expect(JSON.stringify(output)).toStrictEqual(JSON.stringify(arrange));
  });
});
