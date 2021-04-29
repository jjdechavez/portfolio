import { LoginRepository } from '@/data/protocols/db/user/login-repository';
import { User } from '@/domain/models';
import { Login } from '@/domain/usecases/common/auth';

export class LoginUseCase implements Login {
  private userRepository: LoginRepository;

  constructor(userRepository: LoginRepository) {
    this.userRepository = userRepository;
  }

  async login(data: Login.Params): Promise<Login.Payload> {
    const { username, password } = data.user;

    this.hasUsername(username);
    this.hasPassword(password);

    try {
      const user = await this.getUserByUsername(username);

      if (!user) {
        throw Error('Invalid username or password');
      }

      if (user.password !== password) {
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

  hasUsername(username: string) {
    if (!username) throw Error('Missing username');
  }

  hasPassword(password: string) {
    if (!password) {
      throw Error('Missing username');
    }
  }
}
