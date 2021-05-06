import { ObjectId } from 'mongodb';
import { FindCompanyById } from '@/domain/usecases/company';

export interface FindCompanyByIdRepository {
  findById: (id: ObjectId) => Promise<FindCompanyById.Payload>;
}
