export class ResumesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createResume = async (title, content, userId) => {
    await this.prisma.resumes.create({
      data: { title, content, userId: +userId },
    });
    return;
  };

  getAllResumes = async (orderKey, orderValue) => {
    const resumes = await this.prisma.resumes.findMany({
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
    const resume = await this.prisma.resumes.findUnique({
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
    await this.prisma.resumes.update({
      where: { resumeId: +resumeId },
      data: { title, content, status },
    });
    return;
  };

  deleteResume = async (resumeId) => {
    await this.prisma.resumes.delete({
      where: { resumeId: +resumeId },
    });
    return;
  };
}
