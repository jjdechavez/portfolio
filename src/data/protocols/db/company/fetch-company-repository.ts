import { FindCompanyById } from '@/domain/usecases/company';
import { ObjectID } from 'bson';

export interface FetchCompanyRepository {
  findById: (id: ObjectID) => Promise<FindCompanyById.Payload>;
}
