import RepositoryInterface from "../../../@seedwork/domain/repository/repository-interface";
import Customer from "../../domain/entity/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
