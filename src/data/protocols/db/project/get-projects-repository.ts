import { GetProjects } from '@/domain/usecases/project';

export interface GetProjectsRepository {
  fetchProducts: () => Promise<GetProjects.Payload>;
}
