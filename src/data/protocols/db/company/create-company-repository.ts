import { CreateCompany } from '@/domain/usecases/company';

export interface CreateCompanyRepository {
  create: (company: CreateCompany.Params) => Promise<CreateCompany.Payload>;
}
