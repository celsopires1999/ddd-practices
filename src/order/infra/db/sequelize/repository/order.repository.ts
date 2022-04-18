import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../../customer/infra/db/sequelize/model/customer.model";
import Order from "../../../../../order/domain/entity/order";
import OrderItem from "../../../../../order/domain/entity/order-item";
import OrderRepositoryInterface from "../../../../../order/domain/repository/order-repository.interface";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";
export default class OrderRepository implements OrderRepositoryInterface {
  constructor(private sequelize: Sequelize) {}

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
    let affectedCount: any;

    const currentItems = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    });

    currentItems.forEach(async (currentItem) => {
      const foundItem = entity.items.find((item) => item.id === currentItem.id);
      if (foundItem) {
        await currentItem.update({
          name: foundItem.name,
          price: foundItem.price,
          product_id: foundItem.productId,
          quantity: foundItem.quantity,
        });
      } else {
        await currentItem.destroy();
      }
    });

    entity.items.forEach(async (item) => {
      const updatedItem = currentItems.findIndex(
        (currentItem) => currentItem.id === item.id
      );
      if (updatedItem === -1) {
        await OrderItemModel.create({
          id: item.id,
          order_id: entity.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        });
      }
    });

    try {
      affectedCount = await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: {
            id: entity.id,
          },
        }
      );
    } catch (e) {
      console.log(e);
      throw new Error(`Error by updating an OrderModel: ${entity.id}`);
    }

    if (affectedCount[0] === 0) {
      throw new Error(`OrderModel not found on updating: ${entity.id}`);
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel: OrderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
        include: [CustomerModel, OrderItemModel],
      });
    } catch (e) {
      throw new Error("Order not found");
    }
    return this.modelToEntity(orderModel);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [CustomerModel, OrderItemModel],
    });
    return orderModels.map((orderModel) => {
      return this.modelToEntity(orderModel);
    });
  }

  private modelToEntity(orderModel: OrderModel): Order {
    const items = orderModel.items.map((item) => {
      return new OrderItem({
        id: item.id,
        name: item.name,
        productId: item.product_id,
        price: item.price,
        quantity: item.quantity,
      });
    });

    return new Order({
      id: orderModel.id,
      customerId: orderModel.customer_id,
      items: items,
    });
  }
}
