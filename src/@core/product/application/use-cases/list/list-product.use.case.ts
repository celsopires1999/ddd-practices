import { InputListProductDto, OutputListProductDto } from "./list-product.dto";
import ProductRepositoryInterface from "#product/domain/repository/product-repository.interface";

export class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(_input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}

export default ListProductUseCase;
