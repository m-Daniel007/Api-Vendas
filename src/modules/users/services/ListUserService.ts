import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/Users";
import UserRepository from "../typeorm/repositories/UserRepository";

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = usersRepository.find({
      select: ["id", "name", "email", "avatar","created_at", "updated_at"],
    });

    return users;
  }
}
