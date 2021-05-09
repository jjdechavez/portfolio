import { UpdateProjectRepository } from '@/data/protocols/db';
import { UpdateProject } from '@/domain/usecases/project';
import { ObjectId } from 'bson';

export class UpdateProjectUseCase implements UpdateProject {
  private projectCollection: UpdateProjectRepository;

  constructor(projectCollection: UpdateProjectRepository) {
    this.projectCollection = projectCollection;
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

    return this.updateProjectById(id, data);
  }

  async projectExist(id: ObjectId): Promise<boolean> {
    return await this.projectCollection.exist(id);
  }

  async updateProjectById(
    id: ObjectId,
    data: UpdateProject.Params
  ): Promise<UpdateProject.Payload> {
    return await this.projectCollection.updateProject(id, data);
  }
}
