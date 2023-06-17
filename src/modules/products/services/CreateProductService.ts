import { getCustomRepository } from "typeorm";
import ProductRepository  from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisChache";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError("Já existe produto cadastrado com esse nome!");
    }

    const redisCache = new RedisCache();
    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate("api-vendas-PRODUCT_LIST");
    await productRepository.save(product);

    return product;
  }
}
