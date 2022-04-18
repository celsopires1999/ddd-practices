import { Sequelize } from "sequelize-typescript";
import Address from "../../../../../@seedwork/domain/value-objects/address.vo";
import Customer from "../../../../../customer/domain/entity/customer";
import CustomerModel from "../../../../../customer/infra/db/sequelize/model/customer.model";
import CustomerRepository from "../../../../../customer/infra/db/sequelize/repository/customer.repository";
import Order from "../../../../../order/domain/entity/order";
import OrderItem from "../../../../../order/domain/entity/order-item";
import Product from "../../../../../product/domain/entity/product";
import ProductModel from "../../../../../product/infra/db/sequelize/model/product.model";
import ProductRepository from "../../../../../product/infra/db/sequelize/repository//product.repository";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";
import OrderRepository from "./order.repository";

describe("Order Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      ProductModel,
      CustomerModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    await createFirstCustomer();
    await createTwoFirstProducts();
    const order = await createOrder("order-1", "order-item-1", "order-item-2");

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: order.items[0].id,
          name: order.items[0].name,
          product_id: order.items[0].productId,
          quantity: order.items[0].quantity,
          price: order.items[0].price,
          order_id: order.id,
        },
        {
          id: order.items[1].id,
          name: order.items[1].name,
          product_id: order.items[1].productId,
          quantity: order.items[1].quantity,
          price: order.items[1].price,
          order_id: order.id,
        },
      ],
    });
  });

  it("should update the customer", async () => {
    await createFirstCustomer();
    await createTwoFirstProducts();
    const order = await createOrder("order-1", "order-item-1", "order-item-2");
    await createSecondCustomer();
    const orderRepository = new OrderRepository(sequelize);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: order.items[0].id,
          name: order.items[0].name,
          product_id: order.items[0].productId,
          quantity: order.items[0].quantity,
          price: order.items[0].price,
          order_id: order.id,
        },
        {
          id: order.items[1].id,
          name: order.items[1].name,
          product_id: order.items[1].productId,
          quantity: order.items[1].quantity,
          price: order.items[1].price,
          order_id: order.id,
        },
      ],
    });
  });

  it("should update items", async () => {
    await createFirstCustomer();
    await createTwoFirstProducts();
    const order = await createOrder("order-1", "order-item-1", "order-item-2");

    await createThirdProduct();

    const orderItem3 = new OrderItem({
      id: "order-item-3",
      name: "order item 3",
      productId: "product-3",
      price: 30,
      quantity: 5,
    });

    order.props.items = [orderItem3];
    const orderRepository = new OrderRepository(sequelize);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: order.items[0].id,
          name: order.items[0].name,
          product_id: order.items[0].productId,
          quantity: order.items[0].quantity,
          price: order.items[0].price,
          order_id: order.id,
        },
      ],
    });
  });

  it("should get an order", async () => {
    await createFirstCustomer();
    await createTwoFirstProducts();
    const order = await createOrder("order-1", "order-item-1", "order-item-2");
    const orderRepository = new OrderRepository(sequelize);
    const foundOrder = await orderRepository.find(order.id);
    expect(foundOrder).toStrictEqual(order);
  });

  it("should get all orders", async () => {
    await createFirstCustomer();
    await createTwoFirstProducts();

    let createdOrders: Order[] = [];
    for (let i = 0; i < 10; i++) {
      createdOrders.push(
        await createOrder(`order-${i}`, `order-item-1${i}`, `order-item-2${i}`)
      );
    }

    const orderRepository = new OrderRepository(sequelize);
    const orders = await orderRepository.findAll();
    expect(orders.length).toEqual(10);
    expect(orders).toStrictEqual(createdOrders);
  });

  const createFirstCustomer = async (): Promise<void> => {
    const customerRepository = new CustomerRepository();
    const address = new Address({
      street: "customer street",
      number: 777,
      zip: "customer zip",
      city: "customer city",
    });
    const customer = new Customer({
      id: "customer-1",
      name: "customer name",
      active: true,
      address,
    });
    await customerRepository.create(customer);
  };

  const createSecondCustomer = async (): Promise<void> => {
    const customerRepository = new CustomerRepository();
    const address = new Address({
      street: "customer street",
      number: 777,
      zip: "customer zip",
      city: "customer city",
    });
    const customer = new Customer({
      id: "customer-2",
      name: "customer name",
      active: true,
      address,
    });
    await customerRepository.create(customer);
  };
  const createTwoFirstProducts = async (): Promise<void> => {
    const productRepository = new ProductRepository();
    const product1 = new Product({
      id: "product-1",
      name: "produc name 1",
      price: 10,
    });
    const product2 = new Product({
      id: "product-2",
      name: "produc name 2",
      price: 20,
    });
    await productRepository.create(product1);
    await productRepository.create(product2);
  };

  const createThirdProduct = async (): Promise<void> => {
    const productRepository = new ProductRepository();
    const product3 = new Product({
      id: "product-3",
      name: "produc name 3",
      price: 30,
    });
    await productRepository.create(product3);
  };

  const createOrder = async (
    orderId: string,
    firstItemId: string,
    secondItemId: string
  ): Promise<Order> => {
    const orderItem1 = new OrderItem({
      id: firstItemId,
      name: "order item 1",
      productId: "product-1",
      price: 10,
      quantity: 5,
    });
    const orderItem2 = new OrderItem({
      id: secondItemId,
      name: "order item 2",
      productId: "product-2",
      price: 10,
      quantity: 5,
    });

    const order = new Order({
      id: orderId,
      customerId: "customer-1",
      items: [orderItem1, orderItem2],
    });
    const orderRepository = new OrderRepository(sequelize);
    await orderRepository.create(order);

    return order;
  };
});
