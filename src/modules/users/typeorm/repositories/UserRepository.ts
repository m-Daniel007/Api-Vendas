import { EntityRepository, Repository } from "typeorm";
import User from "../entities/Users";

// repooositorio  para fazer buscas personalizadas no banco de dados,

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
