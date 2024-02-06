import experss from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';
import dotenv from 'dotenv';

const router = experss.Router();

dotenv.config();

router.post('/token', async (req, res, next) => {
  try {
    const { refreshtoken } = req.cookies;

    const token = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY);
    if (!token.userId) {
      return res.status(401).end();
    }

    //refresh토큰이 유효할 시
    const user = await prisma.users.findFirst({
      userId: token.userId,
    });
    if (!user) {
      return res.status(401).end();
    }

    const newAccessToken = jwt.sign(
      { userId: user.userId },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '12h' }
    );
    const newRefreshToken = jwt.sign(
      { userId: user.userId },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: '7d' }
    );

    res.cookie('authorization', `Bearer ${newAccessToken}`);
    res.cookie('refreshtoken', newRefreshToken);

    return res.json({
      accesstoken: newAccessToken,
      refreshtoken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
