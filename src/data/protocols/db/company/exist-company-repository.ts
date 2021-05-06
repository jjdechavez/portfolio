import { ObjectId } from 'mongodb';

export interface ExistCompanyRepository {
  exist: (id: ObjectId) => Promise<boolean>;
}
