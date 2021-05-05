import {
  CreateCompanyRepository,
  FetchCompaniesRepository,
  FindCompanyByIdRepository,
  FindCompanyByNameRepository,
  ExistCompanyRepository,
} from '@/data/protocols/db/company';
import { CompanyCollection } from '@/domain/models/company';
import {
  CreateCompany,
  FetchCompanies,
  FindCompanyById,
  FindCompanyByName,
} from '@/domain/usecases/company';
import { ObjectID } from 'bson';

export class CompanyRepository
  implements
    FindCompanyByNameRepository,
    CreateCompanyRepository,
    FetchCompaniesRepository,
    FindCompanyByIdRepository,
    ExistCompanyRepository {
  private companyCollection: CompanyCollection;

  constructor(companyCollection: CompanyCollection) {
    this.companyCollection = companyCollection;
  }

  async findCompanyByName(name: string): Promise<FindCompanyByName.Payload> {
    const company = await this.companyCollection.findOne({ name });
    return company;
  }

  async findById(id: ObjectID): Promise<FindCompanyById.Payload> {
    const companyCursor = this.companyCollection.find({ _id: id });
    const company = await companyCursor.toArray();

    if (company.length < 1) {
      return null;
    }

    return company[0];
  }

  async fetchCompanies({
    limit = 10,
  }: FetchCompanies.Params): Promise<FetchCompanies.Paylaod> {
    const companyCursor = this.companyCollection.find({}).limit(limit);
    return await companyCursor.toArray();
  }

  async create(company: CreateCompany.Params): Promise<CreateCompany.Payload> {
    const companyCursor = await this.companyCollection.insertOne(company);
    console.log('Created company:', companyCursor.ops[0]);
    return companyCursor.insertedCount === 1;
  }

  async exist(id: ObjectID): Promise<boolean> {
    const projection = { _id: 1 };
    const companyCursor = this.companyCollection
      .find({ _id: id })
      .project(projection);
    const company = await companyCursor.toArray();

    return company[0]._id === id;
  }
}
