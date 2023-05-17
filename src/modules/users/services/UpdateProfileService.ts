import { getCustomRepository } from "typeorm";
import { hash, compare } from "bcryptjs";
import User from "../typeorm/entities/Users";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("Já existe um usuário com este email!");
    }

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga!");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Senha antiga não confere!");
      }

      user.password = await hash(password, 12);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);
    return user;
  }
}
