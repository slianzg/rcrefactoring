import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { ResumesController } from '../controllers/resumes.controller.js';

const router = express.Router();
const resumesController = new ResumesController();

//이력서 작성 API
router.post('/resumes', authMiddleware, resumesController.createResume);

//모든 이력서 조회 API
router.get('/resumes', resumesController.getAllResumes);

//이력서 세부 조회 API
router.get('/resumes/:resumeId', resumesController.getResumeById);

//이력서 수정 API
router.patch(
  '/resumes/:resumeId',
  authMiddleware,
  resumesController.updateResume
);

//이력서 삭제 API
router.delete(
  '/resumes/:resumeId',
  authMiddleware,
  resumesController.deleteResume
);

export default router;
