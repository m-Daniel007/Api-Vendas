import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/Users";
import UserRepository from "../typeorm/repositories/UserRepository";
import path from "path";
import uploadConfig from "@config/upload";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado !", 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}
