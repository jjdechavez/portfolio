import { LoginRepository } from '@/data/protocols/db/user/login-repository';
import { User } from '@/domain/models';
import { Login } from '@/domain/usecases/common/auth';
import { AuthHelper } from '@/infra/auth';

export class LoginUseCase implements Login {
  private userRepository: LoginRepository;
  private authHelper: AuthHelper;

  constructor(userRepository: LoginRepository, authHelper: AuthHelper) {
    this.userRepository = userRepository;
    this.authHelper = authHelper;
  }

  async login(data: Login.Params): Promise<Login.Payload> {
    const { username, password } = data.user;

    try {
      this.hasUsername(username);
      this.hasPassword(password);

      const user = await this.getUserByUsername(username);

      if (!user) {
        throw Error('Invalid username or password');
      }

      if (!(await this.correctPassword(password, user.password))) {
        throw Error('Invalid username or password');
      }

      data.req.session.set('user', {
        _id: user._id,
        username: user.username,
      });
      await data.req.session.save();

      return {
        login: true,
      };
    } catch (error) {
      return {
        login: false,
        message: error.message,
      };
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.getUserByUsername(username);
  }

  async correctPassword(password: string, hash: string): Promise<boolean> {
    return await this.authHelper.comparePassword(password, hash);
  }

  hasUsername(username: string) {
    if (!username) throw Error('Missing username');
  }

  hasPassword(password: string) {
    if (!password) {
      throw Error('Missing username');
    }
  }
}
