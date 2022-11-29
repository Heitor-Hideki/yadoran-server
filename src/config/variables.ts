import dotenv from 'dotenv';

const pathENV = process.env.NODE_ENV === 'production'
  ? '../.env'
  : `../.env.${process.env.NODE_ENV}`;

dotenv.config({ path: __dirname + pathENV });

const dev = {
  authConfig: {
    jwt: {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '7d',
    }
  },
}

const env = {
  dev
}

export {
  env
}
