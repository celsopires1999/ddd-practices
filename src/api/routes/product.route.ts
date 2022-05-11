import express, { Request, Response } from "express";
import CreateProductUseCase from "#product/application/use-cases/create/create-product.use-case";
import ProductRepository from "#product/infra/db/sequelize/repository/product.repository";
import { InputCreateProductDto } from "#product/application/use-cases/create/create-product.dto";
import ListProductUseCase from "#product/application/use-cases/list/list-product.use.case";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const repository = new ProductRepository();
  const useCase = new CreateProductUseCase(repository);
  const productDto: InputCreateProductDto = {
    type: req.body.type,
    name: req.body.name,
    price: req.body.price,
  };

  try {
    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (_req: Request, res: Response) => {
  const repository = new ProductRepository();
  const useCase = new ListProductUseCase(repository);

  try {
    const output = await useCase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
