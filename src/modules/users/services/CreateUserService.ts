import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/Users";
import UserRepository from "../typeorm/repositories/UserRepository";
import { hashSync } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);
    

      if (emailExists) {
         throw new AppError("Usuário já cadastrado !");
      }

      const passwordHash =  hashSync(password, 12);
      const user = usersRepository.create({
        name,
        email,
        password: passwordHash,
      });

      await usersRepository.save(user);
      return user;
   
  }
}
