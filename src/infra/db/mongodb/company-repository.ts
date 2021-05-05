import {
  CreateCompanyRepository,
  FindCompanyByNameRepository,
} from '@/data/protocols/db/company';
import { CompanyCollection } from '@/domain/models/company';
import { CreateCompany, FindCompanyByName } from '@/domain/usecases/company';

export class CompanyRepository
  implements FindCompanyByNameRepository, CreateCompanyRepository {
  private companyCollection: CompanyCollection;

  constructor(companyCollection: CompanyCollection) {
    this.companyCollection = companyCollection;
  }

  async findCompanyByName(name: string): Promise<FindCompanyByName.Payload> {
    const company = await this.companyCollection.findOne({ name });
    return company;
  }

  async create(company: CreateCompany.Params): Promise<CreateCompany.Payload> {
    const companyCursor = await this.companyCollection.insertOne(company);
    console.log('insertOpt', companyCursor.ops[0]);
    console.log('New company inserted:', companyCursor.insertedId);
    return companyCursor.insertedCount === 1;
  }
}
