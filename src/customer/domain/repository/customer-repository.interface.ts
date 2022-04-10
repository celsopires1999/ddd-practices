import RepositoryInterface from "../../../@seedwork/domain/repository/repository-interface";
import Customer from "../../domain/entity/customer";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Customer> {}
