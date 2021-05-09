import { GetProjectUseCase } from '@/data/usecases/project';
import { ProjectCollection } from '@/domain/models';
import { GetProject } from '@/domain/usecases/project';
import { ProjectRepository } from '@/infra/db';

export const makeGetProjectFactory = (
  projectCollection: ProjectCollection
): GetProject => {
  const projectRepository = new ProjectRepository(projectCollection);

  return new GetProjectUseCase(projectRepository);
};
