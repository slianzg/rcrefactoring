export class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }

  //이력서 생성
  createResume = async (title, content, userId) => {
    await this.resumesRepository.createResume(title, content, userId);

    return;
  };

  //이력서 목록 조회
  getAllResumes = async (orderKey, orderValue) => {
    const resumes = await this.resumesRepository.getAllResumes(
      orderKey,
      orderValue
    );

    return resumes;
  };

  //이력서 상세 조회
  getResumeById = async (resumeId) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);

    if (!resume) throw new Error('이력서 조회에 실패하였습니다.');

    return resume;
  };

  //이력서 수정
  updateResume = async (resumeId, user, title, content, status) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);

    if (!resume) throw new Error('이력서 조회에 실패하였습니다.');

    if (user.grade === 'NORMAL' && user.userId !== resume.userId) {
      throw new Error('이력서를 수정할 권한이 없습니다.');
    }

    await this.resumesRepository.updateResume(resumeId, title, content, status);
    return;
  };

  //이력서 삭제
  deleteResume = async (resumeId, user) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);

    if (!resume) throw new Error('이력서 조회에 실패하였습니다.');

    if (user.grade === 'NORMAL' && user.userId !== resume.userId) {
      throw new Error('이력서를 삭제할 권한이 없습니다.');
    }

    await this.resumesRepository.deleteResume(resumeId);

    return;
  };
}
