import { Company } from '@/domain/models/company';

export interface FindCompanyByName {
  findCompanyByName: (name: string) => Promise<FindCompanyByName.Payload>;
}

export namespace FindCompanyByName {
  export type Payload = Company | null;
}
