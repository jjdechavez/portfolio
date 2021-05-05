import { Company } from '@/domain/models/company';

export interface CreateCompany {
  createCompany: (
    company: CreateCompany.Params
  ) => Promise<CreateCompany.Payload>;
}

export namespace CreateCompany {
  export type Params = Omit<Company, '_id' | 'projects'>;
  export type Payload = boolean;
}
