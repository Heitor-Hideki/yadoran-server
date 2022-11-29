import { Router } from 'express';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

import { CreateUserService } from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    password,
  } = request.body;

  if (!name) {
    throw new AppError('Nome é obrigatório');
  }

  if (!email) {
    throw new AppError('Email é obrigatório');
  }

  if (!password) {
    throw new AppError('Senha é obrigatória');
  }

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.status(201).json(user);
});

export { userRouter };
