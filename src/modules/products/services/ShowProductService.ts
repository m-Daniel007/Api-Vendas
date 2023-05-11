import { getCustomRepository } from "typeorm";
import  ProductRepository from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = productRepository.findOne(id);

    if (!product) {
      throw new AppError("Produto não encontrado!");
    }

    return product;
  }
}
