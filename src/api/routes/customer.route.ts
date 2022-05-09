import express, { Request, Response } from "express";
import CreateCustomerUseCase from "#customer/application/use-cases/create/create-customer.use-case";
import CustomerRepository from "#customer/infra/db/sequelize/repository/customer.repository";
import { InputCreateCustomerDto } from "#customer/application/use-cases/create/create-customer.dto";

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
