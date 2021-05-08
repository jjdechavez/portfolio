import { GetProjectRepository } from '@/data/protocols/db';
import { GetProject } from '@/domain/usecases/project';
import { ObjectId } from 'bson';

export class GetProjectUseCase implements GetProject {
  private projectCollection: GetProjectRepository;

  constructor(projectCollection: GetProjectRepository) {
    this.projectCollection = projectCollection;
  }

  async getProject(id: ObjectId): Promise<GetProject.Payload> {
    return await this.projectCollection.findById(id);
  }
}
