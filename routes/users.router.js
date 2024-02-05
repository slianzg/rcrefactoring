import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/auth.middleware.js';
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();

//회원가입 API
router.post('/sign-up', async (req, res, next) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: '이메일이 입력되지 않았습니다.' });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: '비밀번호가 입력되지 않았습니다.' });
    }

    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: '비밀번호확인이 입력되지 않았습니다.' });
    }

    if (!name) {
      return res.status(400).json({ message: '이름이 입력되지 않았습니다.' });
    }

    const isExistUser = await prisma.users.findFirst({
      where: { email },
    });

    if (isExistUser) {
      return res
        .status(409)
        .json({ message: '이미 동일한 이메일로 가입한 사용자가 있습니다.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: '비밀번호가 6자 이상이어야 합니다.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: { email, password: hashedPassword, name },
    });

    const userInfo = await prisma.users.findFirst({
      where: { email },
      select: {
        userId: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res
      .status(201)
      .json({ message: '회원가입이 완료되었습니다.', data: userInfo });
  } catch (err) {
    next(err);
  }
});

//로그인 API
router.post('/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!req.body) {
      return res
        .status(400)
        .json({ message: '이메일과 비밀번호를 입력해주세요.' });
    }

    if (!email) {
      return res.status(400).json({ message: '이메일이 입력되지 않았습니다.' });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: '비밀번호가 입력되지 않았습니다.' });
    }

    const user = await prisma.users.findFirst({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: '작성한 이메일로 가입한 사용자가 없습니다.' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign(
      { userId: user.userId },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '12h',
      }
    );

    res.cookie('authorization', `Bearer ${token}`);
    return res.status(200).json({ message: '로그인 성공!' });
  } catch (err) {
    next(err);
  }
});

//로그인 유저 정보 조회 API
router.get('/users', authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await prisma.users.findFirst({
      where: { userId: +userId },
      select: {
        userId: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
  }
});

export default router;
