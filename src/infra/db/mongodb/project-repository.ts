import { ObjectId } from 'bson';
import {
  CreateProjectRepository,
  GetProjectRepository,
  GetProjectsRepository,
} from '@/data/protocols/db/project';
import { ProjectCollection } from '@/domain/models';
import {
  CreateProject,
  GetProject,
  GetProjects,
} from '@/domain/usecases/project';

export class ProjectRepository
  implements
    CreateProjectRepository,
    GetProjectsRepository,
    GetProjectRepository {
  private projectCollection: ProjectCollection;

  constructor(projectCollection: ProjectCollection) {
    this.projectCollection = projectCollection;
  }

  async findById(id: ObjectId): Promise<GetProject.Payload> {
    const projectCursor = this.projectCollection.find({ _id: id });
    const project = await projectCursor.toArray();
    return project.length > 0 ? project[0] : null;
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
