import dotenv from  'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { AppError } from './errors/AppError';

import routes from './routes';

const pathENV = process.env.NODE_ENV === 'production'
  ? '.env'
  : `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: pathENV });

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3333;

app.use(routes);

app.get('/', (request, response) => {
  return response.status(200).json({ status: 'ok' });
});

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      error: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    error: 'Internal server error',
  });
})

app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Server started on port ${PORT}`);
});
