import { CreateCompanyUseCase } from '@/data/usecases/company/create-company';
import { CreateCompany } from '@/domain/usecases/company';
import { CompanyRepository, MongoHelper } from '@/infra/db';

export const makeCreateCompanyFactory = async (): Promise<CreateCompany> => {
  await MongoHelper.connect();
  const companyCollection = await MongoHelper.getCollection('companies');
  const companyRepository = new CompanyRepository(companyCollection);

  return new CreateCompanyUseCase(companyRepository);
};
