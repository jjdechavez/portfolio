import { Company } from '@/domain/models/company';
import { ObjectId } from 'mongodb';

export interface FindCompanyById {
  companyId: (id: ObjectId) => Promise<FindCompanyById.Payload>;
}

export namespace FindCompanyById {
  export type Payload = Company | null;
}
