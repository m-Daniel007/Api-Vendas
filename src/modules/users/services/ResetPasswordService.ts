import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import { isAfter, addHours } from "date-fns";
import { is } from "date-fns/locale";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token não encontrado!");
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("Usuario não encontrado!", 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expirado!");
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);

    if (await usersRepository.save(user)) {
      usersTokenRepository.delete(userToken.id);
    }
  }
}
