import { compare, hash } from 'bcryptjs';

export class AuthHelper {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const isCorrectPassword = await compare(password, hash);
    return isCorrectPassword;
  }
}
