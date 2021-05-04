import { CreateProjectRepository } from '@/data/protocols/db/project';
import { ProjectCollection } from '@/domain/models';

export class ProjectRepository implements CreateProjectRepository {
  private projectCollection: ProjectCollection;

  constructor(projectCollection: ProjectCollection) {
    this.projectCollection = projectCollection;
  }

  async create(
    project: CreateProjectRepository.Params
  ): Promise<CreateProjectRepository.Payload> {
    const newProject = await this.projectCollection.insertOne(project);
    console.log('Added Project:', newProject);
    return project;
  }
}
