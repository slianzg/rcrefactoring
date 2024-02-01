import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

//이력서 작성 API
router.post('/resumes', authMiddleware, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { userId } = req.user;

    const resume = await prisma.resumes.create({
      data: {
        userId: +userId,
        title,
        content,
      },
    });
    return res.status(201).json({ message: '이력서가 저장되었습니다.' });
  } catch (err) {
    next(err);
  }
});

//모든 이력서 조회 API
router.get('/resumes', async (req, res, next) => {
  try {
    const resumes = await prisma.resumes.findMany({
      select: {
        resumeId: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
          },
        },
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }, // querystring????
    });
    return res.status(200).json({ data: resumes });
  } catch (err) {
    next(err);
  }
});

//이력서 세부 조회 API
router.get('/resumes/:resumeId', async (req, res, next) => {
  try {
    const { resumeId } = req.params;

    const resume = await prisma.resumes.findFirst({
      where: { resumeId: +resumeId },
      select: {
        resumeId: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
          },
        },
        status: true,
        createdAt: true,
      },
    });

    if (!resume) {
      res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
    }

    return res.status(200).json({ data: resume });
  } catch (err) {
    next(err);
  }
});

//이력서 수정 API
router.patch('/resumes/:resumeId', authMiddleware, async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const { userId } = req.user;

    const { title, content, status } = req.body;

    const resume = await prisma.resumes.findFirst({
      where: { resumeId: +resumeId },
    });
    if (!resume) {
      return res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
    }
    if (userId !== resume.userId) {
      return res
        .status(401)
        .json({ message: '이력서를 수정할 권한이 없습니다.' });
    }

    await prisma.resumes.update({
      data: { title, content, status },
      where: { resumeId: +resumeId },
    });

    return res
      .status(200)
      .json({ message: '이력서 수정사항이 저장되었습니다.' });
  } catch (err) {
    next(err);
  }
});

//이력서 삭제 API
router.delete('/resumes/:resumeId', authMiddleware, async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const { userId } = req.user;

    const resume = await prisma.resumes.findFirst({
      where: { resumeId: +resumeId },
    });
    if (!resume) {
      return res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
    }
    if (userId !== resume.userId) {
      return res
        .status(401)
        .json({ message: '이력서를 삭제할 권한이 없습니다.' });
    }

    await prisma.resumes.delete({
      where: { resumeId: +resumeId },
    });

    return res.status(200).json({ message: '이력서가 삭제되었습니다.' });
  } catch (err) {
    next(err);
  }
});

export default router;
