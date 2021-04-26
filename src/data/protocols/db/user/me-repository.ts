import { ObjectId } from 'mongodb';
import { Me } from '@/domain/usecases/common/auth/me';

export interface MeRepository {
  getUserById: (id: ObjectId) => Promise<Me.Payload>;
}
