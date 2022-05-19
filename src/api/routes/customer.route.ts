import express, { Request, Response } from "express";
import CreateCustomerUseCase from "#customer/application/use-cases/create/create-customer.use-case";
import CustomerRepository from "#customer/infra/db/sequelize/repository/customer.repository";
import { InputCreateCustomerDto } from "#customer/application/use-cases/create/create-customer.dto";
import ListCustomerUseCase from "#customer/application/use-cases/list/list-customer.use-case";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const repository = new CustomerRepository();
  const useCase = new CreateCustomerUseCase(repository);
  const customerDto: InputCreateCustomerDto = {
    name: req.body.name,
    address: {
      street: req.body.address?.street,
      number: req.body.address?.number,
      city: req.body.address?.city,
      zip: req.body.address?.zip,
    },
  };

  try {
    const output = await useCase.execute(customerDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (_req: Request, res: Response) => {
  const repository = new CustomerRepository();
  const useCase = new ListCustomerUseCase(repository);

  try {
    await execute();
  } catch (error) {
    res.status(500).send(error);
  }

  async function execute() {
    const output = await useCase.execute({});
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXML(output)),
    });
  }
});
