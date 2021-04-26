import { GetUserByUsernameRepository } from '@/data/protocols/db';
import { User } from '@/domain/models';

export class UserRepository implements GetUserByUsernameRepository {
  private userCollection: any;

  constructor(userCollection: any) {
    this.userCollection = userCollection;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userCollection.findOne({ username });
    return user;
  }
}
