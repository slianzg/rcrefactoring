import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { UsersController } from '../controllers/users.constroller.js';

const router = express.Router();

const usersController = new UsersController();

//회원가입 API
router.post('/sign-up', usersController.signUp);

// 로그인 API
router.post('/sign-in', usersController.signIn);

//로그인 유저 정보 조회 API
router.get('/users', authMiddleware, usersController.getUserInfoById);

export default router;
