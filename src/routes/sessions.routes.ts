import { Router } from 'express';
import { AppError } from '../errors/AppError';

import { UsersRepository } from '../repositories/UsersRepository';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  if (!email) {
    throw new AppError('Email é obrigatório');
  }

  if (!password) {
    throw new AppError('Senha é obrigatória');
  }

  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password
  });

  delete user.password;

  return response.json({ user, token });
});

export { sessionsRouter };
