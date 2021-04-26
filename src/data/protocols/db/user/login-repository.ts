import { User } from '@/domain/models';

export interface LoginRepository {
  getUserByUsername: (username: string) => Promise<User>;
}
