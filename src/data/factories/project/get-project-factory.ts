import { GetProjectUseCase } from '@/data/usecases/project';
import { GetProject } from '@/domain/usecases/project';
import { MongoHelper, ProjectRepository } from '@/infra/db';

export const makeGetProjectFactory = async (): Promise<GetProject> => {
  await MongoHelper.connect();
  const projectCollection = await MongoHelper.getCollection('projects');
  const projectRepository = new ProjectRepository(projectCollection);

  return new GetProjectUseCase(projectRepository);
};
