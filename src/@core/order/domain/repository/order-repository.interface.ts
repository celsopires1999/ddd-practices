import RepositoryInterface from "../../../@seedwork/domain/repository/repository-interface";
import Order from "../../domain/entity/order";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
