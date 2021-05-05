import { CreateCompanyRepository } from '@/data/protocols/db/company';
import { CreateCompany } from '@/domain/usecases/company';

export class CreateCompanyUseCase implements CreateCompany {
  private companyCollection: CreateCompanyRepository;

  constructor(companyCollection: CreateCompanyRepository) {
    this.companyCollection = companyCollection;
  }

  async createCompany(
    company: CreateCompany.Params
  ): Promise<CreateCompany.Payload> {
    const isInserted = this.companyCollection.create(company);
    return isInserted;
  }
}
