import { UpdateProjectUseCase } from '@/data/usecases/project';
import { ProjectCollection } from '@/domain/models';
import { CompanyCollection } from '@/domain/models/company';
import { UpdateProject } from '@/domain/usecases/project';
import { CompanyRepository, ProjectRepository } from '@/infra/db';

export const makeUpdateProjectFactory = (
  projectCollection: ProjectCollection,
  companyCollection: CompanyCollection
): UpdateProject => {
  const projectRepository = new ProjectRepository(projectCollection);
  const companyRepository = new CompanyRepository(companyCollection);

  return new UpdateProjectUseCase(projectRepository, companyRepository);
};
