import {
  ExistCompanyRepository,
  UpdateProjectRepository,
} from '@/data/protocols/db';
import { UpdateProject } from '@/domain/usecases/project';
import { ObjectId } from 'bson';

export class UpdateProjectUseCase implements UpdateProject {
  private projectRepository: UpdateProjectRepository;
  private companyRepository: ExistCompanyRepository;

  constructor(
    projectCollection: UpdateProjectRepository,
    companyRepository: ExistCompanyRepository
  ) {
    this.projectRepository = projectCollection;
    this.companyRepository = companyRepository;
  }

  async updateProject(
    id: ObjectId,
    data: UpdateProject.Params
  ): Promise<UpdateProject.Payload> {
    if (!id) {
      throw new Error('Required id');
    }

    const isProjectExist = await this.projectExist(id);

    if (!isProjectExist) {
      throw new Error('Project does not exist');
    }

    const isCompanyExist = await this.companyExist(data.company);

    if (!isCompanyExist) {
      throw new Error('Company does not exist');
    }

    return this.updateProjectById(id, data);
  }

  async projectExist(id: ObjectId): Promise<boolean> {
    return await this.projectRepository.exist(id);
  }

  async companyExist(id: ObjectId): Promise<boolean> {
    return await this.companyRepository.exist(id);
  }

  async updateProjectById(
    id: ObjectId,
    data: UpdateProject.Params
  ): Promise<UpdateProject.Payload> {
    return await this.projectRepository.updateProject(id, data);
  }
}
