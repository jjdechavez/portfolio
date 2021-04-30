import { User } from '@/domain/models';
import { ObjectId } from 'mongodb';

export interface Me {
  me: (id: ObjectId) => Promise<Me.Payload>;
}

export namespace Me {
  export type Payload = Omit<User, 'password'>;
}
