import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import path from 'path';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}
export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }
    const { token } = await userTokenRepository.generate(user.id);

    const forgotPasswordTeplate = path.resolve(
      __dirname,
      '../views/forgotPassword.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Api Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTeplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
