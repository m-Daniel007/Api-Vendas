import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product exists with this name');
    }
    const product = productRepository.create({
      name,
      price,
      quantity,
    });
    await productRepository.save(product);

    return product;
  }
}
