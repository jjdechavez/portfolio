import {
  CreateCompanyRepository,
  FetchCompaniesRepository,
  FindCompanyByNameRepository,
} from '@/data/protocols/db/company';
import { FetchCompanies } from '@/data/usecases/project';
import { CompanyCollection } from '@/domain/models/company';
import { CreateCompany, FindCompanyByName } from '@/domain/usecases/company';

export class CompanyRepository
  implements
    FindCompanyByNameRepository,
    CreateCompanyRepository,
    FetchCompaniesRepository {
  private companyCollection: CompanyCollection;

  constructor(companyCollection: CompanyCollection) {
    this.companyCollection = companyCollection;
  }

  async findCompanyByName(name: string): Promise<FindCompanyByName.Payload> {
    const company = await this.companyCollection.findOne({ name });
    return company;
  }

  async fetchCompanies({
    limit = 10,
  }: FetchCompanies.Params): Promise<FetchCompanies.Paylaod> {
    const companyCursor = this.companyCollection.find({}).limit(limit);
    return await companyCursor.toArray();
  }

  async create(company: CreateCompany.Params): Promise<CreateCompany.Payload> {
    const companyCursor = await this.companyCollection.insertOne(company);
    console.log('insertOpt', companyCursor.ops[0]);
    return companyCursor.insertedCount === 1;
  }
}
