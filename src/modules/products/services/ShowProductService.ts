import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    return product;
  }
}
