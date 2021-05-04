import { FindCompanyByName } from '@/domain/usecases/company';

export interface FindCompanyByNameRepository {
  findCompanyByName: (name: string) => Promise<FindCompanyByName.Payload>;
}
