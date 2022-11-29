import { Users } from '@prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { env } from '../config/variables';
import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface IUser extends Omit<Users, 'password'> {
  password?: string;
}

interface Response {
  user: IUser;
  token: string;
}

class AuthenticateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail({ email });

    const { secret, expiresIn } = env['dev'].authConfig.jwt;

    if (!user) {
      throw new AppError('Usuário ou senha inválidos.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Usuário ou senha inválidos.', 401);
    }

    if (!secret) {
      throw new AppError('Usuário ou senha inválidos', 401);
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
