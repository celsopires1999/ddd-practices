import Order from "../../../../../order/domain/entity/order";
import OrderRepositoryInterface from "../../../../../order/domain/repository/order-repository.interface";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (e) {
      console.log(e);
      throw new Error(`Error by creating an OrderModel: ${entity.id}`);
    }
  }

  async update(entity: Order): Promise<void> {
    console.log(entity);
  }

  async find(id: string): Promise<Order> {
    console.log(id);
    return new Order({} as any);
  }

  async findAll(): Promise<Order[]> {
    return [new Order({} as any)];
  }
}
