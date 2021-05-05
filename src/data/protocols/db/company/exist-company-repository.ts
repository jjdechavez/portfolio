import { ObjectID } from 'bson';

export interface ExistCompanyRepository {
  exist: (id: ObjectID) => Promise<boolean>;
}
