import { GetProjectsUseCase } from '@/data/usecases/project/get-projects';
import { GetProjects } from '@/domain/usecases/project';
import { MongoHelper, ProjectRepository } from '@/infra/db';

export const makeGetProjectsFactory = async (): Promise<GetProjects> => {
  await MongoHelper.connect();
  const projectCollection = await MongoHelper.getCollection('projects');
  const projectRepository = new ProjectRepository(projectCollection);

  return new GetProjectsUseCase(projectRepository);
};
