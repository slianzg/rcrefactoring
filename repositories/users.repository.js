import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  signUp = async (email, hashedPassword, name, grade) => {
    await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        grade,
      },
    });
    return;
  };

  findUserByEmail = async (email) => {
    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        userId: true,
        email: true,
        name: true,
        grade: true,
        password: true,
      },
    });
    return user;
  };

  getUserInfoById = async (userId) => {
    const user = await prisma.users.findUnique({
      where: { userId: +userId },
      select: {
        userId: true,
        email: true,
        name: true,
        grade: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  };
}
