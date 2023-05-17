import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/Users";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
}

export default class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado !");
    }
    return user;
  }
}
