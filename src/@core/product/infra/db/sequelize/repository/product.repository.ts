import ProductRepositoryInterface from "#product/domain/repository/product-repository.interface";
import Product from "#product/domain/entity/product";
import ProductModel from "../model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Product> {
    let productModel: ProductModel;
    try {
      productModel = await ProductModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
    } catch (e) {
      throw new Error(`Product not found using ID ${id}`);
    }

    return new Product({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    });
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();

    return productModels.map(
      (productModel) =>
        new Product({
          id: productModel.id,
          name: productModel.name,
          price: productModel.price,
        })
    );
  }
}
