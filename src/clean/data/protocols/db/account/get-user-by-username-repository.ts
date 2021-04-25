import { User } from '@/clean/domain/models';

export interface GetUserByUsernameRepository {
  checkByUsername: (username: string) => Promise<User>;
}
