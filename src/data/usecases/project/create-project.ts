import { CreateProjectRepository } from '@/data/protocols/db';
import { CreateProject } from '@/domain/usecases/project';

export class CreateProjectUseCase implements CreateProject {
  private projectRepository: CreateProjectRepository;

  constructor(projectRepository: CreateProjectRepository) {
    this.projectRepository = projectRepository;
  }

  async createProject(
    project: CreateProject.Params
  ): Promise<CreateProject.Payload> {
    try {
      this.validationProject(project);
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async findCompanyByName(company: string): Promise<any> {}

  validationProject({ name, role, company }: CreateProject.Params) {
    if (!name) {
      throw new Error('Required project name');
    }
    if (!role) {
      throw new Error('Required project role');
    }
    if (!company) {
      throw new Error('Required project company');
    }
  }
}
