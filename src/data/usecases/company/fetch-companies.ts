import { FetchCompaniesRepository } from '@/data/protocols/db';
import { FetchCompanies } from '@/domain/usecases/company';

export class FetchCompaniesUseCase implements FetchCompanies {
  private companyRepository: FetchCompaniesRepository;

  constructor(companyRepository: FetchCompaniesRepository) {
    this.companyRepository = companyRepository;
  }

  async fetchCompanies(
    where: FetchCompanies.Params
  ): Promise<FetchCompanies.Paylaod> {
    return await this.getCompanies(where);
  }

  async getCompanies(where: FetchCompanies.Params) {
    return await this.companyRepository.fetchCompanies(where);
  }
}
