import { GetProjectsRepository } from '@/data/protocols/db/project/get-projects-repository';
import { GetProjects } from '@/domain/usecases/project';

export class GetProjectsUseCase implements GetProjects {
  private projectRepository: GetProjectsRepository;

  constructor(projectRepository: GetProjectsRepository) {
    this.projectRepository = projectRepository;
  }

  async projects(): Promise<GetProjects.Payload> {
    return this.getProjects();
  }

  async getProjects() {
    return await this.projectRepository.fetchProducts();
  }
}
