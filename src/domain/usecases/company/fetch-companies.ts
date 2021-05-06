import { Company } from '@/domain/models/company';

export interface FetchCompanies {
  fetchCompanies: (
    where: FetchCompanies.Params
  ) => Promise<FetchCompanies.Paylaod>;
}

export namespace FetchCompanies {
  export type Paylaod = Company[];
  export type Params = {
    limit?: number;
  };
}
