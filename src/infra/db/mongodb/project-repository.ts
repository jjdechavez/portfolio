import { ObjectId } from 'bson';
import {
  CreateProjectRepository,
  GetProjectRepository,
  GetProjectsRepository,
  DeleteProjectRepository,
  UpdateProjectRepository,
} from '@/data/protocols/db/project';
import { ProjectCollection } from '@/domain/models';
import {
  CreateProject,
  DeleteProject,
  GetProject,
  GetProjects,
  UpdateProject,
} from '@/domain/usecases/project';

export class ProjectRepository
  implements
    CreateProjectRepository,
    GetProjectsRepository,
    GetProjectRepository,
    DeleteProjectRepository,
    UpdateProjectRepository {
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

  async updateProject(
    id: ObjectId,
    data: UpdateProject.Params
  ): Promise<UpdateProject.Payload> {
    const updatedProject = await this.projectCollection.updateOne(
      { _id: id },
      { $set: { ...data } }
    );
    return updatedProject.modifiedCount > 0;
  }

  async deleteProjectById(id: ObjectId): Promise<DeleteProject.Payload> {
    const deletedProject = await this.projectCollection.deleteOne({ _id: id });
    return deletedProject.deletedCount === 1;
  }

  async exist(id: ObjectId): Promise<boolean> {
    const query = { _id: id };
    const projection = { _id: 1 };
    const projectCursor = this.projectCollection
      .find(query)
      .project(projection);
    const project = await projectCursor.toArray();

    return project[0]._id === id;
  }
}
