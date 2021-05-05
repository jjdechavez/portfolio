import { CreateProject } from '@/domain/usecases/project/createProject';

export interface CreateProjectRepository {
  create: (project: CreateProject.Params) => Promise<CreateProject.Payload>;
}
