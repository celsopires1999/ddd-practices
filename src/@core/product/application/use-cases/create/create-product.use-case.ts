import ProductFactory from "#product/domain/factory/product.factory";
import ProductRepositoryInterface from "#product/domain/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create-product.dto";

export class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create({
      type: input.type as any,
      name: input.name,
      price: input.price,
    });

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}

export default CreateProductUseCase;
