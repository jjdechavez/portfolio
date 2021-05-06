import {
  CreateProjectRepository,
  ExistCompanyRepository,
} from '@/data/protocols/db';
import { CreateProject } from '@/domain/usecases/project';
import { ObjectID } from 'bson';

export class CreateProjectUseCase implements CreateProject {
  private projectRepository: CreateProjectRepository;
  private companyRepository: ExistCompanyRepository;

  constructor(
    projectRepository: CreateProjectRepository,
    companyRepository: ExistCompanyRepository
  ) {
    this.projectRepository = projectRepository;
    this.companyRepository = companyRepository;
  }

  async createProject(
    project: CreateProject.Params
  ): Promise<CreateProject.Payload> {
    try {
      this.validationProject(project);
      return await this.projectRepository.create(project);
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  validationProject({ name, role, company }: CreateProject.Params) {
    if (!name) {
      throw new Error('Required project name');
    }
    if (!role) {
      throw new Error('Required project role');
    }

    const isCompanyExisted = this.isCompanyExist(company);

    if (!isCompanyExisted) {
      throw new Error('Required project company');
    }
  }

  async isCompanyExist(id: ObjectID): Promise<any> {
    return await this.companyRepository.exist(id);
  }
}
