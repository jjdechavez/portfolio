import { CreateProjectRepository } from '@/data/protocols/db/project';
import { ProjectCollection } from '@/domain/models';
import { CreateProject } from '@/domain/usecases/project';
import { ObjectId } from 'mongodb';

export class ProjectRepository implements CreateProjectRepository {
  private projectCollection: ProjectCollection;

  constructor(projectCollection: ProjectCollection) {
    this.projectCollection = projectCollection;
  }

  async create(project: CreateProject.Params): Promise<CreateProject.Payload> {
    const createdProject = await this.projectCollection.insertOne(project);
    return createdProject.ops[0] !== null;
  }
}
