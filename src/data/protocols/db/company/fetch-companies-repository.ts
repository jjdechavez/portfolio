import { FetchCompanies } from '@/domain/usecases/company';

export interface FetchCompaniesRepository {
  fetchCompanies: (
    where: FetchCompanies.Params
  ) => Promise<FetchCompanies.Paylaod>;
}
