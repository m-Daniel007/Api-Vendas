import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisChache";

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();
    let products = await redisCache.recover<Product[]>(
      "api-vendas-PRODUCT_LIST"
    );
    if (!products) {
      products = await productRepository.find();
      await redisCache.save("api-vendas-PRODUCT_LIST", products);
    }

    return products;
  }
}
