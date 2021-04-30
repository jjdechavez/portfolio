import { Collection, ObjectId } from 'mongodb';
import { User } from '@/domain/models';
import { LoginRepository, MeRepository } from '@/data/protocols/db';
import { Me } from '@/domain/usecases/common/auth/me';

export class UserRepository implements LoginRepository, MeRepository {
  private userCollection: Collection<User>;

  constructor(userCollection: Collection<User>) {
    this.userCollection = userCollection;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userCollection.findOne({ username });
    return user;
  }

  async getUserById(id: ObjectId): Promise<Me.Payload> {
    const [user] = await this.userCollection
      .find({ _id: new ObjectId(id) })
      .project({ username: 1 })
      .toArray();
    return user;
  }
}
