import { getCustomRepository } from "typeorm";
import  ProductRepository  from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = productRepository.find();

    return product;
  }
}
