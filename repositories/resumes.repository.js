import { prisma } from '../utils/prisma/index.js';

export class ResumesRepository {
  createResume = async (title, content, userId) => {
    await prisma.resumes.create({
      data: { title, content, userId: +userId },
    });
    return;
  };

  getAllResumes = async (orderKey, orderValue) => {
    const resumes = await prisma.resumes.findMany({
      select: {
        resumeId: true,
        userId: true,
        title: true,
        content: true,
        user: { select: { name: true } },
        status: true,
        createdAt: true,
      },
      orderBy: [{ [orderKey]: orderValue.toLowerCase() }],
    });

    return resumes;
  };

  getResumeById = async (resumeId) => {
    const resume = await prisma.resumes.findUnique({
      where: { resumeId: +resumeId },
      select: {
        resumeId: true,
        userId: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
          },
        },
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return resume;
  };

  updateResume = async (resumeId, title, content, status) => {
    await prisma.resumes.update({
      where: { resumeId: +resumeId },
      data: { title, content, status },
    });
    return;
  };

  deleteResume = async (resumeId) => {
    await prisma.resumes.delete({
      where: { resumeId: +resumeId },
    });
    return;
  };
}
