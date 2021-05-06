import { CreateProjectRepository } from '@/data/protocols/db/project';
import { ProjectCollection } from '@/domain/models';
import { CreateProject } from '@/domain/usecases/project';

export class ProjectRepository implements CreateProjectRepository {
  private projectCollection: ProjectCollection;

  constructor(projectCollection: ProjectCollection) {
    this.projectCollection = projectCollection;
  }

  async create(project: CreateProject.Params): Promise<CreateProject.Payload> {
    const company = await this.projectCollection.insertOne(project);
    console.log('Added Project:', company);
    return company.ops[0] !== null;
  }
}
