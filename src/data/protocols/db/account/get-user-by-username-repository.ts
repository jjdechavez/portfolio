import { User } from '@/domain/models';

export interface GetUserByUsernameRepository {
  getUserByUsername: (username: string) => Promise<User>;
}
