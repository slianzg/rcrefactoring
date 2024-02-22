export class ResumesController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }

  //이력서 생성
  createResume = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { userId } = req.user;

      if (!title) {
        return res.status(400).json({ message: '이력서 제목을 입력해주세요.' });
      }

      if (!content) {
        return res
          .status(400)
          .json({ message: '자기소개(내용)을 입력해주세요.' });
      }

      await this.resumesService.createResume(title, content, userId);

      return res.status(201).json({ message: '이력서가 저장되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  //이력서 목록 조회
  getAllResumes = async (req, res, next) => {
    try {
      const orderKey = req.query.orderKey ?? 'resumeId';
      const orderValue = req.query.orderValue ?? 'desc';

      if (!['resumeId', 'status'].includes(orderKey)) {
        return res.status(400).json({
          success: false,
          message: 'orderkey가 올바르지 않습니다.',
        });
      }

      if (!['asc', 'desc'].includes(orderValue.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'orderValue가 올바르지 않습니다.',
        });
      }

      const resumes = await this.resumesService.getAllResumes(
        orderKey,
        orderValue
      );

      return res.status(200).json({ data: resumes });
    } catch (err) {
      next(err);
    }
  };

  //이력서 세부 조회
  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      if (!resumeId) {
        return res
          .status(400)
          .json({ message: 'resumeId는 필수로 입력되어야 합니다.' });
      }

      const resume = await this.resumesService.getResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };
  //이력서 수정
  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const user = req.user;

      if (!resumeId) {
        return res
          .status(400)
          .json({ message: 'resumeId는 필수로 입력되어야 합니다.' });
      }

      const { title, content, status } = req.body;

      if (
        ![
          'APPLY',
          'DROP',
          'PASS',
          'INTERVIEW1',
          'INTERVIEW2',
          'FINAL_PASS',
        ].includes(status)
      ) {
        return res
          .status(400)
          .json({ message: '유효하지 않은 status값입니다.' });
      }

      await this.resumesService.updateResume(
        resumeId,
        user,
        title,
        content,
        status
      );

      return res
        .status(200)
        .json({ message: '이력서 수정사항이 저장되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
  //이력서 삭제
  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const user = req.user;

      if (!resumeId) {
        return res
          .status(400)
          .json({ message: 'resumeId는 필수로 입력되어야 합니다.' });
      }

      await this.resumesService.deleteResume(resumeId, user);

      return res.status(200).json({ message: '이력서가 삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
