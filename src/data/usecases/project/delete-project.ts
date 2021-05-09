import { DeleteProjectRepository } from '@/data/protocols/db';
import { DeleteProject } from '@/domain/usecases/project';
import { ObjectId } from 'bson';

export class DeleteProjectUseCase implements DeleteProject {
  private projectCollection: DeleteProjectRepository;

  constructor(projectCollection: DeleteProjectRepository) {
    this.projectCollection = projectCollection;
  }

  async deleteProject(id: ObjectId): Promise<DeleteProject.Payload> {
    return this.projectCollection.deleteProjectById(id);
  }
}
