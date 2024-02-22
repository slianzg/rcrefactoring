import jwt from 'jsonwebtoken'; //얘는 어떡하지...

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  //회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, password, confirmPassword, name, grade } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ message: '이메일이 입력되지 않았습니다.' });
      }

      if (!password) {
        return res
          .status(400)
          .json({ message: '비밀번호가 입력되지 않았습니다.' });
      }

      if (!confirmPassword) {
        return res
          .status(400)
          .json({ message: '비밀번호확인이 입력되지 않았습니다.' });
      }

      if (!name) {
        return res.status(400).json({ message: '이름이 입력되지 않았습니다.' });
      }

      if (grade && !['NORMAL', 'ADMIN'].includes(grade)) {
        return res
          .status(400)
          .json({ message: '회원등급 입력이 올바르지 않습니다.' });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: '비밀번호가 6자 이상이어야 합니다.' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
        });
      }

      await this.usersService.signUp(email, password, name, grade);

      return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  //로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res
          .status(400)
          .json({ message: '이메일이 입력되지 않았습니다.' });
      }

      if (!password) {
        return res
          .status(400)
          .json({ message: '비밀번호가 입력되지 않았습니다.' });
      }

      const user = await this.usersService.signIn(email, password);

      const token = jwt.sign(
        { userId: user.userId },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: '12h' }
      );

      const newRefreshToken = jwt.sign(
        { userId: user.userId },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: '7d' }
      );

      res.cookie('authorization', `Bearer ${token}`);
      res.cookie('refreshtoken', newRefreshToken);
      return res.status(200).json({ message: '로그인 성공!' });
    } catch (err) {
      next(err);
    }
  };

  //회원정보 조회
  getUserInfoById = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const user = await this.usersService.getUserInfoById(userId);

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };
}
