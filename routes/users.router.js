import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { prisma } from '../utils/prisma/index.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { UsersService } from '../services/users.service.js';
import { UsersController } from '../controllers/users.constroller.js';

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

//회원가입 API
router.post('/sign-up', usersController.signUp);

// 로그인 API
router.post('/sign-in', usersController.signIn);

//로그인 유저 정보 조회 API
router.get('/users', authMiddleware, usersController.getUserInfoById);

export default router;
