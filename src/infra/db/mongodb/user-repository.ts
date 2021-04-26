import { Collection } from 'mongodb';
import { LoginRepository } from '@/data/protocols/db';
import { User } from '@/domain/models';

export class UserRepository implements LoginRepository {
  private userCollection: Collection<User>;

  constructor(userCollection: Collection<User>) {
    this.userCollection = userCollection;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userCollection.findOne({ username });
    return user;
  }
}
