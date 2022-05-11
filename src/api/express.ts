import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "#customer/infra/db/sequelize/model/customer.model";
import { customerRoute } from "./routes/customer.route";
import { productRoute } from "./routes/product.route";
import ProductModel from "#product/infra/db/sequelize/model/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDb();
