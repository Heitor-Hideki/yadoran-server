import {
  PrismaClient,
  Users,
} from '@prisma/client';

const prisma = new PrismaClient();

interface CreateUserDTO {
  name: string,
  email: string,
  password: string,
}

interface IFindUser {
  email: string;
}

class UsersRepository {
  public async create({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<Users> {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  public async findByEmail({
    email,
  }: IFindUser): Promise<Users | null> {
    const user = await prisma.users.findFirst({
      where: {
        email
      }
    });

    return user;
  }
}

export { UsersRepository };
