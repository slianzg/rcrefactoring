import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { ResumesController } from '../controllers/resumes.controller.js';

const router = express.Router();
const resumesController = new ResumesController();

//이력서 작성 API
// router.post('/resumes', authMiddleware, async (req, res, next) => {
//   try {
//     const { title, content } = req.body;
//     const { userId } = req.user;

//     if (!title) {
//       return res.status(400).json({ message: '이력서 제목을 입력해주세요.' });
//     }

//     if (!content) {
//       return res
//         .status(400)
//         .json({ message: '자기소개(내용)을 입력해주세요.' });
//     }

//     const resume = await prisma.resumes.create({
//       data: {
//         userId: +userId,
//         title,
//         content,
//         status: 'APPLY',
//       },
//     });
//     return res.status(201).json({ message: '이력서가 저장되었습니다.' });
//   } catch (err) {
//     next(err);
//   }
// });
router.post('/resumes', authMiddleware, resumesController.createResume);

//모든 이력서 조회 API
// router.get('/resumes', async (req, res, next) => {
//   try {
//     const orderKey = req.query.orderKey ?? 'resumeId';
//     const orderValue = req.query.orderValue ?? 'desc';

//     if (!['resumeId', 'status'].includes(orderKey)) {
//       return res.status(400).json({
//         success: false,
//         message: 'orderkey가 올바르지 않습니다.',
//       });
//     }

//     if (!['asc', 'desc'].includes(orderValue.toLowerCase())) {
//       //대소문자 구별을 않기위해 소문자로 통일해준다.
//       return res.status(400).json({
//         success: false,
//         message: 'orderValue가 올바르지 않습니다.',
//       });
//     }

//     const resumes = await prisma.resumes.findMany({
//       select: {
//         resumeId: true,
//         title: true,
//         content: true,
//         user: {
//           select: {
//             name: true,
//           },
//         },
//         status: true,
//         createdAt: true,
//       },
//       orderBy: [
//         {
//           [orderKey]: orderValue.toLowerCase(), //orderKey에 []감싸는 이유는 orderKey로 받을 것이 'resumeId', 'status' 둘중에 하나니까 변수에 들어있는 값이 들어가라고.
//         },
//       ],
//       // orderBy: { createdAt: 'desc' },
//     });
//     return res.status(200).json({ data: resumes });
//   } catch (err) {
//     next(err);
//   }
// });
router.get('/resumes', resumesController.getAllResumes);

//이력서 세부 조회 API
// router.get('/resumes/:resumeId', async (req, res, next) => {
//   try {
//     const { resumeId } = req.params;
//     //= const resumeId = req.params.resumeId;

//     if (!resumeId) {
//       return res
//         .status(400)
//         .json({ message: 'resumeId는 필수로 입력되어야 합니다.' });
//     }

//     const resume = await prisma.resumes.findFirst({
//       where: { resumeId: +resumeId },
//       select: {
//         resumeId: true,
//         title: true,
//         content: true,
//         user: {
//           select: {
//             name: true,
//           },
//         },
//         status: true,
//         createdAt: true,
//       },
//     });

//     if (!resume) {
//       res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
//     }

//     return res.status(200).json({ data: resume });
//   } catch (err) {
//     next(err);
//   }
// });
router.get('/resumes/:resumeId', resumesController.getResumeById);

//이력서 수정 API
// router.patch('/resumes/:resumeId', authMiddleware, async (req, res, next) => {
//   try {
//     const { resumeId } = req.params;
//     const user = req.user;

//     if (!resumeId) {
//       return res
//         .status(400)
//         .json({ message: 'resumeId는 필수로 입력되어야 합니다.' });
//     }

//     const { title, content, status } = req.body;

//     const resume = await prisma.resumes.findFirst({
//       where: { resumeId: +resumeId },
//     });
//     if (!resume) {
//       return res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
//     }
//     if (user.grade === 'NORMAL' && user.userId !== resume.userId) {
//       return res
//         .status(401)
//         .json({ message: '이력서를 수정할 권한이 없습니다.' });
//     }

//     if (
//       ![
//         'APPLY',
//         'DROP',
//         'PASS',
//         'INTERVIEW1',
//         'INTERVIEW2',
//         'FINAL_PASS',
//       ].includes(status)
//     ) {
//       return res.status(400).json({ message: '유효하지 않은 status값입니다.' });
//     }

//     await prisma.resumes.update({
//       data: { title, content, status },
//       where: { resumeId: +resumeId },
//     });

//     return res
//       .status(200)
//       .json({ message: '이력서 수정사항이 저장되었습니다.' });
//   } catch (err) {
//     next(err);
//   }
// });
router.patch(
  '/resumes/:resumeId',
  authMiddleware,
  resumesController.updateResume
);

//이력서 삭제 API
// router.delete('/resumes/:resumeId', authMiddleware, async (req, res, next) => {
//   try {
//     const { resumeId } = req.params;
//     const user = req.user;

//     const resume = await prisma.resumes.findFirst({
//       where: { resumeId: +resumeId },
//     });
//     if (!resume) {
//       return res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
//     }
//     if (user.grade === 'NORMAL' && user.userId !== resume.userId) {
//       return res
//         .status(401)
//         .json({ message: '이력서를 삭제할 권한이 없습니다.' });
//     }

//     await prisma.resumes.delete({
//       where: { resumeId: +resumeId },
//     });

//     return res.status(200).json({ message: '이력서가 삭제되었습니다.' });
//   } catch (err) {
//     next(err);
//   }
// });
router.delete(
  '/resumes/:resumeId',
  authMiddleware,
  resumesController.deleteResume
);

export default router;
