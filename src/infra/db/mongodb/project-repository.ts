import {
  CreateProjectRepository,
  GetProjectsRepository,
} from '@/data/protocols/db/project';
import { ProjectCollection } from '@/domain/models';
import { CreateProject, GetProjects } from '@/domain/usecases/project';

export class ProjectRepository
  implements CreateProjectRepository, GetProjectsRepository {
  private projectCollection: ProjectCollection;

  constructor(projectCollection: ProjectCollection) {
    this.projectCollection = projectCollection;
  }

  async fetchProducts(): Promise<GetProjects.Payload> {
    const projectCursor = this.projectCollection.find({}).limit(10);
    return await projectCursor.toArray();
  }

  async create(project: CreateProject.Params): Promise<CreateProject.Payload> {
    const createdProject = await this.projectCollection.insertOne(project);
    return createdProject.ops[0] !== null;
  }
}
