import { UpdateProjectUseCase } from '@/data/usecases/project';
import { ProjectCollection } from '@/domain/models';
import { UpdateProject } from '@/domain/usecases/project';
import { ProjectRepository } from '@/infra/db';

export const makeUpdateProjectFactory = (
  projectCollection: ProjectCollection
): UpdateProject => {
  const projectRepository = new ProjectRepository(projectCollection);

  return new UpdateProjectUseCase(projectRepository);
};
