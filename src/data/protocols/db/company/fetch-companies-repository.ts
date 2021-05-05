import { FetchCompanies } from '@/data/usecases/project';

export interface FetchCompaniesRepository {
  fetchCompanies: (
    where: FetchCompanies.Params
  ) => Promise<FetchCompanies.Paylaod>;
}
