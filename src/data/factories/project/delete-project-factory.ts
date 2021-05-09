import { DeleteProjectUseCase } from '@/data/usecases/project';
import { ProjectCollection } from '@/domain/models';
import { DeleteProject } from '@/domain/usecases/project';
import { ProjectRepository } from '@/infra/db';

export const makeDeleteProjectFactory = (
  projectCollection: ProjectCollection
): DeleteProject => {
  const projectRepository = new ProjectRepository(projectCollection);

  return new DeleteProjectUseCase(projectRepository);
};
