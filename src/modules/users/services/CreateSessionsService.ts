import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/Users";
import UserRepository from "../typeorm/repositories/UserRepository";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    const passwordConfirmed = compareSync(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
