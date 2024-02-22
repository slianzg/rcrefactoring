import bcrypt from 'bcrypt'; // 얘는 어떻게 하지

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  //회원가입
  signUp = async (email, password, name, grade) => {
    const isExistUser = await this.usersRepository.findUserByEmail(email);
    if (isExistUser)
      throw new Error('이미 동일한 이메일로 가입한 사용자가 있습니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.signUp(email, hashedPassword, name, grade);

    return;
  };

  //로그인
  signIn = async (email, password) => {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new Error('작성한 이메일로 가입한 사용자가 없습니다.');

    if (!(await bcrypt.compare(password, user.password)))
      throw new Error('비밀번호가 일치하지 않습니다.');

    return user;
  };

  //유저 정보 조회
  getUserInfoById = async (userId) => {
    const user = await this.usersRepository.getUserInfoById(userId);

    return user;
  };
}
