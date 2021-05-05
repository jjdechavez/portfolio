import { FetchCompaniesUseCase } from '@/data/usecases/company/fetch-companies';
import { FetchCompanies } from '@/domain/usecases/company';
import { CompanyRepository, MongoHelper } from '@/infra/db';

export const makeFetchCompaniesFactory = async (): Promise<FetchCompanies> => {
  await MongoHelper.connect();
  const companyCollection = await MongoHelper.getCollection('companies');
  const companyRepository = new CompanyRepository(companyCollection);

  return new FetchCompaniesUseCase(companyRepository);
};
