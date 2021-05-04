import { FindCompanyByNameRepository } from '@/data/protocols/db/company';
import { CompanyCollection } from '@/domain/models/company';
import { FindCompanyByName } from '@/domain/usecases/company';

export class CompanyRepository implements FindCompanyByNameRepository {
  private companyCollection: CompanyCollection;

  constructor(companyCollection: CompanyCollection) {
    this.companyCollection = companyCollection;
  }

  async findCompanyByName(name: string): Promise<FindCompanyByName.Payload> {
    const company = await this.companyCollection.findOne({ name });
    return company;
  }
}
