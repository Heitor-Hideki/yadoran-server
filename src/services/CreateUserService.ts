import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';

import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';
import { validateEmail } from '../utils/validateEmail';

interface Request {
  name: string;
  password: string;
  email: string;
}

interface IUser extends Omit<Users, 'password'> {
  password?: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor (usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    name,
    email,
    password,
  }: Request): Promise<IUser> {
    const checkUserExists = await this.usersRepository.findByEmail({ email });

    if (!!checkUserExists) {
      throw new AppError('Email já está em uso', 409);
    }

    if (!validateEmail(email)) {
      throw new AppError('Email inválido', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user: IUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    delete user.password;

    return user;
  }
}

export { CreateUserService };
